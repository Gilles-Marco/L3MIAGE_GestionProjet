export class Arc{
    constructor(x1,y1,ctx){
        this.x = x1;
        this.y = y1;
        this.ctx = ctx;
        this.puissance =1;
        this.delai = 2;


        console.log("Arc créé en X : "+this.x + " Y : "+this.y);
    }

    //Dessin de l'arc à partir d'un arc de cercle et d'une ligne4
    drawArc(mouseX, mouseY){
        this.ctx.save();


        var angle = Math.atan2(mouseX-this.x, mouseY-this.y);

        //console.log(angle);


        this.ctx.translate(this.x,this.y);
        this.ctx.rotate(-angle-(Math.PI/2));

        this.ctx.beginPath();
        
        
        //Coordonnée d'angle de départ et de fin en negatif pour inverser l'arc de cercle
        //cf. cercle Trigo
        
        this.ctx.arc(0,0,10,Math.PI/2,3* Math.PI/2);
        

        this.ctx.moveTo(0, -10);
        this.ctx.lineTo(0,10);

        


        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.restore();
    }


}