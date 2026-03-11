/* DermaProtocol — Routine Builder */
(function(){
  var routines = {
    acne: {
      am: [
        { name: 'Gentle cleanser', detail: 'Non-stripping, fragrance-free' },
        { name: 'Niacinamide 4-5%', detail: 'Oil control and barrier support' },
        { name: 'Lightweight moisturiser', detail: 'Non-comedogenic' },
        { name: 'Sunscreen SPF 30+', detail: 'Essential with actives' }
      ],
      pm: [
        { name: 'Gentle cleanser', detail: 'Double cleanse if wearing sunscreen' },
        { name: 'Azelaic acid 10%', detail: 'Anti-bacterial and anti-inflammatory' },
        { name: 'Moisturiser', detail: 'Ceramide-based if barrier feels dry' }
      ],
      upgrades: ['Salicylic acid 2% (2-3x/week)', 'Benzoyl peroxide 2.5% short-contact', 'Retinol 0.25% (after 6-8 weeks)'],
      cautions: ['Avoid introducing multiple actives at once', 'Some purging is normal in weeks 1-4', 'See a dermatologist if acne is severe or cystic'],
      mistakes: ['Over-cleansing or using harsh cleansers', 'Skipping moisturiser on oily skin', 'Expecting results in under 6 weeks'],
      timeline: 'Improvement usually visible at 6-8 weeks. Full protocol assessment at 12 weeks.'
    },
    pigmentation: {
      am: [
        { name: 'Gentle cleanser', detail: 'Fragrance-free' },
        { name: 'Vitamin C serum 10-15%', detail: 'Antioxidant and brightening' },
        { name: 'Moisturiser', detail: 'Lightweight, hydrating' },
        { name: 'Sunscreen SPF 50+', detail: 'Critical — UV undoes brightening work' }
      ],
      pm: [
        { name: 'Gentle cleanser', detail: 'Double cleanse to remove sunscreen' },
        { name: 'Azelaic acid 10-15%', detail: 'Tyrosinase inhibition' },
        { name: 'Moisturiser', detail: 'Barrier-supporting' }
      ],
      upgrades: ['Retinol 0.3% (alternate nights)', 'Niacinamide for additional tone support', 'Alpha arbutin if vitamin C irritates'],
      cautions: ['Sunscreen is non-negotiable', 'Deep melasma may need professional treatment', 'Pigmentation changes are slow — be patient'],
      mistakes: ['Inconsistent sunscreen use', 'Using oxidised vitamin C serum', 'Giving up before 12 weeks'],
      timeline: 'Expect 8-16+ weeks for visible change. Some pigmentation takes 6+ months.'
    },
    wrinkles: {
      am: [
        { name: 'Gentle cleanser', detail: 'Hydrating formula' },
        { name: 'Vitamin C serum', detail: 'Antioxidant protection and collagen support' },
        { name: 'Moisturiser', detail: 'With hyaluronic acid' },
        { name: 'Sunscreen SPF 30+', detail: 'UV is the primary driver of skin ageing' }
      ],
      pm: [
        { name: 'Gentle cleanser', detail: 'Oil-based or cream' },
        { name: 'Retinol 0.25-0.5%', detail: 'Start low, increase gradually' },
        { name: 'Rich moisturiser', detail: 'Ceramides and peptides' }
      ],
      upgrades: ['Niacinamide for texture support', 'Peptide serum', 'Oral collagen peptides (evidence is moderate)'],
      cautions: ['Retinol causes dryness and peeling initially', 'Always use sunscreen when using retinoids', 'Avoid retinol during pregnancy'],
      mistakes: ['Starting retinol at too high a concentration', 'Skipping sunscreen', 'Expecting dramatic wrinkle reversal from OTC products'],
      timeline: 'Texture improvements at 8-12 weeks. Anti-ageing benefits build over 3-6+ months.'
    },
    barrier: {
      am: [
        { name: 'Water rinse or gentle cleanser', detail: 'No foaming, no fragrance' },
        { name: 'Ceramide-rich moisturiser', detail: 'Ceramides, cholesterol, fatty acids' },
        { name: 'Sunscreen SPF 30+', detail: 'Mineral if skin is very reactive' }
      ],
      pm: [
        { name: 'Gentle cream cleanser', detail: 'Oil-based or micellar' },
        { name: 'Ceramide-rich moisturiser', detail: 'Apply to damp skin' },
        { name: 'Occlusive (optional)', detail: 'Petrolatum or squalane to seal moisture' }
      ],
      upgrades: ['Niacinamide (first active to reintroduce after repair)', 'Centella asiatica / madecassoside for calming'],
      cautions: ['Stop ALL actives during repair', 'Wait until stinging stops before reintroducing anything', 'Repair typically takes 2-6 weeks'],
      mistakes: ['Reintroducing actives too soon', 'Using fragranced products', 'Not giving enough time for recovery'],
      timeline: 'Basic comfort returns in 1-3 weeks. Full barrier recovery may take 4-8 weeks.'
    },
    sensitive: {
      am: [
        { name: 'Gentle cream cleanser', detail: 'Fragrance-free, minimal ingredients' },
        { name: 'Centella or niacinamide serum', detail: 'Calming, low-irritation actives only' },
        { name: 'Barrier moisturiser', detail: 'Ceramides, no fragrance' },
        { name: 'Mineral sunscreen', detail: 'Zinc oxide based; less likely to irritate' }
      ],
      pm: [
        { name: 'Gentle cleanser', detail: 'Same as morning' },
        { name: 'Azelaic acid 10%', detail: 'If tolerated — the gentlest active option' },
        { name: 'Moisturiser', detail: 'Thick, occlusive if needed' }
      ],
      upgrades: ['Retinal at very low concentration (if tolerated after 8+ weeks)', 'Squalane oil for added barrier support'],
      cautions: ['Patch test everything', 'Introduce one product at a time', 'Avoid AHA, BHA, and high-strength actives initially'],
      mistakes: ['Trying too many new products at once', 'Choosing products based on marketing rather than ingredient simplicity', 'Ignoring fragrance and essential oils in products'],
      timeline: 'Tolerance baseline in 2-4 weeks. Gradual active introduction over 2-3 months.'
    },
    general: {
      am: [
        { name: 'Gentle cleanser', detail: 'Or water rinse if skin is not oily' },
        { name: 'Vitamin C serum (optional)', detail: 'Antioxidant layer' },
        { name: 'Moisturiser', detail: 'Suitable for your skin type' },
        { name: 'Sunscreen SPF 30+', detail: 'Daily, even on cloudy days' }
      ],
      pm: [
        { name: 'Cleanser', detail: 'Double cleanse if wearing sunscreen' },
        { name: 'Niacinamide or retinol', detail: 'Choose one to start; alternate later' },
        { name: 'Moisturiser', detail: 'Hydrating, barrier-supportive' }
      ],
      upgrades: ['Add a weekly exfoliant (AHA or BHA) after establishing baseline', 'Oral omega-3 for systemic skin support', 'Collagen peptides (moderate evidence)'],
      cautions: ['Keep it simple — you do not need 10 products', 'Consistency matters more than complexity', 'Sunscreen is the highest-impact single step'],
      mistakes: ['Over-complicating the routine', 'Chasing trends instead of sticking with basics', 'Skipping sunscreen because you are indoors'],
      timeline: 'Healthier-looking skin in 4-8 weeks with a consistent simple routine.'
    }
  };

  function renderRoutine(goal) {
    var r = routines[goal];
    if (!r) return;
    var h = '';
    h += '<div class="routine-block"><div class="routine-block__header">&#9728;&#65039; AM Routine</div><div class="routine-block__body">';
    r.am.forEach(function(s, i) {
      h += '<div class="routine-step"><div class="routine-step__order">' + (i+1) + '</div><div><div class="routine-step__name">' + s.name + '</div><div class="routine-step__detail">' + s.detail + '</div></div></div>';
    });
    h += '</div></div>';
    h += '<div class="routine-block" style="margin-top:var(--sp-4)"><div class="routine-block__header">&#127769; PM Routine</div><div class="routine-block__body">';
    r.pm.forEach(function(s, i) {
      h += '<div class="routine-step"><div class="routine-step__order">' + (i+1) + '</div><div><div class="routine-step__name">' + s.name + '</div><div class="routine-step__detail">' + s.detail + '</div></div></div>';
    });
    h += '</div></div>';

    if (r.upgrades.length) {
      h += '<div class="detail-section" style="margin-top:var(--sp-8)"><h2 class="detail-section__title">Optional Upgrades</h2><div class="detail-section__body"><ul>';
      r.upgrades.forEach(function(u) { h += '<li>' + u + '</li>'; });
      h += '</ul></div></div>';
    }
    if (r.cautions.length) {
      h += '<div class="alert alert--caution" style="margin-top:var(--sp-6)">';
      h += '<div class="alert__title">Cautions</div><ul style="padding-left:1.2rem;margin:0.5rem 0 0">';
      r.cautions.forEach(function(c) { h += '<li style="list-style:disc;margin-bottom:0.3rem">' + c + '</li>'; });
      h += '</ul></div>';
    }
    if (r.mistakes.length) {
      h += '<div class="detail-section" style="margin-top:var(--sp-6)"><h2 class="detail-section__title">Common Mistakes</h2><div class="detail-section__body"><ul>';
      r.mistakes.forEach(function(m) { h += '<li>' + m + '</li>'; });
      h += '</ul></div></div>';
    }
    h += '<div class="detail-section" style="margin-top:var(--sp-6)"><h2 class="detail-section__title">Realistic Timeline</h2><div class="detail-section__body"><p>' + r.timeline + '</p></div></div>';
    return h;
  }

  var goals = document.querySelectorAll('.builder-goal');
  var output = document.getElementById('routineOutput');
  goals.forEach(function(btn) {
    btn.addEventListener('click', function() {
      goals.forEach(function(g) { g.classList.remove('active'); });
      btn.classList.add('active');
      var html = renderRoutine(btn.dataset.goal);
      output.innerHTML = html;
      output.style.display = 'block';
      output.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();
