/* Frotz, Inc. site script. Loaded synchronously in <head> so the saved theme applies before
   first paint (no dark-to-light flash); everything that touches the page waits for the DOM. */
(function () {
  var root = document.documentElement;
  var KEY = 'frotzinc-theme';

  var saved = null;
  try { saved = localStorage.getItem(KEY); } catch (e) {}
  if (saved === 'light') root.setAttribute('data-theme', 'light');

  document.addEventListener('DOMContentLoaded', function () {
    // Theme: dark by default; the button flips it, remembered per browser when storage allows.
    var btn = document.getElementById('theme');
    function apply(theme) {
      var light = theme === 'light';
      if (light) root.setAttribute('data-theme', 'light');
      else root.removeAttribute('data-theme');
      if (btn) {
        btn.textContent = light ? 'Dark' : 'Light';
        btn.setAttribute('aria-pressed', light ? 'true' : 'false');
      }
    }
    apply(root.getAttribute('data-theme') === 'light' ? 'light' : 'dark');
    if (btn) {
      btn.addEventListener('click', function () {
        var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        apply(next);
        try { localStorage.setItem(KEY, next); } catch (e) {}
      });
    }

    // The status line keeps score. Each click is a move; reaching the catalog is worth points.
    var m = document.getElementById('moves');
    var s = document.getElementById('score');
    var moves = Number(m && m.textContent) || 0;
    if (m) document.addEventListener('click', function () { moves += 1; m.textContent = moves; });
    var catalog = document.getElementById('products');
    if (s && catalog && 'IntersectionObserver' in window) {
      var scored = false;
      new IntersectionObserver(function (entries) {
        if (!scored && entries[0].isIntersecting) { scored = true; s.textContent = 10; }
      }, { threshold: 1 }).observe(catalog);
    }

    // 404 page: echo the path the visitor tried, as a parser would.
    var lostPath = document.getElementById('lost-path');
    if (lostPath) {
      var path = location.pathname;
      try { path = decodeURIComponent(path); } catch (e) {}
      lostPath.textContent = path.slice(0, 80);
    }
  });
})();
