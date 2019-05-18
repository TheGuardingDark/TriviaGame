

$(document).ready(function() {

    const quizContainer = document.getElementById("quiz");
    const resultsContainer = document.getElementById("results");
    const submitButton = document.getElementById("submit");
    var time = 15;
    var timerOn = false;
    var timeUp = false;
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
        correctAnswer: "c"
      },
      {
        question: "The Fireflies are a revolutionary militia group in which award-winning survival game?",

        answers: {
            a: "Uncharted",
            b: "The Last of Us",
            c: "Far Cry",
            d: "Fallout 4",
        },
        correctAnswer: "b"
      },
      {
        question: "The German Shepherd who acts as your companion in 'Fallout 4' is named:",

        answers: {
            a: "Scruff",
            b: "DogMeat",
            c: "Rex",
            d: "Doggo",
        },
        correctAnswer: "b"
      }
    ];
  
    function showQuiz() {
      const output = [];
      roundNumber = 0; 
      $(".timer").show(); 
      timer.start();

      quizQuestions.forEach((currentQuestion, questionNumber) => {
        const answers = [];
            for (letter in currentQuestion.answers) {
          
                answers.push(
                    `<label>
                        <input type="radio" name="question${questionNumber}" class="custom-control-inline" value="${letter}">
                        ${letter} :
                            ${currentQuestion.answers[letter]}
                    </label>`
          );
        };
  
        output.push(
          `<div class="slide">
             <div class="question"> ${currentQuestion.question} </div>
             <div class="answers"> ${answers.join("")} </div>
           </div>`
        );
      });
  
      quizContainer.innerHTML = output.join("");
    };
  


    var timer = {
        timeLeft: time,

        start: function() {
            if(!timerOn) {
                intervalId = setInterval(timer.count, 1000);
                timerOn = true;
            }
        },

        stop: function() {
            clearInterval(intervalId);
            timerOn = false;
            timer.timeLeft = time;
        },

        count: function() {
            timer.timeLeft--;
            $(".timer").text(timer.timeLeft);
                if(timer.timeLeft === 0) {
                    timeUp = true;
                    timer.stop();
                        noMoreTime();
                } 
                
        }
    };

    function showResults() {
      timer.stop();
      timeUp = true;
      $(".timer").hide();

      const answerContainers = quizContainer.querySelectorAll(".answers");
      let numCorrect = 0;
  
      quizQuestions.forEach((currentQuestion, questionNumber) => {
        
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;
  
        
        if (userAnswer === currentQuestion.correctAnswer) {
          numCorrect++;
          answerContainers[questionNumber].style.color = "lightgreen";
        } else {
          answerContainers[questionNumber].style.color = "red";
        }
      });
  
      resultsContainer.innerHTML = `${numCorrect} out of ${quizQuestions.length}`;
    }
  
    function showSlide(n) {
      slides[currentSlide].classList.remove("active-slide");
      slides[n].classList.add("active-slide");
      currentSlide = n;
      
      if (currentSlide === 0) {
        previousButton.style.display = "none";
      } else {
        previousButton.style.display = "inline-block";
      }
      
      if (currentSlide === slides.length - 1) {
        nextButton.style.display = "none";
        submitButton.style.display = "inline-block";
      } else {
        nextButton.style.display = "inline-block";
        submitButton.style.display = "none";
      }
    }
  
    function showNextSlide() {
      timer.stop();
      showSlide(currentSlide + 1);
      timer.start();
    }
  
    function showPreviousSlide() {
      showSlide(currentSlide - 1);
    }

    function noMoreTime() {
        if(currentSlide === slides.length - 1) {
            showResults();
        }else {
            showNextSlide();
        }
    };
  
   
    showQuiz();
  
    const previousButton = document.getElementById("previous");
    const nextButton = document.getElementById("next");
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;
  
    showSlide(0);


  

    submitButton.addEventListener("click", showResults);
    previousButton.addEventListener("click", showPreviousSlide);
    nextButton.addEventListener("click", showNextSlide);
  })
  
  