/* DermaProtocol — Stack Checker v2 */
(function(){
  var known = {
    'retinol':{group:'retinoid',irritation:3,category:'topical'},'retinal':{group:'retinoid',irritation:2,category:'topical'},'retinaldehyde':{group:'retinoid',irritation:2,category:'topical'},'tretinoin':{group:'retinoid',irritation:4,category:'topical'},'adapalene':{group:'retinoid',irritation:3,category:'topical'},'tazarotene':{group:'retinoid',irritation:4,category:'topical'},'bakuchiol':{group:'retinoid-alt',irritation:1,category:'topical'},
    'vitamin c':{group:'antioxidant',irritation:2,category:'topical',ph:'low'},'l-ascorbic acid':{group:'antioxidant',irritation:2,category:'topical',ph:'low'},'ascorbyl glucoside':{group:'antioxidant',irritation:0,category:'topical'},'ethylated ascorbic acid':{group:'antioxidant',irritation:1,category:'topical'},
    'niacinamide':{group:'b-vitamin',irritation:0,category:'topical'},'azelaic acid':{group:'dicarboxylic',irritation:1,category:'topical'},'tranexamic acid':{group:'brightening',irritation:0,category:'topical'},'alpha arbutin':{group:'brightening',irritation:0,category:'topical'},'kojic acid':{group:'brightening',irritation:2,category:'topical'},'hydroquinone':{group:'brightening',irritation:3,category:'topical'},
    'salicylic acid':{group:'bha',irritation:2,category:'topical',ph:'low'},'glycolic acid':{group:'aha',irritation:3,category:'topical',ph:'low'},'lactic acid':{group:'aha',irritation:2,category:'topical',ph:'low'},'mandelic acid':{group:'aha',irritation:1,category:'topical',ph:'low'},'pha':{group:'pha',irritation:1,category:'topical'},'gluconolactone':{group:'pha',irritation:1,category:'topical'},
    'benzoyl peroxide':{group:'peroxide',irritation:3,category:'topical'},'aha':{group:'aha',irritation:2,category:'topical',ph:'low'},'bha':{group:'bha',irritation:2,category:'topical',ph:'low'},
    'ceramides':{group:'barrier',irritation:0,category:'topical'},'hyaluronic acid':{group:'humectant',irritation:0,category:'topical'},'squalane':{group:'emollient',irritation:0,category:'topical'},'peptides':{group:'peptide',irritation:0,category:'topical'},'copper peptides':{group:'peptide',irritation:1,category:'topical'},'centella asiatica':{group:'botanical',irritation:0,category:'topical'},'cica':{group:'botanical',irritation:0,category:'topical'},'madecassoside':{group:'botanical',irritation:0,category:'topical'},'tea tree oil':{group:'essential-oil',irritation:2,category:'topical'},
    'sunscreen':{group:'spf',irritation:0,category:'topical'},'zinc oxide':{group:'spf',irritation:0,category:'topical'},'spf':{group:'spf',irritation:0,category:'topical'},'ferulic acid':{group:'antioxidant',irritation:1,category:'topical'},'vitamin e':{group:'antioxidant',irritation:0,category:'topical'},'resveratrol':{group:'antioxidant',irritation:0,category:'topical'},
    'collagen':{group:'supp-collagen',irritation:0,category:'supplement'},'collagen peptides':{group:'supp-collagen',irritation:0,category:'supplement'},'omega-3':{group:'supp-omega3',irritation:0,category:'supplement'},'fish oil':{group:'supp-omega3',irritation:0,category:'supplement'},'zinc (oral)':{group:'supp-zinc',irritation:0,category:'supplement'},'oral zinc':{group:'supp-zinc',irritation:0,category:'supplement'},'zinc supplement':{group:'supp-zinc',irritation:0,category:'supplement'},
    'vitamin d':{group:'supp-vitd',irritation:0,category:'supplement'},'vitamin d3':{group:'supp-vitd',irritation:0,category:'supplement'},'vitamin c (oral)':{group:'supp-vitc',irritation:0,category:'supplement'},'oral vitamin c':{group:'supp-vitc',irritation:0,category:'supplement'},'nicotinamide':{group:'supp-b3',irritation:0,category:'supplement'},'niacinamide (oral)':{group:'supp-b3',irritation:0,category:'supplement'},
    'nicotinamide riboside':{group:'supp-nad',irritation:0,category:'supplement'},'nr':{group:'supp-nad',irritation:0,category:'supplement'},'nmn':{group:'supp-nad',irritation:0,category:'supplement'},'astaxanthin':{group:'supp-astax',irritation:0,category:'supplement'},'magnesium':{group:'supp-mag',irritation:0,category:'supplement'},'biotin':{group:'supp-biotin',irritation:0,category:'supplement'},'vitamin k2':{group:'supp-k2',irritation:0,category:'supplement'},'probiotics':{group:'supp-probiotics',irritation:0,category:'supplement'},'iron':{group:'supp-iron',irritation:0,category:'supplement'},'calcium':{group:'supp-calcium',irritation:0,category:'supplement'},'selenium':{group:'supp-selenium',irritation:0,category:'supplement'},'creatine':{group:'supp-creatine',irritation:0,category:'supplement'}
  };

  var rules = [
    {test:function(i){return i.filter(function(x){return known[x]&&known[x].group==='retinoid'}).length>1},type:'redundancy',msg:'You have multiple retinoids. Using more than one retinoid at a time increases irritation without proportional benefit. Choose one and use it consistently.'},
    {test:function(i){var r=i.some(function(x){return known[x]&&known[x].group==='retinoid'});return r&&i.indexOf('benzoyl peroxide')>=0},type:'irritation',msg:'Retinoid + benzoyl peroxide: BP may degrade some retinoids on contact. Apply at different times of day (BP in AM, retinoid in PM) or on alternate nights.'},
    {test:function(i){var r=i.some(function(x){return known[x]&&known[x].group==='retinoid'});var a=i.some(function(x){return known[x]&&(known[x].group==='aha'||known[x].group==='bha')});return r&&a},type:'irritation',msg:'Retinoid + exfoliating acid (AHA/BHA): using both in the same step increases irritation significantly. Alternate nights rather than layering.'},
    {test:function(i){return i.filter(function(x){return known[x]&&known[x].ph==='low'}).length>1},type:'overlap',msg:'Multiple low-pH actives. Layering several acidic products (vitamin C, AHA, BHA) in the same step increases irritation and may reduce efficacy. Spread across AM/PM or alternate days.'},
    {test:function(i){var v=i.some(function(x){return known[x]&&known[x].group==='antioxidant'});return v&&i.indexOf('benzoyl peroxide')>=0},type:'overlap',msg:'Vitamin C + benzoyl peroxide: BP may oxidise vitamin C, reducing effectiveness. Apply at different times of day.'},
    {test:function(i){return i.filter(function(x){return known[x]&&known[x].irritation>=2}).length>=3},type:'irritation',msg:'Three or more moderate-to-high irritation actives. This increases barrier damage risk. Consider simplifying to 1-2 actives and building tolerance gradually.'},
    {test:function(i){return i.length>=8},type:'tip',msg:'Complex stack detected. More products do not always mean better results. Consider whether each item serves a distinct purpose.'},
    {test:function(i){return i.filter(function(x){return known[x]&&known[x].group==='aha'}).length>1},type:'redundancy',msg:'Multiple AHAs. Using more than one (glycolic, lactic, mandelic) is usually unnecessary. Pick the one that suits your sensitivity level.'},
    {test:function(i){return i.indexOf('hydroquinone')>=0&&i.some(function(x){return known[x]&&known[x].group==='antioxidant'})},type:'overlap',msg:'Hydroquinone + vitamin C: May reduce hydroquinone efficacy. Apply at different times of day.'},
    {test:function(i){return i.indexOf('copper peptides')>=0&&i.some(function(x){return known[x]&&known[x].group==='antioxidant'})},type:'overlap',msg:'Copper peptides + vitamin C: Copper ions can accelerate oxidation of L-ascorbic acid. Separate application times (vitamin C AM, copper peptides PM).'},
    {test:function(i){return i.filter(function(x){return known[x]&&known[x].group==='brightening'}).length>=3},type:'redundancy',msg:'Three or more brightening agents. Pigmentation responds best to 1-2 well-chosen actives with sunscreen, not a stack of brightening ingredients.'},
    {test:function(i){var noSPF=!i.some(function(x){return known[x]&&known[x].group==='spf'});var ps=i.some(function(x){return known[x]&&(known[x].group==='retinoid'||known[x].group==='aha')});return noSPF&&ps},type:'irritation',msg:'Photosensitising actives (retinoid or AHA) without sunscreen. Daily SPF 30+ is essential with these ingredients.'},
    /* Supplement-supplement */
    {test:function(i){var z=i.some(function(x){return known[x]&&known[x].group==='supp-zinc'});var ir=i.some(function(x){return known[x]&&known[x].group==='supp-iron'});return z&&ir},type:'overlap',msg:'Zinc + iron taken together compete for absorption. Separate doses by at least 2 hours.'},
    {test:function(i){var z=i.some(function(x){return known[x]&&known[x].group==='supp-zinc'});var c=i.some(function(x){return known[x]&&known[x].group==='supp-calcium'});return z&&c},type:'overlap',msg:'Zinc + calcium compete for absorption. Take at different times of day.'},
    {test:function(i){var d=i.some(function(x){return known[x]&&known[x].group==='supp-vitd'});var k=i.some(function(x){return known[x]&&known[x].group==='supp-k2'});return d&&!k},type:'tip',msg:'Vitamin D without vitamin K2. Vitamin D increases calcium absorption; K2 (MK-7, 100-200mcg) directs calcium to bones rather than soft tissues. Consider adding K2 especially at doses above 2,000 IU.'},
    {test:function(i){return i.filter(function(x){return known[x]&&(known[x].group==='supp-nad'||known[x].group==='supp-b3')}).length>1},type:'redundancy',msg:'Multiple NAD+ precursors (nicotinamide, NR, NMN). These raise NAD+ through overlapping pathways. Plain nicotinamide has the strongest direct skin evidence and is cheapest. Choose one.'},
    {test:function(i){var z=i.some(function(x){return known[x]&&known[x].group==='supp-zinc'});var m=i.some(function(x){return known[x]&&known[x].group==='supp-mag'});return z&&m},type:'tip',msg:'Zinc + magnesium compete for absorption. Take at different times — e.g. zinc with lunch, magnesium before bed.'},
    /* Oral-topical integration (DermaProtocol differentiator) */
    {test:function(i){var oc=i.some(function(x){return known[x]&&known[x].group==='supp-vitc'});var tc=i.some(function(x){return known[x]&&known[x].group==='antioxidant'});return oc&&tc},type:'synergy',msg:'Oral + topical vitamin C: Complementary. Oral provides systemic antioxidant support and collagen cofactor; topical delivers 20-40x higher local skin concentrations. Oral does NOT replace topical.'},
    {test:function(i){var col=i.some(function(x){return known[x]&&known[x].group==='supp-collagen'});var ret=i.some(function(x){return known[x]&&known[x].group==='retinoid'});return col&&ret},type:'synergy',msg:'Oral collagen + topical retinoid: Complementary anti-ageing approach. Retinoids stimulate collagen from outside; oral peptides may support it from inside. Ensure adequate vitamin C for collagen crosslinking.'},
    {test:function(i){var col=i.some(function(x){return known[x]&&known[x].group==='supp-collagen'});var vc=!i.some(function(x){return known[x]&&(known[x].group==='supp-vitc'||known[x].group==='antioxidant')});return col&&vc},type:'tip',msg:'Collagen without vitamin C. Vitamin C is required for collagen crosslinking — without it, collagen supplementation may be less effective. Ensure dietary or supplemental vitamin C.'},
    {test:function(i){var om=i.some(function(x){return known[x]&&known[x].group==='supp-omega3'});var cer=i.some(function(x){return known[x]&&known[x].group==='barrier'});return om&&cer},type:'synergy',msg:'Omega-3 + topical ceramides: Inside-out barrier support. Omega-3s improve barrier lipids systemically; ceramides restore them locally. Effective combination for dry or barrier-compromised skin.'},
    {test:function(i){var nb=i.some(function(x){return known[x]&&known[x].group==='supp-b3'});var nt=i.indexOf('niacinamide')>=0;return nb&&nt},type:'synergy',msg:'Oral nicotinamide + topical niacinamide: Different mechanisms. Oral (500mg 2x/day) boosts NAD+ for DNA repair and photoprotection. Topical (4-5%) supports barrier and controls oil locally. Complementary, not redundant.'},
    {test:function(i){var spf=i.some(function(x){return known[x]&&known[x].group==='spf'});var vd=i.some(function(x){return known[x]&&known[x].group==='supp-vitd'});return spf&&!vd},type:'tip',msg:'Sunscreen without vitamin D supplementation. Daily SPF 30+ reduces skin vitamin D synthesis by over 95%. Consider 1,000-2,000 IU vitamin D3 daily.'},
    {test:function(i){var ax=i.some(function(x){return known[x]&&known[x].group==='supp-astax'});var vc=i.some(function(x){return known[x]&&known[x].group==='antioxidant'});var spf=i.some(function(x){return known[x]&&known[x].group==='spf'});return ax&&vc&&spf},type:'synergy',msg:'Astaxanthin + topical vitamin C + sunscreen: Triple-layer photoprotection. Sunscreen blocks UV; topical vitamin C neutralises free radicals; oral astaxanthin provides systemic antioxidant defence.'}
  ];

  var tags=[];var field=document.getElementById('checkerField');var tagsEl=document.getElementById('checkerTags');var results=document.getElementById('checkerResults');
  var suggestions=document.createElement('div');suggestions.className='checker-suggestions';suggestions.style.display='none';field.parentNode.appendChild(suggestions);

  function normalize(s){return s.toLowerCase().trim()}

  function showSuggestions(val){
    if(!val||val.length<2){suggestions.style.display='none';return}
    var v=normalize(val);var matches=Object.keys(known).filter(function(k){return k.indexOf(v)>=0&&tags.indexOf(k)===-1}).slice(0,6);
    if(!matches.length){suggestions.style.display='none';return}
    suggestions.innerHTML='';
    matches.forEach(function(m){
      var div=document.createElement('div');div.className='checker-suggestion';
      var cat=known[m].category==='supplement'?'<span class="checker-suggestion__cat checker-suggestion__cat--supp">supplement</span>':'<span class="checker-suggestion__cat">topical</span>';
      div.innerHTML=m+' '+cat;
      div.addEventListener('click',function(){if(tags.indexOf(m)===-1){tags.push(m);renderTags();runCheck()}field.value='';suggestions.style.display='none'});
      suggestions.appendChild(div);
    });
    suggestions.style.display='block';
  }

  field.addEventListener('input',function(){showSuggestions(field.value)});
  document.addEventListener('click',function(e){if(!field.contains(e.target)&&!suggestions.contains(e.target))suggestions.style.display='none'});

  function renderTags(){
    tagsEl.innerHTML='';
    tags.forEach(function(t,i){
      var el=document.createElement('span');var isSupp=known[t]&&known[t].category==='supplement';
      el.className='checker-tag'+(isSupp?' checker-tag--supp':'');
      el.innerHTML=t+' <button class="checker-tag__remove" data-idx="'+i+'">&times;</button>';
      tagsEl.appendChild(el);
    });
    tagsEl.querySelectorAll('.checker-tag__remove').forEach(function(btn){btn.addEventListener('click',function(){tags.splice(parseInt(btn.dataset.idx),1);renderTags();runCheck()})});
  }

  function runCheck(){
    if(tags.length<2){results.innerHTML='';return}
    var normed=tags.map(normalize);var hits=[];
    rules.forEach(function(rule){if(rule.test(normed))hits.push(rule)});
    if(!hits.length){results.innerHTML='<div class="checker-result checker-result--tip"><div class="checker-result__type">All clear</div><div class="checker-result__text">No obvious issues detected. This does not guarantee safety — individual responses vary.</div></div>';return}
    var groups={synergy:[],irritation:[],overlap:[],redundancy:[],tip:[]};
    hits.forEach(function(h){if(groups[h.type])groups[h.type].push(h)});
    var h='';
    if(groups.synergy.length){h+='<h3 style="margin:0 0 var(--sp-3);font-family:var(--font-display);font-size:1rem;color:var(--green)">Synergies</h3>';groups.synergy.forEach(function(hit){h+='<div class="checker-result checker-result--synergy"><div class="checker-result__type">synergy</div><div class="checker-result__text">'+hit.msg+'</div></div>'})}
    var warns=groups.irritation.concat(groups.overlap,groups.redundancy);
    if(warns.length){h+='<h3 style="margin:var(--sp-6) 0 var(--sp-3);font-family:var(--font-display);font-size:1rem;color:var(--amber)">Potential issues</h3>';warns.forEach(function(hit){var cls='checker-result--'+hit.type;h+='<div class="checker-result '+cls+'"><div class="checker-result__type">'+hit.type+'</div><div class="checker-result__text">'+hit.msg+'</div></div>'})}
    if(groups.tip.length){h+='<h3 style="margin:var(--sp-6) 0 var(--sp-3);font-family:var(--font-display);font-size:1rem;color:var(--text-muted)">Tips</h3>';groups.tip.forEach(function(hit){h+='<div class="checker-result checker-result--tip"><div class="checker-result__type">tip</div><div class="checker-result__text">'+hit.msg+'</div></div>'})}
    results.innerHTML=h;
  }

  field.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===','){e.preventDefault();var val=field.value.trim().replace(/,$/,'');if(val&&tags.indexOf(val)===-1){tags.push(val);renderTags();runCheck()}field.value='';suggestions.style.display='none'}});
})();
