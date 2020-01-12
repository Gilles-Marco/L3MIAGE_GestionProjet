import {saveScore, getScoreList} from "./save.js";
import { PlatformGenerator } from "./platform/plateformGenerator.js";
import { Platform } from "./platform/plateforme.js";
import { Ennemy } from "./ennemy/ennemy.js";
import { EnnemyGenerator } from "./ennemy/ennemyGenerator.js";
import {Personnage} from "./personnage.js";
import {Arc} from "./arc.js";
import {Arrow} from "./arrow.js";

window.onload = init;

//DEBUG Variable
const DEBUG = false;

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
const BASECAMERASPEED = 50;
var cameraSpeed = BASECAMERASPEED;
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
var mousePos = {x:0, y:0};

//Constante sur la taille des plateformes
const platformWidth = 120;
const platformHeight = 30;
var platformGenerator;

//Ennemy variable
var ennemyGenerator;
const ennemyWidth = 30;
const ennemyHeight = 50;

var jump = 1;

//Interval pour mousedown pour increment la puissance
var intervalIncrement;

var BowSong = document.querySelector('#BowSong');
var ennemySong = document.querySelector('#EnnemySong');
var PlayerSong = document.querySelector('#PlayerSong');
var OverSong = document.querySelector('#GameOver');


function init(){
  //Resize canvas to fullscreen
  canvas = document.querySelector("#myCanvas");
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;

  ctx = canvas.getContext("2d");
  sol = canvas.height-canvas.clientHeight/20;

  //Creation du personnage
  perso = new Personnage(300, sol-persoHeight, persoWidth, persoHeight, persoDXMAX, "blue", ctx);
  arc = new Arc(perso.x, perso.y+perso.height/2, ctx, perso.dx,perso.dy);

  //Bind button to action
  startButton = document.querySelector("#startButton");
  startButton.style.visibility = "visible";
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
    if(event.keyCode === 38){
      if(jump > 0){
        perso.dy -= 500;
        jump -= 1;
      }
    }
  });


  window.addEventListener("mousedown", ()=>{
    intervalIncrement = setInterval(()=>{
      arc.puissance += 0.5;
    }, 50);
  }, false);
  window.addEventListener("mouseup", ()=>{
    clearInterval(intervalIncrement);
    arrowArray.push(new Arrow(arc.x, arc.y, ctx, arc.puissance, mousePos.x, mousePos.y));
    console.log(`Puissance du tir ${arc.puissance}`);
    arc.puissance = 15;
    BowSong.play();
  }, false);

  window.addEventListener('keyup',function(event){
    if(event.keyCode === 39){
      deplacementDroite = false;
    }
    if(event.keyCode === 37){
      deplacementGauche = false;
    }
  });

  window.addEventListener('mousemove',function(event){
      mousePos = getMousePos(canvas,event);
  },false);

  //Générateur de platform
  platformGenerator = new PlatformGenerator(20, platformWidth, platformHeight, 200, 10, platformArray, sol, canvas, ctx);
  //Générateur d'ennemis
  ennemyGenerator = new EnnemyGenerator(150, ennemyWidth, ennemyHeight, ennemyArray, canvas.width/2, 10, canvas, ctx);
  if(DEBUG){
    updateCanvas();
  }
}

