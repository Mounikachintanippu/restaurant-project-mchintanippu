/* Global variables just for easy practice */


// An array of objects containing questions and answers
questions = [
  {
    question: "What does HTML stand for?",
    answer: "Hyper Text Markup Language."
  },
  {
    question: "Give the selector and rule to color all paragraph text blue.",
    answer: "p {color: blue;}"
  },
  {
    question:
      "How are heading elements similar and different from the header element?",
    answer:
      "the header element is a container and can contain multiple elements. In addition it is good and commont practice to include a heading element within a header element."
  },
  {
    question:
      "When would you want to use an article element and when would this generally not be necessary?",
    answer: "To be written..."
  }
];

// Initial question to display
qIndex = 0;

// Set up variables to hold element references

// Example of variables and initialization
qCountSpan = document.getElementById("qCount");
qIndexSpan = document.getElementById("qIndex");

displayQuestionAnswer();

// initialize buttons
initButtons();

document.getElementById("QCreator").classList.toggle("hideStuff");

/* Functions defined below here */

/* Attach buttons to their handler functions here. Button id:
 BForward BBack BShow BShowQC BRemove BHideA BAddQ BHideQC */
function initButtons() {
  // Show and hide creator
  document.getElementById("BShowQC").addEventListener("click", toggleQuestionCreator);
  document.getElementById("BShowQC").disabled = false;

  document.getElementById("BHideQC").addEventListener("click", toggleQuestionCreator);

  // Show and hide answer
  document.getElementById("BShow").addEventListener("click", toggleAnswer);
  document.getElementById("BShow").disabled = true;
  document.getElementById("BHideA").addEventListener("click", toggleAnswer);

  // Forward and back Questions
  document.getElementById("BForward").addEventListener("click", nextQuestion);
  document.getElementById("BBack").addEventListener("click", prevQuestion);

  // Remove question
  document.getElementById("BRemove").addEventListener("click", removeQuestion);

  // Add question
  document.getElementById("BAddQ").addEventListener("click", addQuestion);
}

/* You may want to define functions like the following to attach to buttons */

function displayQuestionAnswer() {
  // Initialize content
  qCountSpan.innerHTML = questions.length; // Ans - 4
  qIndexSpan.innerHTML = qIndex + 1;// Ans - 1

  // Update question
	let q = document.getElementById("contentQ");
  q.innerHTML = "";
	let para1 = document.createElement("p");
  if (questions.length > 0) {
    para1.innerHTML = questions[qIndex].question;
  }
  else {
    // If there are no questions left, display blank.
    para1.innerHTML = "";
  }
	q.appendChild(para1);

  // Update Answer
	let a = document.getElementById("contentA");
  a.innerHTML = "";
	let para2 = document.createElement("p");
  if (questions.length > 0) {
    para2.innerHTML = questions[qIndex].answer;
  }
  else {
    // If there are no questions left, display blank.
    para2.innerHTML = "";
  }
	a.appendChild(para2);
}

function nextQuestion() {
  qIndex++;
  displayQuestionAnswer();
  enableDisableForwardBackward();
}

function prevQuestion() {
  qIndex--;
  displayQuestionAnswer();
  enableDisableForwardBackward();
}

function enableDisableForwardBackward() {
  if (qIndex <= 0) {
    document.getElementById("BBack").disabled = true;
  }
  else {
    document.getElementById("BBack").disabled = false;
  }

  if (qIndex >= questions.length - 1) {
    document.getElementById("BForward").disabled = true;
  }
  else {
    document.getElementById("BForward").disabled = false;
  }
}

function enableDisableRemoveQuestion() {
  if (questions.length == 0) {
    document.getElementById("BRemove").disabled = true;
  }
  else {
    document.getElementById("BRemove").disabled = false;
  }
}

function toggleAnswer() {
  if (document.getElementById("BShow").disabled == true) {
    // Answer is currently shown and we need to hide it.
    document.getElementById("currentA").classList.remove("showAnswer");
    document.getElementById("currentA").classList.add("hideAnswer");

    document.getElementById("BShow").disabled = false;
  }
  else {
    // Answer is currently hidden and we need to show it.
    document.getElementById("currentA").classList.remove("hideAnswer");
    document.getElementById("currentA").classList.add("showAnswer");

    document.getElementById("BShow").disabled = true;
  }
}

/* Takes the content from the text areas and adds
 to the quesiton list */
function addQuestion() {
  // You provide the functionality.
  let q = document.getElementById("Question").value;
  let a = document.getElementById("Answer").value;

  var qa = {question : q, answer : a};
  questions.push(qa);

  if (qIndex < 0) {
    qIndex = 0;
  }

  displayQuestionAnswer();
  enableDisableForwardBackward();
  enableDisableRemoveQuestion();
}

function removeQuestion() {
  questions.splice(qIndex, 1);

  if (qIndex >= questions.length) {
    qIndex--;
  }

  if (questions.length == 0) {
    document.getElementById("BRemove").disabled = true;
  }

  displayQuestionAnswer();
  enableDisableForwardBackward();
  enableDisableRemoveQuestion();
}

function toggleQuestionCreator() {
  document.getElementById("QCreator").classList.toggle("hideStuff");
  document.getElementById("QCreator").classList.toggle("showStuff");
 if (document.getElementById("BShowQC").disabled == true) {
    //hideQuestionCreator();
    document.getElementById("BShowQC").disabled = false;
  }

  else {
    //showQuestionCreator();
    document.getElementById("BShowQC").disabled = true;
  }
}

function showQuestionCreator() {
  document.getElementById("QCreator").classList.remove("hideStuff");
  document.getElementById("QCreator").classList.add("showStuff");

  // Disable the "Show Question Creator" button if we have already displayed the creator.
  document.getElementById("BShowQC").disabled = true;
}

function hideQuestionCreator() {
  document.getElementById("QCreator").classList.remove("showStuff");
  document.getElementById("QCreator").classList.add("hideStuff");

  // Enable the "Show Question Creator" button if we are hiding the creator.
  document.getElementById("BShowQC").disabled = false;
}
