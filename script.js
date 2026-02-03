// ===== Navigation and UI Functions =====

function scrollToTopics() {
    document.getElementById('topics').scrollIntoView({ behavior: 'smooth' });
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

    questions.forEach(question => {
        const questionElement = createQuestionElement(question);
        container.appendChild(questionElement);
    });
}

function createQuestionElement(question) {
    const div = document.createElement('div');
    div.className = 'question-item';

    const answerId = `answer-${Math.random().toString(36).substr(2, 9)}`;
    const editorId = `editor-${Math.random().toString(36).substr(2, 9)}`;

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
                <span class="question-number">Question ${question.number}</span>
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
    updateProgressBars();
}

function updateProgressBars() {
    const progress = JSON.parse(localStorage.getItem('dataAnalyticsProgress') || '{}');

    Object.keys(topicsData).forEach(topicKey => {
        const topicProgress = progress[topicKey];
        const totalQuestions = topicsData[topicKey].questions.length;

        let completedCount = 0;
        if (topicProgress && topicProgress.completedQuestions) {
            completedCount = topicProgress.completedQuestions.length;
        }

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
    // Update navigation active states
    updateNavigation();

    // Load progress bars
    updateProgressBars();

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

console.log('%c🎓 Welcome to DataPrep Pro! ', 'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; font-size: 20px; padding: 10px; border-radius: 5px;');
console.log('%cYour journey to mastering data analytics interviews starts here!', 'color: #667eea; font-size: 14px;');
