

$(document).ready(function() {

    const quizContainer = document.getElementById("quiz");
    const resultsContainer = document.getElementById("results");
    const submitButton = document.getElementById("submit");
    var time = 15;
    var timerOn = false;
    var gameOver = false;
    var intervalId;    
    var currentSlide = 0;
  
    const quizQuestions = [
      {
        question: "In DONTNOD's 'Life is Strange', Max discovers she has the power to:",

        answers: {
            a: "travel through photographs",
            b: "read minds",
            c: "rewind time",
            d: "predict the lottery",
        },
        img: "assets/images/chloe.gif",
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
        img: "assets/images/firefly.jpg",
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
        img: "assets/images/dogmeat.gif",
        correctAnswer: "b"
      },
      {
        question: "Skooma is a drug that can be obtained in which role-playing series?",

        answers: {
            a: "The Legend of Zelda",
            b: "The Elder Scrolls",
            c: "Diablo",
            d: "Grand Theft Auto",
        },
        img: "assets/images/skooma.gif",
        correctAnswer: "b",
      },
      {
        question: "'Heavy Rain' follows four protagonists involved with the mystery of which serial killer?",

        answers: {
            a: "The Sandman",
            b: "The Rainmaker",
            c: "The Origami Killer",
            d: "Mr. Sleep",
        },
        img: "assets/images/heavyRain.gif",
        correctAnswer: "c",
      },
      {
        question: "Which Legend of Zelda game was the first to use voice acting during cutscenes?",

        answers: {
            a: "Windwaker",
            b: "Majora's Mask",
            c: "Link to the Past",
            d: "Breath of the Wild",
        },
        img: "assets/images/wwLink.gif",
        correctAnswer: "d",
      },
      {
        question: "Monokuma is a homicidal stuffed bear in which whodunit series?",

        answers: {
            a: "Clue",
            b: "Danganronpa",
            c: "LA Noire",
            d: "Ace Attorney: Phoenix Wright",
        },
        img: "assets/images/mono.gif",
        correctAnswer: "b",
      },
      {
        question: "Which GTA game is based on Los Angeles?",

        answers: {
            a: "GTA V",
            b: "GTA: Vice City",
            c: "GTA III",
            d: "GTA IV",
        },
        img: "assets/images/gta.gif",
        correctAnswer: "a",
      },
      {
        question: "In which game does eating lizard tails increase your stamina?",

        answers: {
            a: "Spyro",
            b: "Outlast",
            c: "Dishonored",
            d: "Shadow of the Colossus",
        },
        img: "assets/images/control.gif",
        correctAnswer: "d",
      },
      {
        question: "Which non-horror game received praise for its horror themed level, 'Robbing the Cradle'?",

        answers: {
            a: "Thief: Deadly Shadows",
            b: "Dishonored 2",
            c: "Uncharted 4",
            d: "Persona 4",
        },
        img: "assets/images/hall.gif",
        correctAnswer: "a",
      },
      {
        question: "In which game do you play a young circus runaway, determined to sneak into a summer camp for children with psychic abilities?",

        answers: {
            a: "Suikoden IV",
            b: "Psychonauts",
            c: "Bully",
            d: "Grim Fandango",
        },
        img: "assets/images/jump.gif",
        correctAnswer: "b",
      },
      {
        question: "Rainbow Road is a course in which popular racing series?",

        answers: {
            a: "Gran Turismo",
            b: "Twisted Metal",
            c: "Mario Kart",
            d: "X Motor Racing",
        },
        img: "assets/images/car.gif",
        correctAnswer: "c",
      },
      {
        question: "In the psychological horror game, 'Soma', the protagonist discovers he is a what?",

        answers: {
            a: "Zombie",
            b: "Fish",
            c: "God",
            d: "Robot",
        },
        img: "assets/images/soma.gif",
        correctAnswer: "d",
      },
      {
        question: "This game was heavily influenced by the television show 'Twin Peaks",

        answers: {
            a: "Deadly Premonition",
            b: "Outlast",
            c: "Stardew Valley",
            d: "Indigo Prophecy",
        },
        img: "assets/images/coffee.gif",
        correctAnswer: "a",
      },
      {
        question: "In which SNES game did you race as a unicycle?",

        answers: {
            a: "Universe Racers",
            b: "Rock n Roll Racing",
            c: "Uniracers",
            d: "Stunt Race FX",
        },
        img: "assets/images/hockey.gif",
        correctAnswer: "c",
      },
      {
        question: "'Until Dawn' features which supernatural creature?",

        answers: {
            a: "Werewolf",
            b: "Vampire",
            c: "Ghost",
            d: "Wendigo",
        },
        img: "assets/images/door.gif",
        correctAnswer: "d",
      },

      ];

    
  
    function showQuiz() {
      const output = [];
      gameOver = false;
      numCorrect = 0;
      $("#restart").hide();
      $("#previous").hide();  
      timer.start();
      $(".timer").show();
      

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
                 <img class="qImage" src=${currentQuestion.img} />
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
      gameOver = true;
      timer.stop();
      timeUp = true;
      $(".timer").hide();
      $("#previous").show();
      $("#submit").hide();
      $("#restart").show();
      $("#results").show();

     
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
      
      
     if (gameOver === true && currentSlide !== 0) {
        previousButton.style.display = "inline-block";
      } else  {
         previousButton.style.display = "none";
      };

      if (currentSlide === slides.length - 1 && gameOver === false) {
        nextButton.style.display = "none";
        submitButton.style.display = "inline-block";
      } else {
        nextButton.style.display = "inline-block";
        submitButton.style.display = "none";
      }

      if(gameOver === true && currentSlide === slides.length -1) {
        nextButton.style.display = "none";
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

    function resetBtns() {
      var radioBtn = document.getElementsByClassName("custom-control-inline");
        for (var i = 0; i < radioBtn.length; i++) {
          var btn = radioBtn[i];
          btn.checked = false;
        }
    };
  
    function restart() {

      $("#restart").hide();
      $("#results").hide();
      timeUp = false;
      gameOver = false;
      numCorrect = 0;
      $(".answers").css("color", "black");
      resetBtns();
      timer.start();
      $(".timer").show();
      showSlide(0);

    }
   
    showQuiz();
  
    const previousButton = document.getElementById("previous");
    const nextButton = document.getElementById("next");
    const restartButton = document.getElementById("restart");
    const slides = document.querySelectorAll(".slide");

  
    showSlide(0);


  
    restartButton.addEventListener("click", restart);
    submitButton.addEventListener("click", showResults);
    previousButton.addEventListener("click", showPreviousSlide);
    nextButton.addEventListener("click", showNextSlide);
  })
  
  