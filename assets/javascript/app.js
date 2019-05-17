

const quiz = document.getElementById('quiz');
var answer = document.getElementById('answer');
const results = document.getElementById('results');
const submitBtn = document.getElementById('submit');
const round = document.querySelectorAll(".round");
let roundNum = 0;
let correct = 0;
let wrong = 0;
let unanswered = 0;
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
        correctAnswer: "b",
    },
];


// function showRound(n) {
//     round[roundNum].classList.remove('currentRound');
//     round[n].classList.add('currentRound');
//     roundNum = n;
//     submitBtn.style.display = 'inline-block';
// };

// showRound(0);

function showQuiz(){
 time = 30;
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

    quiz.innerHTML = output.join('');
};

function timer(){
    time--;
    var currentTime = timeConverter(time);
    $("#timer").text(currentTime);
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
     const answerHolders = quiz.querySelectorAll(".answers");
        let numCorrect = 0;
        quizQuestions.forEach( 
            (currentQuestion, questionNumber) => {
                const answerHold = answerHolders[questionNumber];
                const selector = `input[name=question${questionNumber}]:checked`;
                const playerAnswer = (answerHold.querySelector(selector) || {}).value;

    if(playerAnswer === currentQuestion.correctAnswer){
        numCorrect++;
        answerHolders[questionNumber].style.color = 'lightgreen';
    } else {
        answerHolders[questionNumber].style.color = 'red';
    }
    });

    results.innerHTML = `${numCorrect} out of ${quizQuestions.length}`;
};


// function showAnswer(){};

showQuiz();

$("#submit").on('click', showResults)