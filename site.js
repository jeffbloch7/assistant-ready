// App filters: All / Personal / Business / HR, also set by the round shortcuts in the hero.
(function () {
  var buttons = Array.prototype.slice.call(document.querySelectorAll('.filters button'));
  var cards = Array.prototype.slice.call(document.querySelectorAll('.app-card[data-for]'));
  if (!buttons.length) return;

  function apply(filter) {
    buttons.forEach(function (b) { b.setAttribute('aria-pressed', b.dataset.filter === filter ? 'true' : 'false'); });
    cards.forEach(function (c) {
      c.hidden = filter !== 'all' && c.dataset.for.split(' ').indexOf(filter) === -1;
    });
  }

  buttons.forEach(function (b) {
    b.addEventListener('click', function () { apply(b.dataset.filter); });
  });
  document.querySelectorAll('.shortcuts a[data-filter]').forEach(function (a) {
    a.addEventListener('click', function () { apply(a.dataset.filter); });
  });
})();

// Sample videos: play only while on screen, and not at all for reduced motion.
(function () {
  var videos = document.querySelectorAll('video[autoplay]');
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  videos.forEach(function (v) { v.removeAttribute('autoplay'); v.pause(); });
  if (reduced || !('IntersectionObserver' in window)) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) e.target.play().catch(function () {});
      else e.target.pause();
    });
  }, { threshold: 0.4 });
  videos.forEach(function (v) { observer.observe(v); });
})();
