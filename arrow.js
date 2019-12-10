export class Arrow{
    constructor(x1, y1, ctx, puissance){
        this.x = x1;
        this.y = y1;
        this.ctx = ctx;
        this.vitesseX = puissance;
        this.viteseY = puissance;
    }

    drawArrow(){
        this.ctx.beginPath();

        this.ctx.arc(this.x,this.y, 3, 0, 2*Math.PI);
        this.ctx.stroke();
        this.ctx.closePath();
    }

    deplacerArrow(){
        this.x += this.vitesseX;
        //this.y -= this.viteseY;
    }
}