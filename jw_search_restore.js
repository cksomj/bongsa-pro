// bongsa-pro search bridge restore
// Restores the original combined behavior: internal card filtering + JW.ORG/WOL reference drawer.
(function(){
  'use strict';

  function install(){
    if (typeof window.applyKeywordSearch !== 'function') return;
    if (window.__bongsaJwSearchRestoreInstalled) return;
    window.__bongsaJwSearchRestoreInstalled = true;

    const originalApply = window.applyKeywordSearch;

    window.applyKeywordSearch = function(){
      const el = document.getElementById('search');
      originalApply();

      const q = el ? el.value.trim() : '';
      if (!q) return;

      if (typeof window.openRefSearchPanel === 'function') {
        window.openRefSearchPanel(q, '🔎 통합검색');
      } else if (typeof window.topSearch === 'function') {
        window.topSearch();
      }
    };
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', install, { once:true });
  } else {
    install();
  }
})();
