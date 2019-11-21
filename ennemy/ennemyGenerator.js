import { Ennemy } from "./ennemy.js";

export class EnnemyGenerator {

    constructor(ennemyDensity, ennemyWidth, ennemyHeight, ennemyArray, cursor, cursorjump, canvas, ctx){
        this.ennemyDensity = ennemyDensity;
        this.ennemyArray = ennemyArray;
        this.ennemyWidth = ennemyWidth;
        this.ennemyHeight = ennemyHeight;
        this.lastPlacedEnnemy = null;
        this.cursor = cursor;
        this.cursorjump = cursorjump;
        this.canvas = canvas;
        this.ctx = ctx;
    }

    generate(){
        if(this.cursor<this.canvas.clientWidth-100)
            this.cursor += this.cursorjump;

        //Check si le générateur peut créer un nouvel Ennemy en fonction de la densité sur laquelle il a été créer
        if(this.lastPlacedEnnemy!=null){
            if(this.cursor-this.ennemyDensity<this.lastPlacedEnnemy.x){
                return  null;
            }
        }

        //Créer un nouveau Ennemy <-- Peu importe de le créer haut dans le ciel, il va retomber soit par terre soit sur une plateforme
        //On se moque du fait qu'il puisse apparaitre dans une plateforme
        let ennemy = new Ennemy(this.cursor, 0, this.ennemyWidth, this.ennemyHeight, this.ctx);
        this.ennemyArray.push(ennemy);
        this.lastPlacedEnnemy = ennemy;
    }

}