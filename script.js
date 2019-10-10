import {saveScore} from "./save.js";

window.onload = init;

function init(){
  //Resize canvas to fullscreen
  var canvas = document.querySelector("#myCanvas");
  
  //Start animation
  saveScore("Marco", 20);
  requestAnimationFrame(updateCanvas);
}

function updateCanvas(){
  
  requestAnimationFrame(updateCanvas);
}
