import {saveScore, getScoreList} from "./save.js";
import {Personnage} from "./personnage.js";

window.onload = init;

var canvas;

var startButton;
var saveScoreDiv;
var saveScoreDivButton;
var scoreScreenDiv;
var scoreScreenButton;

var sol = 0;
var perso;
var ctx;


var t1 = 1;
var delta = 1;
var gravite = 9.8;
var score = 0;

function init(){
  console.log("Page chargée");

  //Resize canvas to fullscreen
  canvas = document.querySelector("#myCanvas");

  ctx = canvas.getContext("2d");
  sol = (canvas.clientHeight/20);

  //Creation du personnage
  perso = new Personnage(30, (canvas.clientHeight - sol),20,20,"blue",ctx);


  //Bind button to action
  startButton = document.querySelector("#startButton");
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


  updateCanvas();

}

function updateCanvas(timestamp){
  //Get time delta
  if(timestamp!=undefined){
    delta = timestamp-t1;
    t1 = timestamp;
  }

  // 1 - Clear
  ctx.clearRect(0,0, canvas.width, canvas.height);

  // Affichage FPS
  drawFps(delta);

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

function drawFps(delta){
  let fps = 1000/delta;
  let ctx = canvas.getContext("2d");
  ctx.save();
  ctx.font = "12px Arial";
  ctx.fillStyle = "red";
  ctx.fillText(fps, 10, 20);
  ctx.restore();
}