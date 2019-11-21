//Constructeur de personnage
export class Personnage{
    constructor(x1,y1,width,height,color,ctx){
        this.vie = 3;
        this.x = x1;
        this.y = y1; 
        this.ctx = ctx;

        this.DXMAX = 400;
      
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