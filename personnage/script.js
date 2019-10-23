window.onload = init;

let canvas;
let sol = 0;
let perso;


//Constructeur de p{ersonnage
class Personnage{
    constructor(x,y,width,height,color ){
        this.vie = 3;

        this.x = x;
        this.y = y; 
        
        //variable de la tête
        this.teteX = this.x;
        this.teteY = this.y-30;
      
        //Variable du corps
        this.corpsX = this.x;
        this.corpsY = this.y-20;
        this.angleCX = 30;
        this.angleCY = this.y;
      
        //Variable du bras
        this.brasX = this.x;
        this.brasY = this.y-10;
        this.angleBX = 45;
        this.angleBY = this.y-10;
      
        //Variable jambe
        this.jambeX = this.x;
        this.jambeY = this.y;
        this.angleJX1 = 35;
        this.angleJX2 = 25;
        this.angleJY = this.y+20;
      
        this.width=width;
        this.height=height;
        this.color=color;
        this.dx = 1;
        this.dy = 1;
        console.log("Personnage créé");     
    }
}

function init(){

    console.log("Page chargée");
    canvas = document.querySelector("#myCanvas");
    ctx = canvas.getContext("2d");
    ctx_weapon= canvas.getContext("2d");
    sol = (canvas.height/6);

    //Creation du personnage
  perso = new Personnage(30, (canvas.height - sol),20,20,"blue");

    //On dessin le perso
    drawPersonnage(perso);
    drawArc(perso);

    //On anime
    //requestAnimationFrame(anime60fps);

}

//Fonction animation
/*function anime60fps() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //Deplacement personnage
    deplacePersonnage(perso);
    drawPersonnage(perso);

    //TODO Deplacement ennemi

    requestAnimationFrame(anime60fps);
}*/

function drawPersonnage(perso){
    ctx.strokeStyle = perso.color;
    ctx.beginPath();

    //Draw la tete
    let tete = ctx.arc(perso.teteX,perso.teteY,10,0,2* Math.PI);
    
    //Draw corps
    let corps = ctx.moveTo(perso.corpsX, perso.corpsY);
    let angle_corp = ctx.lineTo(perso.angleCX, perso.angleCY);
    
    //Draw bras
    let bras = ctx.moveTo(perso.brasX,perso.brasY);
    let angle_bras = ctx.lineTo(perso.angleBX,perso.angleBY);
  
    //Draw jambes
    let jambe1 = ctx.moveTo(perso.jambeX,perso.jambeY);
    let angle_jambe1 = ctx.lineTo(perso.angleJX1,perso.angleJY);
    
    let jambe2 = ctx.moveTo(perso.jambeX,perso.jambeY);
    let angle_jambe2 = ctx.lineTo(perso.angleJX2,perso.angleJY);
  
    ctx.stroke();
    
 
    ctx.closePath();


}



function drawArc(perso){
  ctx.strokeStyle = perso.color;
  ctx.beginPath();
  
  let arc = ctx.arc(perso.brasX+6,perso.brasY,10,0,2* Math.PI);
  let corde;
  
  
  ctx.stroke();
  
  ctx.closePath();
}

/*function deplacePersonnage(perso){
    perso.x+=perso.dx;
    perso.y+=perso.dy;
    
    if(perso.x + perso.width >= canvas.width/2.5) {
        perso.dx = -.5;
    }
    if(perso.x <= 0){
        perso.dx =.5;
    }
    
    if(perso.y + perso.height >= canvas.height) {
      perso.dy = -1;
    } 
    
    if(perso.y <= 35) {
      perso.dy =1;
    }
  }*/