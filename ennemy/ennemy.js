export class Ennemy{

    constructor(x, y, ctx){
        this.isHit = false;
        this.x = x;
        this.y = y;
        this.ctx = ctx;
        this.vx = 0;
        this.vy = 0;
    }

    update(){
        this.x += this.vx;
        this.y += this.vy;
    }

    draw(){
        this.ctx.save();
        if(!this.isHit)
            this.ctx.fillStyle = "black";
        else
            this.ctx.fillStyle = "red";
        //Head
        this.ctx.beginPath();
        this.ctx.arc(this.x+this.x/2, this.y+this.y/4, 12, 0, Math.PI*2);
        this.ctx.fill();
        //Body
        this.ctx.beginPath();
        this.ctx.moveTo(this.x+this.x/2, this.y+this.y/4+12);
        this.ctx.lineTo(this.x+this.x/2, this.y+this.y/4+50);
        this.ctx.stroke();
        //Feet
        this.ctx.beginPath();
        this.ctx.moveTo(this.x-5, this.y+this.y/4+50);
        this.ctx.lineTo(this.x+25, this.y+this.y/4+50);
        this.ctx.stroke();
        //Left arm
        this.ctx.beginPath();
        this.ctx.moveTo(this.x+this.x/2, this.y+this.y/4+25);
        this.ctx.lineTo(this.x+this.x/2-15, this.y+this.y/4+25);
        this.ctx.stroke();
        //right arm
        this.ctx.beginPath();
        this.ctx.moveTo(this.x+this.x/2, this.y+this.y/4+25);
        this.ctx.lineTo(this.x+this.x/2+15, this.y+this.y/4+25);
        this.ctx.stroke();
        //Shield
        this.ctx.beginPath();
        this.ctx.moveTo(this.x+this.x/2-15, this.y+this.y/4+15);
        this.ctx.lineTo(this.x+this.x/2-15, this.y+this.y/4+35);
        this.ctx.lineTo(this.x+this.x/2-20, this.y+this.y/4+40);
        this.ctx.lineTo(this.x+this.x/2-25, this.y+this.y/4+35);
        this.ctx.lineTo(this.x+this.x/2-25, this.y+this.y/4+15);
        this.ctx.lineTo(this.x+this.x/2-15, this.y+this.y/4+15);
        this.ctx.fill();
        //Sword - Guard
        this.ctx.beginPath();
        this.ctx.moveTo(this.x+this.x/2+17, this.y+this.y/4+18);
        this.ctx.lineTo(this.x+this.x/2+17, this.y+this.y/4+30);
        this.ctx.lineTo(this.x+this.x/2+23, this.y+this.y/4+30);
        this.ctx.lineTo(this.x+this.x/2+23, this.y+this.y/4+18);
        this.ctx.lineTo(this.x+this.x/2+30, this.y+this.y/4+18);
        this.ctx.lineTo(this.x+this.x/2+30, this.y+this.y/4+15);
        this.ctx.lineTo(this.x+this.x/2+12, this.y+this.y/4+15);
        this.ctx.lineTo(this.x+this.x/2+12, this.y+this.y/4+18);
        this.ctx.lineTo(this.x+this.x/2+17, this.y+this.y/4+18);
        this.ctx.fill();
        //Sword - Blade
        this.ctx.fillStyle="grey";
        this.ctx.beginPath();
        this.ctx.moveTo(this.x+this.x/2+17, this.y+this.y/4+15);
        this.ctx.lineTo(this.x+this.x/2+17, this.y+this.y/4);
        this.ctx.lineTo(this.x+this.x/2+20, this.y+this.y/4-5);
        this.ctx.lineTo(this.x+this.x/2+23, this.y+this.y/4);
        this.ctx.lineTo(this.x+this.x/2+23, this.y+this.y/4+15);
        this.ctx.fill();
        
        this.ctx.restore();
    }

}