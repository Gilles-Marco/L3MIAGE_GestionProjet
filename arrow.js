export class Arrow{
    constructor(x1, y1, ctx, puissance){
        this.x = x1;
        this.y = y1;
        this.ctx = ctx;
        this.vx = puissance;
        this.vy = puissance;

        this.height = 10;
        this.width = 40;
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
        this.x += this.vx;
        //this.y -= this.vy;
    }

    hasHit(ennemyArray, platformArray){
        //Arrow hitbox is a rectangle
        //The rectangle can rotate due to VX and VY

        //Get Arrow Vectice and try colliding each vectice with a (non rotated) rectangle. 
        //ennemy and platform dont rotate
        let arrowVectice = [];
        //Top vectice
        arrowVectice.push({x1:this.x, y1:this.y-this.height/2, x2:this.x+this.width, y2:this.y-this.height/2});
        //Bottom vectice
        arrowVectice.push({x1:this.x, y1:this.y+this.height/2, x2:this.x+this.width, y2:this.y+this.height/2});
        //Left vectice
        arrowVectice.push({x1:this.x, y1:this.y-this.height/2, x2: this.x, y2:this.y+this.height/2});
        //Right vectice
        arrowVectice.push({x1:this.x+this.width, y1:this.y-this.height/2, x2:this.x+this.width, y2:this.y+this.height/2});

        for(let i=0;i<ennemyArray.length;i++){
            if(this.testRectangle(arrowVectice, ennemyArray[i]))
                return {array:ennemyArray, index:i};
        }

        for(let i=0;i<platformArray.length;i++){
            if(this.testRectangle(arrowVectice, platformArray[i]))
                return {array:platformArray, index:i};
        }

        return false;
    }

    testRectangle(vectice, rectangle){
        //Rectangle vectice
        let rVectice = [];
        //Top vectice
        rVectice.push({x1:rectangle.x, y1:rectangle.y, x2:rectangle.x+rectangle.width, y2:rectangle.y});
        //Bottom vectice
        rVectice.push({x1:rectangle.x, y1:rectangle.y+rectangle.height, x2:rectangle.x+rectangle.width, y2:rectangle.y+rectangle.height});
        //Left vectice
        rVectice.push({x1:rectangle.x, y1:rectangle.y, x2: rectangle.x, y2:rectangle.y+rectangle.height});
        //Right vectice
        rVectice.push({x1:rectangle.x+rectangle.width, y1:rectangle.y, x2:rectangle.x+rectangle.width, y2:rectangle.y+rectangle.height});

        for(let i=0;i<rVectice.length;i++){
            for(let j=0;j<vectice.length;j++){
                if(this.testVectice(rVectice[i], vectice[j])==true){
                    // console.log(rVectice[i], vectice[j]);
                    return true;
                }
            }
        }

        return false;
    }

    testVectice(v1, v2){
        //Direction vector
        let dv1 = {x:v1.x2-v1.x1, y:v1.y2-v1.y1};
        let dv2 = {x:v2.x2-v2.x1, y:v2.y2-v2.y1};
        //test if vectice are parallele
        let valuePara = dv1.x*dv2.y - dv2.x*dv1.y;
        // console.log(`valuePara = ${valuePara}`);
        if(valuePara==0.0){
            return false;
        }

        let vInter = {x: v1.x1-v2.x1, y: v1.y1-v2.y1};
        let t = (vInter.x*dv2.y - vInter.y*dv2.x)/valuePara;
        // console.log(`t = ${t} ${(t<0 || t>1)}`);
        if(t<0 || t>1){
            return false;
        }

        let u = (vInter.x*dv1.y - vInter.y*dv1.x)/valuePara;
        // console.log(`u = ${u}`);
        if(u<0 || u>1){
            return false;
        }

        let intersection = {x:v1.x1+(t*dv1.x) , y:v1.y1+(t*dv1.y)};
        // console.log(`Intersection ${intersection}`);
        
        return true;
    }
}