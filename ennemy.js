export class Ennemi{

    constructor(x, y, height, width, image, canvas){
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.image = image;
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");

        this.jumpMode = false;
        this.compteur = 0;

        this.nbOfTurn = 10;
        this.futureHit = false;
        this.colliding = false;

        this.vy = 0;
        this.VYMAX = 15;
    }

    intersect(vector){
        /**
         * Return true if the ennemy is intersected by the vector
         * return false if not
         */
        //TODO
        let targetx1 = this.x-this.width/2;
        let targetx2 = this.x+this.width/2;
        let targety1 = this.y;
        let targety2 = this.y+this.height;
        if()
        else
            return false;
    }

    isHittingMe(arrowArray){
        /**
         * detect if an arrow, is going to collide with himself
         * change the value of futureHit to true, or false && vy to +0.2
         */
        for(let i=0;i<arrowArray.length;i++){
            //Test if the arrow is behind him
            let goingToHitYou = false;
            if(arrowArray[i].x>this.x);
            
            //Test if the vector of the arrow is going to hit the target
            let vector = {"x1":arrowArray[i].x, "y1":arrowArray[i].y, "x2":arrowArray[i].x+arrowArray[i].vx*this.nbOfTurn, "y2":arrowArray[i].y+arrowArray[i].vy*this.nbOfTurn};
            if(this.intersect(vector))
                goingToHitYou = true;

            if(goingToHitYou){
                this.futureHit = true;
                this.vy = this.VYMAX;
                break;
            }
        }
    }

    update(){
        if(this.jumpMode==true){
            //count on how long the ennemy will jump
            this.compteur++;
            if(this.compteur>15){
                //Accelerating the target to go down
                this.vy -= 0.1;
                if(this.colliding){
                    //Stop the jumping mode and reset compteur + vy
                    this.jumpMode = false;
                    this.compteur = 0;
                    this.vy = 0;
                } 
            }
        }
        //Make the ennemy jump or fall
        this.y += this.vy;
    }

    draw(){
        this.ctx.save();
        this.update();

        //Draw the ennemy
        this.ctx.fillStyle = "red";
        this.ctx.fillRect(this.x-this.width/2, this.y, this.width, this.height);

        this.ctx.restore();
    }

}