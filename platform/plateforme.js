export class Platform{

    constructor(x, y, width, height, canvas){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
    }

    draw(){
        this.ctx.save();
        
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(x, y, height, canvas);
        this.ctx.restore();
    }

}