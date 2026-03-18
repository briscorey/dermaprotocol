/* DermaProtocol — Interaction Matrix */
(function(){
var ITEMS=[
{id:"retinol",name:"Retinol",t:"topical"},{id:"vitc_top",name:"Vit C (topical)",t:"topical"},
{id:"niacin_top",name:"Niacinamide",t:"topical"},{id:"aha",name:"AHAs",t:"topical"},
{id:"bha",name:"BHA (Salicylic)",t:"topical"},{id:"azelaic",name:"Azelaic Acid",t:"topical"},
{id:"benzoyl",name:"Benzoyl Peroxide",t:"topical"},{id:"ceramides",name:"Ceramides",t:"topical"},
{id:"hyaluronic",name:"Hyaluronic Acid",t:"topical"},{id:"spf",name:"Sunscreen",t:"topical"},
{id:"vitc_oral",name:"Vit C (oral)",t:"supplement"},{id:"vitd",name:"Vitamin D3",t:"supplement"},
{id:"omega3",name:"Omega-3",t:"supplement"},{id:"zinc_oral",name:"Zinc (oral)",t:"supplement"},
{id:"collagen",name:"Collagen",t:"supplement"},{id:"nicotinamide",name:"Nicotinamide",t:"supplement"},
{id:"selenium",name:"Selenium",t:"supplement"},{id:"astaxanthin",name:"Astaxanthin",t:"supplement"},
{id:"magnesium",name:"Magnesium",t:"supplement"},{id:"probiotics",name:"Probiotics",t:"supplement"}
];
var IX={
"retinol|vitc_top":{type:"caution",title:"Use at different times",desc:"Both effective but irritating together. Vitamin C AM, retinol PM."},
"retinol|aha":{type:"conflict",title:"Avoid same night",desc:"Both exfoliate. Together = barrier damage. Alternate nights."},
"retinol|bha":{type:"caution",title:"Alternate or buffer",desc:"BHA gentler than AHAs with retinol but still increases irritation."},
"retinol|azelaic":{type:"synergy",title:"Complementary actives",desc:"Excellent combo for acne + pigmentation. Azelaic may buffer retinol irritation."},
"retinol|benzoyl":{type:"conflict",title:"BP degrades retinol",desc:"Benzoyl peroxide oxidises retinol. Use at different times of day."},
"retinol|ceramides":{type:"synergy",title:"Essential pairing",desc:"Ceramide moisturiser after retinol supports barrier and reduces irritation."},
"retinol|hyaluronic":{type:"synergy",title:"Hydration support",desc:"HA before retinol buffers dryness. Apply HA to damp skin first."},
"retinol|spf":{type:"synergy",title:"Mandatory pairing",desc:"Retinol increases photosensitivity. SPF next morning is non-negotiable."},
"retinol|vitc_oral":{type:"synergy",title:"Inside-out collagen",desc:"Retinol stimulates collagen genes. Oral vitamin C provides the synthesis cofactor."},
"retinol|collagen":{type:"synergy",title:"Complementary",desc:"Retinol upregulates synthesis. Oral collagen provides building blocks."},
"retinol|nicotinamide":{type:"synergy",title:"NAD+ and repair",desc:"Nicotinamide boosts DNA repair. Retinol increases turnover. Complementary."},
"retinol|niacin_top":{type:"synergy",title:"Ideal combination",desc:"Niacinamide reduces retinol irritation while adding barrier support."},
"vitc_top|aha":{type:"caution",title:"pH sensitivity",desc:"Both need low pH. Layer can irritate. Use at different times."},
"vitc_top|azelaic":{type:"synergy",title:"Brightening powerhouse",desc:"Both inhibit melanin via different pathways. Excellent for pigmentation."},
"vitc_top|benzoyl":{type:"conflict",title:"Oxidation risk",desc:"BP oxidises L-ascorbic acid. Vitamin C AM, BP PM."},
"vitc_top|spf":{type:"synergy",title:"Photoprotection boost",desc:"Vitamin C + SPF is the gold standard AM. Neutralises free radicals SPF misses."},
"vitc_top|vitc_oral":{type:"synergy",title:"Different mechanisms",desc:"Topical reaches 20-40x higher skin levels. Oral supports systemic collagen. Both optimal."},
"vitc_top|niacin_top":{type:"synergy",title:"Safe to combine",desc:"Old myth they conflict is debunked. Complementary benefits."},
"niacin_top|aha":{type:"synergy",title:"Buffering effect",desc:"Niacinamide calms AHA irritation. Use AHA first, then niacinamide."},
"niacin_top|nicotinamide":{type:"caution",title:"Same molecule",desc:"Both are vitamin B3. Topical = barrier/oil. Oral = NAD+/DNA repair. Complementary."},
"aha|bha":{type:"caution",title:"Double exfoliation",desc:"Both exfoliate differently. Choose one per session or alternate."},
"aha|azelaic":{type:"caution",title:"Irritation stacking",desc:"Both acids. Use on alternate nights."},
"aha|spf":{type:"synergy",title:"SPF mandatory",desc:"AHAs increase photosensitivity. Daily SPF 30+ essential."},
"bha|azelaic":{type:"synergy",title:"Acne combination",desc:"BHA clears pores, azelaic kills bacteria. Excellent for inflammatory acne."},
"benzoyl|zinc_oral":{type:"synergy",title:"Dual antibacterial",desc:"BP kills C. acnes topically. Oral zinc is anti-inflammatory. Additive benefit."},
"benzoyl|azelaic":{type:"caution",title:"Potential irritation",desc:"Both effective for acne but combining increases dryness. Alternate."},
"ceramides|omega3":{type:"synergy",title:"Inside-out barrier",desc:"Topical ceramides + oral omega-3 = the definitive barrier repair strategy."},
"ceramides|hyaluronic":{type:"synergy",title:"Perfect layering",desc:"HA draws water in, ceramides lock it in. The ideal hydration sequence."},
"spf|vitd":{type:"synergy",title:"Essential supplementation",desc:"Daily SPF blocks 95%+ of skin vitamin D synthesis. Supplement 1,000-2,000 IU."},
"spf|astaxanthin":{type:"synergy",title:"Internal photoprotection",desc:"Astaxanthin provides modest internal UV defence. Doesn't replace SPF."},
"spf|nicotinamide":{type:"synergy",title:"DNA repair support",desc:"SPF prevents. Nicotinamide repairs what gets through. ONTRAC: 23% fewer skin cancers."},
"vitc_oral|collagen":{type:"synergy",title:"Collagen synthesis",desc:"Vitamin C is essential cofactor for collagen hydroxylation. Take together."},
"vitc_oral|zinc_oral":{type:"caution",title:"Timing matters",desc:"High-dose vitamin C may reduce zinc absorption. Separate by 2 hours."},
"vitd|magnesium":{type:"synergy",title:"Activation support",desc:"Magnesium converts vitamin D to active form. Low Mg limits D efficacy."},
"zinc_oral|omega3":{type:"synergy",title:"Anti-inflammatory stack",desc:"Both reduce inflammation via different pathways. Complementary for acne."},
"zinc_oral|magnesium":{type:"caution",title:"Absorption competition",desc:"High zinc + magnesium compete. Zinc with lunch, magnesium before bed."},
"zinc_oral|selenium":{type:"caution",title:"Mineral balance",desc:"High zinc over time depletes copper. Keep zinc 15-30mg, ensure copper intake."},
"collagen|omega3":{type:"synergy",title:"Structural support",desc:"Collagen provides structure. Omega-3 supports the surrounding lipid matrix."},
"probiotics|omega3":{type:"synergy",title:"Gut-skin axis",desc:"Probiotics + omega-3 support the gut-skin connection linked to skin health."},
"astaxanthin|vitc_oral":{type:"synergy",title:"Antioxidant network",desc:"Fat-soluble + water-soluble. Together cover both compartments of defence."},
"astaxanthin|omega3":{type:"synergy",title:"Lipid protection",desc:"Astaxanthin protects omega-3 from oxidation. May preserve efficacy."},
"nicotinamide|zinc_oral":{type:"synergy",title:"Acne stack",desc:"Nicotinamide + zinc address multiple acne pathways without irritation."},
"nicotinamide|vitc_oral":{type:"synergy",title:"Antioxidant + repair",desc:"Vitamin C for defence. Nicotinamide for NAD+ and DNA repair. Complementary."},
"retinol|omega3":{type:"synergy",title:"Anti-inflammatory",desc:"Omega-3 may reduce retinisation side effects via systemic anti-inflammatory action."}
};
var TC={synergy:{c:"#3D7A52",bg:"rgba(61,122,82,0.12)",l:"Synergy",e:"✅"},caution:{c:"#A68A30",bg:"rgba(166,138,48,0.12)",l:"Caution",e:"⚠️"},conflict:{c:"#A84040",bg:"rgba(168,64,64,0.12)",l:"Conflict",e:"🚫"},neutral:{c:"#7A7D76",bg:"rgba(122,125,118,0.08)",l:"Neutral",e:"—"}};
var filter="all",root=document.getElementById("matrixApp");

function gi(a,b){return IX[a+"|"+b]||IX[b+"|"+a]||null}

function render(sel){
  var items=filter==="all"?ITEMS:ITEMS.filter(function(i){return i.t===filter});
  var h='<div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin-bottom:12px">';
  Object.keys(TC).forEach(function(k){var c=TC[k];h+='<div style="display:flex;align-items:center;gap:4px"><div style="width:14px;height:14px;border-radius:3px;background:'+c.bg+';border:1.5px solid '+c.c+'"></div><span style="font-size:11px;color:var(--text-secondary)">'+c.l+'</span></div>'});
  h+='</div>';
  h+='<div style="display:flex;gap:6px;justify-content:center;margin-bottom:16px">';
  [["all","All"],["topical","Topicals"],["supplement","Supplements"]].forEach(function(f){
    h+='<button onclick="window._mxFilter(\''+f[0]+'\')" style="padding:5px 14px;font-size:11px;font-weight:600;border-radius:100px;border:1.5px solid '+(filter===f[0]?'var(--accent)':'var(--border-light)')+';background:'+(filter===f[0]?'var(--accent-wash)':'var(--bg-card)')+';color:'+(filter===f[0]?'var(--accent)':'var(--text-muted)')+';cursor:pointer;font-family:var(--font-body)">'+f[1]+'</button>';
  });
  h+='</div>';
  h+='<div style="overflow-x:auto"><table style="border-collapse:separate;border-spacing:2px;width:100%"><thead><tr><th style="width:100px"></th>';
  items.forEach(function(col){h+='<th style="font-size:8px;font-weight:600;color:'+(col.t==="supplement"?"var(--accent)":"var(--info)")+';padding:3px 1px;text-align:center;font-family:var(--font-mono);writing-mode:vertical-rl;text-orientation:mixed;height:80px;white-space:nowrap">'+col.name+'</th>'});
  h+='</tr></thead><tbody>';
  items.forEach(function(row){
    h+='<tr><td style="font-size:9px;font-weight:600;color:'+(row.t==="supplement"?"var(--accent)":"var(--info)")+';padding:3px 6px;text-align:right;font-family:var(--font-mono);white-space:nowrap">'+row.name+'</td>';
    items.forEach(function(col){
      if(row.id===col.id){h+='<td style="background:var(--bg-muted);border-radius:3px;width:26px;height:26px"></td>';return}
      var ix=gi(row.id,col.id);
      if(!ix){h+='<td style="background:var(--bg-hero);border-radius:3px;width:26px;height:26px"></td>';return}
      var tc=TC[ix.type];
      h+='<td onclick="window._mxClick(\''+row.id+'\',\''+col.id+'\')" style="background:'+tc.bg+';border-radius:3px;width:26px;height:26px;cursor:pointer;text-align:center;font-size:10px;border:1px solid '+tc.c+'33" title="'+row.name+' × '+col.name+'">'+tc.e+'</td>';
    });
    h+='</tr>';
  });
  h+='</tbody></table></div>';

  if(sel){
    var tc=TC[sel.type];
    h+='<div style="margin-top:20px;padding:20px;background:'+tc.bg+';border:1.5px solid '+tc.c+'40;border-radius:16px">';
    h+='<div style="display:flex;align-items:center;gap:8px;margin-bottom:8px"><span style="font-size:18px">'+tc.e+'</span><span style="font-size:10px;font-weight:700;color:'+tc.c+';font-family:var(--font-mono);letter-spacing:0.08em;text-transform:uppercase">'+tc.l+'</span></div>';
    h+='<h3 style="font-family:var(--font-display);font-size:18px;font-weight:500;margin-bottom:4px">'+sel.rn+' × '+sel.cn+'</h3>';
    h+='<h4 style="font-size:14px;font-weight:600;color:'+tc.c+';margin-bottom:8px">'+sel.title+'</h4>';
    h+='<p style="font-size:13px;color:var(--text-secondary);line-height:1.7">'+sel.desc+'</p>';
    h+='<button onclick="window._mxClose()" style="margin-top:12px;padding:6px 16px;background:transparent;border:1px solid '+tc.c+'40;border-radius:100px;font-size:11px;font-weight:600;cursor:pointer;color:var(--text-muted);font-family:var(--font-body)">Close</button></div>';
  }
  root.innerHTML=h;
}

var currentSel=null;
window._mxFilter=function(f){filter=f;render(currentSel)};
window._mxClick=function(a,b){
  var ix=gi(a,b);if(!ix)return;
  var rn=ITEMS.find(function(i){return i.id===a}).name;
  var cn=ITEMS.find(function(i){return i.id===b}).name;
  currentSel={type:ix.type,title:ix.title,desc:ix.desc,rn:rn,cn:cn};
  render(currentSel);
};
window._mxClose=function(){currentSel=null;render(null)};
render(null);
})();
