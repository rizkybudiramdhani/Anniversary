/* ── Falling petals ─────────────────────────── */
(function spawnPetals() {
  const container = document.getElementById('petals');
  const symbols = ['🌸', '🌹', '💗', '✨', '💕', '🌷'];
  const count = 22;

  for (let i = 0; i < count; i++) {
    const el = document.createElement('span');
    el.classList.add('petal');
    el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    el.style.left = Math.random() * 100 + 'vw';
    el.style.fontSize = (Math.random() * 1.2 + 0.8) + 'rem';
    el.style.animationDuration = (Math.random() * 8 + 6) + 's';
    el.style.animationDelay = (Math.random() * 10) + 's';
    container.appendChild(el);
  }
})();

/* ── Countdown timer ────────────────────────── */
(function startCountdown() {
  const anniversaryDate = new Date('2025-04-20T00:00:00');
  const today = new Date();

  const totalMs = today - anniversaryDate;
  const totalDays = Math.floor(totalMs / (1000 * 60 * 60 * 24));
  document.getElementById('days-count').textContent = totalDays;

  function update() {
    const now   = new Date();
    const diff  = now - anniversaryDate;
    const d     = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h     = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m     = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s     = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('days').textContent    = d;
    document.getElementById('hours').textContent   = h;
    document.getElementById('minutes').textContent = m;
    document.getElementById('seconds').textContent = s;
  }

  update();
  setInterval(update, 1000);
})();

/* ── Envelope / Letter toggle ───────────────── */
(function setupEnvelope() {
  const envelope = document.getElementById('envelope');
  const letterContent = document.getElementById('letter-content');

  envelope.addEventListener('click', function () {
    envelope.classList.add('open');
    setTimeout(function () {
      envelope.style.display = 'none';
      letterContent.classList.add('show');
      letterContent.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 500);
  });
})();

/* ── Big heart confetti click ───────────────── */
(function setupHeart() {
  const heart = document.getElementById('bigHeart');

  heart.addEventListener('click', function () {
    const colors = ['#e91e8c', '#ff6eb4', '#ffb3d9', '#c0006e', '#ff4081'];
    for (let i = 0; i < 30; i++) {
      const spark = document.createElement('span');
      spark.textContent = ['💖', '💗', '💕', '✨', '🌸'][Math.floor(Math.random() * 5)];
      spark.style.cssText = `
        position: fixed;
        left: ${Math.random() * 100}vw;
        top: ${Math.random() * 100}vh;
        font-size: ${Math.random() * 1.5 + 1}rem;
        pointer-events: none;
        z-index: 9999;
        animation: fall ${Math.random() * 2 + 1}s ease forwards;
      `;
      document.body.appendChild(spark);
      setTimeout(() => spark.remove(), 3000);
    }
  });
})();

/* ── Scroll reveal ──────────────────────────── */
(function setupReveal() {
  const targets = document.querySelectorAll(
    '.countdown-section, .letter-section, .memories-section, .reasons-section, .closing-section, .counter-box, .reason-card, .photo-card'
  );

  targets.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    }),
    { threshold: 0.15 }
  );

  targets.forEach(el => observer.observe(el));
})();
