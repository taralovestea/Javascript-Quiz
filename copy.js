// define variables for buttons/elements/timer
var startButton = document.getElementById('start-btn')
var nextButton = document.getElementById('next-btn')
var questionContainerElement = document.getElementById('question-container')
var questionElement = document.getElementById('question')
var answerButtonsElement = document.getElementById('answer-buttons')
var timerEl = document.querySelector(".time");
var secondsLeft = 100;
var score = 0;
var intervalID;

let shuffledQuestions, currentQuestionIndex
console.log("hello")
// set timer function 
function setTime() {
    var timerInterval = setInterval(function x() {
      intervalID=timerInterval;
  
      timerEl.textContent = secondsLeft;
      secondsLeft--;
      // console.log(secondsLeft)
  
      if(secondsLeft <= 0) {
        clearInterval(timerInterval);
        secondsLeft=0;
        endGame();
      }
      return x;
    }(), 1000);
  }
  
  // function sendMessage() {
  //   timeEl.textContent = " make form to submit score ";
  
    
  
  // }
  
  

// add event to start button to begin the quiz + start timer

startButton.addEventListener('click', function(e){
  console.log(e)
  startGame()
})

nextButton.addEventListener('click', () => {
  currentQuestionIndex++  
  if(currentQuestionIndex>3){
    endGame()
  }
  else{
    setNextQuestion()
  } 
  
})

// add function to show first question in a random order 


function startGame() {
  setTime()
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  // setNextQuestion()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function setNextQuestion() {
  resetState()
  if(currentQuestionIndex>3){
    endGame()
  }
  else{
    showQuestion(shuffledQuestions[currentQuestionIndex])
  }
  
}
function endGame(){
  clearInterval(intervalID);
  
  startButton.classList.add('hide')
  $("#question-container").empty()
  var finalMessage= $("<p> You scored " + score + " !!! </p>")
  $("#question-container").append(finalMessage)

}

// console.log(question.answer.length)
function showQuestionIdk() {
  // console.log(questions.length)
  // console.log(questions)
  // console.log(questions.answer.length)
  console.log(shuffledQuestions)
  //THIS IS THE LIST OF DICTONARIES WITH QUESTION AND ANSWERS
  for (i = 0; i<shuffledQuestions.length; i++){
    questionElement.innerText = shuffledQuestions[i].question
    // console.log(shuffledQuestions[i])
    answers = shuffledQuestions[i].answers
    // console.log(answers)
    // console.log("up to here")
    // THIS IS THE LIST OF ANSWERS FOR EACH OF THE QUESTIONS
    for (x = 0; x<answers.length; x++){
      answer = answers[x]
      console.log(answer)
      button = document.createElement('button')
      button.innerText = answer.text
      button.classList.add('btn')
    
      // console.log(button)
    // if (answer.correct) {
    //   button.dataset.correct = answer.correct
    // }
    }
  }
}
function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    
//     console.log(button)
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    button.setAttribute("onclick", "setNextQuestion()")
    button.addEventListener('click', setNextQuestion)
    button.setAttribute("onclick", "print_something()") 
//     if you are the last questions dont add this
    answerButtonsElement.appendChild(button)
//     if you are the last question put a Finish text

  })
}

function print_something(){
console.log("printing something")
nextButton.click()
}





function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  var selectedButton = e.target
  var correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    // setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex +1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
    score = score +1
    // console.log("score:");
    // console.log(score);
    // document.getElementsByClassName("score").textContent=myscore
    document.getElementById("score_id").textContent = score;
  } else {
    element.classList.add('wrong')
    // console.log("wrong answer")
    // every time the user answers wrong they lose n seconds.
    var penality_time = 5
    var penalty = timerEl.innerHTML-penality_time 
    secondsLeft=penalty
  }
}




// add event listener for a class to listen for all the answer buttons
// wehn ansewr button is clicked check if it matches the answer key 
// when right or wrong do some stuff
// repopulate html with the next and incremtn the curent question index



function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}
// write questions in an array 
var questions = [
  {
    question: 'What is Javascript?',
    answers: [
      { text: 'a scripting language', correct: true },
      { text: 'some kind of coffee', correct: false }
    ]
  },

  {
    question: 'What is a variable??',
    answers: [
      { text: 'Symbol representing a quanitity that assumes a range of values', correct: true },
      { text: 'A type of math problem', correct: false },
      { text: 'A type of programming language ', correct: false },
      { text: 'a nested element', correct: false }
    ]
  },
  {
    question: 'What is a Method??',
    answers: [
      { text: 'A philosophy term used to describe life', correct: false },
      { text: 'A command that tells us how an object is to be acted upon', correct: true },
      { text: 'A kind of pie', correct: false },
      { text: 'A style of acting', correct: false }
    ]
  },
  {
    question: 'Is a property used to describe an object?',
    answers: [
      { text: 'no', correct: false },
      { text: 'yes', correct: true }
    ]
  }
];