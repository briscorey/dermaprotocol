/* DermaProtocol — Timeline Tracker */
(function(){
var TL={
retinol:{name:"Retinol (0.25–0.5%)",cat:"Retinoid",phases:[
{w:0,e:2,l:"Adjustment",d:"Possible mild dryness, flaking, tightness. Normal — your skin is adapting.",c:"#B86420",i:"🔄"},
{w:2,e:6,l:"Retinisation",d:"Peeling, sensitivity, possible purging. The hardest phase — it passes.",c:"#A84040",i:"⚡"},
{w:6,e:12,l:"Texture improvement",d:"Skin begins feeling smoother. Pores may appear smaller.",c:"#A68A30",i:"✨"},
{w:12,e:24,l:"Visible results",d:"Fine lines soften. Tone evens out. Pigmentation fades.",c:"#3D7A52",i:"🎯"},
{w:24,e:52,l:"Collagen remodelling",d:"Deeper wrinkle reduction. Firmer skin. 3-12 months for structural change.",c:"#3D7A52",i:"💎"}
],ev:"Strong — decades of RCTs",tip:"Don't increase frequency until retinisation passes. More is not better during adaptation."},

tretinoin:{name:"Tretinoin (Rx)",cat:"Retinoid",phases:[
{w:0,e:4,l:"Retinisation (intense)",d:"Peeling, redness, dryness. More intense than OTC retinol. Buffer with moisturiser.",c:"#A84040",i:"⚡"},
{w:4,e:8,l:"Adaptation",d:"Irritation subsides. Skin adjusts to new turnover rate.",c:"#B86420",i:"🔄"},
{w:8,e:16,l:"Texture + tone",d:"Smoother skin, reduced fine lines, improved pigmentation.",c:"#A68A30",i:"✨"},
{w:16,e:52,l:"Full remodelling",d:"Progressive collagen rebuilding. Peak results at 6-12 months.",c:"#3D7A52",i:"💎"}
],ev:"Strong — gold standard",tip:"Tretinoin improves skin for up to 2 years of consistent use. Long-term investment."},

vitamin_c:{name:"Vitamin C Serum (L-AA)",cat:"Antioxidant",phases:[
{w:0,e:2,l:"Antioxidant protection",d:"UV free radical scavenging is immediate. Photoprotection from day one.",c:"#3D7A52",i:"🛡️"},
{w:2,e:8,l:"Brightness boost",d:"Skin appears brighter. Tyrosinase inhibition starts evening tone.",c:"#A68A30",i:"✨"},
{w:8,e:16,l:"Pigmentation fading",d:"Dark spots and PIH visibly lighten with consistent AM use.",c:"#3D7A52",i:"🎯"},
{w:16,e:24,l:"Collagen stimulation",d:"Measurable collagen density increase. Skin feels firmer.",c:"#3D7A52",i:"💎"}
],ev:"Strong",tip:"Store in cool, dark place. If serum turns brown/orange, it's oxidised — replace it."},

niacinamide:{name:"Niacinamide (4-5%)",cat:"Vitamin B3",phases:[
{w:0,e:2,l:"Barrier support begins",d:"Ceramide synthesis stimulation starts. Skin may feel more comfortable.",c:"#A68A30",i:"🛡️"},
{w:2,e:8,l:"Oil control + pores",d:"Sebum normalises. Pores less congested. Mild brightening.",c:"#3D7A52",i:"✨"},
{w:8,e:16,l:"Full benefits",d:"Barrier noticeably stronger. Pigmentation fading. Oil control established.",c:"#3D7A52",i:"🎯"}
],ev:"Strong",tip:"One of the most well-tolerated actives. Can use AM and PM. Works with nearly everything."},

azelaic:{name:"Azelaic Acid (10-15%)",cat:"Multi-functional",phases:[
{w:0,e:4,l:"Anti-bacterial action",d:"Reducing C. acnes and calming inflammation. Mild tingling normal.",c:"#A68A30",i:"🔄"},
{w:4,e:12,l:"Acne + pigmentation",d:"Inflammatory lesions reduce. Post-acne marks start fading.",c:"#3D7A52",i:"✨"},
{w:12,e:24,l:"Sustained improvement",d:"Significant reduction in lesions and hyperpigmentation.",c:"#3D7A52",i:"🎯"}
],ev:"Strong",tip:"More effective at Rx strength (15-20%). Suitable for rosacea and pregnancy."},

aha:{name:"AHAs (Glycolic/Lactic)",cat:"Exfoliant",phases:[
{w:0,e:2,l:"Surface exfoliation",d:"Dead cells shed faster. Smoother feel almost immediately.",c:"#A68A30",i:"⚡"},
{w:2,e:6,l:"Texture refinement",d:"Rough patches smooth. Skin reflects light more evenly — the 'glow'.",c:"#3D7A52",i:"✨"},
{w:6,e:12,l:"Pigmentation + tone",d:"Sun damage and PIH begin to fade. Tone evens significantly.",c:"#3D7A52",i:"🎯"},
{w:12,e:24,l:"Collagen stimulation",d:"At adequate concentration/pH, glycolic acid stimulates collagen.",c:"#3D7A52",i:"💎"}
],ev:"Strong",tip:"SPF is non-negotiable with AHAs. Start 2x/week and increase slowly."},

collagen_supp:{name:"Collagen Peptides (5-10g oral)",cat:"Supplement",phases:[
{w:0,e:4,l:"Absorption phase",d:"Peptides absorbed and reaching dermis. No visible change yet.",c:"#7A7D76",i:"🔄"},
{w:4,e:8,l:"Hydration improvement",d:"Some studies show measurable hydration increase at 4-8 weeks.",c:"#A68A30",i:"💧"},
{w:8,e:16,l:"Elasticity improvement",d:"RCTs show improved elasticity at 8-12 weeks. Skin feels firmer.",c:"#3D7A52",i:"✨"},
{w:16,e:24,l:"Wrinkle reduction",d:"Some studies show measurable wrinkle depth reduction at 12-24 weeks.",c:"#3D7A52",i:"🎯"}
],ev:"Moderate — growing RCT support",tip:"Take with vitamin C for optimal collagen hydroxylation. Consistency over months matters."},

omega3_supp:{name:"Omega-3 (1-2g EPA+DHA oral)",cat:"Supplement",phases:[
{w:0,e:4,l:"Membrane incorporation",d:"EPA/DHA incorporating into cell membranes. Anti-inflammatory shift begins.",c:"#7A7D76",i:"🔄"},
{w:4,e:8,l:"Inflammation reduction",d:"Systemic markers decreasing. Skin may appear less red/irritated.",c:"#A68A30",i:"✨"},
{w:8,e:16,l:"Barrier improvement",d:"Barrier lipid composition improves. Skin feels less dry.",c:"#3D7A52",i:"🛡️"},
{w:16,e:24,l:"Full benefit",d:"Optimal anti-inflammatory and barrier benefits established.",c:"#3D7A52",i:"🎯"}
],ev:"Moderate",tip:"Take with a fat-containing meal. Higher EPA ratio better for inflammatory conditions."},

zinc_supp:{name:"Zinc (30mg oral)",cat:"Supplement",phases:[
{w:0,e:4,l:"Zinc levels rising",d:"Serum zinc normalises. Immune function improving.",c:"#A68A30",i:"🔄"},
{w:4,e:12,l:"Acne improvement",d:"Meta-analyses show significant inflammatory acne reduction by 8-12 weeks.",c:"#3D7A52",i:"🎯"}
],ev:"Moderate",tip:"Picolinate or bisglycinate absorb best. Take with food. Don't exceed 40mg long-term."},

spf:{name:"Daily Sunscreen (SPF 30+)",cat:"Photoprotection",phases:[
{w:0,e:1,l:"Immediate UV protection",d:"UV damage prevention is instant. Every day prevents future damage.",c:"#3D7A52",i:"🛡️"},
{w:4,e:12,l:"Pigmentation fading",d:"Without ongoing UV stimulus, existing melanin sheds through turnover.",c:"#A68A30",i:"✨"},
{w:12,e:52,l:"Visible reversal",d:"Consistent daily SPF is the single highest-ROI anti-ageing step.",c:"#3D7A52",i:"💎"}
],ev:"Strong — highest of any skincare",tip:"Reapply every 2 hours during sun exposure. No other product has this evidence level."}
};

var ITEMS=Object.keys(TL).map(function(id){return {id:id,name:TL[id].name,cat:TL[id].cat}});
var root=document.getElementById("timelineApp"),selId=null,startDate="";

function fmt(d){return d.toLocaleDateString("en-GB",{day:"numeric",month:"short"})}

function renderSelect(){
  var h='<div style="margin-bottom:16px"><label style="font-size:12px;font-weight:600;color:var(--text-secondary);display:block;margin-bottom:6px">What did you start?</label>';
  h+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">';
  ITEMS.forEach(function(item){
    var a=selId===item.id;
    h+='<button onclick="window._tlSelect(\''+item.id+'\')" style="padding:10px 14px;text-align:left;background:'+(a?'var(--accent-wash)':'var(--bg-card)')+';border:1.5px solid '+(a?'var(--accent)':'var(--border-light)')+';border-radius:12px;cursor:pointer;font-family:var(--font-body)">';
    h+='<div style="font-size:13px;font-weight:600;color:'+(a?'var(--accent)':'var(--text)')+'">'+item.name+'</div>';
    h+='<div style="font-size:10px;color:var(--text-muted);font-family:var(--font-mono)">'+item.cat+'</div></button>';
  });
  h+='</div></div>';

  if(selId){
    h+='<div style="margin-bottom:24px"><label style="font-size:12px;font-weight:600;color:var(--text-secondary);display:block;margin-bottom:6px">When did you start?</label>';
    h+='<input type="date" id="tlDate" value="'+startDate+'" onchange="window._tlDate(this.value)" style="padding:10px 16px;border:1.5px solid var(--border-light);border-radius:12px;font-size:13px;font-family:var(--font-body);background:var(--bg-card);color:var(--text);outline:none;max-width:240px;width:100%"></div>';
  }

  if(selId&&startDate){
    var tl=TL[selId],start=new Date(startDate),now=new Date();
    h+='<div style="display:flex;align-items:center;gap:8px;margin-bottom:16px;padding:8px 14px;background:var(--accent-wash);border-radius:10px">';
    h+='<span style="font-size:10px;font-weight:700;color:var(--accent);font-family:var(--font-mono);letter-spacing:0.06em;text-transform:uppercase">Evidence: '+tl.ev+'</span></div>';

    h+='<div style="position:relative;padding-left:30px">';
    h+='<div style="position:absolute;left:13px;top:8px;bottom:8px;width:2px;background:var(--border-light)"></div>';

    tl.phases.forEach(function(p){
      var from=new Date(start);from.setDate(from.getDate()+p.w*7);
      var to=new Date(start);to.setDate(to.getDate()+p.e*7);
      var prog=Math.max(0,Math.min(1,(now-from)/(to-from)));
      var st=now<from?"upcoming":now>to?"complete":"active";
      var dotBg=st==="complete"?"var(--accent)":st==="active"?p.c:"var(--border-light)";

      h+='<div style="position:relative;margin-bottom:20px;padding-left:24px">';
      h+='<div style="position:absolute;left:-24px;top:4px;width:18px;height:18px;border-radius:50%;background:'+dotBg+';'+(st==="active"?'border:3px solid '+p.c+'40;':'')+';display:flex;align-items:center;justify-content:center">';
      if(st==="complete")h+='<span style="color:var(--bg);font-size:10px">✓</span>';
      h+='</div>';

      h+='<div style="padding:14px 18px;background:'+(st==="active"?p.c+'08':'var(--bg-card)')+';border:1.5px solid '+(st==="active"?p.c+'30':'var(--border-light)')+';border-radius:14px;opacity:'+(st==="upcoming"?'0.6':'1')+'">';
      h+='<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px">';
      h+='<div style="display:flex;align-items:center;gap:6px"><span style="font-size:14px">'+p.i+'</span><span style="font-size:13px;font-weight:600;color:'+(st==="active"?p.c:'var(--text)')+'">'+p.l+'</span></div>';
      h+='<span style="font-size:10px;color:var(--text-muted);font-family:var(--font-mono)">'+(p.w===0?'Start':'Week '+p.w)+' → Week '+p.e+'</span></div>';

      h+='<div style="font-size:10px;color:'+(st==="complete"?'var(--accent)':'var(--text-light)')+';font-family:var(--font-mono);margin-bottom:6px">';
      h+=fmt(from)+' — '+fmt(to);
      if(st==="complete")h+=' ✓ Complete';
      if(st==="active")h+=' (You are here — '+Math.round(prog*100)+'% through)';
      h+='</div>';

      if(st==="active"){
        h+='<div style="height:4px;background:var(--border-light);border-radius:2px;margin-bottom:8px"><div style="height:100%;width:'+(prog*100)+'%;background:'+p.c+';border-radius:2px"></div></div>';
      }

      h+='<p style="font-size:12px;color:var(--text-secondary);line-height:1.6">'+p.d+'</p>';
      h+='</div></div>';
    });
    h+='</div>';

    h+='<div style="padding:16px;background:var(--accent-wash);border:1.5px solid rgba(61,122,82,0.15);border-radius:14px;margin-top:8px;margin-bottom:16px">';
    h+='<h3 style="font-size:12px;font-weight:600;color:var(--accent);margin-bottom:4px">Key Insight</h3>';
    h+='<p style="font-size:12px;color:var(--text-secondary);line-height:1.6">'+tl.tip+'</p></div>';

    h+='<div style="text-align:center"><button onclick="window._tlReset()" style="padding:10px 28px;background:transparent;border:1.5px solid var(--border-light);border-radius:100px;font-size:13px;font-weight:600;cursor:pointer;color:var(--text-secondary);font-family:var(--font-body)">Track Something Else</button></div>';
  }
  root.innerHTML=h;
}

window._tlSelect=function(id){selId=id;renderSelect()};
window._tlDate=function(d){startDate=d;renderSelect()};
window._tlReset=function(){selId=null;startDate="";renderSelect()};
renderSelect();
})();
