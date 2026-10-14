// D.AX대학원 — 메뉴, 트랙 전환, 현재 섹션 표시
(function () {
  var root = document.documentElement;
  root.classList.remove('no-js');
  root.classList.add('js');

  // 모바일 메뉴
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  function setMenu(open) {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.querySelector('.sr').textContent = open ? '메뉴 닫기' : '메뉴 열기';
    nav.classList.toggle('is-open', open);
  }
  toggle.addEventListener('click', function () {
    setMenu(toggle.getAttribute('aria-expanded') !== 'true');
  });
  nav.addEventListener('click', function (e) {
    if (e.target.closest('a')) setMenu(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) { setMenu(false); toggle.focus(); }
  });

  // 트랙 전환 (운용혁신 / 제조혁신)
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.track-switch [role="tab"]'));
  function select(tab, focus) {
    tabs.forEach(function (t) {
      var on = t === tab;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
    });
    if (focus) tab.focus();
  }
  tabs.forEach(function (tab, i) {
    tab.addEventListener('click', function () { select(tab); });
    tab.addEventListener('keydown', function (e) {
      var d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
      if (d) { e.preventDefault(); select(tabs[(i + d + tabs.length) % tabs.length], true); }
    });
  });
  if (tabs.length) select(tabs[0]);

  // 스크롤 위치에 맞춰 메뉴 강조
  var links = {};
  nav.querySelectorAll('a[href^="#"]').forEach(function (a) { links[a.getAttribute('href').slice(1)] = a; });
  var sections = Object.keys(links).map(function (id) { return document.getElementById(id); }).filter(Boolean);
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        Object.keys(links).forEach(function (id) { links[id].classList.toggle('is-active', id === en.target.id); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { io.observe(s); });
  }
})();
