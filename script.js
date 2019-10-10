import {saveScore, getScoreList} from "./save.js";

window.onload = init;

function init(){
  //Resize canvas to fullscreen
  var canvas = document.querySelector("#myCanvas");
  
  //Start animation
  requestAnimationFrame(updateCanvas);
}

function updateCanvas(){
  
  requestAnimationFrame(updateCanvas);
}
