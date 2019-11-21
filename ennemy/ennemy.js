export class Ennemy{

    constructor(x, y, width, height, ctx){
        this.width = width;
        this.height = height;
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
        if(!this.isHit){
            this.ctx.fillStyle = "black";
            this.ctx.fillStroke = "black";
        }
        else{
            this.ctx.fillStyle = "red";
            this.ctx.fillStroke = "red";
        }
        //Head
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y+this.height/10, this.width/2.5, 0, Math.PI*2);
        this.ctx.fill();
        //Body
        this.ctx.beginPath();
        this.ctx.moveTo(this.x, this.y+this.width/2);
        this.ctx.lineTo(this.x, this.y+(this.height-this.width/20));
        this.ctx.stroke();
        //Feet
        this.ctx.beginPath();
        this.ctx.moveTo(this.x-this.width/1.75, this.y+this.height);
        this.ctx.lineTo(this.x+this.width/1.75, this.y+this.height);
        this.ctx.stroke();
        //Left arm
        this.ctx.beginPath();
        this.ctx.moveTo(this.x, this.y+this.height/2);
        this.ctx.lineTo(this.x-this.width/3, this.y+this.height/2);
        this.ctx.stroke();
        //right arm
        this.ctx.beginPath();
        this.ctx.moveTo(this.x, this.y+this.height/2);
        this.ctx.lineTo(this.x+this.width/3, this.y+this.height/2);
        this.ctx.stroke();
        //Shield
        this.ctx.beginPath();
        this.ctx.moveTo(this.x-this.width/3, this.y+this.height/3);
        this.ctx.lineTo(this.x-this.width/3, this.y+this.height/1.5);
        this.ctx.lineTo(this.x-this.width/2.10, this.y+this.height/1.25);
        this.ctx.lineTo(this.x-this.width/1.60, this.y+this.height/1.5);
        this.ctx.lineTo(this.x-this.width/1.60, this.y+this.height/3);
        this.ctx.fill();
        //Sword - Guard
        this.ctx.beginPath();
        this.ctx.moveTo(this.x+this.width/3, this.y+this.height/3);
        this.ctx.lineTo(this.x+this.width, this.y+this.height/3);
        this.ctx.lineTo(this.x+this.width, this.y+this.height/2.30);
        this.ctx.lineTo(this.x+this.width/1.40, this.y+this.height/2.30);
        this.ctx.lineTo(this.x+this.width/1.40, this.y+this.height/1.5);
        this.ctx.lineTo(this.x+this.width/1.75, this.y+this.height/1.5);
        this.ctx.lineTo(this.x+this.width/1.75, this.y+this.height/2.30);
        this.ctx.lineTo(this.x+this.width/3, this.y+this.height/2.30);
        this.ctx.fill();
        //Sword - Blade
        this.ctx.fillStyle="grey";
        this.ctx.beginPath();
        this.ctx.moveTo(this.x+this.width/1.8, this.y+this.height/3);
        this.ctx.lineTo(this.x+this.width/1.8, this.y+this.height/15);
        this.ctx.lineTo(this.x+this.width/1.5, this.y+this.height/30);
        this.ctx.lineTo(this.x+this.width/1.30, this.y+this.height/15);
        this.ctx.lineTo(this.x+this.width/1.30, this.y+this.height/3);
        this.ctx.fill();
        
        this.ctx.restore();
    }

}