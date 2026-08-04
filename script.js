// ===== Navigation and UI Functions =====

function scrollToTopics() {
    document.getElementById('topics').scrollIntoView({ behavior: 'smooth' });
}

// ===== Update Hero Stats with Actual Counts =====

function updateHeroStats() {
    if (typeof topicsData === 'undefined') {
        console.warn('topicsData not loaded yet, retrying...');
        setTimeout(updateHeroStats, 100);
        return;
    }
    
    let totalLessons = 0;
    let totalQuestions = 0;
    let totalTopics = 0;
    
    for (const topicKey in topicsData) {
        const topic = topicsData[topicKey];
        totalTopics++;
        
        if (topic.lessons && Array.isArray(topic.lessons)) {
            totalLessons += topic.lessons.length;
        }
        
        if (topic.questions && Array.isArray(topic.questions)) {
            totalQuestions += topic.questions.length;
        }
    }
    
    // Update the DOM
    const lessonsEl = document.getElementById('heroLessonsCount');
    const questionsEl = document.getElementById('heroQuestionsCount');
    const topicsEl = document.getElementById('heroTopicsCount');
    
    if (lessonsEl) lessonsEl.textContent = totalLessons;
    if (questionsEl) questionsEl.textContent = totalQuestions;
    if (topicsEl) topicsEl.textContent = totalTopics;
    
    console.log(`Stats updated: ${totalTopics} topics, ${totalLessons} lessons, ${totalQuestions} questions`);
}

// ===== Update Card Information with Actual Data =====

function updateAllCardInfo() {
    if (typeof topicsData === 'undefined') {
        console.warn('topicsData not loaded yet, retrying...');
        setTimeout(updateAllCardInfo, 100);
        return;
    }

    // Map of topic keys to card elements
    const topicKeys = registryOrder();

    topicKeys.forEach(topicKey => {
        const topic = topicsData[topicKey];
        if (!topic) return;

        // Find the card for this topic
        const cards = document.querySelectorAll(`.topic-card[data-topic-key="${topicKey}"]`);
        cards.forEach(card => {
            // Update lesson count
            const lessonSpan = card.querySelector('.lesson-count');
            if (lessonSpan && topic.lessons) {
                const lessonCount = topic.lessons.length;
                lessonSpan.textContent = `${lessonCount} Lesson${lessonCount !== 1 ? 's' : ''}`;
            }

            // Update question count
            const questionSpan = card.querySelector('.question-count');
            if (questionSpan && topic.questions) {
                const questionCount = topic.questions.length;
                questionSpan.textContent = `${questionCount} Question${questionCount !== 1 ? 's' : ''}`;
            }
        });
    });

    console.log('Card information updated');
}

// ===== Markdown to HTML Converter =====

function convertMarkdownToHtml(markdown) {
    if (!markdown) return '';

    // Render ```mermaid fences as inline SVG via our own converter.
    // Self-contained, offline, no CDN dependency, cannot fail at runtime.
    let html = markdown
        .replace(/```mermaid\s*([\s\S]*?)```/g, (match, code) => {
            const svg = mermaidToSvg(code);
            return '<figure class="diagram">' + svg + '</figure>';
        })
        // Bold: **text** → <strong>text</strong>
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        // Italic: *text* → <em>text</em>
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        // Code blocks: ```code``` → <pre><code>code</code></pre>
        .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
        // Line breaks: \n → <br>
        .replace(/\n\n/g, '</p><p>')
        .replace(/\n/g, '<br>');

    // Wrap in paragraph tags if not already
    if (html && !html.startsWith('<p>')) {
        html = '<p>' + html + '</p>';
    }

    return html;
}

// ===== Mermaid → Inline SVG converter =====
// Self-contained renderer for the simple `graph TD|LR` / `flowchart` diagrams
// used across the content. No CDN, no runtime, works offline.

