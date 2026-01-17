// Эффект пишущей машинки для заголовка
const typewriterElement = document.getElementById('typewriter');
const text = "WOMIND";
let index = 0;
let isDeleting = false;

function type() {
    const currentText = isDeleting ? text.substring(0, index - 1) : text.substring(0, index + 1);
    typewriterElement.innerHTML = currentText;
    
    let typeSpeed = isDeleting ? 100 : 200;

    if (!isDeleting && currentText === text) {
        typeSpeed = 2000; // Пауза в конце
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
    AOS.init({ duration: 1000, once: true });
    type(); // Запуск печати
};

// Функция для открытия тестов
function openQuiz(type) {
    // 1. Проверяем, существуют ли данные в файле quiz-data.js
    if (typeof QUIZ_DATA === 'undefined' || !QUIZ_DATA[type]) {
        console.error("Ошибка: Данные для теста '" + type + "' не найдены в quiz-data.js");
        return;
    }

    const data = QUIZ_DATA[type];
    const modal = document.getElementById('quiz-modal');
    const container = document.getElementById('quiz-content');

    // 2. Генерируем HTML для вставки
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

    // 3. Показываем окно
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Запрещаем скролл сайта
}

function closeQuiz() {
    document.getElementById('quiz-modal').style.display = 'none';
    document.body.style.overflow = 'auto'; // Возвращаем скролл
}
    modal.style.display = 'flex';
}

function closeQuiz() { document.getElementById('quiz-modal').style.display = 'none'; }
