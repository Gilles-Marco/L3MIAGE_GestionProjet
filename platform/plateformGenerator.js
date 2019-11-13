import { Platform } from "./plateforme.js";

export class PlatformGenerator{

    constructor(cursor, platformWidth, platformHeight, platformDensity, cursorjump, arrayPlatform, canvas, ctx){
        /**
         * cursor -> l'endroit où le générateur regarde pour placer une plateform
         * platformWidth -> largeur des plateformes créer
         * platformHeight -> hauteur des plateformes créer
         * platformDensity -> Valeur pour gérer la densité de la génération des plateformes
         */
        this.cursor = cursor;
        this.lastPlacedPlatform = null;
        this.platformWidth = platformWidth;
        this.platformHeight = platformHeight;
        this.platformDensity = platformDensity;
        this.canvas = canvas;
        this.arrayPlatform = arrayPlatform;
        this.cursorjump = cursorjump;
        this.ctx = ctx;
    }

    generate(){
        /**
         * Regarde pour générer une plateforme et la push dans la liste du jeu donner en parametre
         */
        if(this.cursor<this.canvas.clientWidth){
            this.cursor += this.cursorjump
        }

        if(this.lastPlacedPlatform!=null){
            //Check les conditions pour créer une plateforme
            if(this.cursor - this.lastPlacedPlatform.x < this.platformDensity)
                return null;
        }
        
        //créer une plateforme
        //Génération d'un Y aléatoire
        let isIntersected = false;
        let platform;
        do{
            platform = new Platform(this.cursor, Math.random()*this.canvas.clientHeight, this.platformWidth, this.platformHeight, this.ctx);
            console.log("Generating platform")

            if(this.arrayPlatform.length>0){
                //Calculate how many platform created before it, it needs to check
                let nbPlat = Math.ceil(this.platformWidth/this.platformDensity);
                //Check si la nouvelle platform n'intersect pas avec une 
                //plateforme de arrayPlatform[max] à arrayPlatform[max-nbPlat]
                for(let i=this.arrayPlatform.length-1;i>(this.arrayPlatform.length-nbPlat>0) ? this.arrayPlatform.length-nbPlat : 0;i--){
                    if(this.intersect(platform, this.arrayPlatform[i])){
                        isIntersected = true;
                        break;
                    }
                }
            }
        } while(isIntersected);
        console.log("Platform validated");
        this.arrayPlatform.push(platform);
        this.lastPlacedPlatform = platform;
    }

    intersect(p1, p2){
        /**
         * @args p1 : Platform
         * @args Pp2 : Platform
         * Regarde si les deux plateformes ne sont pas en intersection
         * @return true si les plateformes sont en collision, false si elles ne le sont pas
         */

        let radiusP1X = p1.width/2;
        let radiusP1Y = p1.height/2;

        let radiusP2X = p2.width/2;
        let radiusP2Y = p2.height/2;

        let midP1X = p1.x+radiusP1X;
        let midP1Y = p1.y+radiusP1Y;

        let midP2X = p2.x+radiusP2X;
        let midP2Y = p2.y+radiusP2Y;

        let mid_distX = Math.abs(midP1X-midP2X);
        let mid_distY = Math.abs(midP1Y-midP2Y);

        if((mid_distX<Math.abs(radiusP1X+radiusP2X)) && (mid_distY<Math.abs(radiusP1Y+radiusP2Y)))
            return true;
        else
            return false;
    }

    clean(){
        //TODO
        /**
         * Nettoie la liste de plateformes en enlevant 
         * les plateformes hors de l'écran qui sont devenus alors inutiles
         */
    }
}