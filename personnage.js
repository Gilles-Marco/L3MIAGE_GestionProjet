//Constructeur de p{ersonnage
export class Personnage{
    constructor(x1,y1,width,height,color,ctx){
        this.x = x1;
        this.y = y1; 
        this.ctx = ctx;
        
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
      
        //Variable de variations
        this.dx = 1;
        this.dy = 1;
        console.log("Personnage créé");     
    }
  
    drawPersonnage(){
        this.ctx.strokeStyle = this.color;
        this.ctx.beginPath();

        //Draw la tete
        this.ctx.arc(this.teteX,this.teteY,10,0,2* Math.PI);

        //Draw corps
        this.ctx.moveTo(this.corpsX, this.corpsY);
        this.ctx.lineTo(this.angleCX, this.angleCY);
        
        //Draw bras
        this.ctx.moveTo(this.brasX,this.brasY);
        this.ctx.lineTo(this.angleBX,this.angleBY);
    
        //Draw jambes
        this.ctx.moveTo(this.jambeX,this.jambeY);
        this.ctx.lineTo(this.angleJX1,this.angleJY);
        
        this.ctx.moveTo(this.jambeX,this.jambeY);
        this.ctx.lineTo(this.angleJX2,this.angleJY);
    
        this.ctx.stroke();
        this.ctx.closePath();
        console.log("Personnage dessiné");
    }
  
  deplacePersonnage(deltaX, deltaY){
  
  //Mettre un +
    //Test collision
      this.x +=deltaX;
      this.y += deltaY;
    
      this.teteX += deltaX;
      this.corpsX += deltaX;
      this.brasX += deltaX;
      this.jambeX += deltaX;
      this.angleCX += deltaX;
      this.angleBX += deltaX;
      this.angleJX1 += deltaX;
      this.angleJX2 += deltaX;
      
      this.teteY += deltaY;
      this.corpsY += deltaY;
      this.angleCY += deltaY;
      this.brasY += deltaY;
      this.angleBY +=deltaY;
      this.jambeY += deltaY;
      this.angleJY += deltaY;

    }
}