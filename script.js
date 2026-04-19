/* ── Falling Petals (CSS shapes, no emoji) ──── */
(function () {
  var container = document.getElementById('petals');
  var colors    = ['#e91e8c','#ff6eb4','#ff4081','#f48fb1','#c2185b','#ffb3d9','#ff80ab'];
  var anims     = ['fall-a','fall-b','fall-c'];

  function spawnPetal() {
    var el       = document.createElement('div');
    var duration = (Math.random() * 5 + 7).toFixed(1);
    var w        = (Math.random() * 8 + 8)  | 0;   /* 8–16px */
    var h        = (Math.random() * 10 + 14)| 0;   /* 14–24px */
    var left     = (Math.random() * 100).toFixed(1);
    var color    = colors[Math.floor(Math.random() * colors.length)];
    var anim     = anims [Math.floor(Math.random() * anims.length)];
    /* Vary shape: petal, circle, or teardrop */
    var radii    = ['50% 50% 50% 0','50% 50% 0 50%','50%','60% 40% 60% 40%'];
    var radius   = radii[Math.floor(Math.random() * radii.length)];

    el.className          = 'petal-js';
    el.style.left         = left + 'vw';
    el.style.width        = w + 'px';
    el.style.height       = h + 'px';
    el.style.background   = color;
    el.style.borderRadius = radius;
    el.style.boxShadow    = '0 1px 4px rgba(0,0,0,0.12)';
    el.style.animation    = anim + ' ' + duration + 's ease-in forwards';

    container.appendChild(el);
    setTimeout(function () { el.remove(); }, (parseFloat(duration) + 1) * 1000);
  }

  for (var i = 0; i < 12; i++) setTimeout(spawnPetal, i * 180);
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
