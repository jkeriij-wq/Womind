const QUIZ_DATA = {
    archetype: {
        title: "NEURO_CODE: АРХЕТИП",
        questions: [
            { q: "Как вы хотите, чтобы вас считывали?", a: ["Как эксперта-интеллектуала", "Как дерзкого новатора", "Как заботливого наставника", "Как эстета-гедониста"] },
            { q: "Ваша главная ценность в блоге?", a: ["Система и порядок", "Эмоции и хаос", "Красота и статус", "Польза и рост"] }
        ]
    },
    money: {
        title: "SCALE_PRO: MONEY-MIND",
        questions: [
            { q: "Ваша реакция на чек в 1.000.000?", a: ["Страх и сомнения", "Азарт и готовность", "Непонимание, что с этим делать", "Спокойный расчет"] },
            { q: "Что сейчас ваш главный тормоз?", a: ["Нет системы продаж", "Страх проявленности", "Слабое окружение", "Отсутствие продукта"] }
        ]
    },
    brand: {
        title: "CORE_SCAN: BRAND POTENTIAL",
        questions: [
            { q: "Есть ли у вас прописанная стратегия?", a: ["Да, на год вперед", "Только в голове", "Нет, плыву по течению"] },
            { q: "Ваш визуал отражает вашу цену?", a: ["Да, выглядит дорого", "Нет, нужно переделывать", "Не знаю"] }
        ]
    }
};

// Функции управления
function openQuiz(type) {
    const data = QUIZ_DATA[type];
    const app = document.getElementById('quiz-app');
    app.innerHTML = `
        <h2 class="unbounded" style="color:var(--gold); margin-bottom:20px;">${data.title}</h2>
        ${data.questions.map((q, i) => `
            <div style="margin-bottom:30px; border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:20px;">
                <p style="margin-bottom:15px; font-family:var(--unbounded); font-size:0.8rem;">${i+1}. ${q.q}</p>
                ${q.a.map(opt => `<button class="btn-os" style="display:block; width:100%; text-align:left; margin:5px 0;" onclick="nextStep()">${opt}</button>`).join('')}
            </div>
        `).join('')}
        <button class="btn-os-gold" style="width:100%" onclick="closeQuiz()">ЗАВЕРШИТЬ_АНАЛИЗ</button>
    `;
    document.getElementById('quiz-modal').style.display = 'flex';
}

function closeQuiz() { document.getElementById('quiz-modal').style.display = 'none'; }
function nextStep() { console.log("Answer registered"); }

// Typewriter
window.onload = () => {
    AOS.init();
    new Typewriter('#typewriter', {
        strings: ['PROGRAMMING_REALITY', 'DESIGNING_SENSES', 'UPGRADING_SYSTEMS'],
        autoStart: true,
        loop: true,
        delay: 75
    });
};
