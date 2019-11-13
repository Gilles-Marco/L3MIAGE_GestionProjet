import {saveScore, getScoreList} from "./save.js";
import { PlatformGenerator } from "./platform/plateformGenerator.js";

window.onload = init;


//GUI variable
var canvas;
var ctx;

var startButton;
var saveScoreDiv;
var saveScoreDivButton;
var scoreScreenDiv;
var scoreScreenButton;

//Game variable
var score = 0;
var t1 = null;

//Init game world variable
var platformArray = [];
var arrowArray = [];

//Player variable
var player;

//Constante sur la taille des plateformes
const platformWidth = 120;
const platformHeight = 30;
var platformGenerator;

function init(){
  //Resize canvas to fullscreen
  canvas = document.querySelector("#myCanvas");
  ctx = canvas.getContext("2d");

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

  //Générateur de platform
  platformGenerator = new PlatformGenerator(20, platformWidth, platformHeight, 50, 5, platformArray, canvas, ctx);
  updateCanvas();
}

function updateCanvas(timestamp){
  //Main function loop
  //Redraw the background
  ctx.save();
  ctx.fillStyle="lightgrey";
  ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
  ctx.restore();

  //Get time delta
  let delta = 1;
  if(t1==null){
    t1 = timestamp;
  }
  else{
    delta = timestamp-t1;
    t1 = timestamp;
  }
  drawFps(delta);

  //Generation des plateformes
  platformGenerator.generate();
  console.log(platformArray);
  console.log(`${platformGenerator.cursor} ${platformGenerator.cursorjump}`);
  //Draw Platform
  platformArray.forEach((item, index)=>{
    item.draw();
  });

  requestAnimationFrame(updateCanvas);
}

function startGame(){
  //Onclick of the startbutton, launch the game
  startButton.style.visibility = "hidden";
  // displaySaveScore();

  requestAnimationFrame(updateCanvas);
}

function displaySaveScore(){
  saveScoreDiv.style.visibility = "visible";
}

function handlerSaveScore(){
  //Onclick of "save" button for score, then print the score
  let pseudo = document.querySelector("#saveScore input[type=\"text\"]");
  console.log(pseudo.value);
  
  if(pseudo.value!=""){
    saveScoreDiv.style.visibility = "hidden";
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

function drawFps(delta){
  let fps = 1000/delta;
  fps = Math.round(fps);
  ctx.save();
  ctx.font = "12px Arial";
  ctx.fillStyle = "red";
  ctx.fillText(fps, 10, 20);
  ctx.restore();
}