# L3MIAGE_GestionProjet

##Première idée

Jeu de plateforme et de tir à l'arc.
La caméra scrollera sur le côté et le joueur devra se déplacer pour rester dans l'écran, s'il en sort il meurt.
En scrollant des nouvelles plateformes vont apparaitre avec des ennemis.
Le joueur aura 3 vies, il perdra une vie à chaque fois qu'un ennemi sort de l'écran sans l'avoir toucher.

## Module à développer

### Module de jeu principal

Un affichage start qui aura un bouton "start" pour commencer le jeu, qui lancera aussi la musique

Gestion du scroll de la caméra -> Plus le score est élevé plus elle va vite
Gestion de la musique qui accélère avec la vitesse de la caméra
Gestion de la position du joueur dans le jeu (hors de l'écran = mort)
Gestion des collisions avec les plateformes
Gestion des collisions de la flèche avec les ennemis

Affichage Game Over avec un champs pour entrer son pseudo et sauvegarder son score qui ramène à l'affichage "start"


### Personne jouable (déplacement, tir à l'arc, puissance du tir, gravité des flèches, vie)
ZQSD -> Déplacement du personnage -> Vitesse du perso = vitesse caméra + ptit boost
Clic gauche souris, à maintenir enfoncer pour charger le tir, et relacher pour tirer
Position de la souris, pour viser

### Génération des plateformes et des ennemis

Créer un algo pour créer des plateformes de façons aléatoires mais controler pour pas que sa soit le bordel
Créer un algo pour placer les ennemis sur les plateformes

### Gestion des ennemis

Essaie de sauter quand une flèche arrive pour essayer de l'éviter

### Sauvegarde des scores

Créer un cookie qui sauvegardera le pseudo + le score du joueur
