// Эффект "Декодирования" для заголовка
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let interval = null;

document.querySelector("#decode-text").onmouseover = event => {  
  let iteration = 0;
  clearInterval(interval);
  
  interval = setInterval(() => {
    event.target.innerText = event.target.innerText
      .split("")
      .map((letter, index) => {
        if(index < iteration) {
          return event.target.dataset.value;
        }
        return letters[Math.floor(Math.random() * 26)]
      })
      .join("");
    
    if(iteration >= event.target.dataset.value.length){ 
      clearInterval(interval);
    }
    iteration += 1 / 3;
  }, 30);
};

// Инициализация при загрузке
window.onload = () => {
    AOS.init({ duration: 1000, once: true });
    const title = document.querySelector("#decode-text");
    title.dataset.value = title.innerText;
};

// Функции тестов (связаны с quiz-data.js)
function openQuiz(type) {
    const data = QUIZ_DATA[type];
    const modal = document.getElementById('quiz-modal');
    document.getElementById('quiz-content').innerHTML = `
        <h2 class="unbounded" style="color:var(--red); margin-bottom:20px;">${data.title}</h2>
        <p style="margin-bottom:20px;">${data.questions[0].q}</p>
        ${data.questions[0].a.map(opt => `<button class="btn-dark" style="width:100%; margin-bottom:10px;" onclick="closeQuiz()">${opt}</button>`).join('')}
    `;
    modal.style.display = 'flex';
}

function closeQuiz() { document.getElementById('quiz-modal').style.display = 'none'; }