function mermaidToSvg(source) {
    try {
        const lines = String(source || '').split(/\r?\n/).map(l => l.trim()).filter(Boolean);
        const direction = /(LR|RL|TB|BT|TD)/i.test(lines[0]) && /(LR|RL)/i.test(lines[0]) ? 'LR' : 'TD';
        const nodes = {};   // id -> {label, shape}
        const edges = [];   // {from, to, label}
        const order = [];   // insertion order for stable layout

        function nodeId(raw) { return raw.trim(); }
        function parseNodeDef(token) {
            // token like A[label], A{decision}, A((oval)), A>shape
            let m = token.match(/^([A-Za-z0-9_]+)\[(.*)\]$/);
            let shape = 'rect';
            let id, label;
            if (m) { id = m[1]; label = m[2]; }
            else {
                m = token.match(/^([A-Za-z0-9_]+)\{(.*)\}$/);
                if (m) { id = m[1]; label = m[2]; shape = 'diamond'; }
                else {
                    m = token.match(/^([A-Za-z0-9_]+)$/);
                    if (m) { id = m[1]; label = m[1]; }
                    else { return null; }
                }
            }
            if (!(id in nodes)) { nodes[id] = { label, shape }; order.push(id); }
            return id;
        }

        // Parse.
        for (const line of lines) {
            if (/^(graph|flowchart)\b/i.test(line)) continue;
            if (/^subgraph\b/i.test(line) || /^end\b/i.test(line)) continue;
            if (!line.includes('--')) {
                parseNodeDef(line); // standalone node def: A[label]
                continue;
            }
            // edge: left --> right, left -->|label| right, left -- text --> right, left --- right
            const arrow = line.indexOf('-->');
            if (arrow !== -1) {
                let left = line.slice(0, arrow).trim();
                const right = line.slice(arrow + 3).trim();
                let label = '';
                // left-side text label: "A -- Yes" -> from=A, label="Yes"
                const lv = left.match(/^(.*?)\s*--\s*(.+)$/);
                let fromTok = left;
                if (lv) { fromTok = lv[1].trim(); label = lv[2].trim(); }
                let toTok = right;
                // right-side |label| form: -->|Yes| X
                const lblMatch = right.match(/^\|(.*)\|\s*(.*)$/);
                if (lblMatch) { if (!label) label = lblMatch[1]; toTok = lblMatch[2]; }
                const from = parseNodeDef(fromTok);
                const to = parseNodeDef(toTok);
                if (from !== null && to !== null) edges.push({ from, to, label });
                continue;
            }
            const dash = line.indexOf('---');
            if (dash !== -1) {
                const from = parseNodeDef(line.slice(0, dash).trim());
                const to = parseNodeDef(line.slice(dash + 3).trim());
                if (from !== null && to !== null) edges.push({ from, to, label: '' });
            }
        }

        if (order.length === 0) return '<pre><code>' + escape(source) + '</code></pre>';

        // Rank nodes: longest path from any root.
        const indeg = {}; order.forEach(id => indeg[id] = 0);
        edges.forEach(e => { indeg[e.to] = (indeg[e.to] || 0) + 1; });
        const rank = {};
        order.forEach(id => rank[id] = 0);
        // topo-ish: assign rank[to] = max(rank[from]+1) iteratively
        for (let iter = 0; iter < order.length; iter++) {
            edges.forEach(e => {
                if (rank[e.to] < rank[e.from] + 1) rank[e.to] = rank[e.from] + 1;
            });
        }
        const maxRank = Math.max(0, ...Object.values(rank));

        // Layout constants
        const W = 170, H = 48, GX = 30, GY = 40, PL = 24; // padding / label gap
        const widths = {}; order.forEach(id => widths[id] = W);
        const heights = {}; order.forEach(id => heights[id] = shapeOf(id) === 'diamond' ? H * 1.6 : H);

        // Group by rank (TD) or keep linear
        const cols = {}; order.forEach(id => { const r = rank[id] || 0; (cols[r] = cols[r] || []).push(id); });
        const maxCol = Object.values(cols).reduce((a, c) => Math.max(a, c.length), 1);

        function shapeOf(id) { return (nodes[id] || {}).shape || 'rect'; }
        function posOf(id) {
            const r = rank[id] || 0;
            const col = cols[r] || [id];
            const idx = col.indexOf(id);
            if (direction === 'LR') return { x: r * (W + GX), y: idx * (H + GY) };
            return { x: idx * (W + GX), y: r * (H + GY) };
        }
        function boxSize(id) {
            const lbl = (nodes[id] || {}).label || id;
            const linesCount = lbl.split(/\n/).length;
            const w = Math.max(W, Math.min(240, 20 + lbl.length * 7));
            const h = shapeOf(id) === 'diamond' ? H + 24 : Math.max(H, 20 + linesCount * 16);
            return { w, h };
        }

        // Compute bounding box
        let maxX = 0, maxY = 0;
        order.forEach(id => {
            const { x, y } = posOf(id);
            const { w, h } = boxSize(id);
            maxX = Math.max(maxX, x + w);
            maxY = Math.max(maxY, y + h);
        });
        const pad = 20;
        const svgW = maxX + pad * 2, svgH = maxY + pad * 2;

        let s = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + svgW + ' ' + svgH + '" role="img" aria-label="diagram">';
        s += '<defs><marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#a0aec0"/></marker></defs>';
        s += '<rect x="0" y="0" width="' + svgW + '" height="' + svgH + '" fill="none"/>';

        // edges (behind nodes)
        edges.forEach(e => {
            const p1 = posOf(e.from), p2 = posOf(e.to);
            const s1 = boxSize(e.from), s2 = boxSize(e.to);
            const x1 = p1.x + s1.w / 2, y1 = p1.y + s1.h / 2;
            const x2 = p2.x + s2.w / 2, y2 = p2.y + s2.h / 2;
            s += '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="#a0aec0" stroke-width="1.6" marker-end="url(#arr)"/>';
            if (e.label) {
                const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
                const tw = 8 * e.label.length;
                s += '<rect x="' + (mx - tw / 2 - 4) + '" y="' + (my - 9) + '" width="' + (tw + 8) + '" height="18" rx="4" fill="#141b3d" stroke="#a0aec0" stroke-width="0.5"/>';
                s += '<text x="' + mx + '" y="' + (my + 4) + '" text-anchor="middle" font-size="11" fill="#a0aec0" font-family="Inter, sans-serif">' + escape(e.label) + '</text>';
            }
        });

        // nodes
        order.forEach(id => {
            const { x, y } = posOf(id);
            const { w, h } = boxSize(id);
            const label = (nodes[id].label || id).split('\n');
            if (shapeOf(id) === 'diamond') {
                s += '<polygon points="' + (x + w / 2) + ',' + y + ' ' + (x + w) + ',' + (y + h / 2) + ' ' + (x + w / 2) + ',' + (y + h) + ' ' + x + ',' + (y + h / 2) + '" fill="#1e2749" stroke="#667eea" stroke-width="1.4"/>';
            } else {
                s += '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="8" fill="#1e2749" stroke="#667eea" stroke-width="1.4"/>';
            }
            const cy = y + h / 2;
            label.forEach((ln, i) => {
                s += '<text x="' + (x + w / 2) + '" y="' + (cy + (i - (label.length - 1) / 2) * 15) + '" text-anchor="middle" font-size="12" fill="#e2e8f0" font-family="Inter, sans-serif">' + escape(ln) + '</text>';
            });
        });

        s += '</svg>';
        return s;
    } catch (e) {
        return '<pre><code>' + escape(source) + '</code></pre>';
    }
}

