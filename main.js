// Эффект пишущей машинки
const typewriterElement = document.getElementById('typewriter');
const text = "WOMIND";
let index = 0;
let isDeleting = false;

function type() {
    if (!typewriterElement) return;
    const currentText = isDeleting ? text.substring(0, index - 1) : text.substring(0, index + 1);
    typewriterElement.innerHTML = currentText;
    
    let typeSpeed = isDeleting ? 100 : 200;

    if (!isDeleting && currentText === text) {
        typeSpeed = 2000; 
        isDeleting = true;
    } else if (isDeleting && currentText === '') {
        isDeleting = false;
        typeSpeed = 500;
    } else {
        index = isDeleting ? index - 1 : index + 1;
    }
    setTimeout(type, typeSpeed);
}

// Инициализация
window.onload = () => {
    if (typeof AOS !== 'undefined') AOS.init({ duration: 1000, once: true });
    type(); 
};

// Открытие теста
let currentQuizData = null;
let currentQuestionIndex = 0;
let totalScore = 0;

function openQuiz(type) {
    currentQuizData = QUIZ_DATA[type];
    currentQuestionIndex = 0;
    totalScore = 0;
    
    showQuestion();
    
    document.getElementById('quiz-modal').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function showQuestion() {
    const container = document.getElementById('quiz-content');
    const question = currentQuizData.questions[currentQuestionIndex];
    const progress = Math.round(((currentQuestionIndex) / currentQuizData.questions.length) * 100);

    container.innerHTML = `
        <div style="margin-bottom: 10px; font-size: 10px; opacity: 0.5;">
            PROGRESS: ${progress}% | QUESTION ${currentQuestionIndex + 1}/${currentQuizData.questions.length}
        </div>
        <span class="quiz-title-small">SYSTEM_SCAN // ${currentQuizData.title}</span>
        <h2 class="quiz-question-text">${question.q}</h2>
        <div class="options-list">
            ${question.a.map((answer, index) => `
                <button class="quiz-opt-btn" onclick="nextQuestion(${question.points[index]})">
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
    
    // Поиск подходящего результата
    let finalResult = currentQuizData.results[0].text;
    for (let res of currentQuizData.results) {
        if (totalScore >= res.min) {
            finalResult = res.text;
        }
    }

    container.innerHTML = `
        <span class="quiz-title-small">SCAN_COMPLETED // TOTAL SCORE: ${totalScore}</span>
        <h2 class="quiz-question-text" style="color: var(--black) !important;">ВАШ РЕЗУЛЬТАТ:</h2>
        <p style="font-size: 1.1rem; line-height: 1.6; margin-bottom: 30px; font-weight: 400;">${finalResult}</p>
        
        <button class="btn-red-wide" onclick="document.getElementById('form').scrollIntoView(); closeQuiz();">
            ОБСУДИТЬ РЕЗУЛЬТАТ НА РАЗБОРЕ
        </button>
        <button class="btn-exit-quiz" onclick="closeQuiz()">ЗАКРЫТЬ</button>
    `;
}


function closeQuiz() {
    document.getElementById('quiz-modal').style.display = 'none';
    document.body.style.overflow = 'auto'; 
}
