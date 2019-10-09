window.onload = init;

function init(){
  //Resize canvas to fullscreen
  var canvas = document.querySelector("#myCanvas");
  canvas.height = document.innerHeight;
  canvas.width = document.innerWidth;
  
  //Start animation
  requestAnimationFrame(updateCanvas);
}

function updateCanvas(){
  
  requestAnimationFrame(updateCanvas);
}
