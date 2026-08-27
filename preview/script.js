// Preview bootstrap: prevent browser autofill from polluting curriculum search,
// then load the original application script unchanged.
(function () {
  function cleanCurriculumSearch() {
    const input = document.getElementById('searchBar');
    if (!input) return;
    input.setAttribute('autocomplete', 'off');
    input.setAttribute('autocorrect', 'off');
    input.setAttribute('autocapitalize', 'none');
    input.setAttribute('spellcheck', 'false');
    input.setAttribute('name', 'curriculum_topic_search_' + Date.now());
    const value = String(input.value || '').trim();
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) input.value = '';
  }

  cleanCurriculumSearch();
  document.addEventListener('DOMContentLoaded', cleanCurriculumSearch, { once: true });
  window.addEventListener('load', cleanCurriculumSearch, { once: true });
  setTimeout(cleanCurriculumSearch, 250);
  setTimeout(cleanCurriculumSearch, 1000);

  const app = document.createElement('script');
  app.src = 'app-script.js';
  app.async = false;
  document.head.appendChild(app);
})();
