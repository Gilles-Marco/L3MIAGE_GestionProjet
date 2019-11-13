export class Ennemi{

    constructor(x, y, ctx){
        this.x = x;
        this.y = y;
        this.ctx = ctx;
    }

    draw(){
        this.ctx.save();

        this.ctx.restore();
    }

}