// ===== PIN-based Progress Profiles (local only) =====

const ACTIVE_PIN_KEY = 'dataAnalyticsActivePin';
const PROGRESS_KEY_PREFIX = 'dataAnalyticsProgress_';

function getActivePin() {
    return localStorage.getItem(ACTIVE_PIN_KEY) || '';
}

function getProgressStorageKey() {
    const pin = getActivePin();
    return pin ? `${PROGRESS_KEY_PREFIX}${pin}` : `${PROGRESS_KEY_PREFIX}default`;
}

function normalizePin(pin) {
    return (pin || '').trim();
}

function updatePinUI(message = '') {
    const statusEl = document.getElementById('pinStatus');
    const messageEl = document.getElementById('pinMessage');
    const pin = getActivePin();

    if (statusEl) {
        statusEl.textContent = pin ? `Active PIN: ••••${pin.slice(-2)}` : 'No PIN selected';
    }

    if (messageEl) {
        messageEl.textContent = message;
    }
}

function setActivePin(pin) {
    const normalized = normalizePin(pin);
    if (!normalized || normalized.length < 4) {
        updatePinUI('PIN must be at least 4 characters.');
        return false;
    }

    if (!/^[A-Za-z0-9]+$/.test(normalized)) {
        updatePinUI('PIN can only contain letters and numbers.');
        return false;
    }

    localStorage.setItem(ACTIVE_PIN_KEY, normalized);
    updatePinUI('PIN set. Progress loaded for this profile.');
    loadProgressForActivePin();
    return true;
}

function clearActivePin() {
    localStorage.removeItem(ACTIVE_PIN_KEY);
    updatePinUI('PIN cleared. Using default profile.');
    loadProgressForActivePin();
}

function loadProgressForActivePin() {
    const key = getProgressStorageKey();
    const raw = JSON.parse(localStorage.getItem(key) || '{}');
    localStorage.setItem('dataAnalyticsProgress', JSON.stringify(raw));
    updateProgressBars();

    // Add animation on scroll for topic cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    entry.target.style.transition = 'all 0.5s ease-out';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    document.querySelectorAll('.topic-card').forEach(card => {
        observer.observe(card);
    });
}

function saveProgressForActivePin(progress) {
    const key = getProgressStorageKey();
    localStorage.setItem(key, JSON.stringify(progress));
}

function initPinAuth() {
    const setButton = document.getElementById('setPinButton');
    const switchButton = document.getElementById('switchPinButton');
    const clearButton = document.getElementById('clearPinButton');
    const pinInput = document.getElementById('pinInput');
    const pinConfirmInput = document.getElementById('pinConfirmInput');

    if (setButton && pinInput && pinConfirmInput) {
        setButton.addEventListener('click', () => {
            const pin = pinInput.value;
            const confirmPin = pinConfirmInput.value;

            if (pin !== confirmPin) {
                updatePinUI('PIN confirmation does not match.');
                return;
            }

            setActivePin(pin);
            pinInput.value = '';
            pinConfirmInput.value = '';
        });
    }

    if (switchButton && pinInput) {
        switchButton.addEventListener('click', () => {
            setActivePin(pinInput.value);
            pinInput.value = '';
            if (pinConfirmInput) pinConfirmInput.value = '';
        });
    }

    if (clearButton) {
        clearButton.addEventListener('click', () => {
            clearActivePin();
        });
    }

    updatePinUI();
    loadProgressForActivePin();
}

// ===== Topic Management =====

let currentTopic = null;

function openTopic(topicKey) {
    currentTopic = topicKey;
    const topic = topicsData[topicKey];
    const meta = getTopicMeta(topicKey);
    const track = (window.topicRegistry && window.topicRegistry.tracks && window.topicRegistry.tracks[meta.track]) || { label: meta.track };

    // Update title
    document.getElementById('topicTitle').textContent = topic.title;

    // Breadcrumb + prev/next nav state
    const crumb = document.getElementById('breadcrumb');
    if (crumb) crumb.textContent = `Home / ${track.label} / ${meta.category} / ${topic.title}`;
    const prevBtn = document.getElementById('prevTopicButton');
    const nextBtn = document.getElementById('nextTopicButton');
    if (prevBtn && nextBtn) {
        prevBtn.disabled = false;
        nextBtn.disabled = false;
    }

    // Load lessons
    loadLessons(topic.lessons);

    // Load questions
    loadQuestions(topic.questions);

    // Load case studies
    if (topic.caseStudyQuizzes) {
        loadCaseStudies(topic.caseStudyQuizzes);
    }

    // Show learning view
    document.getElementById('learningView').classList.remove('hidden');

    // Scroll to top
    window.scrollTo(0, 0);

    // Save progress
    saveProgress();
}

