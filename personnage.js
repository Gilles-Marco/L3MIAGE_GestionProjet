//Constructeur de personnage
export class Personnage{
    constructor(x1,y1,width,height, DXMAX, color,ctx){
        this.vie = 3;
        this.x = x1;
        this.y = y1; 
        this.ctx = ctx;

        this.DXMAX = DXMAX;
      
        this.width=width;
        this.height=height;
        this.color=color;
      
        //Delta déplacements
        this.dx = 0;
        this.dy = 0;
    }
  
    drawPersonnage(mouseX, mouseY){
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


        var angle = Math.atan2(mouseX-this.x, mouseY-this.y);

        this.ctx.translate(this.x, this.y + this.height/2);
        this.ctx.rotate(-angle);

        //Bras
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(0, this.height/5);

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