/* DermaProtocol — Ingredient Decoder */
(function(){
var DB={
"retinol":{cat:"Retinoid",role:"Active",irr:3,ev:"Strong",desc:"OTC retinoid. Promotes cell turnover, collagen support. Start low, go slow.",tip:"Oral collagen peptides + topical retinol is a complementary inside-out anti-ageing approach."},
"retinal":{cat:"Retinoid",role:"Active",irr:2,ev:"Moderate",desc:"One conversion step closer to retinoic acid than retinol. Potentially faster-acting."},
"retinaldehyde":{cat:"Retinoid",role:"Active",irr:2,ev:"Moderate",desc:"Same as retinal. Found in premium formulations."},
"retinyl palmitate":{cat:"Retinoid",role:"Active",irr:1,ev:"Limited",desc:"Weakest OTC retinoid. Very gentle but less effective."},
"adapalene":{cat:"Retinoid",role:"Active",irr:3,ev:"Strong",desc:"Synthetic retinoid, FDA-approved for acne. More stable and less irritating than tretinoin."},
"tretinoin":{cat:"Retinoid",role:"Active (Rx)",irr:4,ev:"Strong",desc:"Prescription. The most studied topical anti-ageing ingredient. Gold standard.",tip:"Ensure adequate vitamin C intake — required for the collagen synthesis tretinoin stimulates."},
"bakuchiol":{cat:"Retinoid Alternative",role:"Active",irr:1,ev:"Limited",desc:"Plant-derived retinol alternative. Some studies show similar but weaker effects."},
"ascorbic acid":{cat:"Antioxidant",role:"Active",irr:2,ev:"Strong",desc:"Pure vitamin C. Most studied form. Requires low pH for penetration. Unstable.",tip:"Oral vitamin C does NOT replace topical — skin concentrations from topical are 20-40x higher. Both together is optimal."},
"l-ascorbic acid":{cat:"Antioxidant",role:"Active",irr:2,ev:"Strong",desc:"Same as ascorbic acid. The gold standard topical antioxidant.",tip:"Oral vitamin C does NOT replace topical. Pair with oral vitamin C for systemic collagen support."},
"ascorbyl glucoside":{cat:"Antioxidant",role:"Active",irr:0,ev:"Moderate",desc:"Stable, gentle vitamin C derivative. Good for sensitive skin."},
"sodium ascorbyl phosphate":{cat:"Antioxidant",role:"Active",irr:0,ev:"Moderate",desc:"Water-soluble, stable vitamin C derivative. Some evidence for acne at 5%."},
"ethyl ascorbic acid":{cat:"Antioxidant",role:"Active",irr:1,ev:"Moderate",desc:"Stable derivative with good penetration."},
"3-o-ethyl ascorbic acid":{cat:"Antioxidant",role:"Active",irr:1,ev:"Moderate",desc:"Same as ethyl ascorbic acid."},
"niacinamide":{cat:"Vitamin B3",role:"Active",irr:0,ev:"Strong",desc:"Barrier support, oil control, mild brightening. One of the most versatile actives.",tip:"Oral nicotinamide (500mg 2x/day) boosts NAD+ for DNA repair — a different mechanism. Topical and oral are complementary, not redundant."},
"glycolic acid":{cat:"AHA",role:"Active",irr:3,ev:"Strong",desc:"Smallest AHA. Strongest exfoliation. SPF essential — increases photosensitivity."},
"lactic acid":{cat:"AHA",role:"Active",irr:2,ev:"Strong",desc:"Gentler AHA with humectant properties. Good for dry skin."},
"mandelic acid":{cat:"AHA",role:"Active",irr:1,ev:"Moderate",desc:"Largest AHA molecule. Slowest penetration. Most gentle for sensitive skin."},
"malic acid":{cat:"AHA",role:"Functional",irr:1,ev:"Limited",desc:"Fruit-derived AHA. Often used as pH adjuster."},
"citric acid":{cat:"pH Adjuster",role:"Functional",irr:0,desc:"Primarily a pH adjuster. Not at exfoliating concentrations in most products."},
"salicylic acid":{cat:"BHA",role:"Active",irr:2,ev:"Strong",desc:"Oil-soluble exfoliant that penetrates pores. First-line for blackheads and comedonal acne."},
"azelaic acid":{cat:"Dicarboxylic Acid",role:"Active",irr:1,ev:"Strong",desc:"Anti-bacterial, anti-inflammatory, brightening. Excellent for acne + pigmentation.",tip:"Oral zinc complements topical azelaic acid for acne — both reduce inflammation through different pathways."},
"tranexamic acid":{cat:"Brightening Agent",role:"Active",irr:0,ev:"Moderate",desc:"Blocks plasmin-melanocyte pathway. Particularly promising for melasma."},
"alpha arbutin":{cat:"Brightening Agent",role:"Active",irr:0,ev:"Moderate",desc:"Gentle tyrosinase inhibitor. Well tolerated alternative to hydroquinone."},
"arbutin":{cat:"Brightening Agent",role:"Active",irr:0,ev:"Moderate",desc:"Tyrosinase inhibitor. Alpha arbutin is the more effective form."},
"kojic acid":{cat:"Brightening Agent",role:"Active",irr:2,ev:"Moderate",desc:"Fungal-derived tyrosinase inhibitor. Effective but can irritate."},
"hydroquinone":{cat:"Brightening Agent",role:"Active (Rx)",irr:3,ev:"Strong",desc:"Most potent depigmenting agent. Use under medical supervision. Time-limited use."},
"benzoyl peroxide":{cat:"Antibacterial",role:"Active",irr:3,ev:"Strong",desc:"Kills C. acnes without resistance. Bleaches fabric. Consider short-contact therapy.",tip:"Oral zinc may provide additive antibacterial benefit through different pathways."},
"copper peptides":{cat:"Peptide",role:"Active",irr:1,ev:"Moderate",desc:"GHK-Cu. Stimulates collagen, wound healing. Separate from vitamin C."},
"palmitoyl tripeptide-1":{cat:"Peptide",role:"Active",irr:0,ev:"Limited",desc:"Signal peptide. May stimulate collagen production."},
"palmitoyl tetrapeptide-7":{cat:"Peptide",role:"Active",irr:0,ev:"Limited",desc:"Anti-inflammatory peptide. Often combined with tripeptide-1 (Matrixyl 3000)."},
"acetyl hexapeptide-8":{cat:"Peptide",role:"Active",irr:0,ev:"Limited",desc:"Argireline. Claims to reduce expression lines. Evidence is preliminary."},
"ceramide np":{cat:"Barrier Lipid",role:"Functional",irr:0,ev:"Strong",desc:"Key barrier lipid. Restores intercellular lipid matrix.",tip:"Oral omega-3 supports barrier lipids from inside while topical ceramides restore them externally — complementary approach."},
"ceramide ap":{cat:"Barrier Lipid",role:"Functional",irr:0,ev:"Strong",desc:"Barrier lipid. Best with other ceramides, cholesterol, and fatty acids."},
"ceramide eop":{cat:"Barrier Lipid",role:"Functional",irr:0,ev:"Strong",desc:"Barrier lipid. Part of the optimal ratio for barrier repair."},
"cholesterol":{cat:"Barrier Lipid",role:"Functional",irr:0,ev:"Strong",desc:"Essential barrier component. Works with ceramides and fatty acids 1:1:1."},
"hyaluronic acid":{cat:"Humectant",role:"Functional",irr:0,ev:"Strong",desc:"Draws water into skin. Seal with moisturiser to prevent evaporation."},
"sodium hyaluronate":{cat:"Humectant",role:"Functional",irr:0,ev:"Strong",desc:"Salt form of HA. Lower molecular weight = better penetration. Same function."},
"glycerin":{cat:"Humectant",role:"Functional",irr:0,ev:"Strong",desc:"One of the most effective and well-studied humectants."},
"squalane":{cat:"Emollient",role:"Functional",irr:0,ev:"Moderate",desc:"Stable, non-comedogenic oil mimicking skin's natural sebum."},
"petrolatum":{cat:"Occlusive",role:"Functional",irr:0,ev:"Strong",desc:"The most effective occlusive. Reduces TEWL by 99%. Non-comedogenic."},
"dimethicone":{cat:"Silicone",role:"Functional",irr:0,desc:"Breathable protective layer. Smoothing, non-comedogenic."},
"panthenol":{cat:"Soothing",role:"Functional",irr:0,ev:"Moderate",desc:"Provitamin B5. Hydrating, soothing, supports barrier repair."},
"allantoin":{cat:"Soothing",role:"Functional",irr:0,ev:"Moderate",desc:"Anti-irritant. Common in sensitive skin formulations."},
"urea":{cat:"Humectant",role:"Functional",irr:1,ev:"Strong",desc:"At 5-10%: humectant. At 20-40%: keratolytic. Very effective for dry skin."},
"centella asiatica extract":{cat:"Botanical",role:"Functional",irr:0,ev:"Moderate",desc:"Calming, wound-healing. Active compounds: madecassoside, asiaticoside."},
"madecassoside":{cat:"Botanical",role:"Active",irr:0,ev:"Moderate",desc:"Key active from centella asiatica. Anti-inflammatory, collagen stimulating."},
"tocopherol":{cat:"Antioxidant",role:"Functional",irr:0,ev:"Moderate",desc:"Vitamin E. Fat-soluble antioxidant. Synergistic with vitamin C.",tip:"Vitamin E from diet (almonds, sunflower seeds) is typically sufficient. Supplementation beyond adequacy has limited skin benefit."},
"tocopheryl acetate":{cat:"Antioxidant",role:"Functional",irr:0,ev:"Moderate",desc:"Stable vitamin E. Must convert to tocopherol in skin."},
"ferulic acid":{cat:"Antioxidant",role:"Functional",irr:1,ev:"Moderate",desc:"Stabilises and enhances vitamin C and E. The CE Ferulic combo is the gold standard."},
"resveratrol":{cat:"Polyphenol",role:"Active",irr:0,ev:"Limited",desc:"Polyphenol from grapes. Antioxidant. Topical evidence is preliminary."},
"green tea extract":{cat:"Polyphenol",role:"Functional",irr:0,ev:"Moderate",desc:"Rich in EGCG. Anti-inflammatory, antioxidant.",tip:"Drinking green tea (2+ cups/day) provides systemic polyphenol benefit alongside topical application."},
"camellia sinensis leaf extract":{cat:"Polyphenol",role:"Functional",irr:0,ev:"Moderate",desc:"Green tea extract. Antioxidant and anti-inflammatory."},
"aloe barbadensis leaf juice":{cat:"Soothing",role:"Functional",irr:0,ev:"Moderate",desc:"Hydrating, soothing, anti-inflammatory."},
"zinc oxide":{cat:"Mineral UV Filter",role:"SPF Active",irr:0,ev:"Strong",desc:"Broad spectrum mineral sunscreen. Anti-inflammatory. Best for sensitive/rosacea skin."},
"titanium dioxide":{cat:"Mineral UV Filter",role:"SPF Active",irr:0,ev:"Strong",desc:"Mineral sunscreen. Primarily UVB. Often combined with zinc oxide."},
"homosalate":{cat:"Chemical UV Filter",role:"SPF Active",irr:1,ev:"Strong",desc:"UVB chemical filter."},
"octisalate":{cat:"Chemical UV Filter",role:"SPF Active",irr:1,ev:"Strong",desc:"UVB filter. Helps stabilise other UV filters."},
"octocrylene":{cat:"Chemical UV Filter",role:"SPF Active",irr:1,ev:"Strong",desc:"UVB/short UVA filter. Stabilises avobenzone."},
"avobenzone":{cat:"Chemical UV Filter",role:"SPF Active",irr:1,ev:"Strong",desc:"Primary UVA chemical filter. Needs stabilisers."},
"sodium lauryl sulfate":{cat:"Surfactant",role:"Base",irr:3,desc:"Harsh anionic surfactant. Known irritant. Disrupts barrier.",flag:"Harsh surfactant — may compromise barrier integrity"},
"sodium laureth sulfate":{cat:"Surfactant",role:"Base",irr:2,desc:"Milder than SLS but still potentially irritating for sensitive skin."},
"cocamidopropyl betaine":{cat:"Surfactant",role:"Base",irr:1,desc:"Gentle amphoteric surfactant. Occasionally causes contact dermatitis."},
"phenoxyethanol":{cat:"Preservative",role:"Base",irr:0,desc:"Common preservative. Well tolerated."},
"ethylhexylglycerin":{cat:"Preservative Booster",role:"Base",irr:0,desc:"Enhances preservative efficacy."},
"parfum":{cat:"Fragrance",role:"Base",irr:2,desc:"Undisclosed fragrance blend. Leading cause of cosmetic contact dermatitis.",flag:"Fragrance — #1 cause of cosmetic contact dermatitis"},
"fragrance":{cat:"Fragrance",role:"Base",irr:2,desc:"Same as parfum. Undisclosed blend.",flag:"Fragrance — avoid if you have sensitive or reactive skin"},
"linalool":{cat:"Fragrance Component",role:"Base",irr:1,desc:"Common fragrance allergen. Present in lavender, bergamot oils."},
"limonene":{cat:"Fragrance Component",role:"Base",irr:1,desc:"Citrus-derived fragrance. Can irritate when oxidised."},
"alcohol denat":{cat:"Solvent",role:"Base",irr:2,desc:"Denatured alcohol. At high concentrations can dry and compromise barrier.",flag:"High-concentration alcohol — may compromise barrier"},
"denatured alcohol":{cat:"Solvent",role:"Base",irr:2,desc:"Same as alcohol denat.",flag:"May dry skin if high concentration"},
"cetearyl alcohol":{cat:"Fatty Alcohol",role:"Base",irr:0,desc:"Emollient fatty alcohol. NOT irritating — completely different from denatured alcohol. Thickens and softens."},
"cetyl alcohol":{cat:"Fatty Alcohol",role:"Base",irr:0,desc:"Emollient fatty alcohol. Thickener and emollient. Safe and non-irritating."},
"stearyl alcohol":{cat:"Fatty Alcohol",role:"Base",irr:0,desc:"Fatty alcohol. Emollient and stabiliser."},
"butylene glycol":{cat:"Humectant / Solvent",role:"Base",irr:0,desc:"Lightweight humectant and penetration enhancer. Very common, well tolerated."},
"propanediol":{cat:"Humectant / Solvent",role:"Base",irr:0,desc:"Bio-derived alternative to butylene glycol. Humectant."},
"carbomer":{cat:"Thickener",role:"Base",irr:0,desc:"Polymer thickener. Creates gel textures."},
"xanthan gum":{cat:"Thickener",role:"Base",irr:0,desc:"Natural thickener and stabiliser."},
"polysorbate 20":{cat:"Emulsifier",role:"Base",irr:0,desc:"Non-ionic surfactant and solubiliser."},
"disodium edta":{cat:"Chelating Agent",role:"Base",irr:0,desc:"Stabilises formulation by binding metal ions."},
"aqua":{cat:"Solvent",role:"Base",irr:0,desc:"Water. The base of most skincare products."},
"water":{cat:"Solvent",role:"Base",irr:0,desc:"The base of most skincare products."}
};

var IRR_L=["None","Very Low","Low","Moderate","High"];
var IRR_C=["var(--accent)","var(--accent-light)","var(--gold)","var(--caution)","var(--danger)"];
var ROLE_C={"Active":"var(--accent)","Active (Rx)":"var(--evidence-emerging)","SPF Active":"var(--info)","Functional":"var(--gold)","Base":"var(--text-muted)"};
var root=document.getElementById("decoderApp");

function ev(level){if(!level)return'';var c=level==='Strong'?'var(--accent)':level==='Moderate'?'var(--gold)':'var(--caution)';return '<span style="font-size:9px;font-weight:700;color:'+c+';font-family:var(--font-mono);text-transform:uppercase;padding:2px 6px;background:'+c+'11;border-radius:4px">'+level+'</span>';}

function parse(text){
  var cleaned=text.replace(/\n/g,", ").replace(/\.\s*$/,"");
  var raw=cleaned.split(/[,;]/).map(function(s){return s.trim().toLowerCase()}).filter(function(s){return s.length>1});
  return raw.map(function(name){
    var match=null;
    Object.keys(DB).forEach(function(key){
      if(!match&&(name.indexOf(key)>=0||key.indexOf(name.replace(/[^a-z0-9 ]/g,""))>=0))match=DB[key];
    });
    if(match)return {name:name,cat:match.cat,role:match.role,irr:match.irr||0,ev:match.ev||null,desc:match.desc||"",tip:match.tip||null,flag:match.flag||null,known:true};
    return {name:name,cat:"Unknown",role:"—",irr:0,ev:null,desc:null,tip:null,flag:null,known:false};
  });
}

function renderInput(){
  var h='<textarea id="decoderInput" rows="4" placeholder="Paste ingredient list here — e.g. Water, Glycerin, Niacinamide, Cetearyl Alcohol, Dimethicone, Ceramide NP..." style="width:100%;padding:14px 16px;border:1.5px solid var(--border-light);border-radius:14px;font-size:13px;font-family:var(--font-body);background:var(--bg-card);color:var(--text);resize:vertical;outline:none;line-height:1.6"></textarea>';
  h+='<div style="display:flex;justify-content:space-between;align-items:center;margin-top:10px">';
  h+='<span style="font-size:11px;color:var(--text-light)">Copy the full ingredient list from the product packaging or website</span>';
  h+='<button onclick="window._idDecode()" style="padding:8px 24px;background:var(--accent);color:var(--bg);border:none;border-radius:100px;font-size:13px;font-weight:600;cursor:pointer;font-family:var(--font-body)">Decode</button>';
  h+='</div>';
  root.innerHTML=h;
}

function renderResults(parsed){
  var actives=parsed.filter(function(i){return i.role==='Active'||i.role==='Active (Rx)'});
  var flags=parsed.filter(function(i){return i.flag});
  var tips=parsed.filter(function(i){return i.tip});
  var known=parsed.filter(function(i){return i.known}).length;

  var h='';
  // Summary cards
  h+='<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-bottom:16px">';
  h+='<div style="padding:16px;background:var(--bg-card);border:1.5px solid var(--border-light);border-radius:14px;text-align:center"><div style="font-size:28px;font-weight:600;font-family:var(--font-display);color:var(--accent)">'+actives.length+'</div><div style="font-size:11px;color:var(--text-muted)">Active Ingredients</div></div>';
  h+='<div style="padding:16px;background:var(--bg-card);border:1.5px solid var(--border-light);border-radius:14px;text-align:center"><div style="font-size:28px;font-weight:600;font-family:var(--font-display);color:'+(flags.length>0?'var(--caution)':'var(--accent)')+'">'+flags.length+'</div><div style="font-size:11px;color:var(--text-muted)">Flags / Warnings</div></div>';
  h+='<div style="padding:16px;background:var(--bg-card);border:1.5px solid var(--border-light);border-radius:14px;text-align:center"><div style="font-size:28px;font-weight:600;font-family:var(--font-display);color:var(--text-secondary)">'+known+'<span style="font-size:16px;color:var(--text-light)">/'+parsed.length+'</span></div><div style="font-size:11px;color:var(--text-muted)">Identified</div></div>';
  h+='</div>';

  // Flags
  if(flags.length>0){
    h+='<div style="padding:16px;background:var(--caution-wash);border:1.5px solid var(--caution-border);border-radius:14px;margin-bottom:16px"><h3 style="font-size:13px;font-weight:600;color:var(--caution);margin-bottom:8px">⚠️ Flags</h3>';
    flags.forEach(function(f){h+='<div style="font-size:12px;color:var(--text-secondary);margin-bottom:4px"><strong style="text-transform:capitalize">'+f.name+'</strong> — '+f.flag+'</div>'});
    h+='</div>';
  }

  // Oral-topical tips
  if(tips.length>0){
    h+='<div style="padding:16px;background:var(--accent-wash);border:1.5px solid var(--tip-border);border-radius:14px;margin-bottom:16px"><h3 style="font-size:13px;font-weight:600;color:var(--accent);margin-bottom:8px">💊 Oral + Topical Insights</h3>';
    tips.forEach(function(t){h+='<div style="font-size:12px;color:var(--text-secondary);margin-bottom:8px;line-height:1.55"><strong style="text-transform:capitalize">'+t.name+':</strong> '+t.tip+'</div>'});
    h+='</div>';
  }

  // Full list
  h+='<div style="background:var(--bg-card);border:1.5px solid var(--border-light);border-radius:14px;overflow:hidden">';
  h+='<div style="padding:12px 20px;background:var(--bg-warm);border-bottom:1px solid var(--border-light);font-size:13px;font-weight:600">Full Ingredient Breakdown</div>';
  h+='<div style="max-height:500px;overflow-y:auto">';
  parsed.forEach(function(ing,i){
    var rc=ROLE_C[ing.role]||'var(--text-muted)';
    h+='<div style="padding:12px 20px;border-bottom:1px solid var(--bg-warm);display:flex;gap:12px">';
    h+='<div style="width:24px;font-size:10px;color:var(--text-light);font-family:var(--font-mono);padding-top:2px;flex-shrink:0;text-align:right">'+(i+1)+'</div>';
    h+='<div style="flex:1"><div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;margin-bottom:2px">';
    h+='<span style="font-size:13px;font-weight:600;color:var(--text);text-transform:capitalize">'+ing.name+'</span>';
    if(ing.known)h+='<span style="font-size:9px;font-weight:600;padding:2px 6px;border-radius:4px;background:'+rc+'11;color:'+rc+';font-family:var(--font-mono);text-transform:uppercase;letter-spacing:0.05em">'+ing.role+'</span>';
    if(ing.ev)h+=ev(ing.ev);
    if(ing.irr>=2)h+='<span style="font-size:9px;font-weight:600;padding:2px 6px;border-radius:4px;background:'+IRR_C[ing.irr]+'11;color:'+IRR_C[ing.irr]+';font-family:var(--font-mono)">IRR: '+IRR_L[ing.irr]+'</span>';
    h+='</div>';
    if(ing.known)h+='<div style="font-size:10px;color:var(--text-muted);margin-bottom:2px;font-family:var(--font-mono)">'+ing.cat+'</div>';
    if(ing.desc)h+='<div style="font-size:12px;color:var(--text-secondary);line-height:1.5">'+ing.desc+'</div>';
    if(!ing.known)h+='<div style="font-size:11px;color:var(--text-light);font-style:italic">Not in our database yet</div>';
    h+='</div></div>';
  });
  h+='</div></div>';

  h+='<div style="text-align:center;margin-top:20px"><button onclick="window._idReset()" style="padding:10px 28px;background:transparent;border:1.5px solid var(--border-light);border-radius:100px;font-size:13px;font-weight:600;cursor:pointer;color:var(--text-secondary);font-family:var(--font-body)">Decode Another Product</button></div>';
  root.innerHTML=h;
}

window._idDecode=function(){
  var el=document.getElementById("decoderInput");
  if(!el||!el.value.trim())return;
  var parsed=parse(el.value);
  renderResults(parsed);
};
window._idReset=function(){renderInput()};
renderInput();
})();
