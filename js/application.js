document.addEventListener("DOMContentLoaded", function (e) {
  createOnStartUp();
})

// variable initialized
let a = document.getElementById("answer");
let c = document.getElementById("operators-container");
let q = document.getElementById("question");
let $limitRangeSlider = $('#number-limit-range');
let over_img = document.getElementById("game-over-img");
let limitCounter = document.getElementById("number-limit")
let numberLimit = document.getElementById('number-limit-range').value;
const startButton = document.getElementById("start");
const restartButton = document.getElementById("restart");
const hideTimer = document.getElementById("hide_timer");
const hide_game_option = document.getElementById("hide_game_option");
const message = document.getElementById("message");

////////// state variable  //////////////
let correctAnswer;
let correctAnswerCount = 0;
let wrongAnswerCount = 0;
let timer = 10;
let score = 0;
let timeLeft = 1.5; //angle for around timer circle

const createOnStartUp = () => {
  a.classList.add("hidden");
  q.classList.add("hidden");
  restartButton.classList.add("hidden");
  over_img.classList.add("hidden");
  hideTimer.classList.add("hidden");
  a.onchange = checkAnswer;
  startButton.onclick = () => {
    startTimer();
    startNewGame();
  };
  restartButton.onclick = () => {
    location.reload();
  };
}

const startTimer = () => {
  let intervalID = setInterval(() => {
    timer -= 1;
    timeLeft -= 0.2;
    document.getElementById('timer').innerHTML = timer;
    if (timer <= 0) {
      clearInterval(intervalID);
      restartButton.classList.remove('hidden');
      a.classList.add("hidden");
      message.classList.add("hidden");
      over_img.classList.remove("hidden");
      gameOver();
    }
  }, 1500);
}

const startNewGame = () => {
  c.classList.add("hidden");
  q.classList.remove("hidden");
  a.classList.remove("hidden");
  hideTimer.classList.remove("hidden");
  startButton.classList.add("hidden");
  hide_game_option.classList.add("hidden");
  const operations = selectedOperations();
  let n1 = Math.floor((Math.random() * numberLimit) + 1);
  let n2 = Math.floor((Math.random() * numberLimit) + 1);
  const checkedArr = _.without(operations, false); //removing all false values
  let i;
  let operation;
  if (checkedArr.length === 0) { //make sure there is at least one true value in the array
    //if no operaton selecred random operation will be selected by default
    operations[Math.floor(Math.random() * 4)] = true;
  }
  while (true) {
    i = Math.floor(Math.random() * 4);
    if (operations[i]) {
      break;
    }
  }

  switch (i) {
    case 0:
      correctAnswer = n1 + n2;
      operation = "+";
      break;
    case 1:
      correctAnswer = n1 - n2;
      operation = "-";
      break;
    case 2:
      correctAnswer = n1 * n2;
      operation = "*";
      break;
    case 3:
      do { //even numbers only
        n1 = Math.floor((Math.random() * numberLimit / 2) + 1) * 2;
        n2 = Math.floor((Math.random() * numberLimit / 2) + 1) * 2;

      } while (n1 % n2 !== 0);
      if (n1 < n2) {
        [n1, n2] = [n2, n1]; //swapping values so that n1 = n2, n2 = n1
      }
      operation = "/";
      correctAnswer = n1 / n2;
      break;
  }
  q.innerHTML = `Solve: ${n1} ${operation} ${n2}`;
}

const gameOver = () => {
  q.innerHTML = `Your Score: ${score} <br> <span class="correct">C</span>/<span class="wrong">W</span>:
                <span class="correct">${correctAnswerCount}</span>/<span class="wrong">${wrongAnswerCount}<span>`;
}

const selectedOperations = () => {
  const addition = document.getElementById('addition').checked;
  const substraction = document.getElementById('substraction').checked;
  const multiplication = document.getElementById('multiplication').checked;
  const division = document.getElementById('division').checked;
  const operationsArr = [addition, substraction, multiplication, division];
  return operationsArr;
}

const checkAnswer = () => {
  if (timer > 0 && correctAnswer === parseInt(a.value)) {
    a.value = '';
    message.innerHTML = "";
    timer += 1;
    score += 10;
    timeLeft += 0.2;
    correctAnswerCount++;
    if (correctAnswerCount % 5 == 0) {
      increaseLimitRangeSlider();
    }
    startNewGame();
  } else {
    message.innerHTML = "Wrong answer, please try again";
    a.value = '';
    wrongAnswerCount++;
  }
}

const increaseLimitRangeSlider = () => {
  var delta = 10;
  $limitRangeSlider.val(parseInt($limitRangeSlider.val(), 10) + delta);
  limitCounter.innerHTML = parseInt(limitCounter.innerHTML) + 10;
  numberLimit = parseInt(numberLimit) + 10;
  if (numberLimit > 100) {
    numberLimit = 100;
  }
}