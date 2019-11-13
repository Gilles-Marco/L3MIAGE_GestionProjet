import { Ennemi } from "./ennemy.js";

export class EnnemyGenerator {

    constructor(ennemyDensity, ennemyArray, cursor, cursorjump){
        this.ennemyWidth = ennemyWidth;
        this.ennemyHeight = ennemyHeight;
        this.ennemyDensity = ennemyDensity;
        this.ennemyArray = ennemyArray;
        this.lastPlacedEnnemy = null;
        this.cursor = cursor;
        this.cursorjump = cursorjump;
    }

    generate(){
        this.cursor += this.cursorjump;

        //Check si le générateur peut créer un nouvel ennemi en fonction de la densité sur laquelle il a été créer
        if(this.lastPlacedEnnemy!=null){
            if(this.cursor-this.ennemyDensity<this.lastPlacedEnnemy.x){
                return  null;
            }
        }

        //Créer un nouveau ennemi <-- Peu importe de le créer haut dans le ciel, il va retomber soit par terre soit sur une plateforme
        //On se moque du fait qu'il puisse apparaitre dans une plateforme
        let ennemy = new Ennemi(this.cursor, 0);
        this.ennemyArray.push(ennemy);
        this.lastPlacedEnnemy = ennemy;
    }

}