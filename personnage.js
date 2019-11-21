//Constructeur de p{ersonnage
export class Personnage{
    constructor(x1,y1,width,height,color,ctx){
        this.vie = 3;
        this.x = x1;
        this.y = y1; 
        this.ctx = ctx;

        this.DXMAX = 400;
        
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
        this.ctx.save();
        this.ctx.strokeStyle = this.color;
        this.ctx.fillStyle = "blue";
        this.ctx.beginPath();

        //Draw la tete
        this.ctx.arc(this.teteX,this.teteY,10,0,2* Math.PI);
        this.ctx.fill();

        this.ctx.beginPath();
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
        this.ctx.restore();
    }
  
  deplacePersonnage(delta){
      if(this.dx>this.DXMAX)
        this.dx = this.DXMAX;
      else if(this.dx<-this.DXMAX)
        this.dx = -this.DXMAX;
      else;
      this.x += this.dx*(delta/1000);
      this.y += this.dy*(delta/1000);
    
      //Deplacement en X
      this.teteX += this.dx*(delta/1000);
      this.corpsX += this.dx*(delta/1000);
      this.brasX += this.dx*(delta/1000);
      this.jambeX += this.dx*(delta/1000);
      this.angleCX += this.dx*(delta/1000);
      this.angleBX += this.dx*(delta/1000);
      this.angleJX1 += this.dx*(delta/1000);
      this.angleJX2 += this.dx*(delta/1000);
      
      //Deplacement en Y
      this.teteY += this.dy*(delta/1000);
      this.corpsY += this.dy*(delta/1000);
      this.angleCY += this.dy*(delta/1000);
      this.brasY += this.dy*(delta/1000);
      this.angleBY +=this.dy*(delta/1000);
      this.jambeY += this.dy*(delta/1000);
      this.angleJY += this.dy*(delta/1000);

    }
}