function closeLearning() {
    saveProgress(); // auto-persist on any exit path
    document.getElementById('learningView').classList.add('hidden');
    currentTopic = null;
}

// ===== Role-Track Topics Rendering =====

const appState = { activeTrack: 'all' };

function getTopicMeta(topicKey) {
    const registryEntry = (window.topicRegistry && window.topicRegistry.topics[topicKey]) || {};
    const topic = topicsData[topicKey];
    const meta = (topic && topic.metadata) || {};
    return {
        track: registryEntry.track || meta.role || 'core',
        category: registryEntry.category || meta.category || 'Topic',
        color: registryEntry.color || meta.color || '#667eea',
        icon: registryEntry.icon || meta.icon || '📚',
        description: registryEntry.description || meta.description || ''
    };
}

function registryOrder() {
    return (window.topicRegistry && window.topicRegistry.order) || Object.keys(topicsData);
}

function renderTrackFilters() {
    const container = document.getElementById('topicFilters');
    if (!container) return;
    if (!container.hasChildNodes()) {
        const tracks = window.topicRegistry && window.topicRegistry.tracks;
        const buttons = [
            { id: 'all', label: 'All Topics' },
            ...Object.entries(tracks || {}).map(([id, t]) => ({ id, label: t.label }))
        ];
        buttons.forEach(({ id, label }) => {
            const btn = document.createElement('button');
            btn.className = 'filter-button';
            btn.dataset.track = id;
            btn.textContent = label;
            if (id === appState.activeTrack) btn.classList.add('active');
            btn.addEventListener('click', () => {
                appState.activeTrack = id;
                renderTrackFilters();
                renderTopics();
            });
            container.appendChild(btn);
        });
    } else {
        container.querySelectorAll('.filter-button').forEach(b => {
            b.classList.toggle('active', b.dataset.track === appState.activeTrack);
        });
    }
}

function createTopicCard(topicKey) {
    const topic = topicsData[topicKey];
    if (!topic) return null;
    const meta = getTopicMeta(topicKey);
    const lessonsCount = (topic.lessons && topic.lessons.length) || 0;
    const questionsCount = (topic.questions && topic.questions.length) || 0;

    const card = document.createElement('div');
    card.className = 'topic-card';
    card.classList.add('track--' + meta.track);
    card.dataset.topicKey = topicKey;
    card.dataset.track = meta.track;
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', topic.title);
    card.addEventListener('click', () => openTopic(topicKey));
    card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openTopic(topicKey); }
    });

    card.innerHTML = `
        <div class="topic-icon" style="background: linear-gradient(135deg, ${meta.color} 0%, ${meta.color}cc 100%);">
            <span style="font-size: 28px;">${meta.icon}</span>
        </div>
        <span class="category-badge">${meta.category}</span>
        <h3 class="topic-title">${topic.title}</h3>
        <p class="topic-description">${meta.description || topic.description || ''}</p>
        <div class="topic-meta">
            <span class="lesson-count">${lessonsCount_label(lessonsCount)}</span>
            <span class="question-count">${questionsCount_label(questionsCount)}</span>
        </div>
        <div class="progress-bar">
            <div class="progress-fill" style="width: 0%"></div>
        </div>
    `;
    return card;
}
function lessonsCount_label(n) { return n + ' Lesson' + (n !== 1 ? 's' : ''); }
function questionsCount_label(n) { return n + ' Question' + (n !== 1 ? 's' : ''); }

function renderTopics() {
    const container = document.getElementById('topicsGrid');
    if (!container) return;
    // Hide Show: if a track filter is active, only show matching cards.
    const visible = registryOrder().filter(key =>
        appState.activeTrack === 'all' || getTopicMeta(key).track === appState.activeTrack
    );
    container.innerHTML = '';
    visible.forEach(key => {
        const card = createTopicCard(key);
        if (card) container.appendChild(card);
    });
    updateProgressBars();

    // Add animation on scroll for topic cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    entry.target.style.transition = 'all 0.5s ease-out';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    document.querySelectorAll('.topic-card').forEach(card => {
        observer.observe(card);
    });
}

function navigateTopic(delta) {
    const order = registryOrder();
    const idx = order.indexOf(currentTopic);
    const nextKey = order[(idx + delta + order.length) % order.length];
    openTopic(nextKey);
}

// ===== Lesson completion (soft metric, not part of % denominator) =====

