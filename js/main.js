// Questions Arry
const questions = [
  {
    question: "Enter Your First Name"
  },
  {
    question: "Last Name"
  },
  { question: "Email", pattern: /\S+@\S+\.\S+/ },
  { question: "Create a Password", type: "password" }
];

// Transition times
const shakeTime = 100; // Shake transition time
const switchTime = 200; // Transition between fields

// Initialize position at first question
let position = 0;

// DOM Elements
const formBox = document.querySelector("#formBox");
const nextBtn = document.querySelector("#nextBtn");
const prevBtn = document.querySelector("#prevBtn");
const inputGroup = document.querySelector("#inputGroup");
const inputField = document.querySelector("#inputField");
const inputLabel = document.querySelector("#inputLabel");
const inputProgress = document.querySelector("#inputProgress");
const progress = document.querySelector("#progressBar");

// Events
document.addEventListener("DOMContentLoaded", getQuestion);

// Functions
// Get Question from Array
function getQuestion() {
  // Get the current question
  inputLabel.innerHTML = questions[position].question;
  // Get current type
  inputField.type = questions[position].type || "text";
  // Get current answer
  inputField.value = questions[position].answer || "";
  // Focus on current element
  inputField.focus();

  // Set progress bar width - depending on question
  progress.style.width = (position * 100) / questions.length + "%";

  // Toggle user icon / back arrow
  prevBtn.className = position
    ? "prev-btn fas fa-arrow-left"
    : "prev-btn fas fa-user";

  showQuestion();
}

// Display Question to User
function showQuestion() {
  inputGroup.style.opacity = 1;
  inputProgress.style.transition = "";
  inputProgress.style.width = "100%";
}
