var buttoncolors = ["red", "blue", "green", "yellow"]
var gamePattern = []
var userClickedPattern = []
var level=0

function nextsequence() {
  ++level
  $("#level-title").text("Level " + level);
  var randomnumber = (Math.floor(Math.random() * 4))
  var randomChosenColour = buttoncolors[randomnumber]
  gamePattern.push(randomChosenColour)
  var randomChosenColourid = "#" + randomChosenColour
  $(randomChosenColourid).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour)
}

$(".btn").click(function() {
  var userChosenColour = this.id
  userClickedPattern.push(userChosenColour)
  playSound(userChosenColour)
  animatePress(userChosenColour)
  var indexOfLast=(userClickedPattern.length)-1
  checkAnswer(indexOfLast)
})

function playSound(randomChosenColour) {
  var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("." + currentColour).addClass("pressed").delay(100).queue(function(next) {
    $(this).removeClass("pressed");
    next();
  });
}

$("body").one("keypress",(function(){
  $("#level-title").text("Level " + level);
  nextsequence()
}))


function  checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel]==gamePattern[currentLevel]){
    console.log(gamePattern)
    console.log(userClickedPattern)
    console.log("Correct")
    if(currentLevel==(gamePattern.length-1)){
      userClickedPattern=[]
      setTimeout(nextsequence, 2000)
    }
  }
  else{
    console.log("Wrong")
    userClickedPattern=[]
    gamePattern=[]
    console.log(gamePattern)
    console.log(userClickedPattern)
    level=0
    $("#level-title").text("Game over");
    setTimeout(nextsequence, 2000)
  }
}
