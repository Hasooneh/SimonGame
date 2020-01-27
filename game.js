var gamePattern = [];
var userClickPattern = [];
var colors = ["red", "green", "yellow", "blue"]
var level = 0;

/*When this function is called it picks a random color from the colors array
and adds it to the game pattern. The butons fade in and out so that the user can
see which button was picked it also resets the userClickPattern every level
this function is called every level assuming the user is successful and it will
add an extra value to the game pattern array making it longer and more complex */
function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomButton = colors[randomNumber];
  gamePattern.push(randomButton);
  $("#" + randomButton).fadeOut(250).fadeIn(250);
  playSound(randomButton);
  $("h1").text("level " + level);
  level += 1;
  userClickPattern = [];
}
/*The button that the user clicks will be saved to the userClickPattern array
and then a check will be performed by calling the checKAnswer function*/
$("div.btn").click(function() {
  var buttonClicked = $(this).attr("id");
  userClickPattern.push(buttonClicked);
  playSound(buttonClicked);
  animatePress(buttonClicked);
  checKAnswer(userClickPattern.length - 1);
})
/*Checks if the button click matches the pattern of the game by comparing every
array value against one another. it starts at 0 and if thats true
then it will check if the two arrays are equal length if not nothing happens
and the user needs to click more buttons until the two arrays are the same length
if at any point he clicks the wrong button the if statement will be false
and the else statement will get triggered resetting the game to the start.
If the button clicked sequence matches the game pattern then it will go the next level
by calling the nextSequence function*/
function checKAnswer(level) {
  if (userClickPattern[level] == gamePattern[level]) {

    if (userClickPattern.length == gamePattern.length) {
      nextSequence();
    }
  } else {
    setTimeout(function(){$("h1").text("Game over press any key to restart")},250)
    $("body").addClass("game-over");
    setTimeout(function(){$("body").removeClass("game-over");},1000)
    gamePattern = [];
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();

  }
}
/*Starts the game by pressing any key this will only trigger if the h1
title is the set value which is only that at the start of the game*/
$("html").keydown(function() {
  if ($("h1").text() == "Press A Key to Start" || $("h1").text()=="Game over press any key to restart") {
    level = 0;
    nextSequence();
  }
})
/* Creates an animation effect by adding a css class to the button clicked
and removing the class after a delay using setTimeout.*/
function animatePress(button) {
  $("#" + button).addClass("pressed");
  setTimeout(function() {
    $("#" + button).removeClass("pressed")
  }, 100);
}
/*function playSound takes an argument "button" that gets placed into the switch function
if our argument matches a case itll play the corresponding sound */
function playSound(button) {
  switch (button) {
    case "red":
      var audio = new Audio("sounds/red.mp3");
      audio.play();
      break;
    case "blue":
      var audio = new Audio("sounds/blue.mp3");
      audio.play();
      break;
    case "yellow":
      var audio = new Audio("sounds/yellow.mp3");
      audio.play();
      break;
    case "green":
      var audio = new Audio("sounds/green.mp3");
      audio.play();
      break;

  }
}
