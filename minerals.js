const mineral=(n,category,source,price,use='Donate the first one to the Museum; extras can be sold or used for tailoring and dyeing.')=>({n,category,source,price,use});

const mineralGuideData=[
  mineral('Quartz','Foraged mineral','Pick it up throughout The Mines (floors 1–120). It can also drop from Stone Golems.',25,'Keep some for Refined Quartz. One Quartz + one Coal in a Furnace makes one Refined Quartz.'),
  mineral('Earth Crystal','Foraged mineral','Pick it up on mine floors 1–39; also found in Geodes and dropped by Duggies.',50,'Used for the Mayonnaise Machine and the Geologist’s Bundle. Donate one before crafting with extras.'),
  mineral('Frozen Tear','Foraged mineral','Pick it up on mine floors 40–79; also found in Frozen Geodes and dropped by Dust Sprites.',75,'Used for the Geologist’s Bundle and Warrior Ring. Sebastian loves it.'),
  mineral('Fire Quartz','Foraged mineral','Pick it up on mine floors 80–120; also found in Magma Geodes.',100,'One Fire Quartz + one Coal in a Furnace makes three Refined Quartz.'),

  mineral('Emerald','Gem','Mine Emerald Nodes or Gem Nodes; it may also appear in fishing treasure chests or while panning.',250,'A loved gift for Clint, Dwarf, Emily, and Penny; later used at the Forge.'),
  mineral('Aquamarine','Gem','Mine Aquamarine Nodes or Gem Nodes; it may also appear in fishing treasure chests or while panning.',180,'Used in the Dye Bundle and Marble Brazier; later used at the Forge.'),
  mineral('Ruby','Gem','Mine Ruby Nodes or Gem Nodes; it may also appear in fishing treasure chests or while panning.',250,'A loved gift for Clint, Dwarf, and Emily; later used at the Forge for damage.'),
  mineral('Amethyst','Gem','Mine Amethyst Nodes or Gem Nodes; Green Slimes can also drop one.',100,'Abigail, Clint, Dwarf, and Emily love it; later used at the Forge for knockback.'),
  mineral('Topaz','Gem','Mine Topaz Nodes or Gem Nodes; it may also appear in fishing treasure chests or while panning.',80,'A loved gift for Clint, Dwarf, and Emily; later used at the Forge for defense.'),
  mineral('Jade','Gem','Mine Jade Nodes or Gem Nodes; Blue Slimes can also drop one.',200,'A loved gift for Clint, Dwarf, and Emily; later useful at the Desert Trader and Forge.'),
  mineral('Diamond','Gem','Mine Diamond Nodes or Gem Nodes; fishing treasure chests and panning can also yield one.',750,'Useful for the Geode Crusher, Fairy Dust, gifts, and Crystalariums. Donate one before spending it.'),
  mineral('Prismatic Shard','Gem','Rare: Iridium Nodes (4%), Mystic Stones (25%), Omni Geodes (0.4%), fishing chests, and a few monsters.',2000,'Very rare and used for important later discoveries. Donate one eventually, but keep any extras safely.'),

  mineral('Tigerseye','Magma geode mineral','Open a Magma Geode or Omni Geode at Clint’s shop or in a Geode Crusher.',275,'Sam loves it. Otherwise, donate the first one and sell or tailor with extras.'),
  mineral('Opal','Frozen geode mineral','Open a Frozen Geode or Omni Geode at Clint’s shop or in a Geode Crusher.',150),
  mineral('Fire Opal','Magma geode mineral','Open a Magma Geode or Omni Geode at Clint’s shop or in a Geode Crusher.',350),
  mineral('Alamite','Geode mineral','Open a regular Geode or Omni Geode at Clint’s shop or in a Geode Crusher.',150),
  mineral('Bixite','Magma geode mineral','Open a Magma Geode or Omni Geode; Black Slimes can also drop it.',300),
  mineral('Baryte','Magma geode mineral','Open a Magma Geode or Omni Geode at Clint’s shop or in a Geode Crusher.',50),
  mineral('Aerinite','Frozen geode mineral','Open a Frozen Geode or Omni Geode at Clint’s shop or in a Geode Crusher.',125),
  mineral('Calcite','Geode mineral','Open a regular Geode or Omni Geode at Clint’s shop or in a Geode Crusher.',75),
  mineral('Dolomite','Magma geode mineral','Open a Magma Geode or Omni Geode at Clint’s shop or in a Geode Crusher.',300),
  mineral('Esperite','Frozen geode mineral','Open a Frozen Geode or Omni Geode at Clint’s shop or in a Geode Crusher.',100),
  mineral('Fluorapatite','Frozen geode mineral','Open a Frozen Geode or Omni Geode at Clint’s shop or in a Geode Crusher.',200),
  mineral('Geminite','Frozen geode mineral','Open a Frozen Geode or Omni Geode at Clint’s shop or in a Geode Crusher.',150),
  mineral('Helvite','Magma geode mineral','Open a Magma Geode or Omni Geode at Clint’s shop or in a Geode Crusher.',450),
  mineral('Jamborite','Geode mineral','Open a regular Geode or Omni Geode at Clint’s shop or in a Geode Crusher.',150),
  mineral('Jagoite','Geode mineral','Open a regular Geode or Omni Geode at Clint’s shop or in a Geode Crusher.',115),
  mineral('Kyanite','Frozen geode mineral','Open a Frozen Geode or Omni Geode at Clint’s shop or in a Geode Crusher.',250),
  mineral('Lunarite','Frozen geode mineral','Open a Frozen Geode or Omni Geode at Clint’s shop or in a Geode Crusher.',200),
  mineral('Malachite','Geode mineral','Open a regular Geode or Omni Geode at Clint’s shop or in a Geode Crusher.',100),
  mineral('Neptunite','Magma geode mineral','Open a Magma Geode or Omni Geode; Black Slimes can also drop it.',400),
  mineral('Lemon Stone','Magma geode mineral','Open a Magma Geode or Omni Geode at Clint’s shop or in a Geode Crusher.',200,'The Dwarf loves it. Otherwise, donate the first one and keep or sell extras.'),
  mineral('Nekoite','Geode mineral','Open a regular Geode or Omni Geode at Clint’s shop or in a Geode Crusher.',80),
  mineral('Orpiment','Geode mineral','Open a regular Geode or Omni Geode at Clint’s shop or in a Geode Crusher.',80),
  mineral('Petrified Slime','Geode mineral','Open a regular Geode or Omni Geode; Slime Balls can also contain one.',120,'Can be requested by a Fish Pond. Donate the first one and consider keeping an extra.'),
  mineral('Thunder Egg','Geode mineral','Open a regular Geode or Omni Geode at Clint’s shop or in a Geode Crusher.',100),
  mineral('Pyrite','Frozen geode mineral','Open a Frozen Geode or Omni Geode at Clint’s shop or in a Geode Crusher.',120),
  mineral('Ocean Stone','Frozen geode mineral','Open a Frozen Geode or Omni Geode at Clint’s shop or in a Geode Crusher.',220,'Can be requested by a Fish Pond. Donate the first one and consider keeping an extra.'),
  mineral('Ghost Crystal','Frozen geode mineral','Open a Frozen Geode or Omni Geode at Clint’s shop or in a Geode Crusher.',200),
  mineral('Jasper','Magma geode mineral','Open a Magma Geode or Omni Geode at Clint’s shop or in a Geode Crusher.',150),
  mineral('Celestine','Geode mineral','Open a regular Geode or Omni Geode at Clint’s shop or in a Geode Crusher.',125),
  mineral('Marble','Frozen geode mineral','Open a Frozen Geode or Omni Geode at Clint’s shop or in a Geode Crusher.',110,'Needed to craft a Marble Brazier. Donate the first one and keep an extra if you like decorating.'),
  mineral('Sandstone','Geode mineral','Open a regular Geode or Omni Geode at Clint’s shop or in a Geode Crusher.',60),
  mineral('Granite','Geode mineral','Open a regular Geode or Omni Geode at Clint’s shop or in a Geode Crusher.',75,'Can be requested by a Fish Pond. Donate the first one and consider keeping an extra.'),
  mineral('Basalt','Magma geode mineral','Open a Magma Geode or Omni Geode at Clint’s shop or in a Geode Crusher.',175,'Can be requested by a Fish Pond. Donate the first one and consider keeping an extra.'),
  mineral('Limestone','Geode mineral','Open a regular Geode or Omni Geode at Clint’s shop or in a Geode Crusher.',15,'Can be requested by a Fish Pond. Donate the first one and consider keeping an extra.'),
  mineral('Soapstone','Frozen geode mineral','Open a Frozen Geode or Omni Geode at Clint’s shop or in a Geode Crusher.',120),
  mineral('Hematite','Frozen geode mineral','Open a Frozen Geode or Omni Geode at Clint’s shop or in a Geode Crusher.',150),
  mineral('Mudstone','Geode mineral','Open a regular Geode or Omni Geode at Clint’s shop or in a Geode Crusher.',25,'Can be requested by a Fish Pond. Donate the first one and consider keeping an extra.'),
  mineral('Obsidian','Magma geode mineral','Open a Magma Geode or Omni Geode at Clint’s shop or in a Geode Crusher.',200,'Sebastian loves it. Otherwise, donate the first one and sell or tailor with extras.'),
  mineral('Slate','Geode mineral','Open a regular Geode or Omni Geode at Clint’s shop or in a Geode Crusher.',85),
  mineral('Fairy Stone','Frozen geode mineral','Open a Frozen Geode or Omni Geode at Clint’s shop or in a Geode Crusher.',250),
  mineral('Star Shards','Magma geode mineral','Open a Magma Geode or Omni Geode at Clint’s shop or in a Geode Crusher.',500)
];

