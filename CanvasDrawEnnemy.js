window.onload = init;

function init(){
  let canvas = document.querySelector("#myCanvas");
  let ctx = canvas.getContext("2d");
  
  let x = 20;
  let y = 20;
  
  ctx.save();
  ctx.fillStyle = "black";
  //Head
  ctx.beginPath();
  ctx.arc(x+x/2, y+y/4, 12, 0, Math.PI*2);
  ctx.stroke();
  //Body
  ctx.beginPath();
  ctx.moveTo(x+x/2, y+y/4+12);
  ctx.lineTo(x+x/2, y+y/4+50);
  ctx.stroke();
  //Feet
  ctx.beginPath();
  ctx.moveTo(x-5, y+y/4+50);
  ctx.lineTo(x+25, y+y/4+50);
  ctx.stroke();
  //Left arm
  ctx.beginPath();
  ctx.moveTo(x+x/2, y+y/4+25);
  ctx.lineTo(x+x/2-15, y+y/4+25);
  ctx.stroke();
  //right arm
  ctx.beginPath();
  ctx.moveTo(x+x/2, y+y/4+25);
  ctx.lineTo(x+x/2+15, y+y/4+25);
  ctx.stroke();
  //Shield
  ctx.beginPath();
  ctx.moveTo(x+x/2-15, y+y/4+15);
  ctx.lineTo(x+x/2-15, y+y/4+35);
  ctx.lineTo(x+x/2-20, y+y/4+40);
  ctx.lineTo(x+x/2-25, y+y/4+35);
  ctx.lineTo(x+x/2-25, y+y/4+15);
  ctx.lineTo(x+x/2-15, y+y/4+15);
  ctx.fill();
  //Sword
  ctx.restore();
}
