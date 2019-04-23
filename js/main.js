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
const shakeTime = 75; // Shake transition time
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
// Get question on DOM load
document.addEventListener("DOMContentLoaded", getQuestion);
// Listen for next button click
nextBtn.addEventListener("click", validate);
// Listen for prev button click
prevBtn.addEventListener("click", () => {
  position--;
  getQuestion();
});
// Listen for enter on inputField
inputField.addEventListener("keyup", e => {
  if (e.keyCode === 13) {
    validate();
  }
});

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

// Hide question
function hideQuestion() {
  inputGroup.style.opacity = 0;
  inputLabel.style.marginLeft = 0;
  inputProgress.style.width = 0;
  inputProgress.style.transition = "none";
  inputGroup.style.border = null;
}

// Transform for shake motion
function transform(x, y) {
  formBox.style.transform = `translate(${x}px, ${y}px)`;
}

// Validate field
function validate() {
  // Make sure pattern matches (if there is one)
  if (!inputField.value.match(questions[position].pattern || /.+/)) {
    inputFail();
  } else {
    inputPass();
  }
}

// Field input fails
function inputFail() {
  formBox.className = "form-box error";
  // Repeat shake motion
  for (let i = 0; i < 6; i++) {
    setTimeout(transform, shakeTime * i, ((i % 2) * 2 - 1) * 20, 0);
    setTimeout(transform, shakeTime * 6, 0, 0);
    inputField.focus();
  }
}

// Field input passes
function inputPass() {
  formBox.className = "form-box";
  setTimeout(transform, shakeTime * 0, 0, 10);
  setTimeout(transform, shakeTime * 1, 0, 0);

  // Store answer in array
  questions[position].answer = inputField.value;

  // Increment position
  position++;

  // If new question, hide current question and get next
  if (questions[position]) {
    hideQuestion();
    getQuestion();
  } else {
    // Remove if no questions remain
    hideQuestion();
    formBox.className = "form-box close";
    progress.style.width = "100%";

    // Form complete
    formComplete();
  }
}

// All fields complete. Show end message
function formComplete() {
  console.log(questions);
  const message = document.createElement("h2");
  message.classList.add("end");
  message.appendChild(
    document.createTextNode(
      `Thanks ${
        questions[0].answer
      }. You've signed up! Check your inbox for a confirmation email. `
    )
  );
  setTimeout(() => {
    formBox.parentElement.appendChild(message);
    setTimeout(() => {
      message.style.opacity = 1;
    }, 50);
  }, 1000);
}
