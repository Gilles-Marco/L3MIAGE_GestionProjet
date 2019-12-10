//Constructeur de personnage
export class Personnage{
    constructor(x1,y1,width,height, DXMAX, color,ctx){
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

        this.DXMAX = DXMAX;
      
        this.width=width;
        this.height=height;
        this.color=color;
      
        //Delta déplacements
        this.dx = 0;
        this.dy = 0;
    }
  
    drawPersonnage(){
        this.ctx.save();

        this.ctx.fillStyle = this.color;
        this.ctx.strokeStyle = this.color;

        //Tete
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y+this.height/10, this.width/3, 0, Math.PI*2);
        this.ctx.fill();

        //Corps
        this.ctx.beginPath();
        this.ctx.moveTo(this.x, this.y+this.height/10);
        this.ctx.lineTo(this.x, this.y+this.height/1.5);
        //Pied
        this.ctx.lineTo(this.x-this.width/7, this.y+this.height);
        this.ctx.moveTo(this.x, this.y+this.height/1.5);
        this.ctx.lineTo(this.x+this.width/7, this.y+this.height);
        //Bras
        this.ctx.moveTo(this.x, this.y+this.height/2);
        this.ctx.lineTo(this.x+this.width/3, this.y+this.height/2);
        this.ctx.stroke();

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
    }
}