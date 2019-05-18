$(document).ready(function() {


const rounds = document.querySelectorAll(".round");
// var currentRound = 0;
// var lastRound = 8;
// var answerHolder;
var quizContainer = document.getElementById("quizContainer");
var correct = 0;
var wrong = 0;
var timeTook = 0;
var intervalId;

const quizQuestions = [
    {
        question: "In DONTNOD's 'Life is Strange', Max discovers she has the power to:",

        answers: {
            a: "travel through photographs",
            b: "read minds",
            c: "rewind time",
            d: "predict the lottery",
        },
        img: "chloe.gif",
        correctAnswer: "c",
    },
    {
        question: "The Fireflies are a revolutionary militia group in which award-winning survival game?",

        answers: {
            a: "Uncharted",
            b: "The Last of Us",
            c: "Far Cry",
            d: "Fallout 4",
        },
        img: "lastOf.jpg",
        correctAnswer: "b",
    },
    {
        question: "The German Shepherd who acts as your companion in 'Fallout 4' is named:",

        answers: {
            a: "Scruff",
            b: "DogMeat",
            c: "Rex",
            d: "Doggo",
        },
        img: "dogmeat.jpg",
        correctAnswer: "b",
    },
];


function showQuiz() {
//  reset();
 time = 30;
 timeTook = 0;
    intervalId = setInterval(timer, 1000);
    const output = [];
    quizQuestions.forEach(
        (currentQuestion, questionNumber) => {
            const answers = [];
            for(letter in currentQuestion.answers){
                answers.push(
                    `<label>
                    <input type="radio" name="question${questionNumber}"
                    value="${letter}">
                       ${letter} :
                       ${currentQuestion.answers[letter]}
                       </label>` 
                );
            }

            output.push(
                `<div class="round">
                    <div class="question"> ${currentQuestion.question} </div>
                        <div class="answers"> ${answers.join('')} </div>
                </div>`
            );
        }
    );

    quizContainer.innerHTML = output.join('');

};

function timer(){
    timeTook++;
    time--;
    var currentTime = timeConverter(time);
    $("#timer").text(currentTime);
    if(time < 1) {
        $("#timer").hide();
        $("#timeUp").text("Time Up!");
        showResults();
    }
};

function timeConverter(t){
    var minutes = Math.floor(t / 60);
    var seconds = t - (minutes * 60);
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        if (minutes === 0) {
            minutes = "00";
        }
        else if (minutes < 10) {
            minutes = "0" + minutes;
        }
        return minutes + ":" + seconds;
};


function showResults() {
    clearInterval(intervalId);
        // $("#timer").hide();
     const answerHolders = quizContainer.querySelectorAll(".answers");
        quizQuestions.forEach( 
            (currentQuestion, questionNumber) => {
                const answerHold = answerHolders[questionNumber];
                const selector = `input[name=question${questionNumber}]:checked`;
                const playerAnswer = (answerHold.querySelector(selector) || {}).value;
                    // $("#answer").html("<img>").attr("src", "assests/images/" + currentQuestion.img).addClass("img-responsive");
                    

    if(playerAnswer === currentQuestion.correctAnswer) {
        $(".results").text("Correct!");
        answerHolders[questionNumber].style.color = "lightgreen";
        correct++;
        currentRound++;
        timer.stop();
        // showAnswer();
        
    } else  {
        $(".results").text("Nope!");
        answerHolders[questionNumber].style.color = "red";
        wrong++;
        currentRound++;
        timer.stop();
        // showAnswer();
        
    } 
    });

    $("#correct").text("You got " + correct + " questions correct!");
    $("#wrong").text("You answered " + wrong + " incorrectly.");
    $("#timeItTook").text("It took you " + timeTook + " seconds to finish");

    $("#submit").hide();
    $("#restart").show();

    $("#restart").on('click', reset);
};





function reset() {
    $("#restart").hide();
    $("#correct, #wrong, #unanswered, #timeItTook, #timeUp").empty();
    $("#submit, #timer").show();
    correct = 0;
    wrong = 0;
    timeTook = 0;
    currentRound = 0;
    showQuiz();
};


// function showAnswer(){};

showQuiz();

function showRound(n) {
    rounds[currentRound].classList.remove('activeRound');
    rounds[n].classList.add('activeRound');
    currentRound = n;
    submitBtn.style.display = 'inline-block';
};

showRound(0);

$("#submit").on('click', showResults)

})