// Hero chat demo: types out example conversations, one per audience.
(function () {
  var demo = document.querySelector('.chat-demo');
  if (!demo) return;

  var examples = [
    {
      you: "Help me write a kind note declining my neighbor's party invite.",
      claude: "Of course. Here's a warm one: “Hi Linda, thank you so much for thinking of us! We have a family commitment that evening, but I hope it's a wonderful party. Coffee soon?” Want it shorter or more casual?"
    },
    {
      you: "Turn my notes into a quote: new faucet, fix leak under sink, about 3 hours.",
      claude: "Here's a clean quote for the Smith kitchen: 1. Replace faucet (parts and install). 2. Repair leak under sink. 3. Labor, about 3 hours. I left the prices blank for you to fill in. Want it as a PDF?"
    },
    {
      you: "Draft a friendly reminder that open enrollment closes Friday.",
      claude: "Subject: Open enrollment closes Friday. Hi team, a quick reminder that benefits enrollment ends this Friday at 5pm. It takes about 10 minutes. Questions? Just reply to this email."
    }
  ];

  var tabs = demo.querySelectorAll('.chat-tabs button');
  var you = demo.querySelector('.bubble-you');
  var claude = demo.querySelector('.bubble-claude');
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var current = 0, timers = [];

  function clearTimers() { timers.forEach(clearTimeout); timers = []; }
  function later(fn, ms) { timers.push(setTimeout(fn, ms)); }

  function type(el, text, speed, done) {
    // Time-based so it keeps pace even when the browser throttles timers.
    var start = Date.now();
    el.classList.add('typing');
    (function step() {
      var i = Math.min(text.length, Math.floor((Date.now() - start) / speed) + 1);
      el.textContent = text.slice(0, i);
      if (i < text.length) later(step, speed);
      else { el.classList.remove('typing'); if (done) done(); }
    })();
  }

  function show(i, auto) {
    clearTimers();
    current = i;
    tabs.forEach(function (t, n) { t.setAttribute('aria-pressed', n === i ? 'true' : 'false'); });
    var ex = examples[i];
    if (reduced) {
      you.textContent = ex.you; claude.textContent = ex.claude;
      you.hidden = claude.hidden = false;
      return;
    }
    you.textContent = ''; claude.textContent = '';
    you.hidden = false; claude.hidden = true;
    type(you, ex.you, 28, function () {
      later(function () {
        claude.hidden = false;
        type(claude, ex.claude, 14, function () {
          if (auto) later(function () { show((current + 1) % examples.length, true); }, 4500);
        });
      }, 600);
    });
  }

  tabs.forEach(function (t, n) {
    t.addEventListener('click', function () { show(n, false); });
  });
  show(0, true);
})();

// "What would you use it for?" tabs.
(function () {
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.seg-tabs [role="tab"]'));
  if (!tabs.length) return;

  function select(tab) {
    tabs.forEach(function (t) {
      var on = t === tab;
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
    });
  }

  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () { select(t); });
    t.addEventListener('keydown', function (e) {
      var next = e.key === 'ArrowRight' ? i + 1 : e.key === 'ArrowLeft' ? i - 1 : null;
      if (next === null) return;
      var target = tabs[(next + tabs.length) % tabs.length];
      select(target); target.focus();
    });
  });
})();
