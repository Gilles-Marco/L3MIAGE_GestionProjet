export class Platform{

    constructor(x, y, width, height, ctx){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.ctx = ctx
    }

    draw(){
        this.ctx.save();
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
        this.ctx.restore();
    }

}