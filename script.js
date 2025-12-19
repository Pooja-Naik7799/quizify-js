let timeLeft = 10;
let timerInterval;
const timerEl = document.getElementById("timer");

const startScreen = document.getElementById("startScreen");
const quizScreen = document.getElementById("quizScreen");
const startBtn = document.getElementById("startBtn");
const usernameInput = document.getElementById("username");
const welcomeText = document.getElementById("welcomeText");

let username = "";
startBtn.onclick = () => {
  username = usernameInput.value.trim();

  if (username === "") {
    alert("Please enter your name");
    return;
  }

  startScreen.style.display = "none";
  quizScreen.style.display = "block";
  welcomeText.textContent = `Welcome, ${username}!`;
  loadQuestion();
};

const quizData = [
  {
    question: "What is HTML?",
    options: ["Programming Language", "Markup Language", "Database", "OS"],
    answer: "Markup Language"
  },
  {
    question: "Which language is used for styling?",
    options: ["HTML", "Python", "CSS", "Java"],
    answer: "CSS"
  }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const questionEl = document.getElementById("question");
const options = document.querySelectorAll(".option");
const nextBtn = document.getElementById("nextBtn");

function loadQuestion() {
  answered = false;
  nextBtn.disabled = true;

  timeLeft = 10;
  timerEl.textContent = `Time Left: ${timeLeft}s`;

  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timeLeft--;
    timerEl.textContent = `Time Left: ${timeLeft}s`;

    if (timeLeft === 0) {
      clearInterval(timerInterval);
      answered=true;
      nextBtn.disabled = false;
      options.forEach(btn => btn.disabled = true);
    }
  }, 1000);

  const q = quizData[currentQuestion];
  questionEl.textContent = q.question;

  options.forEach((btn, index) => {
    btn.textContent = q.options[index];
    btn.classList.remove("selected");
    btn.disabled = false;
    btn.onclick = () => checkAnswer(btn);
  });

  updateProgress();
}


function checkAnswer(button) {
  if (answered) return;
  answered = true;

  clearInterval(timerInterval);
  options.forEach(btn => btn.disabled = true);
  button.classList.add("selected");

  if (button.textContent === quizData[currentQuestion].answer) {
    score++;
  }

  nextBtn.disabled = false;
}

function showResult() {
  let percentage = (score / quizData.length) * 100;
  let stars = "";

  if (percentage === 100) stars = "⭐⭐⭐⭐⭐";
  else if (percentage >= 60) stars = "⭐⭐⭐⭐";
  else if (percentage >= 40) stars = "⭐⭐⭐";
  else stars = "⭐⭐";

  quizScreen.innerHTML = `
    <h2>Well done, ${username}!</h2>
    <h1>${score} / ${quizData.length}</h1>
    <h2>${stars}</h2>
    <p>${percentage === 100 ? "Excellent 🎉" : "Keep Practicing 👍"}</p>
  `;
}
const progress = document.querySelector(".progress");

function updateProgress() {
  let percent = ((currentQuestion + 1) / quizData.length) * 100;
  progress.style.width = percent + "%";
}
nextBtn.onclick = () => {
  currentQuestion++;

  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    clearInterval(timerInterval);
    showResult();
  }
};