function markLessonComplete(topicKey, lessonNumber, btn) {
    const key = getProgressStorageKey();
    let progress = JSON.parse(localStorage.getItem(key) || '{}');
    if (!progress[topicKey]) progress[topicKey] = { completedLessons: [] };
    if (!Array.isArray(progress[topicKey].completedLessons)) progress[topicKey].completedLessons = [];
    const id = `lesson-${lessonNumber}`;
    const idx = progress[topicKey].completedLessons.indexOf(id);
    let done;
    if (idx >= 0) { progress[topicKey].completedLessons.splice(idx, 1); done = false; }
    else { progress[topicKey].completedLessons.push(id); done = true; }
    saveProgressForActivePin(progress);
    localStorage.setItem('dataAnalyticsProgress', JSON.stringify(progress));
    btn.classList.toggle('done', done);
    btn.textContent = done ? '✓ Done' : 'Mark complete';
}
function escape(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// ===== Tab Management =====

function switchTab(tabName) {
    // Remove active class from all tabs
    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.classList.remove('active');
    });

    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });

    // Add active class to selected tab
    if (tabName === 'lessons') {
        document.querySelector('.tab-button:nth-child(1)').classList.add('active');
        document.getElementById('lessonsTab').classList.add('active');
    } else if (tabName === 'questions') {
        document.querySelector('.tab-button:nth-child(2)').classList.add('active');
        document.getElementById('questionsTab').classList.add('active');
    } else if (tabName === 'caseStudies') {
        document.querySelector('.tab-button:nth-child(3)').classList.add('active');
        document.getElementById('caseStudiesTab').classList.add('active');
    }
}

// ===== Lessons Rendering =====

function createLessonElement(lesson, index) {
    const div = document.createElement('div');
    div.className = 'lesson-item';

    const lessonNumber = lesson.number || (index + 1);

    div.innerHTML = `
        <div class="lesson-header">
            <div>
                <div class="lesson-number">Lesson ${lessonNumber}</div>
                <h3 class="lesson-title">${lesson.title}</h3>
            </div>
            <button class="lesson-done-button" onclick="markLessonComplete('${currentTopic}', ${lessonNumber}, this)">Mark complete</button>
        </div>
        <div class="lesson-content">
            ${convertMarkdownToHtml(lesson.content)}
        </div>
    `;

    return div;
}
function loadLessons(lessons) {
    const container = document.getElementById('lessonsContainer');
    container.innerHTML = '';

    lessons.forEach((lesson, index) => {
        const lessonElement = createLessonElement(lesson, index);
        container.appendChild(lessonElement);
    });
}

// ===== Questions Rendering =====

function loadQuestions(questions) {
    const container = document.getElementById('questionsContainer');
    container.innerHTML = '';

    questions.forEach((question, index) => {
        const questionElement = createQuestionElement(question, index);
        container.appendChild(questionElement);
    });
}

function createQuestionElement(question, index) {
    const div = document.createElement('div');
    div.className = 'question-item';

    const topicKey = currentTopic || 'topic';
    const questionNumber = question.number || (index + 1);
    const answerId = `answer-${topicKey}-${questionNumber}`;
    const editorId = `editor-${topicKey}-${questionNumber}`;

    // Build the code editor section if question has hasCodeEditor flag
    let codeEditorHTML = '';
    if (question.hasCodeEditor) {
        codeEditorHTML = `
            <div class="code-editor-section">
                <div class="code-editor-header">
                    <div class="code-editor-label">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M7 5L3 10L7 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M13 5L17 10L13 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        Try it yourself
                    </div>
                    <button class="run-code-button" onclick="runCode('${editorId}')">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M4 2L12 8L4 14V2Z" fill="currentColor"/>
                        </svg>
                        Run Query
                    </button>
                </div>
                <textarea id="${editorId}" class="code-editor" placeholder="Write your SQL query here...">-- Write your SQL query here
SELECT </textarea>
                <div id="${editorId}-output" class="code-output"></div>
            </div>
        `;
    }

    div.innerHTML = `
        <div class="question-header">
            <div>
                <span class="question-number">Question ${questionNumber}</span>
                <span class="difficulty-badge difficulty-${question.difficulty}">${question.difficulty.toUpperCase()}</span>
            </div>
        </div>
        <div class="question-text">${question.question}</div>
        ${question.context ? `<div class="question-context">${question.context}</div>` : ''}
        ${codeEditorHTML}
        <button class="reveal-button" onclick="toggleAnswer('${answerId}')">
            Show Answer
        </button>
        <div id="${answerId}" class="answer-section">
            <div class="answer-label">Answer</div>
            <div class="answer-content">
                ${convertMarkdownToHtml(question.answer)}
            </div>
        </div>
    `;

    return div;
}

// ===== Case Studies Rendering =====

function loadCaseStudies(caseStudies) {
    const container = document.getElementById('caseStudiesContainer');
    if (!container) return;
    
    container.innerHTML = '';

    caseStudies.forEach((caseStudy, index) => {
        const caseElement = createCaseStudyElement(caseStudy, index);
        container.appendChild(caseElement);
    });
}

