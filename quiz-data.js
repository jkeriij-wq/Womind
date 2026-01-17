const QUIZ_DATA = {
    archetype: {
        title: "NEURO_CODE: ARCHETYPE",
        questions: [
            { q: "Как вы хотите влиять на мир?", a: ["Через эстетику и чувства", "Через власть и структуру", "Через знания и поиск истины", "Через бунт и изменения"] },
            { q: "Ваш идеальный клиент — это...", a: ["Тот, кто ищет вдохновения", "Тот, кто ищет систему", "Тот, кто ищет глубину", "Тот, кто ищет результат"] }
        ]
    },
    money: {
        title: "SCALE_PRO: MONEY-MIND",
        questions: [
            { q: "Что вы чувствуете при мысли о чеке в $10,000?", a: ["Азарт и готовность", "Страх ответственности", "Неуверенность в продукте", "Это мой стандарт"] }
        ]
    },
    brand: {
        title: "CORE_SCAN: SYSTEM AUDIT",
        questions: [
            { q: "Насколько ваша текущая упаковка соответствует вашей цене?", a: ["Полное соответствие", "Упаковка выглядит дешевле", "Упаковки нет", "Нужна перепрошивка"] }
        ]
    },
    visual: {
        title: "VISUAL_DNA: DECODING",
        questions: [
            { q: "Какой визуальный ритм вам ближе?", a: ["Минимализм и воздух", "Драма и контраст", "Raw-эстетика и хаос", "Геометрия и симметрия"] }
        ]
    }
};

// Функция инициализации в main.js
function openQuiz(type) {
    const data = QUIZ_DATA[type];
    const container = document.getElementById('quiz-container');
    container.innerHTML = `
        <h2 class="unbounded" style="color:var(--gold)">${data.title}</h2>
        <div class="q-wrap">
            <p>${data.questions[0].q}</p>
            ${data.questions[0].a.map(opt => `<button class="btn-os-gold" onclick="closeQuiz()">${opt}</button>`).join('')}
        </div>
    `;
    document.getElementById('quiz-modal').style.display = 'flex';
}
