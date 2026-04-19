/* ── Falling Petals ─────────────────────────── */
(function initPetals() {
  const container = document.getElementById('petals');
  const symbols = ['🌸', '🌹', '💗', '✨', '🌷', '💕', '🍃'];

  function spawnPetal() {
    const el = document.createElement('span');
    el.className = 'petal-js';
    el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    el.style.left = Math.random() * 100 + 'vw';
    el.style.fontSize = (Math.random() * 1.4 + 0.7) + 'rem';
    el.style.animationDuration = (Math.random() * 7 + 6) + 's';
    el.style.animationDelay = '0s';
    el.style.opacity = (Math.random() * 0.4 + 0.5).toString();
    container.appendChild(el);
    el.addEventListener('animationend', () => el.remove());
  }

  // Initial burst
  for (let i = 0; i < 12; i++) {
    setTimeout(spawnPetal, i * 300);
  }
  // Keep spawning
  setInterval(spawnPetal, 700);
})();

/* ── Envelope Open (GSAP) ───────────────────── */
(function initEnvelope() {
  const envelope    = document.getElementById('envelope');
  const wrapper     = document.getElementById('envelopeWrapper');
  const letterEl    = document.getElementById('letterContent');
  let opened = false;

  envelope.addEventListener('click', function () {
    if (opened) return;
    opened = true;

    const tl = gsap.timeline();

    // 1. Flap opens (rotate backward)
    tl.to('#envFlap', {
      rotationX: -180,
      duration: 0.7,
      ease: 'power2.inOut',
      transformOrigin: 'top center',
      transformPerspective: 800
    })
    // 2. Envelope nudges up slightly (letter peek effect)
    .to('#envelope', {
      y: -10,
      duration: 0.3,
      ease: 'power1.out'
    }, '-=0.2')
    // 3. Envelope fades down and away
    .to('#envelope', {
      y: 40,
      opacity: 0,
      duration: 0.5,
      ease: 'power2.in',
      onComplete: function () {
        wrapper.style.display = 'none';
        letterEl.style.display = 'block';
        // 4. Letter slides up into view
        gsap.fromTo(letterEl,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }
        );
      }
    });
  });
})();

/* ── Scroll Reveal ──────────────────────────── */
(function initReveal() {
  const selectors = [
    '.milestone-section', '.memories-section',
    '.reasons-section',   '.closing-section',
    '.photo-card',        '.reason-card',
    '.milestone-number'
  ];
  const els = document.querySelectorAll(selectors.join(','));

  els.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(36px)';
    el.style.transition = 'opacity 0.75s ease, transform 0.75s ease';
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  els.forEach(el => observer.observe(el));
})();
