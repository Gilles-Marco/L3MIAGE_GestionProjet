//Constructeur de p{ersonnage
export class Personnage{
    constructor(x1,y1,width,height,color,ctx){
        this.vie = 3;
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
        this.angleBX = 50;
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
      
        //Delta déplacements
        this.dx = 0;
        this.dy = 0;
        console.log("Personnage créé en X :"+this.x +" Y :"+this.y);     
    }
  
    drawPersonnage(){
        //variable de la tête
        this.teteX = this.x;
        this.teteY = this.y-30;
      
        //Variable du corps
        this.corpsX = this.x;
        this.corpsY = this.y-20;
        this.angleCY = this.y;
      
        //Variable du bras
        this.brasX = this.x;
        this.brasY = this.y-10;
        this.angleBY = this.y-10;
      
        //Variable jambe
        this.jambeX = this.x;
        this.jambeY = this.y;
        this.angleJY = this.y+20;

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
    }
  
  deplacePersonnage(){
      this.x += this.dx;
      this.y += this.dy;
    
      //Deplacement en X
      this.teteX += this.dx;
      this.corpsX += this.dx;
      this.brasX += this.dx;
      this.jambeX += this.dx;
      this.angleCX += this.dx;
      this.angleBX += this.dx;
      this.angleJX1 += this.dx;
      this.angleJX2 += this.dx;
      
      //Deplacement en Y
      this.teteY += this.dy;
      this.corpsY += this.dy;
      this.angleCY += this.dy;
      this.brasY += this.dy;
      this.angleBY +=this.dy;
      this.jambeY += this.dy;
      this.angleJY += this.dy;

    }
}