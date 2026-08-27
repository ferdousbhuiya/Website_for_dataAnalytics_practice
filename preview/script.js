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

  function decorateAndFilterTopicCards() {
    const cards = document.querySelectorAll('#topicsGrid .topic-card');
    cards.forEach(card => {
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

      const matches = selectedCurriculumLevel === 'all' || level === selectedCurriculumLevel;
      card.classList.toggle('curriculum-level-hidden', !matches);
    });

    document.querySelectorAll('.start-level-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.level === selectedCurriculumLevel);
    });
    document.querySelectorAll('.path-card').forEach(card => {
      card.classList.toggle('active-path-card', card.dataset.level === selectedCurriculumLevel);
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

  function hasSavedProgress() {
    try {
      return Object.keys(localStorage).some(key => {
        if (!key.startsWith('dataAnalyticsProgress')) return false;
        const parsed = JSON.parse(localStorage.getItem(key) || '{}');
        return parsed && typeof parsed === 'object' && Object.keys(parsed).length > 0;
      });
    } catch (_) { return false; }
  }

  function bindLearningPathCards() {
    const levels = ['Beginner', 'Intermediate', 'Advanced'];
    const cards = document.querySelectorAll('#path .path-card');
    cards.forEach((card, index) => {
      const level = levels[index];
      if (!level || card.dataset.levelBound) return;
      card.dataset.level = level;
      card.dataset.levelBound = 'true';
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-label', `View ${level} curriculum`);
      const activate = () => setCurriculumLevel(level, true);
      card.addEventListener('click', activate);
      card.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          activate();
        }
      });
    });
    decorateAndFilterTopicCards();
  }

  function injectLearnerStartBar() {
    const topics = document.getElementById('topics');
    const headingRow = topics?.querySelector('.curriculum-heading-row');
    if (!topics || !headingRow || document.getElementById('learnerStartBar')) return;

    const bar = document.createElement('div');
    bar.id = 'learnerStartBar';
    bar.className = 'learner-start-bar';
    bar.innerHTML = `
      <div class="learner-start-copy">
        <strong>Choose your starting point</strong>
        <span>Each level now follows a defined curriculum sequence.</span>
      </div>
      <div class="learner-start-actions">
        <button type="button" class="start-level-btn" data-level="Beginner">Beginner</button>
        <button type="button" class="start-level-btn" data-level="Intermediate">Intermediate</button>
        <button type="button" class="start-level-btn" data-level="Advanced">Advanced</button>
        <button type="button" class="continue-learning-btn">${hasSavedProgress() ? 'Continue Learning' : 'Start with Beginner'}</button>
      </div>`;
    headingRow.insertAdjacentElement('afterend', bar);

    bar.querySelectorAll('.start-level-btn').forEach(btn => {
      btn.addEventListener('click', () => setCurriculumLevel(btn.dataset.level));
    });
    bar.querySelector('.continue-learning-btn')?.addEventListener('click', () => {
      if (hasSavedProgress()) document.getElementById('progress')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      else setCurriculumLevel('Beginner');
    });
    decorateAndFilterTopicCards();
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
      new MutationObserver(() => decorateAndFilterTopicCards())
        .observe(grid, { childList: true, subtree: false });
    }
    decorateAndFilterTopicCards();
  }

  function injectStyles() {
    if (document.getElementById('learnerFlowStyles')) return;
    const style = document.createElement('style');
    style.id = 'learnerFlowStyles';
    style.textContent = `
      .learner-start-bar{display:flex;align-items:center;justify-content:space-between;gap:1rem;margin:.35rem 0 .85rem;padding:.7rem .8rem;background:#fbf6ee;border:1px solid #e5ddd2;border-radius:9px}
      .learner-start-copy{display:flex;flex-direction:column;gap:.12rem;min-width:210px}.learner-start-copy strong{font-size:.76rem;color:#173b29}.learner-start-copy span{font-size:.65rem;color:#62675f}
      .learner-start-actions{display:flex;align-items:center;gap:.45rem;flex-wrap:wrap;justify-content:flex-end}.start-level-btn,.continue-learning-btn{min-height:32px;border-radius:999px;padding:.42rem .72rem;font:600 .66rem Inter,sans-serif;cursor:pointer}.start-level-btn{background:#fff;border:1px solid #d8d3cb;color:#202720}.start-level-btn:hover,.start-level-btn.active{background:#0f5b37;color:#fff;border-color:#0f5b37}.continue-learning-btn{background:#e95420;color:#fff;border:1px solid #e95420;border-radius:7px}.continue-learning-btn:hover{background:#c84417}
      .curriculum-level-hidden{display:none!important}.curriculum-level-badge{display:inline-flex;width:max-content;margin:.08rem 0 .18rem;padding:.2rem .42rem;border-radius:999px;font-size:.56rem;font-weight:700;line-height:1;border:1px solid #d9d5ce;background:#f7f5f1;color:#4e554f}.curriculum-level-badge[data-level="Beginner"]{background:#eaf4e7;color:#215a32;border-color:#cfe0cb}.curriculum-level-badge[data-level="Intermediate"]{background:#fff1df;color:#9d461d;border-color:#f1d7bb}.curriculum-level-badge[data-level="Advanced"]{background:#f0eafb;color:#5d3e8d;border-color:#dcd0ef}
      #path .path-card{cursor:pointer;transition:transform .15s ease,border-color .15s ease,box-shadow .15s ease;position:relative}#path .path-card:hover,#path .path-card:focus{transform:translateY(-2px);border-color:#e95420;box-shadow:0 8px 18px rgba(32,39,34,.08);outline:none}#path .path-card::after{content:'View curriculum →';display:inline-block;margin-top:.65rem;font-size:.68rem;font-weight:700;color:#0f5b37}#path .path-card.active-path-card{border-color:#0f5b37;box-shadow:0 0 0 2px rgba(15,91,55,.08)}
      @media(max-width:760px){.learner-start-bar{align-items:flex-start;flex-direction:column}.learner-start-actions{justify-content:flex-start}.learner-start-copy{min-width:0}}
    `;
    document.head.appendChild(style);
  }

  cleanCurriculumSearch();
  injectStyles();

  const app = document.createElement('script');
  app.src = 'app-script.js';
  app.async = false;
  app.onload = () => {
    cleanCurriculumSearch();
    setTimeout(() => {
      installCurriculumFiltering();
      injectLearnerStartBar();
      bindLearningPathCards();
      setCurriculumLevel(selectedCurriculumLevel, false);
    }, 100);
  };
  document.head.appendChild(app);

  document.addEventListener('DOMContentLoaded', () => {
    cleanCurriculumSearch();
    setTimeout(() => { installCurriculumFiltering(); injectLearnerStartBar(); bindLearningPathCards(); }, 250);
  }, { once: true });
  setTimeout(cleanCurriculumSearch, 1000);
})();
