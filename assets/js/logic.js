const buttonStart = document.getElementById("start");
const time = document.getElementById("time");
const startScreen = document.getElementById("start-screen");
const questionScreen = document.getElementById("questions");
const questionTitle = document.getElementById("question-title")
const questionAnswer = document.getElementById("choices")
const soundCorrect = new Audio("assets/sfx/correct.wav");
const soundIncorrect = new Audio("assets/sfx/incorrect.wav");
const feedbackScreen = document.getElementById("feedback");
const endScreen = document.getElementById("end-screen");
const finalScore = document.getElementById("final-score");
const buttonSubmit = document.getElementById("submit");
let timeLeft = 60;
let score = 0;
let questionNumber = 0;
let currentTime;
let currentQuestion;
let feedbackTimeout;
let countDownInterval;
let timeInterval;

buttonStart.addEventListener("click", start); 
// This changes the screen from start screen to questions screen and also starts timer 
function start(event){
    event.stopPropagation()
    time.innerHTML = 60;
    if (startScreen.className === "start" && questionScreen.className === "hide"){ 
        startScreen.className = "hide";
        questionScreen.className = "start";
        }
    timer() 
    startQuestions();
};
// This function helps in counting from 30s,updates current time and end game screen 
function timer() {
    countDownInterval = setInterval(function () {
        time.textContent = timeLeft+"s" 
        if (timeLeft <= 0) {
            clearInterval(countDownInterval);
            endGame(); 
        }
        timeLeft--;
    }, 1000);
}
//This clear previous choices and passes parameter to the next function
function startQuestions(){
    if (feedbackScreen.classList.contains("feedback")){
        feedbackScreen.classList.add("hide")
        questionAnswer.innerHTML = ""; 
    }
    questionTitle.textContent = quizQuestions[questionNumber].title;
    quizQuestions[questionNumber].answers.forEach(answer => { 
        let btn = document.createElement("button");
        btn.innerHTML = answer;
        btn.setAttribute("class", "choice button")
        btn.addEventListener("click", () => {checkAnswer(answer)}) 
        questionAnswer.appendChild(btn);
    });
}
// This provides feedback with the question, play sound if correct or wrong and also take away some time when getting the answer wrong and adding when getting the answers right
function checkAnswer(pickedAnswer) {
    if(pickedAnswer === quizQuestions[questionNumber].correct)
    {
        feedbackScreen.classList.remove("hide");
        feedbackScreen.textContent = "Correct!"; 
        soundCorrect.play(); 
        score++;
        timeLeft += 5;
    }else{
        feedbackScreen.classList.remove("hide")
        feedbackScreen.textContent = "Wrong!" 
        soundIncorrect.play();
        score--;
        timeLeft -= 10;
    }
    //This allow us to gets the index number of next random question]
    // Also  allows the feedback to be displayed for 0.5s before running next question
    questionNumber = getRandom(quizQuestions.length)
    setTimeout(startQuestions,500)
}

function endGame(){
    time.innerHTML = 0
    if(questionScreen.className === "start"){
        questionScreen.className = "hide";
        feedbackScreen.classList.add("hide");
        endScreen.className = "start"
        finalScore.textContent = score
    }
    buttonSubmit.addEventListener("submit", function(e){
        e.preventDefault();
    })
    
   
    buttonSubmit.addEventListener("click", ()=>highScores(score))
}

function highScores(score){
    let saveData = document.getElementById("initials").value;
    localStorage.setItem(saveData, JSON.stringify(score))
    if(endScreen.className === "start"){
        endScreen.className = "hide"
        window.location.href = "highscores.html"
    }
}
// This helps in getting the random questions 
function getRandom(max){
    return Math.floor(Math.random()*max) 
}

console.log(score);



