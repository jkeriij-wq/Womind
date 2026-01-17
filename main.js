// Эффект пишущей машинки
const typewriterElement = document.getElementById('typewriter');
const heroText = "WOMIND"; // Переименовал переменную, чтобы не путать с функцией
let typewriterIndex = 0;
let isDeleting = false;

function runTypewriter() { // Переименовал функцию, чтобы не конфликтовала с параметрами
    if (!typewriterElement) return;
    
    const currentText = isDeleting 
        ? heroText.substring(0, typewriterIndex - 1) 
        : heroText.substring(0, typewriterIndex + 1);
        
    typewriterElement.innerHTML = currentText;
    
    let speed = isDeleting ? 100 : 200;

    if (!isDeleting && currentText === heroText) {
        speed = 2000; 
        isDeleting = true;
    } else if (isDeleting && currentText === '') {
        isDeleting = false;
        speed = 500;
    } else {
        typewriterIndex = isDeleting ? typewriterIndex - 1 : typewriterIndex + 1;
    }
    setTimeout(runTypewriter, speed);
}

// Глобальные переменные теста
let currentQuizData = null;
let currentQuestionIndex = 0;
let totalScore = 0;

// Инициализация всего при загрузке
window.addEventListener('load', () => {
    // Запуск AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 1000, once: true });
    }
    // Запуск машинки
    runTypewriter();
});

// Открытие теста (Параметр теперь quizType, чтобы не путать с функцией type)
function openQuiz(quizType) {
    if (typeof QUIZ_DATA === 'undefined') {
        console.error("Файл quiz-data.js не загружен!");
        return;
    }
    
    currentQuizData = QUIZ_DATA[quizType];
    if (!currentQuizData) {
        console.error("Данные теста не найдены для:", quizType);
        return;
    }

    currentQuestionIndex = 0;
    totalScore = 0;
    
    showQuestion();
    
    const modal = document.getElementById('quiz-modal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function showQuestion() {
    const container = document.getElementById('quiz-content');
    if (!container) return;

    const question = currentQuizData.questions[currentQuestionIndex];
    const progress = Math.round((currentQuestionIndex / currentQuizData.questions.length) * 100);

    container.innerHTML = `
        <div style="margin-bottom: 10px; font-size: 10px; opacity: 0.5; font-family: 'Unbounded';">
            PROGRESS: ${progress}% | QUESTION ${currentQuestionIndex + 1}/${currentQuizData.questions.length}
        </div>
        <span class="quiz-title-small">SYSTEM_SCAN // ${currentQuizData.title}</span>
        <h2 class="quiz-question-text">${question.q}</h2>
        <div class="options-list">
            ${question.a.map((answer, idx) => `
                <button class="quiz-opt-btn" onclick="nextQuestion(${question.points[idx]})">
                    ${answer}
                </button>
            `).join('')}
        </div>
        <button class="btn-exit-quiz" onclick="closeQuiz()">← ПРЕРВАТЬ ТЕСТ</button>
    `;
}

function nextQuestion(points) {
    totalScore += points;
    currentQuestionIndex++;

    if (currentQuestionIndex < currentQuizData.questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    const container = document.getElementById('quiz-content');
    if (!container) return;
    
    let finalResult = currentQuizData.results[0].text;
    for (let res of currentQuizData.results) {
        if (totalScore >= res.min) {
            finalResult = res.text;
        }
    }

    container.innerHTML = `
        <span class="quiz-title-small">SCAN_COMPLETED // TOTAL SCORE: ${totalScore}</span>
        <h2 class="quiz-question-text" style="color: var(--black) !important;">ВАШ РЕЗУЛЬТАТ:</h2>
        <p style="font-size: 1.1rem; line-height: 1.6; margin-bottom: 30px; font-weight: 400; font-family: 'Unbounded';">${finalResult}</p>
        
        <button class="btn-red-wide" onclick="document.getElementById('form').scrollIntoView(); closeQuiz();">
            ОБСУДИТЬ РЕЗУЛЬТАТ НА РАЗБОРЕ
        </button>
        <button class="btn-exit-quiz" onclick="closeQuiz()">ЗАКРЫТЬ</button>
    `;
}

function closeQuiz() {
    const modal = document.getElementById('quiz-modal');
    if (modal) modal.style.display = 'none';
    document.body.style.overflow = 'auto'; 
}
