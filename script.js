/* ── Falling Petals ─────────────────────────── */
(function () {
  var container = document.getElementById('petals');
  var symbols   = ['🌸','🌹','💗','✨','🌷','💕','🍃','🌺'];

  function spawnPetal() {
    var el = document.createElement('span');
    var duration = (Math.random() * 7 + 6).toFixed(1);
    var size     = (Math.random() * 1.4 + 0.7).toFixed(1);
    var startX   = (Math.random() * 110 - 5).toFixed(1);
    var drift    = (Math.random() * 80 - 40).toFixed(0);

    el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    el.style.cssText = [
      'position:absolute',
      'top:-60px',
      'left:' + startX + 'vw',
      'font-size:' + size + 'rem',
      'opacity:0.85',
      'pointer-events:none',
      'user-select:none',
      'animation:petalFall ' + duration + 's linear forwards'
    ].join(';');

    /* Unique keyframe per petal for natural sideways drift */
    var keyId = 'pk' + Date.now() + Math.floor(Math.random()*9999);
    var style = document.createElement('style');
    style.textContent = '@keyframes ' + keyId + '{' +
      '0%{transform:translateY(0) rotate(0deg) translateX(0)}' +
      '40%{transform:translateY(40vh) rotate(120deg) translateX(' + drift + 'px)}' +
      '100%{transform:translateY(110vh) rotate(360deg) translateX(' + (-drift/2) + 'px);opacity:0}' +
    '}';
    document.head.appendChild(style);
    el.style.animation = keyId + ' ' + duration + 's linear forwards';

    container.appendChild(el);
    setTimeout(function () {
      el.remove();
      style.remove();
    }, (parseFloat(duration) + 0.5) * 1000);
  }

  /* Initial burst */
  for (var i = 0; i < 10; i++) {
    (function(delay){ setTimeout(spawnPetal, delay); })(i * 250);
  }
  /* Continuous */
  setInterval(spawnPetal, 650);
})();


/* ── Envelope Open ──────────────────────────── */
(function () {
  var envelope = document.getElementById('envelope');
  var wrapper  = document.getElementById('envelopeWrapper');
  var letter   = document.getElementById('letterContent');
  var opened   = false;

  if (!envelope) return;

  envelope.addEventListener('click', function () {
    if (opened) return;
    opened = true;

    /* Step 1: open flap */
    envelope.classList.add('open');

    /* Step 2: after flap opens, fade out envelope */
    setTimeout(function () {
      wrapper.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
      wrapper.style.opacity    = '0';
      wrapper.style.transform  = 'translateY(20px) scale(0.95)';
    }, 500);

    /* Step 3: show letter */
    setTimeout(function () {
      wrapper.style.display   = 'none';
      letter.style.display    = 'block';
      letter.style.opacity    = '0';
      letter.style.transform  = 'translateY(30px)';
      letter.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
      /* Force reflow */
      letter.getBoundingClientRect();
      letter.style.opacity   = '1';
      letter.style.transform = 'translateY(0)';
      letter.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 950);
  });
})();


/* ── Scroll Reveal ──────────────────────────── */
(function () {
  var targets = document.querySelectorAll(
    '.milestone-section,.memories-section,.reasons-section,.closing-section,.photo-card,.reason-card'
  );

  targets.forEach(function (el) {
    el.style.opacity   = '0';
    el.style.transform = 'translateY(32px)';
    el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
  });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.style.opacity   = '1';
        e.target.style.transform = 'translateY(0)';
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  targets.forEach(function (el) { observer.observe(el); });
})();
