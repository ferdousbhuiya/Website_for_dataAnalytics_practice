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

    // Update title
    document.getElementById('topicTitle').textContent = topic.title;

    // Load lessons
    loadLessons(topic.lessons);

    // Load questions
    loadQuestions(topic.questions);

    // Show learning view
    document.getElementById('learningView').classList.remove('hidden');

    // Scroll to top
    window.scrollTo(0, 0);

    // Save progress
    saveProgress();
}

function closeLearning() {
    document.getElementById('learningView').classList.add('hidden');
    currentTopic = null;
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
        document.querySelector('.tab-button:first-child').classList.add('active');
        document.getElementById('lessonsTab').classList.add('active');
    } else {
        document.querySelector('.tab-button:last-child').classList.add('active');
        document.getElementById('questionsTab').classList.add('active');
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
        </div>
        <div class="lesson-content">
            ${lesson.content}
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
                ${question.answer}
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
}

function updateProgressBars() {
    const progress = getNormalizedProgress();

    Object.keys(topicsData).forEach(topicKey => {
        const topicProgress = progress[topicKey];
        const totalQuestions = topicsData[topicKey].questions.length;

        let completedCount = 0;
        if (topicProgress && topicProgress.completedQuestions) {
            completedCount = new Set(topicProgress.completedQuestions).size;
        }

        completedCount = Math.min(completedCount, totalQuestions);

        const percentage = totalQuestions > 0 ? (completedCount / totalQuestions) * 100 : 0;

        // Find the topic card and update its progress bar
        const topicCards = document.querySelectorAll('.topic-card');
        topicCards.forEach(card => {
            if (card.getAttribute('onclick') === `openTopic('${topicKey}')`) {
                const progressFill = card.querySelector('.progress-fill');
                if (progressFill) {
                    progressFill.style.width = `${percentage}%`;
                }
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

        if (topicProgress && Array.isArray(topicProgress.completedQuestions)) {
            topicProgress.completedQuestions.forEach(id => {
                const match = typeof id === 'string' ? id.match(/^answer-([^\-]+)-(\d+)$/) : null;
                if (!match) return;

                const idTopic = match[1];
                const idNumber = Number(match[2]);

                if (idTopic !== topicKey) return;
                if (!Number.isInteger(idNumber)) return;
                if (idNumber < 1 || idNumber > totalQuestions) return;

                completed.add(`answer-${topicKey}-${idNumber}`);
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
    const completedQuestions = Object.keys(topicsData).reduce((sum, key) => {
        const topicProgress = progress[key];
        const completed = topicProgress && topicProgress.completedQuestions
            ? new Set(topicProgress.completedQuestions).size
            : 0;
        return sum + Math.min(completed, topicsData[key].questions.length);
    }, 0);

    const percentage = totalQuestions > 0 ? Math.round((completedQuestions / totalQuestions) * 100) : 0;

    const completedEl = document.getElementById('progressCompleted');
    const totalEl = document.getElementById('progressTotal');
    const percentEl = document.getElementById('progressPercent');
    const barEl = document.getElementById('overallProgressFill');

    if (completedEl) completedEl.textContent = `${completedQuestions}`;
    if (totalEl) totalEl.textContent = `${totalQuestions}`;
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

    // Update navigation active states
    updateNavigation();

    // Load progress bars
    updateProgressBars();

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
