import {saveScore, getScoreList} from "./save.js";
import { PlatformGenerator } from "./platform/plateformGenerator.js";
import { Platform } from "./platform/plateforme.js";
import { Ennemy } from "./ennemy/ennemy.js";
import { EnnemyGenerator } from "./ennemy/ennemyGenerator.js";
import {Personnage} from "./personnage.js";
import {Arc} from "./arc.js";
import {Arrow} from "./arrow/arrow.js";



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
var delta = 1;
var t1 = null;
var cameraSpeed = 50;
var cameraIncrement = 0.10;

//Init game world variable
var platformArray = [];
var arrowArray = [];
var ennemyArray = [];

//Player variable
var sol = 0;
var perso;
const persoWidth = 30;
const persoHeight = 50;
const persoDXMAX = 400;
var  arc;
var deplacementDroite = false;
var deplacementGauche = false;

//Constante sur la taille des plateformes
const platformWidth = 120;
const platformHeight = 30;
var platformGenerator;


//Ennemy variable
var ennemyGenerator;
const ennemyWidth = 30;
const ennemyHeight = 50;

function init(){
  console.log("Page chargée");

  //Resize canvas to fullscreen
  canvas = document.querySelector("#myCanvas");
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;

  ctx = canvas.getContext("2d");
  sol = canvas.height-canvas.clientHeight/20;

  //Creation du personnage
  perso = new Personnage(30, sol-persoHeight, persoWidth, persoHeight, persoDXMAX, "blue", ctx);
  arc = new Arc(perso.brasX+10,perso.brasY,ctx, perso.dx,perso.dy);

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

  //Listener pour le déplacement
  window.addEventListener('keydown',function(event){
    if(event.keyCode === 39 ){
      deplacementDroite = true;
    }
    if(event.keyCode === 37 ){
      deplacementGauche = true;
    }
    if(event.keyCode === 38 && perso.dy>=0){
      perso.dy -= 500;
    }

    if(event.keyCode === 32){
      arc.puissance +=0.1;
    }
  });

  window.addEventListener('keyup',function(event){
    if(event.keyCode === 39){
      deplacementDroite = false;
    }
    if(event.keyCode === 37){
      deplacementGauche = false;
    }

    if(event.keyCode === 32 ){
      arrowArray.push(new Arrow(arc.x,arc.y,ctx,arc.puissance));
      this.console.log("Espace a été relaché, puissance : " + arc.puissance);
      arc.puissance =4;
    }
  });
  



  //Timer pour faire accélérer la caméra

  //Générateur de platform
  platformGenerator = new PlatformGenerator(20, platformWidth, platformHeight, 200, 10, platformArray, sol, canvas, ctx);
  //Générateur d'ennemis
  ennemyGenerator = new EnnemyGenerator(150, ennemyWidth, ennemyHeight, ennemyArray, canvas.width/2, 10, canvas, ctx);
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

  moveCamera(delta);
  
  //Nettoyage des plateformes inutiles dans platformArray TODO
  //Nettoyage des ennemis inuiles dans ennemyArray TODO
  //Nettoyage des flèches inutiles dans arrowArray TODO

  //Generation des plateformes
  platformGenerator.generate();
  //Generation des ennemys
  if(platformGenerator.cursor>=canvas.width*0.80)
    ennemyGenerator.generate();
  //Draw Platform
  platformArray.forEach((item, index)=>{
    item.draw();
    if(DEBUG){
      ctx.save();
      ctx.fillStyle = "red";
      ctx.fillText(index, item.x+item.width/2, item.y+item.height/2);
      ctx.restore();
    }
  });
  //Draw des ennemys
  ennemyArray.forEach((item, index)=>{
    //Gravite
    item.vy += gravite*(delta/1000);
    //Collision
    let platformCollide = ennemyCollision(item, platformArray);
    if(platformCollide!=null){ //Collision avec une plateforme
      item.vy = 0;
      item.y = platformCollide.y-item.height;
    }
    else if(item.y >= sol-item.height){ //Collision avec le sol
      item.vy = 0;
      item.y = sol-item.height;
    }
    else;

    item.update();
    item.draw();
    if(DEBUG){
      ctx.save();
      ctx.fillStyle = "red";
      ctx.fillText(index, item.x+item.width/3, item.y+item.height/2);
      ctx.restore();
    }
  });

  playerDeplacement();
  playerCollision();
  playerPlatform(platformArray);
  perso.deplacePersonnage(delta);
  perso.drawPersonnage();

  //Draw du sol
  ctx.save();
  ctx.strokeStyle = "black";
  ctx.beginPath();
  ctx.moveTo(0, sol);
  ctx.lineTo(canvas.width, sol);
  ctx.stroke();
  ctx.restore();

  requestAnimationFrame(updateCanvas);
}

function playerDeplacement(){
  //Pour éviter que le personnage se fasse ejecter par la vitesse de la caméra à "haut niveau"
  perso.DXMAX = persoDXMAX+cameraSpeed;
  if(deplacementDroite)
    perso.dx += 50+cameraSpeed;
  else if(deplacementGauche)
    perso.dx -= 50+cameraSpeed;
  else
    perso.dx = 0;
}

function playerCollision(){
  perso.dy += gravite;
  if(perso.y+perso.height > (sol) && perso.dy>0){
    perso.y = sol-perso.height;
    perso.dy = 0;
  }
  if(perso.x >= (canvas.width -20)&& perso.dx>0){
    perso.dx = 0;
  }
}

function playerPlatform(platformArray){
  //Taille du perso = y+20
  let persoFeet = perso.y+perso.height;
  let persoMiddle = perso.x;
  let persoRadius = perso.width/2;

  for(let i=0;i<platformArray.length;i++){
    let platformRadius = platformArray[i].width/2;
    let platformMiddle = platformArray[i].x+platformRadius;
    
    let distanceBetween = Math.abs(persoMiddle-platformMiddle);
    let totalRadius = persoRadius+platformRadius;
    if(totalRadius>=distanceBetween && perso.dy>0){ //Platform interessante
      if(persoFeet>platformArray[i].y && persoFeet<platformArray[i].y+platformArray[i].height){
        perso.dy = 0;
        perso.y = platformArray[i].y-perso.height;
        return platformArray[i];
      }
    }
  }
  return null;
}

function ennemyCollision(ennemy, arrayPlateform){
  //Feet ennemy
  let feetY = ennemy.y+ennemy.height;
  let feetRadius = ennemy.width/2.5;
  let feetMiddle = ennemy.x;

  for(let i=0;i<arrayPlateform.length;i++){
    //Check le X si la plateforme est "interessante"
    let platformRadius = arrayPlateform[i].width/2;
    let platformMiddle = arrayPlateform[i].x+platformRadius;

    let distanceBetween = Math.abs(feetMiddle-platformMiddle);
    let totalRadius = feetRadius+platformRadius;
    if(distanceBetween<=totalRadius && feetY<=arrayPlateform[i].y+arrayPlateform[i].height){
      //Check si la hauteur est bonne
      if(arrayPlateform[i].y<=feetY && arrayPlateform[i].y+arrayPlateform[i].height >= feetY){
        return arrayPlateform[i];
      }
    }
  }

  return null;
}

function moveCamera(delta){
  perso.x -= cameraSpeed*(delta/1000);
  platformArray.forEach((item)=>{
    item.x -= cameraSpeed*(delta/1000);
  });
  ennemyArray.forEach((item)=>{
    item.x -= cameraSpeed*(delta/1000);
  });
  cameraSpeed += cameraIncrement;
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
