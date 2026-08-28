// Preview bootstrap: curriculum flow, progress dashboard, and SQL checkpoint pilot.
(function () {
  let selectedCurriculumLevel = localStorage.getItem('dataPrepPreferredLevel') || 'all';

  const SQL_GROUPS = [
    { id: 1, from: 1, to: 3 },
    { id: 2, from: 4, to: 6 },
    { id: 3, from: 7, to: 9 },
    { id: 4, from: 10, to: 12 },
    { id: 5, from: 13, to: 15 },
    { id: 6, from: 16, to: 18 },
    { id: 7, from: 19, to: 20 },
    { id: 8, from: 21, to: 22 }
  ];

  const SQL_QUIZZES = {
    1: [
      ['Which SQL clause chooses the columns returned by a query?', ['FROM','SELECT','WHERE','GROUP BY'], 1],
      ['What does the FROM clause identify?', ['The table or source of the data','The rows to delete','The sort direction','The aggregate function'], 0],
      ['Which clause filters individual rows before they are returned?', ['HAVING','ORDER BY','WHERE','WITH'], 2],
      ['Which statement best describes a primary key?', ['It may contain duplicates','It uniquely identifies each row','It must reference another table','It is used only for sorting'], 1],
      ['A foreign key is primarily used to do what?', ['Encrypt a table','Link related tables','Remove duplicates','Calculate averages'], 1]
    ],
    2: [
      ['Which clause sorts query results?', ['GROUP BY','ORDER BY','WHERE','HAVING'], 1],
      ['Which keyword sorts from highest to lowest?', ['ASC','DESC','TOP','DOWN'], 1],
      ['Which aggregate returns the number of rows?', ['SUM','AVG','COUNT','MAXIMUM'], 2],
      ['Which function calculates the arithmetic mean of a numeric column?', ['AVG','COUNT','SUM','MIN'], 0],
      ['GROUP BY is mainly used to do what?', ['Split rows into groups for aggregation','Rename a table','Filter rows before grouping','Create a foreign key'], 0]
    ],
    3: [
      ['Which clause filters groups after aggregation?', ['WHERE','HAVING','ORDER BY','SELECT'], 1],
      ['Which JOIN returns only rows that match in both tables?', ['LEFT JOIN','FULL OUTER JOIN','INNER JOIN','RIGHT JOIN'], 2],
      ['Which JOIN keeps every row from the left table even when no match exists?', ['LEFT JOIN','INNER JOIN','CROSS JOIN','RIGHT JOIN'], 0],
      ['What is a subquery?', ['A query nested inside another query','A permanent database table','A type of index','A sorting expression'], 0],
      ['To find products priced above the overall average, which technique can provide the average inside the WHERE condition?', ['A subquery','A primary key','A RIGHT JOIN only','A table alias only'], 0]
    ],
    4: [
      ['Which keyword commonly starts a Common Table Expression?', ['WITH','USING','CREATE','TEMP'], 0],
      ['What is a major benefit of a CTE in complex SQL?', ['It makes multi-step queries easier to read','It automatically creates an index','It permanently stores results','It replaces all JOINs'], 0],
      ['Which function removes leading and trailing whitespace from text?', ['TRIM','ROUND','RANK','LAG'], 0],
      ['Unlike GROUP BY, a window function usually does what?', ['Keeps individual rows while calculating across related rows','Deletes duplicate rows','Creates a new table','Filters groups'], 0],
      ['Which window function accesses a value from a previous row?', ['LEAD','LAG','COUNT','TRIM'], 1]
    ],
    5: [
      ['A window frame such as ROWS BETWEEN 2 PRECEDING AND CURRENT ROW controls what?', ['Which rows participate in the window calculation','Which database is used','Which table is created','Which users can connect'], 0],
      ['A recursive CTE normally contains which two parts?', ['An anchor member and a recursive member','A trigger and an index','A view and a table','A role and a policy'], 0],
      ['Recursive CTEs are especially useful for which kind of data?', ['Hierarchical relationships','Only flat CSV files','Only numeric sorting','Password storage'], 0],
      ['What is a materialized view?', ['A physically stored result of a query','A temporary alias','A foreign key','A transaction log'], 0],
      ['Why would a dashboard use a materialized view?', ['To speed repeated expensive queries','To disable indexes','To remove permissions','To force row-by-row processing'], 0]
    ],
    6: [
      ['Which PostgreSQL index type is commonly useful for JSONB containment/search?', ['GIN','B-tree only','Clustered text','Heap'], 0],
      ['What is the main purpose of table partitioning?', ['Split a large table into manageable physical pieces','Encrypt every column','Replace SQL with Python','Remove all constraints'], 0],
      ['Which partitioning strategy is commonly appropriate for time-series data?', ['Range partitioning','Random text partitioning','Role partitioning','View partitioning'], 0],
      ['What does EXPLAIN help you inspect?', ['The database query execution plan','User passwords','Only table names','Backup files'], 0],
      ['In performance tuning, an unexpected sequential scan on a huge table can indicate what?', ['A possible indexing or selectivity problem','A successful encryption step','A foreign-key cascade','A JSON formatting error'], 0]
    ],
    7: [
      ['Which specialized PostgreSQL index is well suited to naturally ordered very large data such as dates?', ['BRIN','GIN','Hash password index','XML view'], 0],
      ['A partial index contains what?', ['Only rows that satisfy a specified condition','Every row in every database','Only primary keys','Only NULL values'], 0],
      ['What does row-level security control?', ['Which rows a user or role may access','The monitor resolution','The SQL keyword case','The order of columns'], 0],
      ['Which SQL commands are used to give and remove privileges?', ['GRANT and REVOKE','SELECT and FROM','ASC and DESC','BEGIN and END only'], 0],
      ['Why is audit logging useful?', ['It records who changed data and when','It automatically normalizes every table','It replaces backups','It creates charts'], 0]
    ],
    8: [
      ['Running machine-learning logic inside a database can reduce what?', ['Unnecessary data movement','The need for any data','All model errors','The number of SQL keywords'], 0],
      ['Which JOIN returns all matched rows and also unmatched rows from both tables?', ['FULL OUTER JOIN','INNER JOIN','LEFT JOIN only','CROSS JOIN only'], 0],
      ['Which JOIN keeps every row from the right table?', ['RIGHT JOIN','INNER JOIN','LEFT JOIN','SELF JOIN only'], 0],
      ['Which statement about INNER JOIN is correct?', ['It returns rows with matching join keys in both inputs','It always returns every row from both tables','It ignores the join condition','It creates a materialized view'], 0],
      ['Which condition is essential for a meaningful relational JOIN between customers and orders?', ['A relationship such as matching customer_id values','Matching column colors','Identical row counts','The same table name'], 0]
    ]
  };

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
    return window.topicsData?.[key]?.title || window.topicRegistry?.topics?.[key]?.category || String(key).replaceAll('_', ' ');
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
    document.querySelectorAll('.path-card').forEach(card => card.classList.toggle('selected-level-card', card.dataset.level === selectedCurriculumLevel));
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
    ['Beginner','Intermediate','Advanced'].forEach((level, index) => {
      const card = cards[index];
      if (!card) return;
      card.dataset.level = level;
      card.tabIndex = 0;
      card.setAttribute('role','button');
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
      card.onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(); } };
    });
    const startBtn = document.querySelector('.hero-actions .cta-button');
    if (startBtn) {
      startBtn.textContent = 'Choose Your Level';
      startBtn.onclick = () => path.scrollIntoView({ behavior:'smooth', block:'start' });
    }
    decorateAndFilterTopicCards();
  }

  function completedCount(entry, total) {
    if (!entry) return 0;
    if (Array.isArray(entry)) return Math.min(total, entry.filter(v => v === true || v?.completed || v?.correct).length);
    if (typeof entry !== 'object') return entry === true ? Math.min(1,total) : 0;
    for (const candidate of [entry.completedQuestions, entry.completed, entry.answers, entry.questions]) {
      if (Array.isArray(candidate)) return Math.min(total, candidate.filter(v => v === true || v?.completed || v?.correct).length);
    }
    if (Number.isFinite(entry.completedCount)) return Math.min(total, Math.max(0,entry.completedCount));
    return Math.min(total, Object.values(entry).filter(v => v === true || v?.completed || v?.correct).length);
  }

  function progressSnapshot() {
    let progress = {};
    try { progress = typeof getNormalizedProgress === 'function' ? (getNormalizedProgress() || {}) : JSON.parse(localStorage.getItem('dataAnalyticsProgress') || '{}'); } catch (_) {}
    const order = window.topicRegistry?.order || Object.keys(window.topicsData || {});
    const levels = { Beginner:{done:0,total:0}, Intermediate:{done:0,total:0}, Advanced:{done:0,total:0} };
    const topics = [];
    order.forEach(key => {
      const total = window.topicsData?.[key]?.questions?.length || 0;
      const done = completedCount(progress[key], total);
      const level = curriculumLevelFor(key);
      if (levels[level]) { levels[level].done += done; levels[level].total += total; }
      topics.push({ key, title:topicTitle(key), level, done, total, percent:total ? Math.round(done*100/total) : 0 });
    });
    return { levels, topics };
  }

  function profileId() {
    return localStorage.getItem('dataAnalyticsActivePin') || 'default';
  }

  function checkpointStorageKey() {
    return `dataPrepCheckpoints_${profileId()}`;
  }

  function checkpointState() {
    try { return JSON.parse(localStorage.getItem(checkpointStorageKey()) || '{}'); } catch (_) { return {}; }
  }

  function saveCheckpointState(state) {
    localStorage.setItem(checkpointStorageKey(), JSON.stringify(state));
  }

  function checkpointPassed(id) {
    return checkpointState()?.[`sql_${id}`]?.passed === true;
  }

  function verifiedSqlPercent() {
    const passed = SQL_GROUPS.filter(g => checkpointPassed(g.id)).length;
    return Math.round((passed / SQL_GROUPS.length) * 100);
  }

  function renderLearnerDashboard() {
    const section = document.getElementById('progress');
    const container = section?.querySelector('.container');
    if (!container || !window.topicsData || !window.topicRegistry) return;
    let dashboard = document.getElementById('learnerDashboard');
    if (!dashboard) {
      dashboard = document.createElement('div');
      dashboard.id = 'learnerDashboard';
      dashboard.className = 'learner-dashboard';
      container.querySelector('.progress-summary')?.insertAdjacentElement('beforebegin', dashboard);
    }
    if (!dashboard) return;
    const snap = progressSnapshot();
    const preferred = localStorage.getItem('dataPrepPreferredLevel');
    const ordered = preferred && preferred !== 'all' ? snap.topics.filter(t=>t.level===preferred).concat(snap.topics.filter(t=>t.level!==preferred)) : snap.topics;
    const next = ordered.find(t => t.total > 0 && t.done < t.total) || ordered[0];
    const levelCards = ['Beginner','Intermediate','Advanced'].map(level => {
      const s = snap.levels[level];
      const pct = s.total ? Math.round(s.done*100/s.total) : 0;
      return `<button class="level-progress-card" data-level="${level}" type="button"><div class="level-progress-top"><strong>${level}</strong><span>${pct}%</span></div><div class="level-progress-track"><i style="width:${pct}%"></i></div><small>${s.done} of ${s.total} practice questions completed</small></button>`;
    }).join('');
    dashboard.innerHTML = `<div class="dashboard-head"><div><span class="dashboard-eyebrow">Learner dashboard</span><h3>Your learning journey</h3><p>Practice completion and verified checkpoint progress are tracked separately.</p></div>${next ? `<button id="continueTopicBtn" class="dashboard-continue" type="button">Continue: ${next.title} →</button>` : ''}</div><div class="level-progress-grid">${levelCards}</div><div class="verified-progress-card"><div><span>SQL pilot · verified learning</span><strong>${verifiedSqlPercent()}%</strong></div><div class="verified-track"><i style="width:${verifiedSqlPercent()}%"></i></div><small>${SQL_GROUPS.filter(g=>checkpointPassed(g.id)).length} of ${SQL_GROUPS.length} SQL checkpoints passed. Reading ahead does not increase this score.</small></div>`;
    dashboard.querySelectorAll('.level-progress-card').forEach(btn => btn.onclick = () => setCurriculumLevel(btn.dataset.level,true));
    dashboard.querySelector('#continueTopicBtn')?.addEventListener('click', () => {
      try { if (typeof openTopic === 'function') openTopic(next.key); else setCurriculumLevel(next.level,true); } catch (_) { setCurriculumLevel(next.level,true); }
    });
  }

  function installProgressRefresh() {
    const original = window.updateProgressBars;
    if (typeof original === 'function' && !window.__dataPrepProgressWrapped) {
      window.updateProgressBars = function(...args) {
        const result = original.apply(this,args);
        setTimeout(renderLearnerDashboard,0);
        return result;
      };
      window.__dataPrepProgressWrapped = true;
    }
    document.querySelector('.progress-cta')?.addEventListener('click', () => setTimeout(renderLearnerDashboard,100));
  }

  function isSqlOpen() {
    const title = document.getElementById('topicTitle')?.textContent?.toLowerCase() || '';
    return title.includes('sql');
  }

  function lessonItems() {
    return Array.from(document.querySelectorAll('#lessonsContainer .lesson-item'));
  }

  function groupForLessonNumber(n) {
    return SQL_GROUPS.find(g => n >= g.from && n <= g.to);
  }

  function addPreviewBadge(item, lessonNumber, credited) {
    item.querySelector('.checkpoint-credit-badge')?.remove();
    const badge = document.createElement('span');
    badge.className = 'checkpoint-credit-badge ' + (credited ? 'credited' : 'preview');
    badge.textContent = credited ? 'Verified path' : 'Preview · not yet credited';
    const target = item.querySelector('.lesson-header, h3, h4') || item.firstElementChild || item;
    target.appendChild(badge);
  }

  function quizCard(group, unlocked, passed) {
    const card = document.createElement('section');
    card.className = `checkpoint-card ${passed ? 'passed' : ''} ${!unlocked ? 'locked' : ''}`;
    card.dataset.checkpointId = String(group.id);
    const questions = SQL_QUIZZES[group.id] || [];
    const previousText = group.id === 1 ? 'This first checkpoint is ready.' : `Pass Checkpoint ${group.id - 1} to unlock this quiz.`;
    card.innerHTML = `<div class="checkpoint-head"><div><span class="checkpoint-kicker">SQL Checkpoint ${group.id}</span><h3>Lessons ${group.from}–${group.to}</h3><p>${passed ? 'Passed. This lesson block now counts toward verified progress.' : (unlocked ? 'Answer 5 questions. Score at least 4/5 (70%+) to pass.' : previousText)}</p></div><span class="checkpoint-status">${passed ? 'Passed' : (unlocked ? 'Ready' : 'Locked')}</span></div>${passed ? '<button class="checkpoint-retry" type="button">Retake quiz</button>' : (unlocked ? '<button class="checkpoint-start" type="button">Start checkpoint</button>' : '')}<div class="checkpoint-quiz" hidden></div>`;
    const start = card.querySelector('.checkpoint-start, .checkpoint-retry');
    start?.addEventListener('click', () => renderQuiz(card, group, questions));
    return card;
  }

  function renderQuiz(card, group, questions) {
    const quiz = card.querySelector('.checkpoint-quiz');
    if (!quiz) return;
    quiz.hidden = false;
    quiz.innerHTML = questions.map((q, qi) => `<fieldset class="checkpoint-question"><legend>${qi+1}. ${q[0]}</legend>${q[1].map((opt,oi)=>`<label><input type="radio" name="cp${group.id}q${qi}" value="${oi}"><span>${opt}</span></label>`).join('')}</fieldset>`).join('') + `<div class="checkpoint-actions"><button class="checkpoint-submit" type="button">Submit checkpoint</button><span class="checkpoint-result" aria-live="polite"></span></div>`;
    quiz.querySelector('.checkpoint-submit')?.addEventListener('click', () => {
      let answered = 0, correct = 0;
      questions.forEach((q, qi) => {
        const selected = quiz.querySelector(`input[name="cp${group.id}q${qi}"]:checked`);
        if (selected) { answered++; if (Number(selected.value) === q[2]) correct++; }
      });
      const result = quiz.querySelector('.checkpoint-result');
      if (answered < questions.length) {
        result.textContent = `Answer all ${questions.length} questions before submitting.`;
        result.className = 'checkpoint-result needs-work';
        return;
      }
      const pct = Math.round(correct * 100 / questions.length);
      const passed = pct >= 70;
      const state = checkpointState();
      const key = `sql_${group.id}`;
      const priorAttempts = state[key]?.attempts || 0;
      state[key] = { passed: passed || state[key]?.passed === true, bestScore: Math.max(pct, state[key]?.bestScore || 0), attempts: priorAttempts + 1, updatedAt: new Date().toISOString() };
      saveCheckpointState(state);
      if (passed) {
        result.textContent = `${correct}/${questions.length} · ${pct}% · Passed. Next checkpoint is unlocked.`;
        result.className = 'checkpoint-result passed';
        setTimeout(() => { enhanceSqlLessons(); renderLearnerDashboard(); }, 500);
      } else {
        result.textContent = `${correct}/${questions.length} · ${pct}% · Not passed yet. Review Lessons ${group.from}–${group.to} and retry.`;
        result.className = 'checkpoint-result needs-work';
      }
    });
  }

  function enhanceSqlLessons() {
    if (!isSqlOpen()) return;
    const container = document.getElementById('lessonsContainer');
    const items = lessonItems();
    if (!container || !items.length) return;
    container.querySelectorAll('.checkpoint-card').forEach(el => el.remove());
    items.forEach((item,index) => {
      const lessonNumber = index + 1;
      item.dataset.lessonNumber = String(lessonNumber);
      const group = groupForLessonNumber(lessonNumber);
      const priorPassed = !group || group.id === 1 || checkpointPassed(group.id - 1);
      item.classList.toggle('lesson-preview-mode', !priorPassed);
      addPreviewBadge(item, lessonNumber, priorPassed);
    });
    SQL_GROUPS.forEach(group => {
      const afterItem = items[group.to - 1];
      if (!afterItem) return;
      const unlocked = group.id === 1 || checkpointPassed(group.id - 1);
      const passed = checkpointPassed(group.id);
      afterItem.insertAdjacentElement('afterend', quizCard(group, unlocked, passed));
    });
    let intro = container.querySelector('.checkpoint-intro');
    if (!intro) {
      intro = document.createElement('div');
      intro.className = 'checkpoint-intro';
      intro.innerHTML = `<strong>SQL verified learning pilot</strong><span>Read every lesson freely. Checkpoints appear after each 2–3 lesson block. Passing requires at least 70%. Lessons beyond an unpassed checkpoint remain readable but do not count toward verified progress.</span>`;
      container.prepend(intro);
    }
  }

  function installSqlObserver() {
    const container = document.getElementById('lessonsContainer');
    if (!container || container.dataset.checkpointObserved) return;
    container.dataset.checkpointObserved = 'true';
    let timer;
    new MutationObserver(() => {
      clearTimeout(timer);
      timer = setTimeout(() => { if (isSqlOpen()) enhanceSqlLessons(); }, 80);
    }).observe(container, { childList:true, subtree:false });
    document.querySelectorAll('.tab-button').forEach(btn => btn.addEventListener('click', () => setTimeout(enhanceSqlLessons,120)));
  }

  function installStyles() {
    if (document.getElementById('learnerFlowStyles')) return;
    const style = document.createElement('style');
    style.id = 'learnerFlowStyles';
    style.textContent = `
      .curriculum-level-hidden{display:none!important}.curriculum-level-badge{display:inline-flex;width:max-content;margin:.08rem 0 .18rem;padding:.2rem .42rem;border-radius:999px;font-size:.56rem;font-weight:700;line-height:1;border:1px solid #d9d5ce;background:#f7f5f1;color:#4e554f}.curriculum-level-badge[data-level="Beginner"]{background:#eaf4e7;color:#215a32;border-color:#cfe0cb}.curriculum-level-badge[data-level="Intermediate"]{background:#fff1df;color:#9d461d;border-color:#f1d7bb}.curriculum-level-badge[data-level="Advanced"]{background:#f0eafb;color:#5d3e8d;border-color:#dcd0ef}
      .path-card{cursor:pointer;transition:transform .18s ease,box-shadow .18s ease,border-color .18s ease}.path-card:hover,.path-card:focus-visible{transform:translateY(-3px);box-shadow:0 8px 22px rgba(32,39,34,.08);border-color:#c7bfae;outline:none}.path-card.selected-level-card{border-color:#0f5b37;box-shadow:0 0 0 2px rgba(15,91,55,.08)}.path-topic-preview{margin-top:.8rem;padding-top:.7rem;border-top:1px solid #eee6da}.path-topic-heading{font-size:.66rem;font-weight:800;text-transform:uppercase;letter-spacing:.035em;color:#173b29;margin-bottom:.35rem}.path-topic-preview ul{margin:.25rem 0 .2rem 1rem!important;padding:0}.path-topic-preview li{font-size:.7rem!important;line-height:1.45!important;color:#39423b!important;margin:.16rem 0}.path-more-count{font-size:.62rem;color:#765c4d;margin-top:.3rem}.path-card-action{display:inline-flex;margin-top:.65rem;color:#e95420;font-size:.68rem;font-weight:800}
      .learner-dashboard{margin:1rem 0 1.2rem;padding:1rem;background:#fbf6ee;border:1px solid #e3dbcf;border-radius:12px}.dashboard-head{display:flex;align-items:flex-end;justify-content:space-between;gap:1rem;margin-bottom:.9rem}.dashboard-eyebrow{display:block;color:#e95420;font-size:.62rem;font-weight:800;text-transform:uppercase}.dashboard-head h3{font-size:1rem;margin:.18rem 0}.dashboard-head p{font-size:.7rem;color:#4b534d;margin:0}.dashboard-continue{border:0;background:#e95420;color:#fff;border-radius:7px;padding:.58rem .8rem;font:700 .68rem Inter,sans-serif;cursor:pointer}.level-progress-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:.7rem}.level-progress-card{background:#fff;border:1px solid #e0d9cf;border-radius:9px;padding:.75rem;text-align:left;cursor:pointer}.level-progress-top{display:flex;justify-content:space-between;font-size:.72rem;color:#173b29}.level-progress-track,.verified-track{height:7px;border-radius:99px;background:#eee9e1;margin:.5rem 0;overflow:hidden}.level-progress-track i,.verified-track i{display:block;height:100%;background:#0f5b37;border-radius:99px}.level-progress-card small,.verified-progress-card small{font-size:.59rem;color:#59615b}.verified-progress-card{margin-top:.75rem;padding:.8rem;background:#fff;border:1px solid #d9ded8;border-radius:9px}.verified-progress-card>div:first-child{display:flex;justify-content:space-between;gap:1rem;align-items:center}.verified-progress-card span{font-size:.66rem;font-weight:800;color:#173b29}.verified-progress-card strong{font-size:1rem;color:#e95420}
      #lessonsContainer .lesson-item,#lessonsContainer .lesson-content,#lessonsContainer .lesson-content p,#lessonsContainer .lesson-content li,#lessonsContainer .lesson-item p,#lessonsContainer .lesson-item li{color:#222a25!important}#lessonsContainer .lesson-content p,#lessonsContainer .lesson-content li,#lessonsContainer .lesson-item p,#lessonsContainer .lesson-item li{line-height:1.7!important}#lessonsContainer .lesson-content strong,#lessonsContainer .lesson-item strong{color:#142019!important}#lessonsContainer .lesson-content h3,#lessonsContainer .lesson-content h4,#lessonsContainer .lesson-item h3,#lessonsContainer .lesson-item h4{color:#123d28!important}
      .checkpoint-intro{display:flex;flex-direction:column;gap:.25rem;margin:0 0 .9rem;padding:.8rem .9rem;background:#eef6e9;border:1px solid #cddfca;border-left:4px solid #0f5b37;border-radius:8px}.checkpoint-intro strong{font-size:.82rem;color:#173b29}.checkpoint-intro span{font-size:.7rem;line-height:1.5;color:#35423a}.checkpoint-credit-badge{display:inline-flex;margin-left:.55rem;padding:.2rem .45rem;border-radius:999px;font-size:.58rem!important;font-weight:800;vertical-align:middle}.checkpoint-credit-badge.credited{background:#e8f2e7;color:#16512e;border:1px solid #c9dec5}.checkpoint-credit-badge.preview{background:#fff1df;color:#8a451f;border:1px solid #efd1b3}.lesson-preview-mode{border-left:4px solid #e3a15d!important;background:#fffaf3!important}.lesson-preview-mode .lesson-title,.lesson-preview-mode>.lesson-header{color:#493d34!important}
      .checkpoint-card{margin:.8rem 0 1rem;padding:.95rem;background:#fff;border:1px solid #d9d3ca;border-left:5px solid #e95420;border-radius:10px;box-shadow:0 5px 16px rgba(35,45,38,.05)}.checkpoint-card.locked{border-left-color:#aaa59d;background:#f6f3ee}.checkpoint-card.passed{border-left-color:#0f5b37;background:#f6fbf6}.checkpoint-head{display:flex;justify-content:space-between;gap:.8rem;align-items:flex-start}.checkpoint-kicker{font-size:.6rem;font-weight:800;text-transform:uppercase;color:#e95420}.checkpoint-head h3{font-size:.9rem;margin:.16rem 0;color:#17231d}.checkpoint-head p{font-size:.68rem;color:#465048;margin:0;line-height:1.45}.checkpoint-status{font-size:.6rem;font-weight:800;padding:.25rem .5rem;border-radius:999px;background:#fff1df;color:#9d461d;white-space:nowrap}.checkpoint-card.passed .checkpoint-status{background:#e8f2e7;color:#16512e}.checkpoint-card.locked .checkpoint-status{background:#ebe8e3;color:#68645e}.checkpoint-start,.checkpoint-retry,.checkpoint-submit{margin-top:.65rem;border:0;background:#e95420;color:#fff;border-radius:7px;padding:.52rem .75rem;font:700 .67rem Inter,sans-serif;cursor:pointer}.checkpoint-retry{background:#0f5b37}.checkpoint-question{border:1px solid #e3ded7;border-radius:8px;padding:.7rem;margin:.65rem 0;background:#fff}.checkpoint-question legend{font-size:.7rem;font-weight:700;color:#1e2821;padding:0 .25rem}.checkpoint-question label{display:flex;align-items:flex-start;gap:.45rem;margin:.38rem 0;font-size:.67rem;color:#29322b;cursor:pointer}.checkpoint-question input{margin-top:.13rem}.checkpoint-actions{display:flex;align-items:center;gap:.7rem;flex-wrap:wrap}.checkpoint-result{font-size:.67rem;font-weight:700}.checkpoint-result.passed{color:#0f5b37}.checkpoint-result.needs-work{color:#a23d1b}
      @media(max-width:760px){.level-progress-grid{grid-template-columns:1fr}.dashboard-head{align-items:flex-start;flex-direction:column}.checkpoint-head{flex-direction:column}.checkpoint-credit-badge{display:flex;width:max-content;margin:.35rem 0 0}.path-topic-preview li{font-size:.72rem!important}}
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
      installProgressRefresh();
      renderLearnerDashboard();
      installSqlObserver();
      setCurriculumLevel(selectedCurriculumLevel,false);
      enhanceSqlLessons();
    },140);
  };
  document.head.appendChild(app);

  document.addEventListener('DOMContentLoaded', () => {
    cleanCurriculumSearch();
    setTimeout(() => {
      installCurriculumFiltering();
      enhanceLearningPathCards();
      installSqlObserver();
      renderLearnerDashboard();
      enhanceSqlLessons();
    },300);
  }, { once:true });
  setTimeout(cleanCurriculumSearch,1000);
})();
