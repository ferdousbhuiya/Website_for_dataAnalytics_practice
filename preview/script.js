// Preview bootstrap: curriculum-level learner flow + original application.
(function () {
  let selectedCurriculumLevel = localStorage.getItem('dataPrepPreferredLevel') || 'all';

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

  function curriculumLevelFor(key) {
    return window.topicRegistry?.topics?.[key]?.level || 'Intermediate';
  }

  function levelTopicKeys(level) {
    const order = window.topicRegistry?.order || [];
    return order.filter(key => curriculumLevelFor(key) === level);
  }

  function topicTitle(key) {
    return window.topicsData?.[key]?.title || window.topicRegistry?.topics?.[key]?.category || key.replaceAll('_', ' ');
  }

  function decorateAndFilterTopicCards() {
    document.querySelectorAll('#topicsGrid .topic-card').forEach(card => {
      const key = card.dataset.topicKey;
      const level = curriculumLevelFor(key);
      card.dataset.curriculumLevel = level;
      let badge = card.querySelector('.curriculum-level-badge');
      if (!badge) {
        badge = document.createElement('span');
        badge.className = 'curriculum-level-badge';
        const title = card.querySelector('.topic-title');
        if (title) title.insertAdjacentElement('beforebegin', badge);
        else card.prepend(badge);
      }
      badge.textContent = level;
      badge.dataset.level = level;
      card.classList.toggle('curriculum-level-hidden', selectedCurriculumLevel !== 'all' && level !== selectedCurriculumLevel);
    });
    document.querySelectorAll('.path-card').forEach(card => {
      card.classList.toggle('selected-level-card', card.dataset.level === selectedCurriculumLevel);
    });
  }

  function setCurriculumLevel(level, shouldScroll = true) {
    selectedCurriculumLevel = level || 'all';
    if (selectedCurriculumLevel === 'all') localStorage.removeItem('dataPrepPreferredLevel');
    else localStorage.setItem('dataPrepPreferredLevel', selectedCurriculumLevel);
    const select = document.getElementById('difficultyFilter');
    if (select) select.value = selectedCurriculumLevel;
    try {
      if (typeof appState !== 'undefined') appState.difficulty = 'all';
      if (typeof renderTopics === 'function') renderTopics();
    } catch (_) {}
    setTimeout(decorateAndFilterTopicCards, 0);
    if (shouldScroll) document.getElementById('topics')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function installCurriculumFiltering() {
    const select = document.getElementById('difficultyFilter');
    if (select && !select.dataset.curriculumBound) {
      select.dataset.curriculumBound = 'true';
      select.value = selectedCurriculumLevel;
      select.addEventListener('change', e => {
        e.stopImmediatePropagation();
        setCurriculumLevel(e.target.value, false);
      }, true);
    }
    try { if (typeof appState !== 'undefined') appState.difficulty = 'all'; } catch (_) {}
    const grid = document.getElementById('topicsGrid');
    if (grid && !grid.dataset.curriculumObserved) {
      grid.dataset.curriculumObserved = 'true';
      new MutationObserver(() => decorateAndFilterTopicCards()).observe(grid, { childList: true, subtree: false });
    }
    decorateAndFilterTopicCards();
  }

  function enhanceLearningPathCards() {
    const path = document.getElementById('path');
    const topics = document.getElementById('topics');
    if (!path || !topics) return;

    // Make the level cards the primary starting point.
    if (topics.previousElementSibling !== path) topics.parentNode.insertBefore(path, topics);

    const cards = path.querySelectorAll('.path-card');
    const levels = ['Beginner', 'Intermediate', 'Advanced'];
    cards.forEach((card, index) => {
      const level = levels[index];
      if (!level) return;
      card.dataset.level = level;
      card.tabIndex = 0;
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', `View ${level} curriculum`);

      card.querySelector('ul')?.remove();
      card.querySelector('.path-topic-preview')?.remove();
      card.querySelector('.path-card-action')?.remove();

      const keys = levelTopicKeys(level);
      const shown = keys.slice(0, 6);
      const preview = document.createElement('div');
      preview.className = 'path-topic-preview';
      preview.innerHTML = `<div class="path-topic-heading">Topics in this stage</div><ul>${shown.map(key => `<li>${topicTitle(key)}</li>`).join('')}</ul>${keys.length > shown.length ? `<div class="path-more-count">+ ${keys.length - shown.length} more topics</div>` : ''}`;
      card.appendChild(preview);

      const action = document.createElement('div');
      action.className = 'path-card-action';
      action.textContent = `View ${level} Curriculum →`;
      card.appendChild(action);

      const activate = () => setCurriculumLevel(level, true);
      card.onclick = activate;
      card.onkeydown = e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          activate();
        }
      };
    });

    const startBtn = document.querySelector('.hero-actions .cta-button');
    if (startBtn) {
      startBtn.textContent = 'Choose Your Level';
      startBtn.onclick = () => path.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    decorateAndFilterTopicCards();
  }

  function installStyles() {
    if (document.getElementById('learnerFlowStyles')) return;
    const style = document.createElement('style');
    style.id = 'learnerFlowStyles';
    style.textContent = `
      .curriculum-level-hidden{display:none!important}.curriculum-level-badge{display:inline-flex;width:max-content;margin:.08rem 0 .18rem;padding:.2rem .42rem;border-radius:999px;font-size:.56rem;font-weight:700;line-height:1;border:1px solid #d9d5ce;background:#f7f5f1;color:#4e554f}.curriculum-level-badge[data-level="Beginner"]{background:#eaf4e7;color:#215a32;border-color:#cfe0cb}.curriculum-level-badge[data-level="Intermediate"]{background:#fff1df;color:#9d461d;border-color:#f1d7bb}.curriculum-level-badge[data-level="Advanced"]{background:#f0eafb;color:#5d3e8d;border-color:#dcd0ef}
      .path-card{cursor:pointer;transition:transform .18s ease,box-shadow .18s ease,border-color .18s ease}.path-card:hover,.path-card:focus-visible{transform:translateY(-3px);box-shadow:0 8px 22px rgba(32,39,34,.08);border-color:#c7bfae;outline:none}.path-card.selected-level-card{border-color:#0f5b37;box-shadow:0 0 0 2px rgba(15,91,55,.08)}
      .path-topic-preview{margin-top:.8rem;padding-top:.7rem;border-top:1px solid #eee6da}.path-topic-heading{font-size:.66rem;font-weight:800;text-transform:uppercase;letter-spacing:.035em;color:#173b29;margin-bottom:.35rem}.path-topic-preview ul{margin:.25rem 0 .2rem 1rem!important;padding:0}.path-topic-preview li{font-size:.7rem!important;line-height:1.45!important;color:#4f564f!important;margin:.16rem 0}.path-more-count{font-size:.62rem;color:#8a6655;margin-top:.3rem}.path-card-action{display:inline-flex;margin-top:.65rem;color:#e95420;font-size:.68rem;font-weight:800}.path-card:hover .path-card-action{color:#c84417}
      @media(max-width:760px){.path-topic-preview li{font-size:.72rem!important}.path-card-action{font-size:.7rem}}
    `;
    document.head.appendChild(style);
  }

  cleanCurriculumSearch();
  installStyles();

  const app = document.createElement('script');
  app.src = 'app-script.js';
  app.async = false;
  app.onload = () => {
    cleanCurriculumSearch();
    setTimeout(() => {
      installCurriculumFiltering();
      enhanceLearningPathCards();
      setCurriculumLevel(selectedCurriculumLevel, false);
    }, 120);
  };
  document.head.appendChild(app);

  document.addEventListener('DOMContentLoaded', () => {
    cleanCurriculumSearch();
    setTimeout(() => {
      installCurriculumFiltering();
      enhanceLearningPathCards();
    }, 260);
  }, { once: true });
  setTimeout(cleanCurriculumSearch, 1000);
})();
