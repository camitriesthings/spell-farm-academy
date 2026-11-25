const bundleRooms=[
  {name:'Crafts Room',color:'bundle-green',unlock:'Bridge repair',note:'Seasonal forage first. Construction needs three separate material stacks, including two stacks of 99 Wood.',bundles:[
    {name:'Spring Foraging Bundle',reward:'30 Spring Seeds',items:['Wild Horseradish','Daffodil','Leek','Dandelion']},
    {name:'Summer Foraging Bundle',reward:'30 Summer Seeds',items:['Grape','Spice Berry','Sweet Pea']},
    {name:'Fall Foraging Bundle',reward:'30 Fall Seeds',items:['Common Mushroom','Wild Plum','Hazelnut','Blackberry']},
    {name:'Winter Foraging Bundle',reward:'30 Winter Seeds',items:['Winter Root','Crystal Fruit','Snow Yam','Crocus']},
    {name:'Construction Bundle',reward:'1 Charcoal Kiln',items:[{n:'Wood',q:'99'},{n:'Wood',q:'99'},{n:'Stone',q:'99'},{n:'Hardwood',q:'10'}]},
    {name:'Exotic Foraging Bundle',reward:'5 Autumn’s Bounty',need:5,items:['Coconut','Cactus Fruit','Cave Carrot','Red Mushroom','Purple Mushroom','Maple Syrup','Oak Resin','Pine Tar','Morel']}
  ]},
  {name:'Pantry',color:'bundle-yellow',unlock:'Greenhouse repair',note:'Crop quality matters only when the item says Gold. Better-than-Gold quality also counts.',bundles:[
    {name:'Spring Crops Bundle',reward:'20 Speed-Gro',items:['Parsnip','Green Bean','Cauliflower','Potato']},
    {name:'Summer Crops Bundle',reward:'1 Quality Sprinkler',items:['Tomato','Hot Pepper','Blueberry','Melon']},
    {name:'Fall Crops Bundle',reward:'1 Bee House',items:['Corn','Eggplant','Pumpkin','Yam']},
    {name:'Quality Crops Bundle',reward:'1 Preserves Jar',need:3,items:[{n:'Parsnip',q:'5',note:'Gold quality'},{n:'Melon',q:'5',note:'Gold quality'},{n:'Pumpkin',q:'5',note:'Gold quality'},{n:'Corn',q:'5',note:'Gold quality'}]},
    {name:'Animal Bundle',reward:'1 Cheese Press',need:5,items:['Large Milk','Large Brown Egg','Large Egg','Large Goat Milk','Wool','Duck Egg']},
    {name:'Artisan Bundle',reward:'1 Keg',need:6,items:['Truffle Oil','Cloth','Goat Cheese','Cheese','Honey','Jelly','Apple','Apricot','Orange','Peach','Pomegranate','Cherry']}
  ]},
  {name:'Fish Tank',color:'bundle-blue',unlock:'Glittering Boulder removal',note:'The Fish page has pictures of every body of water plus season, time, and weather filters.',bundles:[
    {name:'River Fish Bundle',reward:'30 Deluxe Bait',items:['Sunfish','Catfish','Shad','Tiger Trout']},
    {name:'Lake Fish Bundle',reward:'1 Dressed Spinner',items:['Largemouth Bass','Carp','Bullhead','Sturgeon']},
    {name:'Ocean Fish Bundle',reward:'5 Warp Totem: Beach',items:['Sardine','Tuna','Red Snapper','Tilapia']},
    {name:'Night Fishing Bundle',reward:'1 Glow Ring',items:['Walleye','Bream','Eel']},
    {name:'Crab Pot Bundle',reward:'3 Crab Pots',need:5,items:['Lobster','Crayfish','Crab','Cockle','Mussel','Shrimp','Snail','Periwinkle','Oyster','Clam']},
    {name:'Specialty Fish Bundle',reward:'5 Dish O’ The Sea',items:['Pufferfish','Ghostfish','Sandfish','Woodskip']}
  ]},
  {name:'Boiler Room',color:'bundle-red',unlock:'Minecart repair',note:'Bars come from a Furnace. Geologist items appear across different mine regions.',bundles:[
    {name:'Blacksmith’s Bundle',reward:'1 Furnace',items:['Copper Bar','Iron Bar','Gold Bar']},
    {name:'Geologist’s Bundle',reward:'5 Omni Geodes',items:['Quartz','Earth Crystal','Frozen Tear','Fire Quartz']},
    {name:'Adventurer’s Bundle',reward:'1 Small Magnet Ring',need:2,items:[{n:'Slime',q:'99'},{n:'Bat Wing',q:'10'},'Solar Essence','Void Essence']}
  ]},
  {name:'Bulletin Board',color:'bundle-purple',unlock:'Friendship reward',note:'These requests mix crops, forage, fishing, artisan goods, cooking, and animal products.',bundles:[
    {name:'Chef’s Bundle',reward:'3 Pink Cakes',items:['Maple Syrup','Fiddlehead Fern','Truffle','Poppy','Maki Roll','Fried Egg']},
    {name:'Dye Bundle',reward:'1 Seed Maker',items:['Red Mushroom','Sea Urchin','Sunflower','Duck Feather','Aquamarine','Red Cabbage']},
    {name:'Field Research Bundle',reward:'1 Recycling Machine',items:['Purple Mushroom','Nautilus Shell','Chub','Frozen Geode']},
    {name:'Fodder Bundle',reward:'1 Heater',items:[{n:'Wheat',q:'10'},{n:'Hay',q:'10'},{n:'Apple',q:'3'}]},
    {name:'Enchanter’s Bundle',reward:'5 Gold Bars',items:['Oak Resin','Wine',"Rabbit's Foot",'Pomegranate']}
  ]},
  {name:'Vault',color:'bundle-gold',unlock:'Bus repair',note:'Vault bundles use gold instead of items. Gold is removed as soon as you purchase a bundle.',bundles:[
    {name:'2,500g Bundle',reward:'3 Chocolate Cakes',items:[{n:'2,500g',img:'gold'}]},
    {name:'5,000g Bundle',reward:'30 Quality Fertilizer',items:[{n:'5,000g',img:'gold'}]},
    {name:'10,000g Bundle',reward:'1 Lightning Rod',items:[{n:'10,000g',img:'gold'}]},
    {name:'25,000g Bundle',reward:'1 Crystalarium',items:[{n:'25,000g',img:'gold'}]}
  ]}
];