function createCaseStudyElement(caseStudy, index) {
    const div = document.createElement('div');
    div.className = 'case-study-item';

    const topicKey = currentTopic || 'topic';
    const caseNumber = caseStudy.case || (index + 1);
    const answerId = `case-answer-${topicKey}-${caseNumber}`;

    // Build options HTML
    const optionsHTML = caseStudy.options.map((option, optIndex) => `
        <div class="case-option">
            <input type="radio" id="option-${caseNumber}-${optIndex}" name="case-${caseNumber}" value="${optIndex}">
            <label for="option-${caseNumber}-${optIndex}">${option}</label>
        </div>
    `).join('');

    div.innerHTML = `
        <div class="case-study-header">
            <div class="case-number">Case Study ${caseNumber}</div>
        </div>
        <div class="case-scenario">
            <strong>Scenario:</strong>
            <p>${convertMarkdownToHtml(caseStudy.scenario)}</p>
        </div>
        <div class="case-question">
            <strong>${caseStudy.question}</strong>
        </div>
        <div class="case-options">
            ${optionsHTML}
        </div>
        <button class="reveal-button" onclick="toggleAnswer('${answerId}')">
            Show Answer
        </button>
        <div id="${answerId}" class="answer-section">
            <div class="answer-label">Correct Answer</div>
            <div class="answer-content">
                ${convertMarkdownToHtml(caseStudy.answer)}
            </div>
        </div>
    `;

    return div;
}

// ===== Code Editor Functions =====

function runCode(editorId) {
    const editor = document.getElementById(editorId);
    const output = document.getElementById(`${editorId}-output`);
    const code = editor.value.trim();

    if (!code || code === '-- Write your SQL query here\nSELECT ') {
        output.innerHTML = '<div class="code-output-error">⚠️ Please write a query first!</div>';
        output.classList.add('visible');
        return;
    }

    // Simple SQL syntax validation
    const sqlKeywords = ['SELECT', 'FROM', 'WHERE', 'JOIN', 'GROUP BY', 'HAVING', 'ORDER BY', 'INSERT', 'UPDATE', 'DELETE', 'CREATE', 'WITH'];
    const hasKeyword = sqlKeywords.some(keyword => code.toUpperCase().includes(keyword));

    if (!hasKeyword) {
        output.innerHTML = '<div class="code-output-error">❌ Invalid SQL syntax. Make sure your query includes SQL keywords like SELECT, FROM, etc.</div>';
        output.classList.add('visible');
        return;
    }

    // Simulate query execution (in a real app, this would connect to a database)
    output.innerHTML = `
        <div class="code-output-success">
            ✅ <strong>Query validated!</strong><br><br>
            <em>Note: This is a practice environment. In a real interview or work setting, your query would execute against an actual database.</em><br><br>
            <strong>Your Query:</strong><br>
            <pre style="background: rgba(0,0,0,0.2); padding: 12px; border-radius: 6px; margin-top: 8px; overflow-x: auto;"><code>${code}</code></pre>
            <br>
            <strong>💡 Tip:</strong> Compare your solution with the provided answer below to see different approaches and optimizations!
        </div>
    `;
    output.classList.add('visible');

    // Scroll to output
    setTimeout(() => {
        output.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
}


function toggleAnswer(answerId) {
    const answerSection = document.getElementById(answerId);
    const button = answerSection.previousElementSibling;

    if (answerSection.classList.contains('visible')) {
        answerSection.classList.remove('visible');
        button.textContent = 'Show Answer';
    } else {
        answerSection.classList.add('visible');
        button.textContent = 'Hide Answer';

        // Mark question as completed in progress
        updateQuestionProgress(currentTopic, answerId);
    }
}

// ===== Progress Tracking =====

function saveProgress() {
    // Get or create progress object
    const key = getProgressStorageKey();
    let progress = JSON.parse(localStorage.getItem(key) || '{}');

    // Update last accessed topic
    if (currentTopic) {
        if (!progress[currentTopic]) {
            progress[currentTopic] = {
                lastAccessed: new Date().toISOString(),
                completedQuestions: []
            };
        } else {
            progress[currentTopic].lastAccessed = new Date().toISOString();
        }
    }

    // Save to localStorage (PIN-scoped + current cache)
    saveProgressForActivePin(progress);
    localStorage.setItem('dataAnalyticsProgress', JSON.stringify(progress));

    // Update UI
    updateProgressBars();

    // Add animation on scroll for topic cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    entry.target.style.transition = 'all 0.5s ease-out';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    document.querySelectorAll('.topic-card').forEach(card => {
        observer.observe(card);
    });
}

function updateQuestionProgress(topic, questionId) {
    const key = getProgressStorageKey();
    let progress = JSON.parse(localStorage.getItem(key) || '{}');

    if (!progress[topic]) {
        progress[topic] = {
            lastAccessed: new Date().toISOString(),
            completedQuestions: []
        };
    }

    if (!progress[topic].completedQuestions.includes(questionId)) {
        progress[topic].completedQuestions.push(questionId);
    }

    saveProgressForActivePin(progress);
    localStorage.setItem('dataAnalyticsProgress', JSON.stringify(progress));
    updateProgressBars();

    // Add animation on scroll for topic cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    entry.target.style.transition = 'all 0.5s ease-out';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    document.querySelectorAll('.topic-card').forEach(card => {
        observer.observe(card);
    });
}

