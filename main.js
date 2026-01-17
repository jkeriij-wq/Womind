// Эффект пишущей машинки
const typewriterElement = document.getElementById('typewriter');
const heroText = "WOMIND"; 
let typewriterIndex = 0;
let isDeleting = false;

function runTypewriter() {
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

// Переменные теста
let currentQuizData = null;
let currentQuestionIndex = 0;
let totalScore = 0;

// Инициализация при загрузке
window.onload = () => {
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 1000, once: true });
    }
    runTypewriter();
};

// Открытие теста
function openQuiz(quizId) { // Изменено с 'type' на 'quizId'
    if (typeof QUIZ_DATA === 'undefined' || !QUIZ_DATA[quizId]) {
        console.error("Данные теста не найдены");
        return;
    }
    
    currentQuizData = QUIZ_DATA[quizId];
    currentQuestionIndex = 0;
    totalScore = 0;
    
    showQuestion();
    
    document.getElementById('quiz-modal').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function showQuestion() {
    const container = document.getElementById('quiz-content');
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
    let finalResult = currentQuizData.results[0].text;
    
    for (let res of currentQuizData.results) {
        if (totalScore >= res.min) {
            finalResult = res.text;
        }
    }

    container.innerHTML = `
        <span class="quiz-title-small">SCAN_COMPLETED // TOTAL SCORE: ${totalScore}</span>
        <h2 class="quiz-question-text" style="color: #000 !important;">ВАШ РЕЗУЛЬТАТ:</h2>
        <p style="font-size: 1rem; line-height: 1.6; margin-bottom: 30px; font-family: 'Unbounded';">${finalResult}</p>
        <button class="btn-red-wide" onclick="document.getElementById('form').scrollIntoView(); closeQuiz();">
            ОБСУДИТЬ НА РАЗБОРЕ
        </button>
        <button class="btn-exit-quiz" onclick="closeQuiz()">ЗАКРЫТЬ</button>
    `;
}

function closeQuiz() {
    document.getElementById('quiz-modal').style.display = 'none';
    document.body.style.overflow = 'auto';
}
