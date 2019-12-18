export class Arrow{
    constructor(x1, y1, ctx, puissance,mouseX,mouseY){
        this.x = x1;
        this.y = y1;
        this.ctx = ctx;
        this.angleBis=Math.atan2(mouseY-this.y,mouseX-this.x);

        switch(this.angleBis){
            case this.angleBis<=Math.PI/2 && this.angleBis>0:
                this.vx = Math.cos(this.angleBis)* puissance;
                this.vy = Math.sin(this.angleBis) * puissance;
                break;

            case this.angleBis <= Math.PI && this.angleBis>Math.PI/2:
                this.vx = -Math.cos(this.angleBis)* puissance;
                this.vy = Math.sin(this.angleBis) * puissance;
                break;

            case this.angleBis<=0 && this.angleBis>(-Math.PI/2):
                this.vx = Math.cos(this.angleBis)* puissance;
                this.vy = -Math.sin(this.angleBis) * puissance;
                break;

            case this.angleBis<=(-Math.PI/2) && this.angleBis>(-Math.PI):
                this.vx = -Math.cos(this.angleBis)* puissance;
                this.vy = -Math.sin(this.angleBis) * puissance;
                break;
            

        }

        console.log("Angle Bis : "+this.angleBis);
        this.vx = Math.cos(this.angleBis)* puissance;
        this.vy = Math.sin(this.angleBis) * puissance;
    }



    drawArrow(){
        //variables to be used when creating the arrow
        var headlen = 10;
        var tox = this.x + 40;
        var toy = this.y;

        //Calcul des angles
        //Angle pour la tête de fleche
        var angle = Math.atan2(toy-this.y,tox-this.x);


        this.ctx.save();
        this.ctx.strokeStyle = "blue";

        this.ctx.translate(this.x,this.y);

        
        this.ctx.rotate(this.angleBis);

     
        // Dessin du corps de la flèche 
        this.ctx.beginPath();
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(30, 0);
        this.ctx.lineWidth = 1;
        this.ctx.stroke();
     
        //Dessin de la tête de la flèche (triangle donc 3 lignes)
        this.ctx.beginPath();
        this.ctx.moveTo(40, 0);
        this.ctx.lineTo(40-headlen*Math.cos(angle-Math.PI/7),
                   0-headlen*Math.sin(angle-Math.PI/7));
     
       
        this.ctx.lineTo(40-headlen*Math.cos(angle+Math.PI/7),
                   0-headlen*Math.sin(angle+Math.PI/7));
     
       
        this.ctx.lineTo(40, 0);
        this.ctx.lineTo(40-headlen*Math.cos(angle-Math.PI/7),
                   0-headlen*Math.sin(angle-Math.PI/7));
     
        this.ctx.stroke();


        //Dessin des plumes
        this.ctx.beginPath();
        //Plumes du bas
        this.ctx.moveTo(0,0);
        this.ctx.lineTo(-15, 5);

        this.ctx.moveTo(5,0);
        this.ctx.lineTo(-10, 5);

        this.ctx.moveTo(10,0);
        this.ctx.lineTo(-5, 5);

        //Plume du haut
        this.ctx.moveTo(0,0);
        this.ctx.lineTo(-15, -5);

        this.ctx.moveTo(5,0);
        this.ctx.lineTo(-10, -5);

        this.ctx.moveTo(10,0);
        this.ctx.lineTo(-5,-5);

        this.ctx.stroke();

        this.ctx.restore();
    }

    deplacerArrow(){
        this.x += this.vx;
        this.y += this.vy;
    }
}