const bundleStorageKey='spellBundleProgress';
const readBundleProgress=()=>{try{return JSON.parse(localStorage.getItem(bundleStorageKey)||'{}')}catch{return {}}};
const writeBundleProgress=value=>localStorage.setItem(bundleStorageKey,JSON.stringify(value));
const bundleItem=item=>typeof item==='string'?{n:item}:item;
const bundleItemKey=(room,bundle,index)=>`${room.name}|${bundle.name}|${index}`;
const bundleDoneKey=(room,bundle)=>`${room.name}|${bundle.name}|done`;
const bundleItemSlug=item=>item.img||slugify(item.n);

window.bundlesPage=function(){
  let active='Crafts Room';
  main.innerHTML=header('Community Center bundles','The standard bundles, organized room by room with pictures, exact quantities, choose-any rules, rewards, and a checklist that stays saved on this device.')+`
  <section class="bundle-intro"><img src="assets/bundles/apple.png" alt="Apple"><div><p class="eyebrow">6 rooms · 30 bundles</p><h2>Collect gently—one season at a time.</h2><p>This page follows the <strong>standard</strong> bundle set. If you chose “Remixed Bundles” when creating your save, check the golden scroll in your game because your requirements can be different.</p></div></section>
  <div class="bundle-room-tabs" role="tablist" aria-label="Community Center rooms">${bundleRooms.map((room,i)=>`<button type="button" class="${i===0?'active':''}" data-bundle-room="${room.name}" role="tab">${room.name}</button>`).join('')}</div>
  <section id="bundleRoom" aria-live="polite"></section>
  <div class="notice bundle-help"><strong>Useful in-game check:</strong> open the Player Menu and select the golden scroll icon to review bundle progress anywhere. When an inventory item is needed, the scroll icon can pulse.</div>
  <p class="tiny source-note">Standard bundle items, quantities, choice rules, and rewards follow Stardew Valley 1.6. This guide intentionally keeps remixed bundles separate.</p>`;

  const draw=()=>{
    const room=bundleRooms.find(r=>r.name===active),progress=readBundleProgress();
    const completed=room.bundles.filter(bundle=>progress[bundleDoneKey(room,bundle)]||bundle.items.map((_,i)=>progress[bundleItemKey(room,bundle,i)]).filter(Boolean).length>=(bundle.need||bundle.items.length)).length;
    $('#bundleRoom').innerHTML=`<div class="bundle-room-head ${room.color}"><div><p class="eyebrow">Room progress · ${completed}/${room.bundles.length} bundles</p><h2>${room.name}</h2><p>${room.note}</p></div><aside><span>Room completion unlock</span><strong>${room.unlock}</strong></aside></div><div class="bundle-grid">${room.bundles.map(bundle=>{
      const checked=bundle.items.map((_,i)=>Boolean(progress[bundleItemKey(room,bundle,i)])),need=bundle.need||bundle.items.length,doneKey=bundleDoneKey(room,bundle),manualDone=Boolean(progress[doneKey]),done=manualDone||checked.filter(Boolean).length>=need;
      return `<article class="bundle-card ${done?'is-complete':''}"><header><div><p class="eyebrow">${bundle.need?`Choose any ${bundle.need}`:'Bring every item'}</p><h3>${bundle.name}</h3></div><div class="bundle-status-stack"><span class="bundle-status">${done?'✓ Complete':`${checked.filter(Boolean).length}/${need}`}</span><label class="bundle-done-control"><input type="checkbox" data-bundle-done="${doneKey}" ${manualDone?'checked':''}><span>Done</span></label></div></header><div class="bundle-item-grid">${bundle.items.map((raw,i)=>{const item=bundleItem(raw),key=bundleItemKey(room,bundle,i);return `<label class="bundle-item ${progress[key]?'is-checked':''}"><input type="checkbox" data-bundle-item="${key}" ${progress[key]?'checked':''}><img src="assets/bundles/${bundleItemSlug(item)}.png" alt="${item.n}"><span><strong>${item.q?`${item.q} × `:''}${item.n}</strong>${item.note?`<small>${item.note}</small>`:''}</span></label>`}).join('')}</div><footer><span>Bundle reward</span><strong>${bundle.reward}</strong></footer></article>`}).join('')}</div>`;
    document.querySelectorAll('[data-bundle-item]').forEach(input=>input.onchange=()=>{const next=readBundleProgress();next[input.dataset.bundleItem]=input.checked;writeBundleProgress(next);draw()});
    document.querySelectorAll('[data-bundle-done]').forEach(input=>input.onchange=()=>{const next=readBundleProgress();next[input.dataset.bundleDone]=input.checked;writeBundleProgress(next);draw()});
  };
  document.querySelectorAll('[data-bundle-room]').forEach(button=>button.onclick=()=>{active=button.dataset.bundleRoom;document.querySelectorAll('[data-bundle-room]').forEach(x=>x.classList.toggle('active',x===button));draw()});
  draw();
};

route();
