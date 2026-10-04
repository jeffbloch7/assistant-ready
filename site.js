// Hero chat demo: types out example conversations, one per audience.
(function () {
  var demo = document.querySelector('.chat-demo');
  if (!demo) return;

  var examples = [
    {
      you: "Turn our family recipes into an app the grandkids can use on their phones.",
      claude: "Done. I built a recipe app with all 48 recipes, searchable by name or ingredient. Here's the link to open it on any phone. Want to add photos next?"
    },
    {
      you: "Add a quote calculator to my website that emails me each request.",
      claude: "It's ready. Customers pick the job type and size and see an estimate right away. Each request lands in your inbox with their contact details. Want to preview it before it goes live?"
    },
    {
      you: "Build an onboarding page new hires can open on their phones.",
      claude: "Here it is: a 30-day checklist with the key forms and who to ask for what. New hires tick items off as they go. Shall I add your benefits FAQ?"
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
