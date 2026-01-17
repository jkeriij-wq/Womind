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
    const data = QUIZ_DATA[type];
    const modal = document.getElementById('quiz-modal');
    document.getElementById('quiz-root').innerHTML = `
        <h2 class="unbounded" style="color:var(--red); margin-bottom:20px;">${data.title}</h2>
        <p style="margin-bottom:30px;">${data.questions[0].q}</p>
        <div style="display:grid; gap:10px;">
            ${data.questions[0].a.map(opt => `
                <button class="btn-black" style="text-align:left; padding:20px;" onclick="closeQuiz()">
                    ${opt}
                </button>
            `).join('')}
        </div>
    `;
    modal.style.display = 'flex';
}

function closeQuiz() { document.getElementById('quiz-modal').style.display = 'none'; }
