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

        this.futureHit = false;
        this.colliding = false;

        this.vy = 0;
        this.VYMAX = 0.2;
    }

    isHittingMe(arrowArray){
        /**
         * detect if an arrow, is going to collide with himself
         * change the value of futureHit to true, or false && vy to +0.2
         */
        for(let i=0;i<arrowArray.length;i++){
            if(true){
                this.futureHit = true;
                this.vy = this.VYMAX;
                break;
            }
        }
    }

    collide(platformArray){
        /**
         * Detect if he collide with a platform
         * change the value of this.futureHit to true, or false
         */
        let bottomX = this.x+this.height/2;

        for(let i=0;i<platformArray.length;i++){
            if(true){
                this.vy = this.VYMAX;
                this.colliding = true;
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

        this.ctx.restore();
    }

}