function updateProgressBars() {
    const progress = getNormalizedProgress();

    Object.keys(topicsData).forEach(topicKey => {
        const topicProgress = progress[topicKey];
        const totalQuestions = topicsData[topicKey].questions.length;
        const totalCaseStudies = (topicsData[topicKey].caseStudyQuizzes || []).length;
        const totalItems = totalQuestions + totalCaseStudies;

        let completedCount = 0;
        if (topicProgress && topicProgress.completedQuestions) {
            completedCount = new Set(topicProgress.completedQuestions).size;
        }

        completedCount = Math.min(completedCount, totalItems);

        const percentage = totalItems > 0 ? (completedCount / totalItems) * 100 : 0;

        // Find the topic card and update its progress bar
        const topicCards = document.querySelectorAll(`.topic-card[data-topic-key="${topicKey}"]`);
        topicCards.forEach(card => {
            const progressFill = card.querySelector('.progress-fill');
            if (progressFill) {
                progressFill.style.width = `${percentage}%`;
            }
        });
    });

    updateOverallProgress(progress);
}

function getNormalizedProgress() {
    const key = getProgressStorageKey();
    const raw = JSON.parse(localStorage.getItem(key) || '{}');
    const normalized = {};

    Object.keys(topicsData).forEach(topicKey => {
        const totalQuestions = topicsData[topicKey].questions.length;
        const topicProgress = raw[topicKey];
        const completed = new Set();

        const totalCaseStudies = (topicsData[topicKey].caseStudyQuizzes || []).length;

        if (topicProgress && Array.isArray(topicProgress.completedQuestions)) {
            topicProgress.completedQuestions.forEach(id => {
                const match = typeof id === 'string' ? id.match(/^(?:case-)?answer-([^\-]+)-(\d+)$/) : null;
                if (!match) return;

                const idTopic = match[1];
                const idNumber = Number(match[2]);

                if (idTopic !== topicKey) return;
                if (!Number.isInteger(idNumber)) return;

                const isCaseStudy = id.startsWith('case-');
                const maxId = isCaseStudy ? totalCaseStudies : totalQuestions;
                if (idNumber < 1 || idNumber > maxId) return;

                completed.add(isCaseStudy ? `case-answer-${topicKey}-${idNumber}` : `answer-${topicKey}-${idNumber}`);
            });
        }

        normalized[topicKey] = {
            lastAccessed: topicProgress && topicProgress.lastAccessed ? topicProgress.lastAccessed : null,
            completedQuestions: Array.from(completed)
        };
    });

    saveProgressForActivePin(normalized);
    localStorage.setItem('dataAnalyticsProgress', JSON.stringify(normalized));
    return normalized;
}

function updateOverallProgress(progress) {
    const totalQuestions = Object.keys(topicsData).reduce((sum, key) => sum + topicsData[key].questions.length, 0);
    const totalCaseStudies = Object.keys(topicsData).reduce((sum, key) => sum + (topicsData[key].caseStudyQuizzes || []).length, 0);
    const totalItems = totalQuestions + totalCaseStudies;

    const completedQuestion = Object.keys(topicsData).reduce((sum, key) => {
        const topicProgress = progress[key];
        const completed = topicProgress && topicProgress.completedQuestions
            ? topicProgress.completedQuestions.filter(id => id.startsWith('answer-') && !id.startsWith('case-')).length
            : 0;
        return sum + Math.min(completed, topicsData[key].questions.length);
    }, 0);

    const completedCaseStudies = Object.keys(topicsData).reduce((sum, key) => {
        const totalCS = (topicsData[key].caseStudyQuizzes || []).length;
        if (totalCS === 0) return sum;
        const topicProgress = progress[key];
        const completed = topicProgress && topicProgress.completedQuestions
            ? topicProgress.completedQuestions.filter(id => id.startsWith('case-answer-')).length
            : 0;
        return sum + Math.min(completed, totalCS);
    }, 0);

    const completedItems = completedQuestion + completedCaseStudies;

    const percentage = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

    const completedEl = document.getElementById('progressCompleted');
    const totalEl = document.getElementById('progressTotal');
    const percentEl = document.getElementById('progressPercent');
    const barEl = document.getElementById('overallProgressFill');

    if (completedEl) completedEl.textContent = `${completedItems}`;
    if (totalEl) totalEl.textContent = `${totalItems}`;
    if (percentEl) percentEl.textContent = `${percentage}%`;
    if (barEl) barEl.style.width = `${percentage}%`;
}

// ===== Navigation Active State =====

function updateNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// ===== Keyboard Shortcuts =====

document.addEventListener('keydown', (e) => {
    // ESC to close learning view
    if (e.key === 'Escape' && currentTopic) {
        closeLearning();
    }
});

// ===== Initialize on Page Load =====

