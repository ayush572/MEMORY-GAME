var gamepatt = [];
var userpatt = [];
buttonColor = ["red", "blue", "green", "yellow"];
var started = false;
var level = 0;
var i = 0;

function start()
{
    $("#level-title").text("Press the button to restart the game");
    $("#level-title").after("<button type='button' class='btn btn-dark'>start</button>");
    i=0;
    gamepatt = [];
    userpatt = [];
    started=false;
    level=0;
    $(".btn-dark").click(function () {
        if (started === false) {
            $(".instruct").remove();
            $(".btn-dark").remove();
            $("#level-title").text("Level " + level);
            setTimeout(function(){seq()},1000);
            started = true;
        }
    });
}
$(".container").hide();
$(".btn-dark").click(function () {
    if (started === false) {
        $(".instruct").remove();
        $(".btn-dark").remove();
        $(".container").show();
        $("#level-title").text("Level " + level);
        setTimeout(function(){seq()},1000);
        started = true;
    }
});

$(".button").click(function () {
    playsound(this.id);
    addAnimate(this.id);
    handler(this.id);
});


function seq() {
    $("#level-title").html("Level " + level);
    var k = Math.floor(Math.random() * 4);
    randomcolor = buttonColor[k];
    gamepatt.push(randomcolor);
    playsound(randomcolor);
    $("." + randomcolor).fadeOut(50);
    $("." + randomcolor).fadeIn(0.5);
    level++;
}
function handler(event) {
    userpatt.push(event);
    chkans(userpatt[i]);
}
function playsound(event1) {
    var audio1 = new Audio("./sounds/" + event1 + ".mp3");
    audio1.play();
}
function addAnimate(event2) {
    $("." + event2).addClass("pressed");
    setTimeout(function () {
        $("." + event2).removeClass("pressed");
    }, 100);
}
function chkans(currlvl) {
    if (currlvl === gamepatt[i]) {
        i++;
        if (userpatt.length === gamepatt.length) {
            
            i=0;
            userpatt = [];
            setTimeout(function () {
                seq()
            }, 1000);
        }
    }
    else if(currlvl != gamepatt[i])
  {
    var wrong=new Audio("./sounds/wrong.mp3");
    wrong.play();
    $("body").addClass("game-over");
    $("#level-title").text("GAME OVER! 😬")
    setTimeout(function(){$("body").removeClass("game-over")},400);
    setTimeout(function(){start()},1000);
}
}