(() => {
  const PROJECT_URL = 'https://lgxlysqreermvgmtrrev.supabase.co';
  const PUBLISHABLE_KEY = 'sb_publishable_ICFnyMdeou74jSzHm6AhaA_9NZ0xQ-O';
  const REDIRECT_URL = 'https://camitriesthings.github.io/spell-farm-academy/';
  const LOCAL_EDIT_KEY = 'spellCloudLocalUpdatedAt';
  const PHOTO_BUCKET = 'farm-photos';
  const originalSetItem = Storage.prototype.setItem;
  const originalRemoveItem = Storage.prototype.removeItem;
  let client = null;
  let session = null;
  let initialized = false;
  let initPromise = null;
  let saveTimer = null;
  let suppressLocalEvents = false;
  let status = 'signedout';

  const isFarmKey = key => String(key).startsWith('spell') && key !== LOCAL_EDIT_KEY;
  const localTimestamp = () => Number(localStorage.getItem(LOCAL_EDIT_KEY) || 0);
  const markLocalEdit = () => originalSetItem.call(localStorage, LOCAL_EDIT_KEY, String(Date.now()));
  const collectLocalState = () => {
    const values = {};
    for (let index = 0; index < localStorage.length; index += 1) {
      const key = localStorage.key(index);
      if (isFarmKey(key)) values[key] = localStorage.getItem(key);
    }
    return values;
  };
  const hasLocalState = () => Object.keys(collectLocalState()).length > 0;
  const statusText = () => ({
    signedout: 'Saved on this device · sign in to sync',
    connecting: 'Checking your farm account…',
    saving: 'Saving to your account…',
    saved: '✓ Synced to your account',
    offline: 'Saved on this device · cloud unavailable'
  }[status] || 'Saved on this device');

  const renderAccount = () => {
    const button = document.querySelector('#accountButton');
    const signedOut = document.querySelector('#accountSignedOut');
    const signedIn = document.querySelector('#accountSignedIn');
    const email = document.querySelector('#accountEmailLabel');
    const syncStatus = document.querySelector('#accountSyncStatus');
    if (button) button.textContent = session?.user ? 'My account' : 'Sign in';
    if (signedOut) signedOut.hidden = Boolean(session?.user);
    if (signedIn) signedIn.hidden = !session?.user;
    if (email) email.textContent = session?.user?.email || '';
    if (syncStatus) syncStatus.textContent = statusText();
  };
  const setStatus = next => {
    status = next;
    renderAccount();
    window.dispatchEvent(new CustomEvent('spellcloudstatus', {detail: {status, text: statusText()}}));
  };
  const setMessage = message => {
    const element = document.querySelector('#accountMessage');
    if (element) element.textContent = message;
  };

  const applyCloudState = values => {
    suppressLocalEvents = true;
    try {
      Object.entries(values || {}).forEach(([key, value]) => {
        if (isFarmKey(key) && typeof value === 'string') originalSetItem.call(localStorage, key, value);
      });
      originalSetItem.call(localStorage, LOCAL_EDIT_KEY, String(Date.now()));
    } finally {
      suppressLocalEvents = false;
    }
  };

  const saveNow = async () => {
    clearTimeout(saveTimer);
    if (!client || !session?.user) return false;
    if (!navigator.onLine) { setStatus('offline'); return false; }
    setStatus('saving');
    const payload = {user_id: session.user.id, data: collectLocalState(), updated_at: new Date().toISOString()};
    const {error} = await client.from('user_state').upsert(payload, {onConflict: 'user_id'});
    if (error) { console.error('Spell Farm sync:', error.message); setStatus('offline'); return false; }
    markLocalEdit();
    setStatus('saved');
    return true;
  };
  const queueSave = () => {
    if (!session?.user || suppressLocalEvents) return;
    clearTimeout(saveTimer);
    saveTimer = setTimeout(saveNow, 650);
  };

  Storage.prototype.setItem = function(key, value) {
    originalSetItem.call(this, key, value);
    if (this === localStorage && isFarmKey(key) && !suppressLocalEvents) { markLocalEdit(); queueSave(); }
  };
  Storage.prototype.removeItem = function(key) {
    originalRemoveItem.call(this, key);
    if (this === localStorage && isFarmKey(key) && !suppressLocalEvents) { markLocalEdit(); queueSave(); }
  };

  const reconcile = async () => {
    if (!client || !session?.user) { setStatus('signedout'); return; }
    setStatus('connecting');
    const {data, error} = await client.from('user_state').select('data, updated_at').eq('user_id', session.user.id).maybeSingle();
    if (error) { console.error('Spell Farm sync:', error.message); setStatus('offline'); return; }
    if (!data) {
      await saveNow();
    } else {
      const cloudTime = Date.parse(data.updated_at || '') || 0;
      if (hasLocalState() && localTimestamp() > cloudTime) await saveNow();
      else {
        applyCloudState(data.data || {});
        setStatus('saved');
        window.dispatchEvent(new Event('spellcloudsync'));
      }
    }
  };

  const bindAccountUI = () => {
    const dialog = document.querySelector('#accountDialog');
    document.querySelector('#accountButton')?.addEventListener('click', () => { renderAccount(); setMessage(''); dialog?.showModal(); });
    document.querySelector('#magicLinkForm')?.addEventListener('submit', async event => {
      event.preventDefault();
      const email = new FormData(event.currentTarget).get('email')?.toString().trim();
      if (!email || !client) return;
      setMessage('Sending your secure sign-in link…');
      const {error} = await client.auth.signInWithOtp({email, options: {emailRedirectTo: REDIRECT_URL, shouldCreateUser: true}});
      setMessage(error ? `Could not send the link: ${error.message}` : 'Check your email and tap the sign-in link. You can close this window while you wait.');
    });
    document.querySelector('#syncNowButton')?.addEventListener('click', async () => { setMessage(''); const ok = await saveNow(); if (ok) setMessage('Your latest progress is safely synced.'); });
    document.querySelector('#signOutButton')?.addEventListener('click', async () => { if (client) await client.auth.signOut(); setMessage('Signed out. Your progress still stays on this device.'); });
    renderAccount();
  };

  const init = () => {
    if (initPromise) return initPromise;
    initPromise = (async () => {
      bindAccountUI();
      if (!window.supabase?.createClient) { setStatus('offline'); return; }
      client = window.supabase.createClient(PROJECT_URL, PUBLISHABLE_KEY, {auth: {flowType: 'pkce', detectSessionInUrl: true, persistSession: true, autoRefreshToken: true}});
      const {data} = await client.auth.getSession();
      session = data.session;
      initialized = true;
      renderAccount();
      await reconcile();
      client.auth.onAuthStateChange((_event, nextSession) => {
        session = nextSession;
        renderAccount();
        setTimeout(reconcile, 0);
      });
    })();
    return initPromise;
  };

  const photoPath = () => session?.user ? `${session.user.id}/current-farm` : null;
  const loadPhoto = async () => {
    if (!client || !photoPath()) return null;
    const {data, error} = await client.storage.from(PHOTO_BUCKET).download(photoPath());
    if (error) return null;
    return data;
  };
  const uploadPhoto = async file => {
    if (!session?.user) throw new Error('Sign in first so your picture can follow you to every device.');
    if (!file?.type?.startsWith('image/')) throw new Error('Please choose an image file.');
    if (file.size > 8 * 1024 * 1024) throw new Error('Please choose a picture smaller than 8 MB.');
    const {error} = await client.storage.from(PHOTO_BUCKET).upload(photoPath(), file, {upsert: true, contentType: file.type, cacheControl: '0'});
    if (error) throw error;
    return true;
  };
  const removePhoto = async () => {
    if (!client || !photoPath()) return;
    const {error} = await client.storage.from(PHOTO_BUCKET).remove([photoPath()]);
    if (error) throw error;
  };

  window.SpellCloud = {
    init, queueSave, saveNow, statusText, renderStatus: renderAccount,
    reconnect: async () => { if (!initialized) await init(); else await reconcile(); },
    isSignedIn: () => Boolean(session?.user), user: () => session?.user || null,
    loadPhoto, uploadPhoto, removePhoto
  };
})();
