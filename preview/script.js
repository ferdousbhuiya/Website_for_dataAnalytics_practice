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

  function completedCount(entry, total) {
    if (!entry) return 0;
    if (Array.isArray(entry)) return Math.min(total, entry.filter(v => v === true || v?.completed || v?.correct).length);
    if (typeof entry !== 'object') return entry === true ? Math.min(1, total) : 0;
    const candidateArrays = [entry.completedQuestions, entry.completed, entry.answers, entry.questions];
    for (const candidate of candidateArrays) {
      if (Array.isArray(candidate)) return Math.min(total, candidate.filter(v => v === true || v?.completed || v?.correct).length);
    }
    if (Number.isFinite(entry.completedCount)) return Math.min(total, Math.max(0, entry.completedCount));
    const values = Object.values(entry);
    return Math.min(total, values.filter(v => v === true || v?.completed || v?.correct).length);
  }

  function progressSnapshot() {
    let progress = {};
    try {
      if (typeof getNormalizedProgress === 'function') progress = getNormalizedProgress() || {};
      else progress = JSON.parse(localStorage.getItem('dataAnalyticsProgress') || '{}');
    } catch (_) {}

    const order = window.topicRegistry?.order || Object.keys(window.topicsData || {});
    const levels = { Beginner: {done:0,total:0}, Intermediate:{done:0,total:0}, Advanced:{done:0,total:0} };
    const topics = [];
    order.forEach(key => {
      const total = window.topicsData?.[key]?.questions?.length || 0;
      const done = completedCount(progress[key], total);
      const level = curriculumLevelFor(key);
      if (levels[level]) { levels[level].done += done; levels[level].total += total; }
      topics.push({ key, title: topicTitle(key), level, done, total, percent: total ? Math.round(done * 100 / total) : 0 });
    });
    return { levels, topics };
  }

  function openRecommendedTopic(key) {
    if (!key) return;
    localStorage.setItem('dataPrepLastTopic', key);
    try {
      if (typeof openTopic === 'function') { openTopic(key); return; }
    } catch (_) {}
    setCurriculumLevel(curriculumLevelFor(key), true);
    setTimeout(() => document.querySelector(`#topicsGrid .topic-card[data-topic-key="${key}"]`)?.click(), 250);
  }

  function renderLearnerDashboard() {
    const progressSection = document.getElementById('progress');
    if (!progressSection || !window.topicsData || !window.topicRegistry) return;
    const container = progressSection.querySelector('.container');
    if (!container) return;

    let dashboard = document.getElementById('learnerDashboard');
    if (!dashboard) {
      dashboard = document.createElement('div');
      dashboard.id = 'learnerDashboard';
      dashboard.className = 'learner-dashboard';
      const summary = container.querySelector('.progress-summary');
      if (summary) summary.insertAdjacentElement('beforebegin', dashboard);
      else container.appendChild(dashboard);
    }

    const snapshot = progressSnapshot();
    const preferred = localStorage.getItem('dataPrepPreferredLevel');
    const orderedTopics = preferred && preferred !== 'all'
      ? snapshot.topics.filter(t => t.level === preferred).concat(snapshot.topics.filter(t => t.level !== preferred))
      : snapshot.topics;
    const lastKey = localStorage.getItem('dataPrepLastTopic');
    const lastIncomplete = orderedTopics.find(t => t.key === lastKey && t.done < t.total);
    const next = lastIncomplete || orderedTopics.find(t => t.total > 0 && t.done < t.total) || orderedTopics[0];

    const levelCards = ['Beginner','Intermediate','Advanced'].map(level => {
      const s = snapshot.levels[level];
      const pct = s.total ? Math.round(s.done * 100 / s.total) : 0;
      return `<button class="level-progress-card" data-level="${level}" type="button"><div class="level-progress-top"><strong>${level}</strong><span>${pct}%</span></div><div class="level-progress-track"><i style="width:${pct}%"></i></div><small>${s.done} of ${s.total} practice questions completed</small></button>`;
    }).join('');

    const topicRows = snapshot.topics.filter(t => t.total > 0).slice(0, 6).map(t => `<div class="topic-progress-row"><div><strong>${t.title}</strong><small>${t.level}</small></div><div class="topic-progress-meter"><i style="width:${t.percent}%"></i></div><span>${t.percent}%</span></div>`).join('');

    dashboard.innerHTML = `
      <div class="dashboard-head"><div><span class="dashboard-eyebrow">Learner dashboard</span><h3>Your learning journey</h3><p>Track your progress by level and continue from the next unfinished topic.</p></div>${next ? `<button id="continueTopicBtn" class="dashboard-continue" type="button">Continue: ${next.title} →</button>` : ''}</div>
      <div class="level-progress-grid">${levelCards}</div>
      <div class="dashboard-lower"><div class="recommended-card"><span>Recommended next</span><strong>${next ? next.title : 'Choose a learning level'}</strong><p>${next ? `${next.level} · ${next.done} of ${next.total} practice questions completed` : 'Start with the Beginner path to build your foundation.'}</p><button id="recommendedTopicBtn" type="button">${next ? 'Continue this topic' : 'Choose Beginner'}</button></div><div class="topic-progress-list"><h4>Topic progress</h4>${topicRows || '<p class="empty-progress">Complete a practice question to begin tracking topic progress.</p>'}</div></div>`;

    dashboard.querySelectorAll('.level-progress-card').forEach(btn => btn.addEventListener('click', () => setCurriculumLevel(btn.dataset.level, true)));
    dashboard.querySelector('#continueTopicBtn')?.addEventListener('click', () => openRecommendedTopic(next?.key));
    dashboard.querySelector('#recommendedTopicBtn')?.addEventListener('click', () => next ? openRecommendedTopic(next.key) : setCurriculumLevel('Beginner', true));
  }

  function installProgressRefresh() {
    if (window.__dataPrepProgressWrapped) return;
    const original = window.updateProgressBars;
    if (typeof original === 'function') {
      window.updateProgressBars = function(...args) {
        const result = original.apply(this, args);
        setTimeout(renderLearnerDashboard, 0);
        return result;
      };
      window.__dataPrepProgressWrapped = true;
    }
    document.querySelector('.progress-cta')?.addEventListener('click', () => setTimeout(renderLearnerDashboard, 100));
  }

  function installStyles() {
    if (document.getElementById('learnerFlowStyles')) return;
    const style = document.createElement('style');
    style.id = 'learnerFlowStyles';
    style.textContent = `
      .curriculum-level-hidden{display:none!important}.curriculum-level-badge{display:inline-flex;width:max-content;margin:.08rem 0 .18rem;padding:.2rem .42rem;border-radius:999px;font-size:.56rem;font-weight:700;line-height:1;border:1px solid #d9d5ce;background:#f7f5f1;color:#4e554f}.curriculum-level-badge[data-level="Beginner"]{background:#eaf4e7;color:#215a32;border-color:#cfe0cb}.curriculum-level-badge[data-level="Intermediate"]{background:#fff1df;color:#9d461d;border-color:#f1d7bb}.curriculum-level-badge[data-level="Advanced"]{background:#f0eafb;color:#5d3e8d;border-color:#dcd0ef}
      .path-card{cursor:pointer;transition:transform .18s ease,box-shadow .18s ease,border-color .18s ease}.path-card:hover,.path-card:focus-visible{transform:translateY(-3px);box-shadow:0 8px 22px rgba(32,39,34,.08);border-color:#c7bfae;outline:none}.path-card.selected-level-card{border-color:#0f5b37;box-shadow:0 0 0 2px rgba(15,91,55,.08)}.path-topic-preview{margin-top:.8rem;padding-top:.7rem;border-top:1px solid #eee6da}.path-topic-heading{font-size:.66rem;font-weight:800;text-transform:uppercase;letter-spacing:.035em;color:#173b29;margin-bottom:.35rem}.path-topic-preview ul{margin:.25rem 0 .2rem 1rem!important;padding:0}.path-topic-preview li{font-size:.7rem!important;line-height:1.45!important;color:#4f564f!important;margin:.16rem 0}.path-more-count{font-size:.62rem;color:#8a6655;margin-top:.3rem}.path-card-action{display:inline-flex;margin-top:.65rem;color:#e95420;font-size:.68rem;font-weight:800}.path-card:hover .path-card-action{color:#c84417}
      .learner-dashboard{margin:1rem 0 1.2rem;padding:1rem;background:#fbf6ee;border:1px solid #e3dbcf;border-radius:12px}.dashboard-head{display:flex;align-items:flex-end;justify-content:space-between;gap:1rem;margin-bottom:.9rem}.dashboard-eyebrow{display:block;color:#e95420;font-size:.62rem;font-weight:800;text-transform:uppercase;letter-spacing:.05em}.dashboard-head h3{font-size:1rem;margin:.18rem 0}.dashboard-head p{font-size:.7rem;color:#62675f;margin:0}.dashboard-continue,.recommended-card button{border:0;background:#e95420;color:#fff;border-radius:7px;padding:.58rem .8rem;font:700 .68rem Inter,sans-serif;cursor:pointer}.level-progress-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:.7rem}.level-progress-card{background:#fff;border:1px solid #e0d9cf;border-radius:9px;padding:.75rem;text-align:left;cursor:pointer}.level-progress-card:hover{border-color:#0f5b37}.level-progress-top{display:flex;justify-content:space-between;align-items:center;font-size:.72rem;color:#173b29}.level-progress-track{height:6px;border-radius:99px;background:#eee9e1;margin:.5rem 0;overflow:hidden}.level-progress-track i,.topic-progress-meter i{display:block;height:100%;background:#0f5b37;border-radius:99px}.level-progress-card small{font-size:.58rem;color:#70756e}.dashboard-lower{display:grid;grid-template-columns:.9fr 1.4fr;gap:.8rem;margin-top:.8rem}.recommended-card,.topic-progress-list{background:#fff;border:1px solid #e0d9cf;border-radius:9px;padding:.8rem}.recommended-card>span{font-size:.58rem;color:#e95420;font-weight:800;text-transform:uppercase}.recommended-card>strong{display:block;font-size:.88rem;margin:.2rem 0}.recommended-card p{font-size:.64rem;color:#62675f;margin:.25rem 0 .65rem}.topic-progress-list h4{font-size:.72rem;margin:0 0 .5rem}.topic-progress-row{display:grid;grid-template-columns:1fr 100px 34px;gap:.5rem;align-items:center;padding:.38rem 0;border-top:1px solid #f0ece5}.topic-progress-row:first-of-type{border-top:0}.topic-progress-row strong{display:block;font-size:.64rem}.topic-progress-row small{display:block;font-size:.54rem;color:#777}.topic-progress-meter{height:5px;background:#eee9e1;border-radius:99px;overflow:hidden}.topic-progress-row>span{font-size:.58rem;text-align:right;color:#555}.empty-progress{font-size:.64rem;color:#777}
      @media(max-width:760px){.path-topic-preview li{font-size:.72rem!important}.path-card-action{font-size:.7rem}.dashboard-head{align-items:flex-start;flex-direction:column}.level-progress-grid{grid-template-columns:1fr}.dashboard-lower{grid-template-columns:1fr}.topic-progress-row{grid-template-columns:1fr 72px 30px}}
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
      installProgressRefresh();
      renderLearnerDashboard();
    }, 120);
  };
  document.head.appendChild(app);

  document.addEventListener('DOMContentLoaded', () => {
    cleanCurriculumSearch();
    setTimeout(() => {
      installCurriculumFiltering();
      enhanceLearningPathCards();
      installProgressRefresh();
      renderLearnerDashboard();
    }, 260);
  }, { once: true });
  setTimeout(cleanCurriculumSearch, 1000);
})();