function getMousePos(canvas,event){
  var rect = canvas.getBoundingClientRect();
  return{
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
  };
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

  if(perso.y > 574 )
    jump = 1;

  //Generation des plateformes
  platformGenerator.generate();
  //Generation des ennemys
  if(platformGenerator.cursor>=canvas.width*0.80){
    ennemyGenerator.generate();
  }
  //Nettoyage des plateformes
  platformOut();
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

  //Nettoyage des fleches
  arrowStopped()
  //Affichage des flèches
  arrowArray.forEach((item, index)=>{
    item.vy += gravite * (delta/1000);
    item.drawArrow();
    if(DEBUG){
      ctx.save();
      ctx.translate(item.x, item.y);
      ctx.rotate(item.angleBis);
      ctx.strokeStyle = "red";
      ctx.strokeRect(0, -item.height/2, item.width, item.height);
      ctx.restore();
    }
    item.deplacerArrow();
    //Test si la flèche touche le sol
    if(item.y+item.height/2 >= sol){
      item.y = 0;
      item.dy = 0;
      arrowArray.splice(index, 1);
    }

    //Test si la flèche touche une plateforme ou un ennemi
    let touched = item.hasHit(ennemyArray, platformArray);
    if(touched){
      console.log("Sa a touché");
      ennemySong.play();
      touched.array.splice(touched.index, 1);
      arrowArray.splice(index, 1);
    }
  });

  playerDeplacement();
  playerCollision();
  playerPlatform(platformArray);
  perso.deplacePersonnage(delta);
  moveArc();
  perso.drawPersonnage(mousePos.x, mousePos.y);
  arc.drawArc(mousePos.x, mousePos.y);

  //Draw du sol
  ctx.save();
  ctx.strokeStyle = "black";
  ctx.beginPath();
  ctx.moveTo(0, sol);
  ctx.lineTo(canvas.width, sol);
  ctx.stroke();
  ctx.restore();
  //Ajout du score 'passif'
  if(delta<1000)
    score += delta/1000;
  //draw du score
  drawScore(ctx, score);

 

  //Regarde si les ennemi sont en dehors de l'écran
  ennemyOut();

  //Regarde si le joueur est out
  playerOut();

  //Regarde si le joueur est mort 
  playerDead();

  if(perso.vie != 0)
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

function moveArc(){
  arc.x = perso.x; 
  arc.y = perso.y+perso.height/2;
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
        jump=1;
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

function ennemyOut(){
  /**
   * Check if ennemys are out of screen and delete them from the list, making the player lose a HP
   */
  ennemyArray.forEach((item, index)=>{
    if(item.x+item.width<0){
      // perso.vie -= 1;
      ennemyArray.splice(index, 1);
    }
  });
}

function playerOut(){

  if(perso.x+perso.width<0 && DEBUG==false){
      perso.vie =0;
  }
}

function playerDead(){
  if(perso.vie==0){
    PlayerSong.play();
    displaySaveScore();
  }
}

function platformOut(){
  /**
   * Check if a platform are out of the screen and delete it from the list
   */

  platformArray.forEach((item, index)=>{
    if(item.x+item.width<0)
      platformArray.splice(index, 1);
  });
}

function arrowStopped(){
  /**
   * Check if an arrow has no VX and delete it from the game
   */
  arrowArray.forEach((item, index)=>{
    if(item.vx==0 && item.vy==0){
      arrowArray.splice(index, 1);
    }
  });
  
}

function moveCamera(delta){
  if(delta<1000){
    perso.x -= cameraSpeed*(delta/1000);
    platformArray.forEach((item)=>{
      item.x -= cameraSpeed*(delta/1000);
    });
    ennemyArray.forEach((item)=>{
      item.x -= cameraSpeed*(delta/1000);
    });
    cameraSpeed += cameraIncrement;
  }
}

function drawScore(ctx, score){
  //Get the middle of the screen
  let middleX = canvas.width/2;
  let y = canvas.height/20;
  let font_size = 24;
  score = parseInt(score);
  let length_score = score+"";
  length_score = length_score.length*font_size;
  ctx.save();
  ctx.font = `${font_size}px sans-serif`;
  ctx.fillStyle = "black";
  ctx.fillText(score, middleX-length_score, y);
  ctx.restore();
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

  //Reset des variables
  score = 0;
  perso = new Personnage(300, sol-persoHeight, persoWidth, persoHeight, persoDXMAX, "blue", ctx);
  platformArray = [];
  arrowArray = [];
  ennemyArray = [];
  cameraSpeed = BASECAMERASPEED;
  //Générateur de platform
  platformGenerator = new PlatformGenerator(20, platformWidth, platformHeight, 200, 10, platformArray, sol, canvas, ctx);
  //Générateur d'ennemis
  ennemyGenerator = new EnnemyGenerator(150, ennemyWidth, ennemyHeight, ennemyArray, canvas.width/2, 10, canvas, ctx);
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
