/* DermaProtocol — Daily Meal Guide */
(function(){
var CS=[
{id:"acne",l:"Acne & Breakouts",icon:"🔴",tag:"Anti-inflammatory, low-glycaemic, zinc-rich"},
{id:"ageing",l:"Anti-Ageing",icon:"✨",tag:"Antioxidant-dense, collagen-supporting"},
{id:"pigmentation",l:"Pigmentation & Tone",icon:"☀️",tag:"Vitamin C-rich, photoprotective"},
{id:"dryness",l:"Dry Skin & Barrier",icon:"🛡️",tag:"Omega-3 rich, deeply hydrating"},
{id:"rosacea",l:"Rosacea & Redness",icon:"🌹",tag:"Anti-inflammatory, trigger-avoiding"},
{id:"general",l:"General Skin Health",icon:"💪",tag:"Balanced, nutrient-dense"}
];
var NC={"Vitamin C":"#B86420","Vitamin A":"#A68A30","Vitamin D":"#3A6A94","Vitamin E":"#7A6AB0","Zinc":"#3D7A52","Omega-3":"#3A6A94","Selenium":"#A68A30","Copper":"#B86420","Silicon":"#7A7D76","Polyphenols":"#7A6AB0","Protein":"#3D7A52","Probiotics":"#3A6A94","Fibre":"#7A7D76"};
var P={
acne:{sum:"Low-glycaemic, anti-inflammatory omega-3s, zinc-rich foods, gut-supporting probiotics.",keys:["Zinc","Omega-3","Vitamin A","Probiotics"],meals:[
{time:"Breakfast",name:"Omega-3 Oat Bowl",items:[{f:"Rolled oats (½ cup)",w:"Low GI. Silicon for skin structure. Beta-glucan supports gut.",n:["Silicon","Fibre"]},{f:"Blueberries (½ cup)",w:"Anthocyanins reduce oxidative stress linked to inflammatory acne.",n:["Polyphenols","Vitamin C"]},{f:"Walnuts (6-8 halves)",w:"Highest plant omega-3 (ALA). Anti-inflammatory.",n:["Omega-3","Vitamin E"]},{f:"Ground flaxseed (1 tbsp)",w:"Additional ALA omega-3. Anti-inflammatory lignans.",n:["Omega-3","Fibre"]}]},
{time:"Lunch",name:"Zinc-Loaded Salmon Bowl",items:[{f:"Salmon fillet (115g)",w:"1,800mg EPA+DHA — strongest dietary anti-inflammatory for acne.",n:["Omega-3","Vitamin D","Protein"]},{f:"Brown rice (1 cup)",w:"Low-GI carbohydrate. Studies show low-GI diets reduce acne.",n:["Silicon","Selenium"]},{f:"Spinach (2 cups)",w:"Zinc and vitamin A — critical for sebaceous gland regulation.",n:["Zinc","Vitamin A"]},{f:"Pumpkin seeds (1 tbsp)",w:"One of the richest plant zinc sources.",n:["Zinc","Vitamin E"]}]},
{time:"Snack",name:"Probiotic Break",items:[{f:"Greek yogurt (170g, no sugar)",w:"Probiotics support gut-skin axis. Gut microbiome influences skin inflammation.",n:["Probiotics","Protein"]},{f:"Brazil nuts (2)",w:"Covers 100%+ daily selenium. Antioxidant defence.",n:["Selenium"]}]},
{time:"Dinner",name:"Anti-Inflammatory Stir-Fry",items:[{f:"Chicken breast (115g)",w:"Lean protein without the dairy-acne association.",n:["Protein","Selenium","Zinc"]},{f:"Broccoli (1 cup)",w:"Sulforaphane: antibacterial and anti-inflammatory.",n:["Vitamin C","Vitamin A"]},{f:"Turmeric (1 tsp)",w:"Curcumin reduces NF-κB pathway activation.",n:["Polyphenols"]},{f:"Extra virgin olive oil (1 tbsp)",w:"Oleocanthal has ibuprofen-like anti-inflammatory effect.",n:["Vitamin E","Polyphenols"]}]},
{time:"Drinks",name:"Throughout the day",items:[{f:"Green tea (2-3 cups)",w:"EGCG reduces sebum and has antibacterial effects against C. acnes.",n:["Polyphenols"]},{f:"Water (2-3L)",w:"Hydration supports detoxification and skin elasticity.",n:[]}]}
],avoid:["High-GI foods (white bread, sugary drinks)","Excess dairy (some evidence links dairy to acne)","High-sugar diets (insulin spikes increase sebum)"],supps:["Zinc 30mg picolinate","Omega-3 1-2g EPA+DHA","Probiotics (Lactobacillus strains)"]},

ageing:{sum:"Maximises antioxidants, polyphenols, collagen precursors, and photoprotective nutrients.",keys:["Polyphenols","Vitamin C","Vitamin E","Protein"],meals:[
{time:"Breakfast",name:"Collagen Power Smoothie",items:[{f:"Collagen peptides (10g)",w:"Moderate RCT evidence for skin hydration and elasticity at 8-12 weeks.",n:["Protein"]},{f:"Strawberries (1 cup)",w:"89mg vitamin C — essential cofactor for collagen hydroxylation.",n:["Vitamin C","Polyphenols"]},{f:"Avocado (½)",w:"Vitamin E protects cell membranes. Synergistic with vitamin C.",n:["Vitamin E","Omega-3"]},{f:"Matcha (1 tsp)",w:"EGCG inhibits MMP-1 (collagen-degrading enzyme).",n:["Polyphenols"]}]},
{time:"Lunch",name:"Mediterranean Plate",items:[{f:"Mackerel fillet (115g)",w:"2,200mg omega-3. Resolves chronic low-grade inflammation.",n:["Omega-3","Vitamin D","Protein"]},{f:"Quinoa (1 cup)",w:"Complete protein with all essential amino acids for collagen.",n:["Protein","Zinc","Vitamin E"]},{f:"Red bell pepper (1)",w:"152mg vitamin C — nearly 2x daily requirement in one pepper.",n:["Vitamin C","Vitamin A"]},{f:"Olive oil (2 tbsp)",w:"Mediterranean diet consistently linked to slower skin ageing.",n:["Vitamin E","Polyphenols"]}]},
{time:"Snack",name:"Antioxidant Mix",items:[{f:"Dark chocolate 70%+ (30g)",w:"Cocoa flavanols improve skin hydration and blood flow in RCTs.",n:["Polyphenols","Copper"]},{f:"Almonds (23)",w:"7.3mg vitamin E — nearly 50% of daily needs.",n:["Vitamin E","Protein"]}]},
{time:"Dinner",name:"Bone Broth Bowl",items:[{f:"Bone broth (1 cup)",w:"Glycine, proline, hydroxyproline — collagen-specific amino acids.",n:["Protein","Silicon"]},{f:"Sweet potato (1 medium)",w:"1,096 mcg vitamin A (122% daily). Cell turnover and repair.",n:["Vitamin A","Vitamin C"]},{f:"Kale (2 cups)",w:"Vitamin A + vitamin C + polyphenols. Triple antioxidant.",n:["Vitamin A","Vitamin C","Polyphenols"]},{f:"Eggs (2)",w:"Vitamin D + selenium. Lutein protects against photoageing.",n:["Protein","Vitamin D","Selenium"]}]},
{time:"Drinks",name:"Throughout the day",items:[{f:"Green tea (3 cups)",w:"Consistent evidence for photoprotection and MMP inhibition.",n:["Polyphenols"]},{f:"Pomegranate juice (small glass)",w:"Ellagic acid. RCT evidence for improved skin elasticity.",n:["Polyphenols"]}]}
],avoid:["Excess sugar (promotes AGE formation that crosslinks collagen)","Processed foods (pro-inflammatory)","Excessive alcohol (dehydrates, depletes vitamin A)"],supps:["Vitamin D3 1,000-2,000 IU","Collagen peptides 5-10g","Nicotinamide 500mg 2x daily","Astaxanthin 4-12mg"]},

pigmentation:{sum:"Prioritises tyrosinase-inhibiting nutrients (vitamin C), photoprotective polyphenols, and anti-inflammatory compounds.",keys:["Vitamin C","Polyphenols","Vitamin E","Omega-3"],meals:[
{time:"Breakfast",name:"Vitamin C Powerhouse",items:[{f:"Kiwi (2 medium)",w:"128mg vitamin C. Inhibits tyrosinase — the melanin-producing enzyme.",n:["Vitamin C","Vitamin E"]},{f:"Greek yogurt (170g)",w:"Probiotics. Gut inflammation drives post-inflammatory hyperpigmentation.",n:["Protein","Probiotics"]},{f:"Pomegranate seeds (¼ cup)",w:"Ellagic acid directly inhibits tyrosinase.",n:["Polyphenols","Vitamin C"]}]},
{time:"Lunch",name:"Photoprotective Bowl",items:[{f:"Sardines (1 can/100g)",w:"EPA+DHA reduce UV-induced inflammation triggering pigmentation.",n:["Omega-3","Vitamin D","Selenium"]},{f:"Tomatoes (1 cup, cooked)",w:"Lycopene for internal photoprotection. Cooking increases bioavailability 2-3x.",n:["Vitamin A","Polyphenols"]},{f:"Spinach (2 cups)",w:"Vitamin A supports normal melanocyte function.",n:["Vitamin A","Vitamin C"]},{f:"Red grapes (1 cup)",w:"Resveratrol inhibits tyrosinase. Proanthocyanidins are photoprotective.",n:["Polyphenols"]}]},
{time:"Snack",name:"Brightening Snack",items:[{f:"Red bell pepper strips (1)",w:"152mg vitamin C — the single most vitamin C-dense common food.",n:["Vitamin C","Vitamin A"]},{f:"Sunflower seeds (28g)",w:"7.4mg vitamin E. Prevents lipid peroxidation worsening pigmentation.",n:["Vitamin E","Selenium"]}]},
{time:"Dinner",name:"Anti-PIH Dinner",items:[{f:"Salmon (115g)",w:"Omega-3 reduces the inflammatory cascade causing post-inflammatory hyperpigmentation.",n:["Omega-3","Vitamin D","Protein"]},{f:"Broccoli (1 cup)",w:"101mg vitamin C + sulforaphane activates Nrf2 antioxidant pathway.",n:["Vitamin C","Vitamin A"]},{f:"Turmeric (1 tsp)",w:"Curcumin inhibits melanogenesis through multiple pathways.",n:["Polyphenols"]},{f:"Lentils (1 cup cooked)",w:"Folate for DNA repair. Zinc for immune modulation.",n:["Protein","Zinc","Silicon"]}]},
{time:"Drinks",name:"Throughout the day",items:[{f:"Green tea (3+ cups)",w:"EGCG inhibits melanin transfer to keratinocytes.",n:["Polyphenols"]}]}
],avoid:["Photosensitising foods in excess (celery, lime peel — psoralens)","High alcohol (depletes vitamin A)","Excess sugar (inflammatory cascade worsens PIH)"],supps:["Vitamin C 200-500mg daily","Vitamin D3 if wearing daily SPF","Omega-3 1-2g EPA+DHA"]},

dryness:{sum:"Loaded with healthy fats (omega-3, omega-6, monounsaturated), barrier-supporting nutrients, and hydrating foods.",keys:["Omega-3","Vitamin E","Vitamin A","Silicon"],meals:[
{time:"Breakfast",name:"Healthy Fat Toast",items:[{f:"Avocado (½) on sourdough",w:"Monounsaturated fats support skin lipid barrier. Vitamin E prevents TEWL.",n:["Vitamin E","Omega-3"]},{f:"Eggs (2, poached)",w:"Cholesterol and fatty acids mirroring skin barrier lipid composition.",n:["Vitamin D","Protein","Selenium"]},{f:"Olive oil drizzle (1 tbsp)",w:"Oleic acid is the primary monounsaturated fat in human sebum.",n:["Vitamin E","Polyphenols"]}]},
{time:"Lunch",name:"Omega-3 Mega Bowl",items:[{f:"Salmon (115g)",w:"EPA incorporates into cell membranes, improving barrier lipid quality.",n:["Omega-3","Vitamin D","Protein"]},{f:"Sweet potato (1 medium)",w:"Vitamin A critical for keratinocyte differentiation and barrier formation.",n:["Vitamin A","Vitamin C"]},{f:"Cashews (28g)",w:"Copper supports ceramide synthesis. Zinc supports barrier enzymes.",n:["Copper","Zinc"]}]},
{time:"Snack",name:"Barrier Fuel",items:[{f:"Walnuts (14 halves)",w:"2,500mg ALA + linoleic acid. Both essential fatty acids the body can't make.",n:["Omega-3","Copper"]},{f:"Orange (1 medium)",w:"Vitamin C for collagen integrity. Hydrating fruit.",n:["Vitamin C"]}]},
{time:"Dinner",name:"Barrier Repair Dinner",items:[{f:"Mackerel (115g)",w:"Highest omega-3 of common fish. DHA is structural in cell membranes.",n:["Omega-3","Vitamin D","Selenium"]},{f:"Green beans (1 cup)",w:"7mg silicon — supports connective tissue structure.",n:["Silicon","Vitamin A"]},{f:"Oats (as side)",w:"Beta-glucan has moisturising properties. Silicon-rich.",n:["Silicon","Zinc"]},{f:"Mushrooms (1 cup cooked)",w:"Selenium + copper. UV-exposed = vitamin D source.",n:["Selenium","Copper","Vitamin D"]}]},
{time:"Drinks",name:"Throughout the day",items:[{f:"Water (3L minimum)",w:"Dehydration directly increases transepidermal water loss.",n:[]},{f:"Bone broth (1 cup)",w:"Glycine and proline for collagen. Silicon. Deeply hydrating.",n:["Protein","Silicon"]}]}
],avoid:["Excessive caffeine (diuretic)","Alcohol (dehydrator, depletes vitamin A)","Very low-fat diets (essential fatty acids are essential for barrier)"],supps:["Omega-3 2g EPA+DHA (highest priority)","Vitamin D3 1,000-2,000 IU","Vitamin E 15mg if low nut/seed intake"]},

rosacea:{sum:"Avoids common triggers (spicy, hot drinks, histamine, alcohol) while maximising anti-inflammatory compounds and gut-supporting probiotics.",keys:["Omega-3","Probiotics","Zinc","Vitamin D"],meals:[
{time:"Breakfast",name:"Gentle Start",items:[{f:"Oats (½ cup, cooled to warm)",w:"Anti-inflammatory beta-glucan. Avoid very hot — heat triggers flushing.",n:["Silicon","Zinc","Fibre"]},{f:"Blueberries (½ cup)",w:"Anthocyanins strengthen capillary walls, potentially reducing flushing.",n:["Polyphenols","Vitamin C"]},{f:"Chia seeds (2 tbsp)",w:"2,400mg ALA omega-3 without histamine risk of some fish.",n:["Omega-3","Zinc"]},{f:"Banana (1)",w:"Low-histamine, alkalising. Silicon for structure.",n:["Silicon","Vitamin C"]}]},
{time:"Lunch",name:"Anti-Inflammatory Bowl",items:[{f:"Fresh salmon (115g, not canned)",w:"Fresh fish is low-histamine. 1,800mg EPA+DHA for vascular inflammation.",n:["Omega-3","Vitamin D","Protein"]},{f:"Quinoa (1 cup)",w:"Low-histamine complete protein. Well tolerated.",n:["Protein","Zinc","Vitamin E"]},{f:"Cucumber (1 cup)",w:"Hydrating, cooling, anti-inflammatory. Contains fisetin flavonoid.",n:["Vitamin C"]},{f:"Olive oil (1 tbsp)",w:"Oleocanthal anti-inflammatory. Monounsaturated fats don't trigger flushing.",n:["Vitamin E","Polyphenols"]}]},
{time:"Snack",name:"Gut-Skin Support",items:[{f:"Kefir (1 cup, plain)",w:"Probiotics support gut-skin axis. Gut dysbiosis linked to rosacea.",n:["Probiotics","Protein"]},{f:"Almonds (23)",w:"Vitamin E reduces inflammatory markers. Low-histamine.",n:["Vitamin E","Protein"]}]},
{time:"Dinner",name:"Trigger-Free Dinner",items:[{f:"Chicken breast (115g, baked)",w:"Low-histamine protein. Avoid marinades and heavy spices.",n:["Protein","Selenium","Zinc"]},{f:"Sweet potato (1 medium)",w:"Anti-inflammatory vitamin A. Gentle on digestion.",n:["Vitamin A","Vitamin C"]},{f:"Green beans (1 cup)",w:"Low-histamine vegetable. Silicon and vitamin A.",n:["Silicon","Vitamin A"]},{f:"Fresh ginger (1 tsp grated)",w:"Anti-inflammatory without capsaicin vasodilation. Gingerols reduce NF-κB.",n:["Polyphenols"]}]},
{time:"Drinks",name:"Throughout the day",items:[{f:"Chamomile tea (lukewarm)",w:"Anti-inflammatory. Avoid very hot — let cool first.",n:["Polyphenols"]},{f:"Water (2-3L, room temp)",w:"Avoid ice-cold which can cause temperature-related flushing.",n:[]}]}
],avoid:["Spicy foods (capsaicin triggers flushing)","Alcohol (#1 dietary trigger)","Very hot drinks (thermal trigger)","Histamine-rich foods (aged cheese, canned fish, wine)","Cinnamon, excess citrus (cinnamaldehyde triggers)"],supps:["Omega-3 1-2g EPA+DHA","Probiotics (L. rhamnosus)","Vitamin D3 1,000-2,000 IU","Nicotinamide 500mg 2x daily"]},

general:{sum:"A balanced day covering all 11 skin-critical nutrients. The foundation diet for skin health.",keys:["All 11 balanced","Variety","Whole foods"],meals:[
{time:"Breakfast",name:"Foundation Bowl",items:[{f:"Eggs (2)",w:"Complete protein + vitamin D + selenium + vitamin A.",n:["Protein","Vitamin D","Vitamin A","Selenium"]},{f:"Avocado (½)",w:"Vitamin E + healthy fats for barrier support.",n:["Vitamin E","Omega-3"]},{f:"Blueberries (½ cup)",w:"Polyphenol antioxidants for UV protection from inside.",n:["Polyphenols","Vitamin C"]},{f:"Green tea (1 cup)",w:"EGCG — the most studied skin-protective polyphenol.",n:["Polyphenols"]}]},
{time:"Lunch",name:"Skin Superfood Plate",items:[{f:"Salmon (115g)",w:"Omega-3 for inflammation, vitamin D for barrier, protein for structure.",n:["Omega-3","Vitamin D","Protein"]},{f:"Spinach (2 cups)",w:"Vitamin A, zinc, copper. Most nutrient-dense green for skin.",n:["Vitamin A","Zinc","Copper"]},{f:"Quinoa (1 cup)",w:"Complete protein with zinc, copper, vitamin E.",n:["Protein","Zinc","Vitamin E"]},{f:"Olive oil (1 tbsp)",w:"Vitamin E + anti-inflammatory polyphenols.",n:["Vitamin E","Polyphenols"]}]},
{time:"Snack",name:"Skin Snack",items:[{f:"Brazil nuts (2)",w:"Covers 100%+ selenium. Most efficient skin supplement food.",n:["Selenium"]},{f:"Dark chocolate 70%+ (30g)",w:"Copper + polyphenols. RCT evidence for skin blood flow.",n:["Copper","Polyphenols"]},{f:"Orange (1)",w:"70mg vitamin C for collagen synthesis.",n:["Vitamin C"]}]},
{time:"Dinner",name:"Complete Skin Dinner",items:[{f:"Lean beef (115g)",w:"6mg zinc (55% daily) + 25 mcg selenium + 28g protein.",n:["Zinc","Selenium","Protein"]},{f:"Sweet potato (1 medium)",w:"1,096 mcg vitamin A. Supports every aspect of skin renewal.",n:["Vitamin A","Vitamin C"]},{f:"Broccoli (1 cup)",w:"101mg vitamin C + sulforaphane for Nrf2 activation.",n:["Vitamin C","Vitamin A"]},{f:"Oats (as side)",w:"Silicon for collagen structure. Zinc for healing.",n:["Silicon","Zinc"]}]},
{time:"Drinks",name:"Throughout the day",items:[{f:"Green tea (2-3 cups)",w:"Consistent polyphenol intake for antioxidant defence.",n:["Polyphenols"]},{f:"Water (2-3L)",w:"Foundation hydration for elasticity and barrier.",n:[]}]}
],avoid:["Excess processed sugar (AGE formation, inflammation)","Trans fats (pro-inflammatory)","Excessive alcohol (dehydrates, depletes vitamin A)"],supps:["Vitamin D3 1,000-2,000 IU (if wearing daily SPF)","Omega-3 1g EPA+DHA (if not eating fish 2-3x/week)","Collagen peptides 5-10g if over 35"]}
};

var root=document.getElementById("mealApp"),concern=null;

function ntag(n){var c=NC[n]||"var(--text-muted)";return '<span style="padding:2px 5px;font-size:8px;font-weight:700;border-radius:3px;background:'+c+'15;color:'+c+';font-family:var(--font-mono);white-space:nowrap">'+n+'</span>'}

function renderSelect(){
  var h='<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">';
  CS.forEach(function(c){
    h+='<button onclick="window._mgSelect(\''+c.id+'\')" style="display:flex;flex-direction:column;gap:4px;padding:16px 18px;text-align:left;background:var(--bg-card);border:1.5px solid var(--border-light);border-radius:14px;cursor:pointer;font-family:var(--font-body)">';
    h+='<div style="display:flex;align-items:center;gap:8px"><span style="font-size:20px">'+c.icon+'</span><span style="font-size:14px;font-weight:600;color:var(--text)">'+c.l+'</span></div>';
    h+='<span style="font-size:11px;color:var(--text-muted);line-height:1.4">'+c.tag+'</span></button>';
  });
  h+='</div>';
  root.innerHTML=h;
}

function renderPlan(){
  var p=P[concern],cd=CS.find(function(c){return c.id===concern});
  var h='<div style="padding:20px;background:var(--accent-wash);border:1.5px solid rgba(61,122,82,0.15);border-radius:16px;margin-bottom:16px">';
  h+='<div style="display:flex;align-items:center;gap:8px;margin-bottom:8px"><span style="font-size:22px">'+cd.icon+'</span><h2 style="font-family:var(--font-display);font-size:18px;font-weight:500">'+cd.l+' — Daily Meal Plan</h2></div>';
  h+='<p style="font-size:12px;color:var(--text-secondary);line-height:1.6">'+p.sum+'</p>';
  h+='<div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:10px">';
  p.keys.forEach(function(k){h+='<span style="padding:3px 8px;font-size:10px;font-weight:600;border-radius:100px;background:rgba(61,122,82,0.08);color:var(--accent);font-family:var(--font-mono)">'+k+'</span>'});
  h+='</div></div>';

  p.meals.forEach(function(meal){
    h+='<div style="background:var(--bg-card);border:1.5px solid var(--border-light);border-radius:16px;overflow:hidden;margin-bottom:12px">';
    h+='<div style="padding:10px 18px;background:var(--bg-warm);border-bottom:1px solid var(--border-light);display:flex;justify-content:space-between;align-items:center"><span style="font-size:13px;font-weight:600">'+meal.time+'</span><span style="font-size:12px;color:var(--accent);font-weight:500;font-family:var(--font-display);font-style:italic">'+meal.name+'</span></div>';
    h+='<div style="padding:12px 18px">';
    meal.items.forEach(function(item,i){
      h+='<div style="padding:10px 0;border-bottom:'+(i<meal.items.length-1?'1px solid var(--bg-warm)':'none')+'">';
      h+='<div style="display:flex;align-items:flex-start;gap:8px"><span style="font-size:13px;font-weight:600;color:var(--text);flex:1;min-width:0">'+item.f+'</span>';
      h+='<div style="display:flex;gap:3px;flex-shrink:0;flex-wrap:wrap;justify-content:flex-end">';
      item.n.forEach(function(n){h+=ntag(n)});
      h+='</div></div>';
      h+='<p style="font-size:11px;color:var(--text-muted);line-height:1.5;margin-top:3px">'+item.w+'</p></div>';
    });
    h+='</div></div>';
  });

  h+='<div style="padding:18px;background:var(--caution-wash);border:1.5px solid var(--caution-border);border-radius:16px;margin-bottom:12px"><h3 style="font-size:13px;font-weight:600;color:var(--caution);margin-bottom:8px">Foods to Limit or Avoid</h3>';
  p.avoid.forEach(function(a){h+='<p style="font-size:12px;color:var(--text-secondary);margin-bottom:4px;line-height:1.5">• '+a+'</p>'});
  h+='</div>';

  h+='<div style="padding:18px;background:var(--bg-card);border:1.5px solid var(--border-light);border-radius:16px;margin-bottom:16px"><h3 style="font-size:13px;font-weight:600;margin-bottom:8px">Supplement Considerations</h3>';
  p.supps.forEach(function(s){h+='<p style="font-size:12px;color:var(--text-secondary);margin-bottom:4px">• '+s+'</p>'});
  h+='</div>';

  h+='<div style="text-align:center"><button onclick="window._mgReset()" style="padding:10px 28px;background:transparent;border:1.5px solid var(--border-light);border-radius:100px;font-size:13px;font-weight:600;cursor:pointer;color:var(--text-secondary);font-family:var(--font-body)">Choose Different Concern</button></div>';
  root.innerHTML=h;
}

window._mgSelect=function(id){concern=id;renderPlan()};
window._mgReset=function(){concern=null;renderSelect()};
renderSelect();
})();
