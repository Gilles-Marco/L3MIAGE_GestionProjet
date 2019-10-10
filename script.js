import {saveScore, getScoreList} from "./save.js";

window.onload = init;

var canvas;

var startButton;
var saveScoreDiv;
var saveScoreDivButton;
var scoreScreenDiv;
var scoreScreenButton;

var score = 0;

function init(){
  //Resize canvas to fullscreen
  canvas = document.querySelector("#myCanvas");

  //Bind button to action
  startButton = document.querySelector("#startButton");
  startButton.onclick = startGame;
  
  saveScoreDiv = document.querySelector("#saveScore");
  saveScoreDiv.style.visibility = "hidden";
  saveScoreDivButton = document.querySelector("#saveScore input[type=\"submit\"]");
  saveScoreDivButton.onclick = handlerSaveScore;

  scoreScreenDiv = document.querySelector("#scoreScreen");
  scoreScreenDiv.style.visibility = "hidden";
  scoreScreenButton = document.querySelector("#scoreScreen button");
  scoreScreenButton.onclick = newGame;
  //display the original frame

}

function updateCanvas(){
  
  requestAnimationFrame(updateCanvas);
}

function startGame(){
  //Onclick of the startbutton, launch the game
  startButton.style.visibility = "hidden";
  displaySaveScore();

  //requestAnimationFrame(updateCanvas);
}

function displaySaveScore(){
  saveScoreDiv.style.visibility = "visible";
}

function handlerSaveScore(){
  //Onclick of "save" button for score, then print the score
  let pseudo = document.querySelector("#saveScore input[type=\"text\"]");
  console.log(pseudo.value);
  saveScoreDiv.style.visibility = "hidden";

  if(pseudo.value!=""){
    saveScore(pseudo.value, score);
    pseudo.value = "";
    score = 0;
    printScore();
  }
}

function printScore(){
  //Print the score stored in the localStorage
  let score = getScoreList();
  let scoreList = document.querySelector("#scoreList");
  scoreList.innerHTML = "";
  for(let i=0;i<score.length;i++)
    scoreList.innerHTML += score[i]+"<br>";
  scoreScreenDiv.style.visibility = "visible";
}

function newGame(){
  //lead the player to the "Start" screen
  scoreScreenDiv.style.visibility = "hidden";
  startButton.style.visibility = "visible";
}