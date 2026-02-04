// ===== Navigation and UI Functions =====

function scrollToTopics() {
    document.getElementById('topics').scrollIntoView({ behavior: 'smooth' });
}

// ===== Firebase Auth & Progress Sync =====

let firebaseApp = null;
let firebaseAuth = null;
let firebaseDb = null;
let currentUser = null;

function initFirebase() {
    if (!window.firebase || !window.firebase.apps) {
        return;
    }

    const firebaseConfig = {
        apiKey: "YOUR_API_KEY",
        authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
        projectId: "YOUR_PROJECT_ID",
        storageBucket: "YOUR_PROJECT_ID.appspot.com",
        messagingSenderId: "YOUR_SENDER_ID",
        appId: "YOUR_APP_ID"
    };

    if (!firebase.apps.length) {
        firebaseApp = firebase.initializeApp(firebaseConfig);
    } else {
        firebaseApp = firebase.app();
    }

    firebaseAuth = firebase.auth();
    firebaseDb = firebase.firestore();

    firebaseAuth.onAuthStateChanged(async (user) => {
        currentUser = user;
        updateAuthUI(user);

        if (user) {
            await loadProgressFromCloud(user.uid);
            updateProgressBars();
        }
    });
}

function updateAuthUI(user) {
    const statusEl = document.getElementById('authStatus');
    const messageEl = document.getElementById('authMessage');
    const logoutButton = document.getElementById('logoutButton');

    if (!statusEl || !messageEl || !logoutButton) return;

    if (user) {
        statusEl.textContent = `Signed in as ${user.email || 'User'}`;
        logoutButton.disabled = false;
    } else {
        statusEl.textContent = 'Not signed in';
        logoutButton.disabled = true;
    }

    messageEl.textContent = '';
}

async function saveProgressToCloud(progress) {
    if (!currentUser || !firebaseDb) return;

    const payload = {
        progress,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    };

    await firebaseDb.collection('userProgress').doc(currentUser.uid).set(payload, { merge: true });
}

async function loadProgressFromCloud(uid) {
    if (!firebaseDb) return;

    const doc = await firebaseDb.collection('userProgress').doc(uid).get();
    if (!doc.exists) return;

    const data = doc.data();
    if (data && data.progress) {
        localStorage.setItem('dataAnalyticsProgress', JSON.stringify(data.progress));
    }
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
    let progress = JSON.parse(localStorage.getItem('dataAnalyticsProgress') || '{}');

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

    // Save to localStorage
    localStorage.setItem('dataAnalyticsProgress', JSON.stringify(progress));

    saveProgressToCloud(progress).catch(() => {
        // Ignore sync errors for offline or unauthenticated users
    });

    // Update UI
    updateProgressBars();
}

function updateQuestionProgress(topic, questionId) {
    let progress = JSON.parse(localStorage.getItem('dataAnalyticsProgress') || '{}');

    if (!progress[topic]) {
        progress[topic] = {
            lastAccessed: new Date().toISOString(),
            completedQuestions: []
        };
    }

    if (!progress[topic].completedQuestions.includes(questionId)) {
        progress[topic].completedQuestions.push(questionId);
    }

    localStorage.setItem('dataAnalyticsProgress', JSON.stringify(progress));
    saveProgressToCloud(progress).catch(() => {
        // Ignore sync errors for offline or unauthenticated users
    });
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
    const raw = JSON.parse(localStorage.getItem('dataAnalyticsProgress') || '{}');
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
    initFirebase();

    // Update navigation active states
    updateNavigation();

    // Load progress bars
    updateProgressBars();

    const resetButton = document.getElementById('resetProgressButton');
    if (resetButton) {
        resetButton.addEventListener('click', () => {
            localStorage.removeItem('dataAnalyticsProgress');
            updateProgressBars();
        });
    }

    const emailInput = document.getElementById('authEmail');
    const passwordInput = document.getElementById('authPassword');
    const loginButton = document.getElementById('loginButton');
    const signupButton = document.getElementById('signupButton');
    const logoutButton = document.getElementById('logoutButton');
    const messageEl = document.getElementById('authMessage');

    if (loginButton && signupButton && logoutButton && messageEl) {
        loginButton.addEventListener('click', async () => {
            if (!firebaseAuth || !emailInput || !passwordInput) return;
            messageEl.textContent = '';

            try {
                await firebaseAuth.signInWithEmailAndPassword(emailInput.value.trim(), passwordInput.value);
                messageEl.textContent = 'Logged in successfully.';
            } catch (error) {
                messageEl.textContent = error.message || 'Login failed.';
            }
        });

        signupButton.addEventListener('click', async () => {
            if (!firebaseAuth || !emailInput || !passwordInput) return;
            messageEl.textContent = '';

            try {
                await firebaseAuth.createUserWithEmailAndPassword(emailInput.value.trim(), passwordInput.value);
                messageEl.textContent = 'Account created.';
            } catch (error) {
                messageEl.textContent = error.message || 'Sign up failed.';
            }
        });

        logoutButton.addEventListener('click', async () => {
            if (!firebaseAuth) return;
            messageEl.textContent = '';

            try {
                await firebaseAuth.signOut();
                messageEl.textContent = 'Logged out.';
            } catch (error) {
                messageEl.textContent = error.message || 'Logout failed.';
            }
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

// ===== Welcome Message =====

console.log('%c🎓 Welcome to DataPrep Pro! v2.0.1', 'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; font-size: 20px; padding: 10px; border-radius: 5px;');
console.log('%cYour journey to mastering data analytics interviews starts here!', 'color: #667eea; font-size: 14px;');
console.log('%c✅ Script loaded successfully - ' + new Date().toLocaleString(), 'color: #00ff00;');
console.log('topicsData available:', typeof topicsData !== 'undefined');
if (typeof topicsData !== 'undefined') {
    console.log('Topics:', Object.keys(topicsData));
}