document.addEventListener('DOMContentLoaded', () => {
    initPinAuth();

    // Update hero stats with actual counts
    updateHeroStats();

    // Render role-track filters + topic cards dynamically
    if (document.getElementById('topicsGrid')) {
        renderTrackFilters();
        renderTopics();
    } else {
        // Fallback for legacy static cards
        updateAllCardInfo();
        updateProgressBars();
    }

    // Update navigation active states
    updateNavigation();

    const resetButton = document.getElementById('resetProgressButton');
    if (resetButton) {
        resetButton.addEventListener('click', () => {
            const key = getProgressStorageKey();
            localStorage.removeItem(key);
            localStorage.setItem('dataAnalyticsProgress', JSON.stringify({}));
            updateProgressBars();
        });
    }

    // Add smooth scrolling to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Improve accessibility for topic cards
    document.querySelectorAll('.topic-card').forEach(card => {
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');

        const title = card.querySelector('.topic-title');
        if (title) {
            card.setAttribute('aria-label', title.textContent.trim());
        }

        card.addEventListener('keydown', (event) => {
            if (event.key !== 'Enter' && event.key !== ' ') return;
            event.preventDefault();

            const onclickAttr = card.getAttribute('onclick') || '';
            const match = onclickAttr.match(/openTopic\('([^']+)'\)/);
            if (match && match[1]) {
                openTopic(match[1]);
            }
        });
    });

    // Add animation on scroll for topic cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';

                setTimeout(() => {
                    entry.target.style.transition = 'all 0.5s ease-out';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.topic-card').forEach(card => {
        observer.observe(card);
    });
});

// ===== Statistics Calculator Functions =====

function parseDataInput(input) {
    if (!input || input.trim() === '') return [];
    
    // Split by commas, spaces, or newlines and convert to numbers
    const numbers = input
        .split(/[\s,\n]+/)
        .map(str => str.trim())
        .filter(str => str !== '')
        .map(str => parseFloat(str))
        .filter(num => !isNaN(num));
    
    return numbers;
}

window.loadSampleData = function() {
    const sampleData = "23, 45, 67, 89, 12, 34, 56, 78, 90, 21, 43, 65, 87, 32, 54, 76, 98, 19, 41, 63";
    document.getElementById('dataInput').value = sampleData;
    console.log('Sample data loaded');
}

window.clearCalculator = function() {
    document.getElementById('dataInput').value = '';
    document.getElementById('calculatorResults').style.display = 'none';
    console.log('Calculator cleared');
}

window.calculateStats = function() {
    console.log('calculateStats called');
    
    const input = document.getElementById('dataInput').value;
    const data = parseDataInput(input);
    
    console.log('Parsed data:', data);
    
    if (data.length === 0) {
        alert('Please enter valid numeric data');
        return;
    }
    
    if (data.length < 2) {
        alert('Please enter at least 2 numbers for meaningful statistics');
        return;
    }
    
    try {
        // Calculate all statistics using StatisticsCalculator
        const summary = completeSummary(data);
        console.log('Summary calculated:', summary);
        
        // Update Descriptive Statistics
        document.getElementById('statCount').textContent = summary.count;
    document.getElementById('statMean').textContent = summary.mean;
    document.getElementById('statMedian').textContent = summary.median;
    document.getElementById('statMode').textContent = summary.mode.join(', ');
    document.getElementById('statStdDev').textContent = summary.standardDeviation;
    document.getElementById('statVariance').textContent = summary.variance;
    document.getElementById('statMin').textContent = summary.min.toFixed(2);
    document.getElementById('statMax').textContent = summary.max.toFixed(2);
    document.getElementById('statRange').textContent = summary.range.toFixed(2);
    
    // Update Quartiles
    if (summary.quartiles) {
        document.getElementById('statQ1').textContent = summary.quartiles.q1.toFixed(2);
        document.getElementById('statQ2').textContent = summary.quartiles.q2.toFixed(2);
        document.getElementById('statQ3').textContent = summary.quartiles.q3.toFixed(2);
        document.getElementById('statIQR').textContent = summary.quartiles.iqr.toFixed(2);
    }
    
    // Update Outliers
    if (summary.outliers && summary.outliers.outliers.length > 0) {
        document.getElementById('outliersSection').style.display = 'block';
        document.getElementById('outliersList').innerHTML = 
            `<strong>${summary.outliers.count} outlier(s) found:</strong> ${summary.outliers.outliers.join(', ')}<br>` +
            `<span style="font-size: 0.85rem;">Lower bound: ${summary.outliers.lowerBound.toFixed(2)} | Upper bound: ${summary.outliers.upperBound.toFixed(2)}</span>`;
    } else {
        document.getElementById('outliersSection').style.display = 'block';
        document.getElementById('outliersList').textContent = 'No outliers detected using 1.5×IQR rule';
    }
    
    // Show results section with animation
    const resultsSection = document.getElementById('calculatorResults');
    resultsSection.style.display = 'block';
    resultsSection.style.opacity = '0';
    resultsSection.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        resultsSection.style.transition = 'all 0.5s ease-out';
        resultsSection.style.opacity = '1';
        resultsSection.style.transform = 'translateY(0)';
    }, 50);
    
    // Scroll to results
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    } catch (error) {
        console.error('Error calculating statistics:', error);
        alert('Error calculating statistics. Check console for details.');
    }
}

// ===== Welcome Message =====

console.log('%c🎓 Welcome to DataPrep Pro! v2.0.1', 'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; font-size: 20px; padding: 10px; border-radius: 5px;');
console.log('%cYour journey to mastering data analytics interviews starts here!', 'color: #667eea; font-size: 14px;');
console.log('%c✅ Script loaded successfully - ' + new Date().toLocaleString(), 'color: #00ff00;');
console.log('topicsData available:', typeof topicsData !== 'undefined');
if (typeof topicsData !== 'undefined') {
    console.log('Topics:', Object.keys(topicsData));
}
