/* DermaProtocol — Skin Nutrition Scorer */
(function(){
var NUTS={
  vitA:{name:"Vitamin A",unit:"mcg RAE",daily:900,skin:"Supports cell turnover, repair, and barrier integrity.",foods:"Sweet potato, carrots, spinach, liver, eggs"},
  vitC:{name:"Vitamin C",unit:"mg",daily:90,skin:"Essential cofactor for collagen synthesis. Antioxidant against UV free radicals.",foods:"Bell peppers, citrus, kiwi, broccoli, strawberries"},
  vitD:{name:"Vitamin D",unit:"IU",daily:800,skin:"Promotes keratinocyte differentiation and barrier formation.",foods:"Fatty fish, egg yolks, mushrooms, fortified foods"},
  vitE:{name:"Vitamin E",unit:"mg",daily:15,skin:"Fat-soluble antioxidant protecting cell membranes from lipid peroxidation.",foods:"Almonds, sunflower seeds, avocado, hazelnuts, olive oil"},
  zinc:{name:"Zinc",unit:"mg",daily:11,skin:"Supports wound healing, immune function, anti-inflammatory effects.",foods:"Oysters, beef, pumpkin seeds, lentils, chickpeas"},
  omega3:{name:"Omega-3 (EPA+DHA)",unit:"mg",daily:1000,skin:"Reduces UV inflammation, supports barrier lipids, modulates sebaceous glands.",foods:"Salmon, mackerel, sardines, walnuts, chia seeds"},
  selenium:{name:"Selenium",unit:"mcg",daily:55,skin:"Antioxidant via selenoproteins. Protects against UV damage.",foods:"Brazil nuts (1-2 daily), tuna, eggs, sunflower seeds"},
  copper:{name:"Copper",unit:"mg",daily:0.9,skin:"Required for melanin synthesis, collagen crosslinking, antioxidant defence.",foods:"Dark chocolate, cashews, liver, mushrooms, sesame seeds"},
  silicon:{name:"Silicon",unit:"mg",daily:25,skin:"Supports collagen structure and skin elasticity.",foods:"Oats, barley, rice, green beans, bananas"},
  polyphenols:{name:"Polyphenols",unit:"score",daily:100,skin:"Antioxidants that reduce UV damage, inhibit MMPs, reduce inflammation.",foods:"Green tea, berries, dark chocolate, red grapes, turmeric"},
  protein:{name:"Protein",unit:"g",daily:56,skin:"Provides amino acids for collagen and keratin synthesis.",foods:"Eggs, chicken, fish, Greek yogurt, lentils, tofu"}
};
var FOODS=[
  {id:"blueberries",name:"Blueberries",cat:"Fruits",portion:"1 cup (150g)",n:{vitC:14,vitE:0.8,polyphenols:28,vitA:4,copper:0.06}},
  {id:"strawberries",name:"Strawberries",cat:"Fruits",portion:"1 cup (150g)",n:{vitC:89,polyphenols:18,vitE:0.4}},
  {id:"oranges",name:"Orange",cat:"Fruits",portion:"1 medium",n:{vitC:70,polyphenols:8,vitA:14}},
  {id:"kiwi",name:"Kiwi",cat:"Fruits",portion:"1 medium",n:{vitC:64,vitE:1,vitA:3}},
  {id:"avocado",name:"Avocado",cat:"Fruits",portion:"½ avocado",n:{vitE:2.1,omega3:80,vitC:5,copper:0.1,protein:2}},
  {id:"mango",name:"Mango",cat:"Fruits",portion:"1 cup sliced",n:{vitA:89,vitC:60,vitE:1.5,polyphenols:10}},
  {id:"redgrapes",name:"Red grapes",cat:"Fruits",portion:"1 cup",n:{polyphenols:22,vitC:4,copper:0.1}},
  {id:"banana",name:"Banana",cat:"Fruits",portion:"1 medium",n:{silicon:5,vitC:10,protein:1.3}},
  {id:"pomegranate",name:"Pomegranate",cat:"Fruits",portion:"½ fruit",n:{polyphenols:30,vitC:9,vitE:0.6}},
  {id:"sweetpotato",name:"Sweet potato",cat:"Vegetables",portion:"1 medium baked",n:{vitA:1096,vitC:20,protein:2,silicon:3}},
  {id:"spinach",name:"Spinach",cat:"Vegetables",portion:"2 cups raw",n:{vitA:281,vitC:8,vitE:0.6,zinc:0.5,copper:0.06,protein:1.7}},
  {id:"kale",name:"Kale",cat:"Vegetables",portion:"2 cups raw",n:{vitA:206,vitC:80,vitE:0.5,polyphenols:12,copper:0.1}},
  {id:"broccoli",name:"Broccoli",cat:"Vegetables",portion:"1 cup cooked",n:{vitC:101,vitA:60,vitE:1.1,protein:3.7,selenium:2.5}},
  {id:"bellpepper",name:"Red bell pepper",cat:"Vegetables",portion:"1 medium",n:{vitC:152,vitA:187,vitE:1.6,polyphenols:5}},
  {id:"carrots",name:"Carrots",cat:"Vegetables",portion:"1 cup chopped",n:{vitA:835,vitC:7,silicon:2}},
  {id:"tomato",name:"Tomatoes",cat:"Vegetables",portion:"1 cup chopped",n:{vitC:24,vitA:75,polyphenols:14,vitE:0.7}},
  {id:"greenbeans",name:"Green beans",cat:"Vegetables",portion:"1 cup cooked",n:{silicon:7,vitC:12,vitA:44,protein:2}},
  {id:"mushrooms",name:"Mushrooms",cat:"Vegetables",portion:"1 cup cooked",n:{selenium:12,copper:0.3,vitD:7,zinc:1,protein:3}},
  {id:"salmon",name:"Salmon",cat:"Protein",portion:"115g fillet",n:{omega3:1800,vitD:570,selenium:35,protein:25,vitE:1}},
  {id:"sardines",name:"Sardines",cat:"Protein",portion:"1 can (100g)",n:{omega3:1400,vitD:270,selenium:33,protein:25}},
  {id:"mackerel",name:"Mackerel",cat:"Protein",portion:"115g fillet",n:{omega3:2200,vitD:400,selenium:40,protein:22}},
  {id:"tuna",name:"Tuna",cat:"Protein",portion:"115g",n:{omega3:300,selenium:60,vitD:80,protein:30}},
  {id:"oysters",name:"Oysters",cat:"Protein",portion:"6 medium",n:{zinc:33,selenium:54,copper:1.6,omega3:300,vitD:80,protein:8}},
  {id:"eggs",name:"Eggs",cat:"Protein",portion:"2 large",n:{vitD:82,selenium:15,vitA:80,zinc:1.1,protein:12,vitE:1}},
  {id:"chicken",name:"Chicken breast",cat:"Protein",portion:"115g cooked",n:{protein:31,selenium:22,zinc:1}},
  {id:"beef",name:"Lean beef",cat:"Protein",portion:"115g cooked",n:{zinc:6,selenium:25,protein:28,copper:0.1}},
  {id:"liver",name:"Beef liver",cat:"Protein",portion:"85g cooked",n:{vitA:6580,copper:12,zinc:4,selenium:28,protein:21}},
  {id:"greekyogurt",name:"Greek yogurt",cat:"Protein",portion:"170g",n:{protein:17,zinc:1,selenium:9}},
  {id:"tofu",name:"Tofu (firm)",cat:"Protein",portion:"½ cup",n:{protein:10,zinc:1,selenium:11,copper:0.2}},
  {id:"lentils",name:"Lentils",cat:"Protein",portion:"1 cup cooked",n:{protein:18,zinc:2.5,copper:0.5,selenium:6,silicon:3}},
  {id:"brazilnuts",name:"Brazil nuts",cat:"Nuts & Seeds",portion:"2 nuts",n:{selenium:137,vitE:1.6,zinc:0.8,copper:0.3,protein:2.7}},
  {id:"almonds",name:"Almonds",cat:"Nuts & Seeds",portion:"28g (23 almonds)",n:{vitE:7.3,zinc:0.9,copper:0.3,protein:6,polyphenols:5}},
  {id:"walnuts",name:"Walnuts",cat:"Nuts & Seeds",portion:"28g (14 halves)",n:{omega3:2500,copper:0.4,polyphenols:8,protein:4}},
  {id:"pumpkinseeds",name:"Pumpkin seeds",cat:"Nuts & Seeds",portion:"28g",n:{zinc:2.2,vitE:0.6,copper:0.4,protein:7,selenium:3}},
  {id:"sunflowerseeds",name:"Sunflower seeds",cat:"Nuts & Seeds",portion:"28g",n:{vitE:7.4,selenium:19,copper:0.5,zinc:1.4,protein:5}},
  {id:"chiaseeds",name:"Chia seeds",cat:"Nuts & Seeds",portion:"2 tbsp",n:{omega3:2400,zinc:1,protein:4,selenium:8}},
  {id:"flaxseed",name:"Flaxseed (ground)",cat:"Nuts & Seeds",portion:"2 tbsp",n:{omega3:3200,copper:0.2,selenium:4,protein:3}},
  {id:"cashews",name:"Cashews",cat:"Nuts & Seeds",portion:"28g",n:{copper:0.6,zinc:1.6,selenium:3,protein:5}},
  {id:"oats",name:"Oats (rolled)",cat:"Grains",portion:"½ cup dry",n:{silicon:8,zinc:1.5,selenium:7,protein:5,copper:0.1}},
  {id:"brownrice",name:"Brown rice",cat:"Grains",portion:"1 cup cooked",n:{silicon:5,selenium:12,zinc:0.8,protein:5}},
  {id:"quinoa",name:"Quinoa",cat:"Grains",portion:"1 cup cooked",n:{zinc:2,copper:0.4,selenium:5,protein:8,vitE:1.2}},
  {id:"greentea",name:"Green tea",cat:"Beverages",portion:"2 cups",n:{polyphenols:35}},
  {id:"matcha",name:"Matcha",cat:"Beverages",portion:"1 tsp in water",n:{polyphenols:40,vitC:2}},
  {id:"darkchoc",name:"Dark chocolate (70%+)",cat:"Other",portion:"30g",n:{copper:0.5,polyphenols:20,zinc:1}},
  {id:"oliveoil",name:"Extra virgin olive oil",cat:"Other",portion:"2 tbsp",n:{vitE:2,polyphenols:12,omega3:100}},
  {id:"turmeric",name:"Turmeric",cat:"Other",portion:"1 tsp",n:{polyphenols:15}},
  {id:"bonebroth",name:"Bone broth",cat:"Other",portion:"1 cup",n:{protein:10,silicon:4,copper:0.1}},
  {id:"collagenpowder",name:"Collagen peptides",cat:"Other",portion:"10g scoop",n:{protein:9}}
];
var CATS=["All"];FOODS.forEach(function(f){if(CATS.indexOf(f.cat)===-1)CATS.push(f.cat)});
var selected=[],activeCat="All",root=document.getElementById("nutritionApp");

function render(){
  var filtered=FOODS;
  if(activeCat!=="All")filtered=FOODS.filter(function(f){return f.cat===activeCat});
  var h='<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:16px">';
  CATS.forEach(function(c){
    var a=c===activeCat;
    h+='<button onclick="window._nsSetCat(\''+c+'\')" style="padding:5px 12px;font-size:11px;font-weight:600;border-radius:100px;border:1.5px solid '+(a?'var(--accent)':'var(--border-light)')+';background:'+(a?'var(--accent-wash)':'var(--bg-card)')+';color:'+(a?'var(--accent)':'var(--text-muted)')+';cursor:pointer;font-family:var(--font-body)">'+c+'</button>';
  });
  h+='</div>';
  h+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;max-height:420px;overflow-y:auto;padding-right:4px">';
  filtered.forEach(function(f){
    var a=selected.indexOf(f.id)>=0;
    h+='<button onclick="window._nsToggle(\''+f.id+'\')" style="display:flex;align-items:center;gap:10px;width:100%;padding:10px 14px;background:'+(a?'var(--accent-wash)':'var(--bg-card)')+';border:1.5px solid '+(a?'var(--accent)':'var(--border-light)')+';border-radius:12px;cursor:pointer;text-align:left;font-family:var(--font-body)">';
    h+='<span style="width:20px;height:20px;border-radius:6px;border:2px solid '+(a?'var(--accent)':'var(--border)')+';background:'+(a?'var(--accent)':'transparent')+';display:flex;align-items:center;justify-content:center;flex-shrink:0;color:var(--bg);font-size:11px">'+(a?'✓':'')+'</span>';
    h+='<div style="flex:1;min-width:0"><div style="font-size:13px;font-weight:600;color:var(--text)">'+f.name+'</div><div style="font-size:11px;color:var(--text-muted)">'+f.portion+'</div></div></button>';
  });
  h+='</div>';
  h+='<div style="display:flex;align-items:center;justify-content:space-between;margin-top:16px;padding:12px 16px;background:var(--bg-warm);border-radius:12px">';
  h+='<span style="font-size:13px;color:var(--text-secondary)"><strong style="color:var(--accent)">'+selected.length+'</strong> foods selected</span>';
  h+='<button onclick="window._nsScore()" '+(selected.length===0?'disabled':'')+' style="padding:8px 24px;background:'+(selected.length>0?'var(--accent)':'var(--border)')+';color:var(--bg);border:none;border-radius:100px;font-size:13px;font-weight:600;cursor:'+(selected.length>0?'pointer':'default')+';font-family:var(--font-body)">Score My Diet</button>';
  h+='</div>';
  root.innerHTML=h;
}

function score(){
  var totals={};Object.keys(NUTS).forEach(function(k){totals[k]=0});
  selected.forEach(function(id){
    var f=FOODS.find(function(x){return x.id===id});
    if(!f)return;
    Object.keys(f.n).forEach(function(k){if(totals[k]!==undefined)totals[k]+=f.n[k]});
  });
  var pcts={},sum=0;
  Object.keys(NUTS).forEach(function(k){
    pcts[k]=Math.min(100,Math.round((totals[k]/NUTS[k].daily)*100));
    sum+=pcts[k];
  });
  var overall=Math.round(sum/Object.keys(NUTS).length);
  var grade=overall>=85?{l:"Excellent",c:"var(--accent)"}:overall>=65?{l:"Good",c:"var(--accent-light)"}:overall>=45?{l:"Fair",c:"var(--gold)"}:overall>=25?{l:"Needs Work",c:"var(--caution)"}:{l:"Poor",c:"var(--danger)"};
  var gaps=[],strengths=[];
  Object.keys(NUTS).forEach(function(k){if(pcts[k]<50)gaps.push(k);if(pcts[k]>=80)strengths.push(k)});
  gaps.sort(function(a,b){return pcts[a]-pcts[b]});

  var h='<div style="text-align:center;padding:24px;background:var(--bg-card);border:1.5px solid var(--border-light);border-radius:16px;margin-bottom:16px">';
  h+='<div style="font-size:56px;font-weight:600;font-family:var(--font-display);color:'+grade.c+';line-height:1">'+overall+'</div>';
  h+='<div style="font-size:12px;font-weight:600;color:'+grade.c+';letter-spacing:0.08em;text-transform:uppercase;font-family:var(--font-mono);margin-top:4px">'+grade.l+'</div>';
  h+='<div style="font-size:12px;color:var(--text-muted);margin-top:6px">Skin Nutrition Score (out of 100)</div></div>';

  h+='<div style="padding:20px;background:var(--bg-card);border:1.5px solid var(--border-light);border-radius:16px;margin-bottom:16px"><h3 style="font-size:13px;font-weight:600;margin-bottom:16px;color:var(--text)">Nutrient Breakdown</h3>';
  Object.keys(NUTS).forEach(function(k){
    var p=pcts[k],col=p>=80?'var(--accent)':p>=50?'var(--gold)':p>=25?'var(--caution)':'var(--danger)';
    h+='<div style="margin-bottom:14px"><div style="display:flex;justify-content:space-between;margin-bottom:4px"><span style="font-size:13px;font-weight:600;color:var(--text)">'+NUTS[k].name+'</span><span style="font-size:12px;font-weight:600;color:'+col+';font-family:var(--font-mono)">'+p+'%</span></div>';
    h+='<div style="height:8px;background:var(--bg-muted);border-radius:4px;overflow:hidden"><div style="height:100%;width:'+Math.min(100,p)+'%;background:'+col+';border-radius:4px;transition:width 0.6s"></div></div>';
    if(p<50)h+='<p style="font-size:11px;color:var(--text-muted);margin-top:3px">Add: '+NUTS[k].foods+'</p>';
    h+='</div>';
  });
  h+='</div>';

  if(gaps.length>0){
    h+='<div style="padding:20px;background:var(--caution-wash);border:1.5px solid var(--caution-border);border-radius:16px;margin-bottom:16px"><h3 style="font-size:13px;font-weight:600;color:var(--caution);margin-bottom:10px">Nutrient Gaps for Skin</h3>';
    gaps.forEach(function(k){
      h+='<div style="margin-bottom:12px"><div style="font-size:13px;font-weight:600;color:var(--text)">'+NUTS[k].name+' — '+pcts[k]+'% of target</div>';
      h+='<div style="font-size:12px;color:var(--text-secondary);margin-top:2px">'+NUTS[k].skin+'</div>';
      h+='<div style="font-size:11px;color:var(--accent);margin-top:3px;font-weight:600">Add: '+NUTS[k].foods+'</div></div>';
    });
    h+='</div>';
  }
  if(strengths.length>0){
    h+='<div style="padding:20px;background:var(--accent-wash);border:1.5px solid var(--tip-border);border-radius:16px;margin-bottom:16px"><h3 style="font-size:13px;font-weight:600;color:var(--accent);margin-bottom:8px">Strong Coverage</h3><div style="display:flex;flex-wrap:wrap;gap:6px">';
    strengths.forEach(function(k){h+='<span style="padding:4px 10px;background:var(--accent-wash);border-radius:100px;font-size:11px;font-weight:600;color:var(--accent)">'+NUTS[k].name+' '+pcts[k]+'%</span>'});
    h+='</div></div>';
  }
  if(gaps.length>0){
    h+='<div style="padding:20px;background:var(--bg-card);border:1.5px solid var(--border-light);border-radius:16px;margin-bottom:16px"><h3 style="font-size:13px;font-weight:600;margin-bottom:8px">Supplement Considerations</h3><p style="font-size:12px;color:var(--text-secondary);margin-bottom:10px">When diet alone doesn\'t cover these gaps:</p>';
    if(gaps.indexOf('vitD')>=0)h+='<p style="font-size:12px;color:var(--text-secondary);margin-bottom:6px">• <strong>Vitamin D3</strong> (1,000–2,000 IU) — especially if wearing daily sunscreen</p>';
    if(gaps.indexOf('omega3')>=0)h+='<p style="font-size:12px;color:var(--text-secondary);margin-bottom:6px">• <strong>Omega-3</strong> (1–2g EPA+DHA) — take with a fat-containing meal</p>';
    if(gaps.indexOf('zinc')>=0)h+='<p style="font-size:12px;color:var(--text-secondary);margin-bottom:6px">• <strong>Zinc</strong> (15–30mg) — picolinate or bisglycinate for absorption</p>';
    if(gaps.indexOf('selenium')>=0)h+='<p style="font-size:12px;color:var(--text-secondary);margin-bottom:6px">• <strong>Selenium</strong> — 1–2 Brazil nuts daily covers your requirement</p>';
    if(gaps.indexOf('vitC')>=0)h+='<p style="font-size:12px;color:var(--text-secondary);margin-bottom:6px">• <strong>Vitamin C</strong> — add peppers, kiwi, or citrus before supplementing</p>';
    if(gaps.indexOf('vitE')>=0)h+='<p style="font-size:12px;color:var(--text-secondary);margin-bottom:6px">• <strong>Vitamin E</strong> — a handful of almonds provides ~50% daily needs</p>';
    if(gaps.indexOf('protein')>=0)h+='<p style="font-size:12px;color:var(--text-secondary);margin-bottom:6px">• <strong>Collagen peptides</strong> (5–10g) — moderate evidence for skin hydration</p>';
    h+='<p style="font-size:11px;color:var(--text-muted);margin-top:10px;font-style:italic">Prioritise food first. Supplements are complementary.</p></div>';
  }
  h+='<div style="text-align:center;margin-top:16px"><button onclick="window._nsReset()" style="padding:10px 28px;background:transparent;border:1.5px solid var(--border-light);border-radius:100px;font-size:13px;font-weight:600;cursor:pointer;color:var(--text-secondary);font-family:var(--font-body)">Start Over</button></div>';
  root.innerHTML=h;
}

window._nsToggle=function(id){var i=selected.indexOf(id);if(i>=0)selected.splice(i,1);else selected.push(id);render()};
window._nsSetCat=function(c){activeCat=c;render()};
window._nsScore=function(){score()};
window._nsReset=function(){selected=[];activeCat="All";render()};
render();
})();
