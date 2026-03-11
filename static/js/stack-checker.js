/* DermaProtocol — Stack Checker */
(function(){
  var known = {
    'retinol':       { group:'retinoid', irritation:3, category:'topical' },
    'retinal':       { group:'retinoid', irritation:2, category:'topical' },
    'tretinoin':     { group:'retinoid', irritation:4, category:'topical' },
    'adapalene':     { group:'retinoid', irritation:3, category:'topical' },
    'vitamin c':     { group:'antioxidant', irritation:2, category:'topical', ph:'low' },
    'l-ascorbic acid':{ group:'antioxidant', irritation:2, category:'topical', ph:'low' },
    'niacinamide':   { group:'b-vitamin', irritation:0, category:'topical' },
    'azelaic acid':  { group:'dicarboxylic', irritation:1, category:'topical' },
    'salicylic acid':{ group:'bha', irritation:2, category:'topical', ph:'low' },
    'glycolic acid': { group:'aha', irritation:3, category:'topical', ph:'low' },
    'lactic acid':   { group:'aha', irritation:2, category:'topical', ph:'low' },
    'mandelic acid': { group:'aha', irritation:1, category:'topical', ph:'low' },
    'benzoyl peroxide':{ group:'peroxide', irritation:3, category:'topical' },
    'aha':           { group:'aha', irritation:2, category:'topical', ph:'low' },
    'bha':           { group:'bha', irritation:2, category:'topical', ph:'low' },
    'ceramides':     { group:'barrier', irritation:0, category:'topical' },
    'hyaluronic acid':{ group:'humectant', irritation:0, category:'topical' },
    'peptides':      { group:'peptide', irritation:0, category:'topical' },
    'collagen':      { group:'protein', irritation:0, category:'supplement' },
    'omega-3':       { group:'fatty-acid', irritation:0, category:'supplement' },
    'zinc':          { group:'mineral', irritation:0, category:'supplement' },
    'creatine':      { group:'amino', irritation:0, category:'supplement' },
    'vitamin d':     { group:'vitamin', irritation:0, category:'supplement' },
    'biotin':        { group:'vitamin', irritation:0, category:'supplement' }
  };

  var rules = [
    { test: function(items) {
      var retinoids = items.filter(function(i){ return known[i] && known[i].group === 'retinoid'; });
      return retinoids.length > 1;
    }, type:'redundancy', msg: 'You have multiple retinoids in your stack. Using more than one retinoid at a time increases irritation risk without proportional benefit. Choose one and use it consistently.' },

    { test: function(items) {
      var hasRetinoid = items.some(function(i){ return known[i] && known[i].group === 'retinoid'; });
      var hasBP = items.indexOf('benzoyl peroxide') >= 0;
      return hasRetinoid && hasBP;
    }, type:'irritation', msg: 'Retinoid + benzoyl peroxide: benzoyl peroxide may degrade some retinoids on contact. If using both, apply at different times of day (e.g. BP in AM, retinoid in PM) or on alternate nights.' },

    { test: function(items) {
      var hasRetinoid = items.some(function(i){ return known[i] && known[i].group === 'retinoid'; });
      var hasAcid = items.some(function(i){ return known[i] && (known[i].group === 'aha' || known[i].group === 'bha'); });
      return hasRetinoid && hasAcid;
    }, type:'irritation', msg: 'Retinoid + exfoliating acid (AHA/BHA): using both in the same routine step can increase irritation significantly. Consider alternating nights rather than layering.' },

    { test: function(items) {
      var lowPH = items.filter(function(i){ return known[i] && known[i].ph === 'low'; });
      return lowPH.length > 1;
    }, type:'overlap', msg: 'You have multiple low-pH actives. Layering several acidic products (vitamin C, AHA, BHA) in the same step can increase irritation and may reduce efficacy. Spread them across AM/PM or alternate days.' },

    { test: function(items) {
      var hasVC = items.some(function(i){ return known[i] && known[i].group === 'antioxidant'; });
      var hasBP = items.indexOf('benzoyl peroxide') >= 0;
      return hasVC && hasBP;
    }, type:'overlap', msg: 'Vitamin C + benzoyl peroxide: BP may oxidise vitamin C, reducing its effectiveness. Apply at different times of day.' },

    { test: function(items) {
      var highIrr = items.filter(function(i){ return known[i] && known[i].irritation >= 2; });
      return highIrr.length >= 3;
    }, type:'irritation', msg: 'Your stack has three or more moderate-to-high irritation actives. This increases the risk of barrier damage, dryness, and sensitivity. Consider simplifying to 1-2 actives and building tolerance gradually.' },

    { test: function(items) {
      return items.length >= 7;
    }, type:'tip', msg: 'You have a complex stack. More products do not always mean better results. Consider whether each item is serving a distinct purpose, and whether a simpler routine might achieve similar outcomes with less risk.' },

    { test: function(items) {
      var ahas = items.filter(function(i){ return known[i] && known[i].group === 'aha'; });
      return ahas.length > 1;
    }, type:'redundancy', msg: 'Multiple AHA exfoliants in your stack. Using more than one AHA (glycolic, lactic, mandelic) is usually unnecessary. Pick the one that suits your sensitivity level.' }
  ];

  var tags = [];
  var field = document.getElementById('checkerField');
  var tagsEl = document.getElementById('checkerTags');
  var results = document.getElementById('checkerResults');

  function normalize(s) { return s.toLowerCase().trim(); }

  function renderTags() {
    tagsEl.innerHTML = '';
    tags.forEach(function(t, i) {
      var el = document.createElement('span');
      el.className = 'checker-tag';
      el.innerHTML = t + ' <button class="checker-tag__remove" data-idx="'+i+'">&times;</button>';
      tagsEl.appendChild(el);
    });
    tagsEl.querySelectorAll('.checker-tag__remove').forEach(function(btn){
      btn.addEventListener('click', function(){
        tags.splice(parseInt(btn.dataset.idx), 1);
        renderTags();
        runCheck();
      });
    });
  }

  function runCheck() {
    if (tags.length < 2) { results.innerHTML = ''; return; }
    var normed = tags.map(normalize);
    var hits = [];
    rules.forEach(function(rule) {
      if (rule.test(normed)) hits.push(rule);
    });

    if (hits.length === 0) {
      results.innerHTML = '<div class="checker-result checker-result--tip"><div class="checker-result__type">All clear</div><div class="checker-result__text">No obvious overlap, redundancy, or high-risk combinations detected in this stack. This does not guarantee safety — individual responses vary, and this tool does not account for specific formulations or personal health factors.</div></div>';
      return;
    }

    var h = '';
    hits.forEach(function(hit) {
      var cls = 'checker-result--tip';
      if (hit.type === 'irritation') cls = 'checker-result--irritation';
      if (hit.type === 'overlap') cls = 'checker-result--overlap';
      if (hit.type === 'redundancy') cls = 'checker-result--redundancy';
      h += '<div class="checker-result ' + cls + '"><div class="checker-result__type">' + hit.type.replace(/-/g,' ') + '</div><div class="checker-result__text">' + hit.msg + '</div></div>';
    });
    results.innerHTML = h;
  }

  field.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      var val = field.value.trim().replace(/,$/,'');
      if (val && tags.indexOf(val) === -1) {
        tags.push(val);
        renderTags();
        runCheck();
      }
      field.value = '';
    }
  });
})();
