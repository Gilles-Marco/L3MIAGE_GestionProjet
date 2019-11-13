import { Platform } from "./plateforme.js";

export class PlatformGenerator{

    constructor(cursor, platformWidth, platformHeight, platformDensity, canvas){
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
    }

    generate(){
        /**
         * Regarde pour générer une plateforme
         * @return Platform si une plateforme a été généré ou null si rien n'a été généré
         */
        if(this.lastPlacedPlatform!=null){
            //Check les conditions pour créer une plateforme
            if(this.cursor - this.lastPlacedPlatform.x < this.platformDensity)
                return null;
        }

        //créer une plateforme
        //Génération d'un Y aléatoire
        let platform = new Platform(this.cursor, Math.random()*this.canvas.clientHeight, this.platformWidth, this.platformHeight, this.canvas);
        this.lastPlacedPlatform = platform;
        return platform;
    }
}