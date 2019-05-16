

var quiz = document.getElementById('quiz');
var answer = document.getElementById('answer');
var results = document.getElementById('results');
var submitBtn = document.getElementById('submit');


var quizQuestions = [
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

function showQuiz(){
    var output = [];
    quizQuestions.forEach(
        (currentQuestion, questionNumber) => {
            var answers = [];
            for(letter in currentQuestion.answers){
                answers.push(
                    `<label>
                    <input type="button" name="question${questionNumber}"
                    value="${letter}">
                       ${letter} :
                       ${currentQuestion.answers[letter]}
                       </label>` 
                );
            }

            output.push(
                `<div class="question"> ${currentQuestion.question} </div>
                <div class="answers"> ${answers.join('')} </div>`
            );
        }
    );

    quiz.innerHTML = output.join('');
};


function showAnswer(){};
function showResults(){};

showQuiz();

$("submitBtn").on('click', showAnswer);