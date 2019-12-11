export class Arrow{
    constructor(x1, y1, ctx, puissance){
        this.x = x1;
        this.y = y1;
        this.ctx = ctx;
        this.vitesseX = puissance;
        this.viteseY = puissance;
    }



    drawArrow(){
        //variables to be used when creating the arrow
        var headlen = 10;
        var tox = this.x + 40;
        var toy = this.y;
        var angle = Math.atan2(toy-this.y,tox-this.x);
     
        this.ctx.save();
        this.ctx.strokeStyle = "blue";

        
     
        // Dessin du corps de la flèche 
        this.ctx.beginPath();
        this.ctx.moveTo(this.x, this.y);
        this.ctx.lineTo(tox-10, toy);
        this.ctx.lineWidth = 1;
        this.ctx.stroke();
     
        //Dessin de la tête de la flèche (triangle donc 3 lignes)
        this.ctx.beginPath();
        this.ctx.moveTo(tox, toy);
        this.ctx.lineTo(tox-headlen*Math.cos(angle-Math.PI/7),
                   toy-headlen*Math.sin(angle-Math.PI/7));
     
       
        this.ctx.lineTo(tox-headlen*Math.cos(angle+Math.PI/7),
                   toy-headlen*Math.sin(angle+Math.PI/7));
     
       
        this.ctx.lineTo(tox, toy);
        this.ctx.lineTo(tox-headlen*Math.cos(angle-Math.PI/7),
                   toy-headlen*Math.sin(angle-Math.PI/7));
     
        this.ctx.stroke();


        //Dessin des plumes
        this.ctx.beginPath();
        //Plumes du bas
        this.ctx.moveTo(this.x,this.y);
        this.ctx.lineTo(this.x-15, this.y+5);

        this.ctx.moveTo(this.x+5,this.y);
        this.ctx.lineTo(this.x-10, this.y+5);

        this.ctx.moveTo(this.x+10,this.y);
        this.ctx.lineTo(this.x-5, this.y+5);

        //Plume du haut
        this.ctx.moveTo(this.x,this.y);
        this.ctx.lineTo(this.x-15, this.y-5);

        this.ctx.moveTo(this.x+5,this.y);
        this.ctx.lineTo(this.x-10, this.y-5);

        this.ctx.moveTo(this.x+10,this.y);
        this.ctx.lineTo(this.x-5, this.y-5);

        this.ctx.stroke();

        this.ctx.restore();
    }

    deplacerArrow(){
        this.x += this.vitesseX;
        //this.y -= this.viteseY;
    }
}