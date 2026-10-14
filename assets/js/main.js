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

  // 2027학년도 전기 모집 공지 팝업
  var RECRUIT_START = new Date('2026-11-02T00:00:00+09:00');
  var RECRUIT_END = new Date('2026-11-09T18:00:00+09:00');
  var MUTE_KEY = 'dax-recruit-mute';
  var popup = document.getElementById('recruit');
  var lastFocus = null;

  function today() {
    var d = new Date();
    return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
  }
  function isMuted() {
    try { return localStorage.getItem(MUTE_KEY) === today(); } catch (e) { return false; }
  }
  function setMuted(on) {
    try { on ? localStorage.setItem(MUTE_KEY, today()) : localStorage.removeItem(MUTE_KEY); } catch (e) {}
  }

  // 접수 시작·마감까지 남은 날짜 표시
  var now = new Date();
  function daysUntil(d) {
    var a = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    var b = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    return Math.round((b - a) / 86400000);
  }
  var ddayText, closed = now >= RECRUIT_END;
  if (now < RECRUIT_START) ddayText = '접수 시작 D-' + daysUntil(RECRUIT_START);
  else if (!closed) {
    var left = daysUntil(RECRUIT_END);
    ddayText = left === 0 ? '오늘 18:00 마감' : '접수 중 · 마감 D-' + left;
  } else ddayText = '접수 마감';
  document.querySelectorAll('[data-dday]').forEach(function (el) {
    el.textContent = ddayText;
    el.classList.toggle('is-closed', closed);
    el.hidden = false;
  });

  function focusables() {
    return Array.prototype.slice.call(popup.querySelectorAll('a[href], button, input')).filter(function (el) { return !el.disabled; });
  }
  function openRecruit() {
    lastFocus = document.activeElement;
    popup.hidden = false;
    document.body.classList.add('is-locked');
    popup.querySelector('.recruit-x').focus();
  }
  function closeRecruit() {
    if (popup.hidden) return;
    setMuted(document.getElementById('recruit-mute').checked);
    popup.hidden = true;
    document.body.classList.remove('is-locked');
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  if (popup) {
    popup.addEventListener('click', function (e) {
      if (e.target.closest('[data-recruit-close]')) closeRecruit();
    });
    popup.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { e.preventDefault(); closeRecruit(); return; }
      if (e.key !== 'Tab') return;
      var f = focusables(), first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
    document.querySelectorAll('[data-recruit-open]').forEach(function (el) {
      el.addEventListener('click', function (e) { e.preventDefault(); openRecruit(); });
    });
    // 마감 전이고 '오늘 하루 보지 않기'를 누르지 않았다면 처음 들어올 때 띄운다
    if (!closed && !isMuted()) openRecruit();
  }

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
