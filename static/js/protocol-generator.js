/* DermaProtocol — Protocol Generator */
(function(){
var STEPS=["age","skin_type","concern","concern2","sensitivity","routine","supplements","sun","diet","lifestyle"];
var QS={
  age:{q:"What is your age range?",opts:[{id:"18-24",l:"18–24"},{id:"25-34",l:"25–34"},{id:"35-44",l:"35–44"},{id:"45-54",l:"45–54"},{id:"55+",l:"55+"}]},
  skin_type:{q:"How would you describe your skin?",opts:[{id:"oily",l:"Oily",d:"Shiny by midday, enlarged pores, prone to breakouts"},{id:"dry",l:"Dry",d:"Tight, flaky, rough texture, easily irritated"},{id:"combo",l:"Combination",d:"Oily T-zone, dry or normal cheeks"},{id:"normal",l:"Normal",d:"Balanced, few issues"}]},
  concern:{q:"What is your primary skin concern?",opts:[{id:"acne",l:"Acne & Breakouts",d:"Active spots, blackheads, congestion"},{id:"ageing",l:"Anti-Ageing",d:"Fine lines, wrinkles, loss of firmness"},{id:"pigmentation",l:"Pigmentation",d:"Dark spots, uneven tone, melasma"},{id:"rosacea",l:"Rosacea & Redness",d:"Persistent redness, flushing, papules"},{id:"barrier",l:"Barrier Damage",d:"Stinging, tightness, reactive to everything"},{id:"maintenance",l:"General Maintenance",d:"No major concerns, want to optimise"}]},
  concern2:{q:"Any secondary concern?",opts:[{id:"none",l:"None — just the primary"},{id:"acne",l:"Acne"},{id:"ageing",l:"Ageing"},{id:"pigmentation",l:"Pigmentation"},{id:"dryness",l:"Dryness"},{id:"sensitivity",l:"Sensitivity"},{id:"texture",l:"Rough Texture"}]},
  sensitivity:{q:"How sensitive is your skin?",opts:[{id:"low",l:"Low",d:"Tolerates most products"},{id:"moderate",l:"Moderate",d:"Occasionally reacts to new products"},{id:"high",l:"High",d:"Frequently stings or flushes with actives"}]},
  routine:{q:"Current skincare experience?",opts:[{id:"none",l:"No routine",d:"Barely anything"},{id:"basic",l:"Basic",d:"Cleanser + moisturiser"},{id:"intermediate",l:"Intermediate",d:"Cleanser, actives, moisturiser, SPF"},{id:"advanced",l:"Advanced",d:"Multi-step with several actives"}]},
  supplements:{q:"Current supplements?",opts:[{id:"none",l:"None"},{id:"multi",l:"Just a multivitamin"},{id:"some",l:"A few targeted supplements"},{id:"stack",l:"A full supplement stack"}]},
  sun:{q:"Daily sun exposure?",opts:[{id:"minimal",l:"Minimal",d:"Mostly indoors"},{id:"moderate",l:"Moderate",d:"Some outdoor time"},{id:"high",l:"High",d:"Outdoor work or tropical climate"}]},
  diet:{q:"Typical diet?",opts:[{id:"varied",l:"Varied & balanced",d:"Fruits, veg, protein, whole grains"},{id:"limited",l:"Limited variety",d:"Same foods, less produce"},{id:"plant",l:"Plant-based",d:"Vegetarian or vegan"},{id:"high_processed",l:"Mostly processed",d:"Convenience foods, less fresh produce"}]},
  lifestyle:{q:"Any of these apply?",multi:true,opts:[{id:"exercise",l:"Regular exercise (3+/week)"},{id:"stress",l:"High stress"},{id:"sleep_poor",l:"Poor sleep"},{id:"smoker",l:"Smoker"},{id:"alcohol",l:"Regular alcohol"},{id:"none_ls",l:"None of these"}]}
};
var step=0,ans={},root=document.getElementById("protocolApp");

function ev(level){if(!level)return'';var c=level==='Strong'?'var(--accent)':level==='Moderate'?'var(--gold)':'var(--caution)';return '<span style="font-size:10px;font-weight:700;color:'+c+';font-family:var(--font-mono);letter-spacing:0.06em;text-transform:uppercase;padding:2px 6px;background:'+c+'11;border-radius:4px">'+level+'</span>';}

function renderStep(){
  var s=STEPS[step],q=QS[s],val=ans[s],isMulti=q.multi;
  var h='<div style="margin-bottom:6px;font-size:11px;color:var(--text-muted);font-family:var(--font-mono)">Step '+(step+1)+' of '+STEPS.length+'</div>';
  h+='<div style="height:3px;background:var(--bg-muted);border-radius:2px;margin-bottom:24px"><div style="height:100%;width:'+((step+1)/STEPS.length*100)+'%;background:var(--accent);border-radius:2px;transition:width 0.4s"></div></div>';
  h+='<h2 style="font-family:var(--font-display);font-size:clamp(1.3rem,3vw,1.7rem);font-weight:400;margin-bottom:20px;color:var(--text)">'+q.q+'</h2>';
  h+='<div style="display:grid;grid-template-columns:'+(q.opts.length>4?'1fr 1fr':'1fr')+';gap:8px">';
  q.opts.forEach(function(o){
    var a=isMulti?(val||[]).indexOf(o.id)>=0:val===o.id;
    h+='<button onclick="window._pgSelect(\''+o.id+'\')" style="display:flex;flex-direction:column;gap:2px;padding:12px 16px;text-align:left;background:'+(a?'var(--accent-wash)':'var(--bg-card)')+';border:1.5px solid '+(a?'var(--accent)':'var(--border-light)')+';border-radius:12px;cursor:pointer;font-family:var(--font-body)">';
    h+='<span style="font-size:13px;font-weight:600;color:'+(a?'var(--accent)':'var(--text)')+'">'+o.l+'</span>';
    if(o.d)h+='<span style="font-size:11px;color:var(--text-muted);line-height:1.4">'+o.d+'</span>';
    h+='</button>';
  });
  h+='</div>';
  h+='<div style="display:flex;justify-content:space-between;margin-top:24px">';
  if(step>0)h+='<button onclick="window._pgBack()" style="padding:8px 20px;background:transparent;border:1.5px solid var(--border-light);border-radius:100px;font-size:13px;font-weight:600;cursor:pointer;color:var(--text-secondary);font-family:var(--font-body)">Back</button>';
  else h+='<div></div>';
  if(isMulti){var ok=val&&val.length>0;h+='<button onclick="window._pgNext()" '+(ok?'':'disabled')+' style="padding:8px 24px;background:'+(ok?'var(--accent)':'var(--border)')+';color:var(--bg);border:none;border-radius:100px;font-size:13px;font-weight:600;cursor:'+(ok?'pointer':'default')+';font-family:var(--font-body)">Continue</button>';}
  h+='</div>';
  root.innerHTML=h;
}

function gen(){
  var a=ans,c=a.concern,c2=a.concern2,cs=[c];if(c2&&c2!=='none')cs.push(c2);
  var hi=a.sensitivity==='high',beg=a.routine==='none'||a.routine==='basic';
  var ls=a.lifestyle||[];
  // AM
  var am=[{s:"Cleanser",p:hi?"Gentle cream cleanser (fragrance-free)":"Gentle cleanser",n:a.skin_type==='oily'?"Cleanse AM and PM":"Water rinse AM is fine if not oily",e:null}];
  if(cs.indexOf('pigmentation')>=0&&!hi)am.push({s:"Vitamin C Serum",p:hi?"Ascorbyl glucoside 10%":"L-Ascorbic acid 10–15%",n:"Apply to dry skin. Antioxidant + brightening.",e:"Strong"});
  else if(cs.indexOf('ageing')>=0&&!hi)am.push({s:"Vitamin C Serum",p:"L-Ascorbic acid 10–15% + vit E + ferulic acid",n:"Gold standard AM antioxidant. Boosts sunscreen protection.",e:"Strong"});
  else if(!hi&&!beg)am.push({s:"Niacinamide 4–5%",p:"Niacinamide serum",n:"Oil control, barrier support, mild brightening.",e:"Strong"});
  if(c==='rosacea'||(hi&&beg))am.push({s:"Calming serum",p:"Centella asiatica / madecassoside",n:"Anti-inflammatory, barrier support. Very well tolerated.",e:"Moderate"});
  am.push({s:"Moisturiser",p:a.skin_type==='oily'?"Lightweight gel moisturiser":"Ceramide-rich moisturiser",n:"Look for ceramides, cholesterol, fatty acids",e:null});
  var spf=a.sun==='high'?'SPF 50+':'SPF 30+';
  am.push({s:"Sunscreen",p:(c==='rosacea'||hi?'Mineral sunscreen ':'Broad-spectrum sunscreen ')+spf,n:"Non-negotiable. Highest-impact single step.",e:"Strong"});
  // PM
  var pm=[{s:"Cleanser",p:"Gentle cleanser",n:a.sun==='high'?"Double cleanse to remove sunscreen":"Single cleanse is sufficient",e:null}];
  if(c==='acne')pm.push({s:"Azelaic acid "+(hi?"10%":"10–15%"),p:"Azelaic acid",n:"Anti-bacterial + anti-inflammatory + pigmentation support.",e:"Strong"});
  else if(c==='ageing')pm.push({s:beg||hi?"Retinol 0.25%":"Retinol 0.5% or Tretinoin 0.025%",p:"Retinoid",n:beg?"Start 2 nights/week on DRY skin. Increase gradually.":"Step up if tolerating lower strength well.",e:"Strong"});
  else if(c==='pigmentation')pm.push({s:"Azelaic acid 10–15%",p:"Azelaic acid",n:"Tyrosinase inhibitor. Can combine with tranexamic acid.",e:"Strong"});
  else if(c==='rosacea')pm.push({s:"Niacinamide 4–5%",p:"Niacinamide serum",n:"Barrier support, anti-inflammatory. Most rosacea skin tolerates this.",e:"Strong"});
  else if(c==='barrier')pm.push({s:"No actives",p:"Skip all actives during repair",n:"Stop everything until skin no longer stings with basic products.",e:null});
  else pm.push({s:"Niacinamide 4–5%",p:"Niacinamide serum",n:"Most versatile well-tolerated active.",e:"Strong"});
  if(!beg&&!hi&&c!=='barrier'){
    if(cs.indexOf('ageing')>=0&&c!=='ageing')pm.push({s:"Retinol 0.25% (alternate nights)",p:"Low-strength retinol",n:"Alternate with primary PM active.",e:"Strong"});
    if(cs.indexOf('texture')>=0)pm.push({s:"Glycolic acid 5–8% (2x/week)",p:"AHA exfoliant",n:"Use on nights without retinol.",e:"Strong"});
  }
  pm.push({s:"Moisturiser",p:a.skin_type==='dry'||c==='barrier'?"Rich ceramide moisturiser":"Ceramide moisturiser",n:c==='barrier'?"Apply generously. Add occlusive on top.":"Seals in actives, supports barrier.",e:null});
  if(c==='barrier'||a.skin_type==='dry')pm.push({s:"Occlusive (optional)",p:"Petrolatum, squalane, or sleeping mask",n:"Seals moisture overnight.",e:null});

  // Supplements
  var su=[];
  if(a.sun!=='high')su.push({name:"Vitamin D3",dose:"1,000–2,000 IU daily",timing:"With largest meal",why:"Daily sunscreen blocks 95%+ of skin vitamin D synthesis.",ev:"Moderate",pri:"High"});
  if(a.diet!=='varied'||cs.indexOf('acne')>=0||cs.indexOf('rosacea')>=0||a.skin_type==='dry')su.push({name:"Omega-3 (EPA+DHA)",dose:"1–2g combined",timing:"With a fat-containing meal",why:c==='acne'?"Reduces systemic inflammation for acne.":"Supports barrier lipids and anti-inflammatory pathways.",ev:"Moderate",pri:"High"});
  if(cs.indexOf('acne')>=0)su.push({name:"Zinc (picolinate)",dose:"30mg elemental daily",timing:"With food. Not with iron/calcium.",why:"Meta-analyses: acne patients have lower zinc. 30mg reduces lesions.",ev:"Moderate",pri:"High"});
  if(cs.indexOf('ageing')>=0&&(a.age==='35-44'||a.age==='45-54'||a.age==='55+'))su.push({name:"Collagen peptides",dose:"5–10g daily",timing:"Any time",why:"Moderate RCT evidence for hydration and elasticity at 8–12 weeks.",ev:"Moderate",pri:"Medium"});
  if(a.sun==='high'||(cs.indexOf('ageing')>=0&&(a.age==='45-54'||a.age==='55+')))su.push({name:"Nicotinamide (B3)",dose:"500mg twice daily",timing:"Morning and evening",why:"ONTRAC trial: 23% reduction in skin cancers. Boosts NAD+ for DNA repair.",ev:"Strong",pri:a.sun==='high'?"High":"Medium"});
  if(ls.indexOf('stress')>=0||ls.indexOf('sleep_poor')>=0)su.push({name:"Magnesium glycinate",dose:"200–400mg",timing:"Before bed",why:ls.indexOf('sleep_poor')>=0?"Improves sleep. Poor sleep impairs barrier recovery.":"Supports stress management. Chronic cortisol breaks down collagen.",ev:"Moderate",pri:"Medium"});
  if(ls.indexOf('smoker')>=0||a.diet==='high_processed')su.push({name:"Vitamin C",dose:"200–500mg daily",timing:"Any time",why:ls.indexOf('smoker')>=0?"Smokers need 35mg/day more. Essential for collagen.":"Low produce = likely suboptimal vitamin C.",ev:"Strong",pri:"Medium"});
  if(a.diet==='plant'){
    if(!su.find(function(x){return x.name.indexOf('Zinc')>=0}))su.push({name:"Zinc (picolinate)",dose:"15–25mg daily",timing:"With food",why:"Plant-based diets have lower zinc bioavailability due to phytates.",ev:"Moderate",pri:"Medium"});
    if(!su.find(function(x){return x.name.indexOf('Omega')>=0}))su.push({name:"Algae-derived Omega-3",dose:"500mg–1g EPA+DHA",timing:"With a meal",why:"Flaxseed ALA converts to EPA/DHA at under 5%. Algae provides preformed.",ev:"Moderate",pri:"High"});
  }

  // Nutrition
  var nu=[];
  if(cs.indexOf('acne')>=0){nu.push({r:"Reduce high-glycaemic foods",d:"White bread, sugary drinks, processed snacks. High GI diets worsen acne.",ev:"Moderate"});nu.push({r:"Increase omega-3 rich foods",d:"Fatty fish 2–3x/week. Reduces inflammatory mediators.",ev:"Moderate"});}
  if(cs.indexOf('ageing')>=0){nu.push({r:"Prioritise antioxidant-rich foods",d:"Berries, leafy greens, green tea, dark chocolate. Polyphenols inhibit MMPs.",ev:"Moderate"});nu.push({r:"Ensure adequate protein",d:"1.2–1.6g/kg body weight for collagen synthesis amino acids.",ev:"Strong"});}
  if(cs.indexOf('pigmentation')>=0)nu.push({r:"Increase vitamin C-rich foods",d:"Bell peppers, kiwi, citrus. Vitamin C inhibits tyrosinase.",ev:"Strong"});
  if(a.skin_type==='dry'||c==='barrier')nu.push({r:"Increase healthy fats",d:"Avocado, olive oil, nuts, fatty fish. Supports barrier lipids from inside.",ev:"Moderate"});
  nu.push({r:"Stay hydrated",d:"2–3L water daily. Dehydration increases transepidermal water loss.",ev:"Moderate"});
  if(ls.indexOf('alcohol')>=0)nu.push({r:"Moderate alcohol",d:"Dehydrates, promotes inflammation, dilates blood vessels, depletes vitamin A.",ev:"Moderate"});

  var notes=[];
  if(beg)notes.push("Start with core steps only. Add one new active at a time, waiting 2 weeks between.");
  if(hi)notes.push("Patch test everything. Apply behind your ear for 48 hours before facial use.");
  notes.push("Give this protocol 8–12 weeks before evaluating. Skin changes are gradual.");
  notes.push("This is educational. For persistent or severe concerns, consult a dermatologist.");

  return {am:am,pm:pm,su:su,nu:nu,notes:notes};
}

function renderRoutine(title,emoji,steps){
  var h='<div style="background:var(--bg-card);border:1.5px solid var(--border-light);border-radius:16px;overflow:hidden;margin-bottom:12px">';
  h+='<div style="padding:12px 20px;background:var(--bg-warm);border-bottom:1px solid var(--border-light);font-size:13px;font-weight:600;display:flex;align-items:center;gap:8px">'+emoji+' '+title+'</div>';
  h+='<div style="padding:16px 20px">';
  steps.forEach(function(s,i){
    h+='<div style="display:flex;gap:12px;padding:10px 0;border-bottom:'+(i<steps.length-1?'1px solid var(--bg-warm)':'none')+'">';
    h+='<div style="width:26px;height:26px;border-radius:50%;background:var(--accent-wash);color:var(--accent);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;flex-shrink:0;font-family:var(--font-mono)">'+(i+1)+'</div>';
    h+='<div style="flex:1"><div style="display:flex;align-items:center;gap:8px;margin-bottom:2px"><span style="font-size:13px;font-weight:600;color:var(--text)">'+s.s+'</span>'+ev(s.e)+'</div>';
    h+='<div style="font-size:12px;color:var(--accent);font-weight:500;margin-bottom:2px">'+s.p+'</div>';
    h+='<div style="font-size:11px;color:var(--text-muted);line-height:1.5">'+s.n+'</div></div></div>';
  });
  h+='</div></div>';return h;
}

function renderResult(){
  var p=gen();
  var h=renderRoutine("AM Routine","☀️",p.am)+renderRoutine("PM Routine","🌙",p.pm);
  // Supplements
  if(p.su.length>0){
    h+='<div style="background:var(--bg-card);border:1.5px solid var(--border-light);border-radius:16px;overflow:hidden;margin-bottom:12px">';
    h+='<div style="padding:12px 20px;background:var(--bg-warm);border-bottom:1px solid var(--border-light);font-size:13px;font-weight:600">💊 Supplement Stack</div><div style="padding:16px 20px">';
    p.su.forEach(function(s,i){
      h+='<div style="padding:12px 0;border-bottom:'+(i<p.su.length-1?'1px solid var(--bg-warm)':'none')+'">';
      h+='<div style="display:flex;align-items:center;gap:8px;margin-bottom:3px"><span style="font-size:13px;font-weight:600;color:var(--text)">'+s.name+'</span>'+ev(s.ev);
      var pc=s.pri==='High'?'var(--accent)':'var(--gold)';
      h+='<span style="font-size:10px;font-weight:600;color:'+pc+';font-family:var(--font-mono);text-transform:uppercase;letter-spacing:0.05em">'+s.pri+' priority</span></div>';
      h+='<div style="font-size:12px;font-family:var(--font-mono);color:var(--accent);margin-bottom:2px">'+s.dose+' · '+s.timing+'</div>';
      h+='<div style="font-size:11px;color:var(--text-muted);line-height:1.5">'+s.why+'</div></div>';
    });
    h+='</div></div>';
  }
  // Nutrition
  h+='<div style="background:var(--bg-card);border:1.5px solid var(--border-light);border-radius:16px;overflow:hidden;margin-bottom:12px">';
  h+='<div style="padding:12px 20px;background:var(--bg-warm);border-bottom:1px solid var(--border-light);font-size:13px;font-weight:600">🥗 Nutrition Recommendations</div><div style="padding:16px 20px">';
  p.nu.forEach(function(n,i){
    h+='<div style="padding:10px 0;border-bottom:'+(i<p.nu.length-1?'1px solid var(--bg-warm)':'none')+'"><div style="display:flex;align-items:center;gap:8px;margin-bottom:2px"><span style="font-size:13px;font-weight:600;color:var(--text)">'+n.r+'</span>'+ev(n.ev)+'</div>';
    h+='<div style="font-size:11px;color:var(--text-muted);line-height:1.5">'+n.d+'</div></div>';
  });
  h+='</div></div>';
  // Notes
  h+='<div style="padding:20px;background:var(--accent-wash);border:1.5px solid var(--tip-border);border-radius:16px;margin-bottom:16px"><h3 style="font-size:13px;font-weight:600;color:var(--accent);margin-bottom:8px">Important Notes</h3>';
  p.notes.forEach(function(n){h+='<p style="font-size:12px;color:var(--text-secondary);line-height:1.6;margin-bottom:6px">• '+n+'</p>'});
  h+='</div>';
  h+='<div style="text-align:center;margin-top:16px"><button onclick="window._pgRestart()" style="padding:10px 28px;background:transparent;border:1.5px solid var(--border-light);border-radius:100px;font-size:13px;font-weight:600;cursor:pointer;color:var(--text-secondary);font-family:var(--font-body)">Start Over</button></div>';
  root.innerHTML=h;
}

window._pgSelect=function(id){
  var s=STEPS[step],q=QS[s];
  if(q.multi){
    var curr=ans[s]||[];
    if(id==='none_ls')ans[s]=['none_ls'];
    else{var n=curr.indexOf(id)>=0?curr.filter(function(x){return x!==id}):curr.filter(function(x){return x!=='none_ls'}).concat([id]);ans[s]=n;}
    renderStep();
  }else{ans[s]=id;setTimeout(function(){if(step<STEPS.length-1){step++;renderStep()}else renderResult()},200);}
};
window._pgNext=function(){if(step<STEPS.length-1){step++;renderStep()}else renderResult()};
window._pgBack=function(){if(step>0){step--;renderStep()}};
window._pgRestart=function(){step=0;ans={};renderStep()};
renderStep();
})();
