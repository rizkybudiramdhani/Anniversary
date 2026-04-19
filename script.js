/* ── Music Player ───────────────────────────── */
(function () {
  var audio   = document.getElementById('audio');
  var btn     = document.getElementById('playBtn');
  var message = document.getElementById('musicMessage');
  var shown   = false;

  if (!btn || !audio) return;

  btn.addEventListener('click', function () {
    if (audio.paused) {
      audio.play();
      btn.innerHTML  = '&#9646;&#9646;'; /* ❚❚ pause */
      btn.classList.add('playing');
      if (!shown) {
        shown = true;
        message.classList.add('show');
      }
    } else {
      audio.pause();
      btn.innerHTML = '&#9654;'; /* ▶ play */
      btn.classList.remove('playing');
    }
  });
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
