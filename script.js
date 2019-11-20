import {saveScore, getScoreList} from "./save.js";
import { PlatformGenerator } from "./platform/plateformGenerator.js";
import { Platform } from "./platform/plateforme.js";
import { Ennemy } from "./ennemy/ennemy.js";
import { EnnemyGenerator } from "./ennemy/ennemyGenerator.js";
import {Personnage} from "./personnage.js";

window.onload = init;

//DEBUG Variable
const DEBUG = true;

//Game physics
const gravite = 9.8;

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
var ennemyArray = [];

//Player variable
var player;
var sol = 0;
var perso;
var ctx;

//Constante sur la taille des plateformes
const platformWidth = 120;
const platformHeight = 30;
var platformGenerator;

//Ennemy variable
var ennemyGenerator;

var t1 = 1;
var delta = 1;
var score = 0;

function init(){
  console.log("Page chargée");

  //Resize canvas to fullscreen
  canvas = document.querySelector("#myCanvas");
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;

  ctx = canvas.getContext("2d");
  sol = (canvas.clientHeight/20);

  //Creation du personnage
  perso = new Personnage(30, (canvas.clientHeight - sol),20,20,"blue",ctx);


  //Bind button to action
  startButton = document.querySelector("#startButton");
  if(DEBUG)
    startButton.style.visibility = "hidden";
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


  //Listener pour le déplacement
  window.addEventListener('keydown',function(event){
    if(event.keyCode === 39 ){
      perso.dx += 1  
      this.console.log("Le perso avance à droite");
    }
    if(event.keyCode === 37 ){
      perso.dx -= 1 ;
      this.console.log("Le perso avance à gauche");
    }
    if(event.keyCode === 38 && perso.dy>=0){
      perso.dy -= 10;
      console.log(perso.dy);
    }
  });


  window.addEventListener('keyup',function(event){
    if(event.keyCode === 39){
      perso.dx = 0;

       this.console.log("Le perso avance à droite");
    }
    if(event.keyCode === 37){
      perso.dx = 0; 

      this.console.log("Le perso avance à gauche");
    }


  });

  //Générateur de platform
  platformGenerator = new PlatformGenerator(20, platformWidth, platformHeight, 50, 5, platformArray, canvas, ctx);
  //Générateur d'ennemis
  ennemyGenerator = new EnnemyGenerator(250, ennemyArray, 0, 10, ctx);
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
  if(timestamp!=undefined){
    delta = timestamp-t1;
    t1 = timestamp;
  }

  // Affichage FPS
  drawFps(delta);
  
  //Generation des plateformes
  platformGenerator.generate();
  //Generation des ennemys
  ennemyGenerator.generate();
  //Draw Platform
  platformArray.forEach((item, index)=>{
    item.draw();
  });
  //Draw des ennemys
  ennemyArray.forEach((item, index)=>{
    //Collision TODO
    //Gravite TODO
    item.update();
    item.draw();
  });

  // 2 - Test des collision du joueur
  playerCollision();

  // 3 - Deplacement personnage
  perso.deplacePersonnage();
 
  
   // 4 - Draw
  perso.drawPersonnage();
  
  // 5 - Animation
  requestAnimationFrame(updateCanvas);
}

function playerCollision(){
  perso.dy += gravite*delta/1000;
  if(perso.y > (canvas.height - sol) && perso.dy>0){
    perso.y = canvas.height - sol;
    perso.dy = 0;
  }
 if(perso.x >= (canvas.width -20)&& perso.dx>0){
    perso.dx = 0;
  
  }
}


function startGame(){
  //Onclick of the startbutton, launch the game
  startButton.style.visibility = "hidden";
  //displaySaveScore();

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