const mineralSlug=name=>name.toLowerCase().replaceAll(' ','-');

window.mineralsPage=function(){
  main.innerHTML=header('Minerals & geodes','Every museum mineral in one searchable guide, with real Stardew Valley sprites, where to find it, how to process it, and what to keep.')+`
    <section class="mineral-primer">
      <div class="mineral-primer-copy"><p class="eyebrow">Start here</p><h2>Found, mined, or opened?</h2><p><strong>Foraged minerals</strong> sit on mine floors. <strong>Gems</strong> come mostly from colored nodes. <strong>Geode minerals</strong> are revealed only after a geode is opened. These 53 items are the minerals that count toward the Museum collection.</p></div>
      <div class="mineral-primer-rule"><strong>Gentle rule</strong><span>Donate the first one. Keep useful or loved-gift extras. Sell the rest when you need gold.</span></div>
    </section>
    <section class="geode-guide" aria-labelledby="geodeTitle"><div class="section-title"><div><p class="eyebrow">How to reveal geode minerals</p><h2 id="geodeTitle">Take geodes to Clint—or use a Crusher</h2></div><p>Clint charges <strong>25g per geode</strong>. A Geode Crusher opens one for free once you have the machine.</p></div><div class="geode-grid">
      <article><img src="assets/minerals/geode.png" alt="Geode"><div><h3>Geode</h3><p>Mostly mine floors 1–39. Holds the brown-category minerals below.</p></div></article>
      <article><img src="assets/minerals/frozen-geode.png" alt="Frozen Geode"><div><h3>Frozen Geode</h3><p>Mostly mine floors 41–79. Holds the blue-category minerals below.</p></div></article>
      <article><img src="assets/minerals/magma-geode.png" alt="Magma Geode"><div><h3>Magma Geode</h3><p>Mostly mine floors 81–120. Holds the warm-category minerals below.</p></div></article>
      <article><img src="assets/minerals/omni-geode.png" alt="Omni Geode"><div><h3>Omni Geode</h3><p>Can contain any geode mineral, plus many other possible items.</p></div></article>
    </div></section>
    <div class="guide-filter-bar mineral-filter-bar"><div class="field"><label for="mineralCategory">Type</label><select id="mineralCategory"><option value="All">All 53</option><option>Foraged mineral</option><option>Gem</option><option>Geode mineral</option><option>Frozen geode mineral</option><option>Magma geode mineral</option></select></div><div class="field search-field"><label for="mineralSearch">Mineral name or source</label><input id="mineralSearch" type="search" placeholder="Try Quartz, Frozen Geode…"></div></div>
    <div id="mineralCount" class="result-count"></div><div id="mineralGrid" class="mineral-grid"></div>
    <section class="section made-materials"><div class="section-title"><div><p class="eyebrow">Often confused with minerals</p><h2>Useful materials you actually make</h2></div><p>Ores, Coal, and metal bars are resources—not part of the 53-piece Museum mineral collection.</p></div><div class="made-material-grid">
      <article><img src="assets/materials/refined-quartz.png" alt="Refined Quartz"><div><h3>Refined Quartz</h3><p><strong>Furnace:</strong> 1 Quartz + 1 Coal → 1. Or 1 Fire Quartz + 1 Coal → 3. A Recycling Machine can also turn Broken CDs or Broken Glasses into one.</p></div></article>
      <article><img src="assets/materials/copper-bar.png" alt="Copper Bar"><div><h3>Metal bars</h3><p><strong>Furnace:</strong> 5 matching Ore + 1 Coal. This rule makes Copper, Iron, Gold, and Iridium Bars; the smelting time changes by metal.</p></div></article>
      <article><img src="assets/materials/coal.png" alt="Coal"><div><h3>Coal</h3><p>Break rocks, defeat Dust Sprites, use a Charcoal Kiln, or buy it from Clint. Keep a supply because every Furnace recipe needs one.</p></div></article>
    </div></section>
    <p class="tiny source-note">Mineral sources, sell prices, geode contents, and sprites reference the official Stardew Valley Wiki for version 1.6. Normal sell prices are shown before the Gemologist profession bonus.</p>`;

  const draw=()=>{
    const category=document.querySelector('#mineralCategory').value;
    const query=document.querySelector('#mineralSearch').value.trim().toLowerCase();
    const rows=mineralGuideData.filter(item=>(category==='All'||item.category===category)&&(!query||`${item.n} ${item.category} ${item.source} ${item.use}`.toLowerCase().includes(query)));
    document.querySelector('#mineralCount').textContent=`${rows.length} of 53 minerals shown`;
    document.querySelector('#mineralGrid').innerHTML=rows.map(item=>`<article class="mineral-card"><div class="mineral-card-head"><span class="mineral-pixel"><img src="assets/minerals/${mineralSlug(item.n)}.png" alt="${item.n}" loading="lazy"></span><div><p class="eyebrow">${item.category}</p><h2>${item.n}</h2></div><strong class="mineral-price">${item.price}g</strong></div><dl><div><dt>Where / how to get it</dt><dd>${item.source}</dd></div><div><dt>Keep it for</dt><dd>${item.use}</dd></div></dl></article>`).join('')||'<div class="notice">No minerals match that search. Try a mineral name or geode type.</div>';
  };
  document.querySelector('#mineralCategory').onchange=draw;
  document.querySelector('#mineralSearch').oninput=draw;
  draw();
};

route();
