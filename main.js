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
function openQuiz(quizType) {
    if (typeof QUIZ_DATA === 'undefined' || !QUIZ_DATA[quizType]) {
        console.error("Данные теста не найдены");
        return;
    }

    const data = QUIZ_DATA[quizType];
    const modal = document.getElementById('quiz-modal');
    const container = document.getElementById('quiz-content');

    container.innerHTML = `
        <span class="quiz-title-small">SYSTEM_SCAN // ${data.title}</span>
        <h2 class="quiz-question-text">${data.questions[0].q}</h2>
        <div class="options-list">
            ${data.questions[0].a.map(answer => `
                <button class="quiz-opt-btn" onclick="closeQuiz()">
                    ${answer}
                </button>
            `).join('')}
        </div>
        <button class="btn-exit-quiz" onclick="closeQuiz()">← СВЕРНУТЬ ОКНО БЕЗ ОТВЕТА</button>
    `;

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; 
}

function closeQuiz() {
    document.getElementById('quiz-modal').style.display = 'none';
    document.body.style.overflow = 'auto'; 
}
