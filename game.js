//Preload game files in memory//
var gamePattern = [];
var userClickedPattern = [];
var startFlag = false;
var result = false;
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var red = new Audio("sounds/red.mp3");
var blue = new Audio("sounds/blue.mp3");
var green = new Audio("sounds/green.mp3");
var yellow = new Audio("sounds/yellow.mp3");
var wrong = new Audio("sounds/wrong.mp3");
var gameSounds = [red, blue, green, yellow, wrong];

//Core Game Function//

function nextSequence() {
  level++;
  $("h1").text("Level " + level);
  var randomNumber = Math.round(Math.random() * 3);
  var randomChosenSound = gameSounds[randomNumber];
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(200).fadeIn(200);
  playSound(randomChosenColour);
}

function checkAnswer() {
  var answer = userClickedPattern.slice(-1)[0];
  var key = gamePattern[userClickedPattern.length-1];
  if (answer !== key) {
    result = "fail";
  } else if (answer === key) {
    if (userClickedPattern.length === gamePattern.length) {
      var result = "success";
    }
  }
  console.log(result);
  return result;
};

function startOver() {
  startFlag = false;
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
}

//User Interface Function//
$(".btn").on('click touch', function(event) {
  var userChosenColour = event.target.id;
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  playSound(userChosenColour);
  var result = checkAnswer();
  if (result === "success") {
    setTimeout(function() {
      nextSequence();
    },1000);
    userClickedPattern = [];
  } else if (result === "fail") {
    $(".btn").fadeOut(200).fadeIn(200);
    wrong.play();
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    },200);
    $("h1").text("Game Over :(, Press to Restart")
    startOver();
  }
});


$("h1").on('click touch', function(event) {
  while (startFlag === false) {
    startFlag = true;
    nextSequence();
    console.log(event.key);
    console.log(startFlag);
  }
});

//Operating Functions//
function playSound(name) {
  switch (name) {
    case "red":
      gameSounds[0].play();
      break;
    case "blue":
      gameSounds[1].play();
      break;
    case "green":
      gameSounds[2].play();
      break;
    case "yellow":
      gameSounds[3].play();
      break;
    default:
      gameSounds[4].play();
  }
}

function animatePress(currentColour) {
  $(".btn." + currentColour).addClass("pressed");
  setTimeout(function() {
    $(".btn." + currentColour).removeClass("pressed");
  }, 300);
}
