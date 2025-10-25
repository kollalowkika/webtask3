// ----- Interactive Quiz -----
const quizData = [
  {
    question: "Which language runs in the browser?",
    answers: ["Java", "C", "Python", "JavaScript"],
    correct: 3
  },
  {
    question: "What does CSS stand for?",
    answers: ["Cascading Style Sheets", "Creative Style System", "Computer Style Sheet", "Colorful Style Sheets"],
    correct: 0
  },
  {
    question: "What is the correct HTML element for a line break?",
    answers: ["<break>", "<lb>", "<br>", "<hr>"],
    correct: 2
  }
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("next-btn");
const scoreEl = document.getElementById("score");

function loadQuestion() {
  const q = quizData[currentQuestion];
  questionEl.textContent = q.question;
  answersEl.innerHTML = "";
  q.answers.forEach((ans, idx) => {
    const button = document.createElement("button");
    button.textContent = ans;
    button.onclick = () => {
      if(idx === q.correct) score++;
      currentQuestion++;
      if(currentQuestion < quizData.length) loadQuestion();
      else {
        questionEl.textContent = "Quiz Completed!";
        answersEl.innerHTML = "";
        scoreEl.textContent = `Your Score: ${score}/${quizData.length}`;
      }
    };
    answersEl.appendChild(button);
  });
}
loadQuestion();

nextBtn.onclick = () => {
  if(currentQuestion < quizData.length) loadQuestion();
};

// ----- Image Carousel -----
const carouselImages = document.querySelectorAll(".carousel-img");
let currentImg = 0;

document.querySelector(".next").onclick = () => {
  carouselImages[currentImg].classList.remove("active");
  currentImg = (currentImg + 1) % carouselImages.length;
  carouselImages[currentImg].classList.add("active");
};

document.querySelector(".prev").onclick = () => {
  carouselImages[currentImg].classList.remove("active");
  currentImg = (currentImg - 1 + carouselImages.length) % carouselImages.length;
  carouselImages[currentImg].classList.add("active");
};

// ----- Fetch Data from API -----
document.getElementById("fetch-btn").onclick = async () => {
  const jokeEl = document.getElementById("joke");
  jokeEl.textContent = "Loading...";
  try {
    const res = await fetch("https://official-joke-api.appspot.com/random_joke");
    const data = await res.json();
    jokeEl.textContent = `${data.setup} - ${data.punchline}`;
  } catch (err) {
    jokeEl.textContent = "Failed to fetch joke!";
  }
};
