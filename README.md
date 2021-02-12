# Quoi Faire_front

#### Version 2.0
Application de recherche de lieux à équidistance de plusieurs adresses.

* Lien du back  end : https://github.com/matthieu-mr/find_activity_back/ 
* Lien vers le store google : https://play.google.com/store/apps/details?id=com.matthieumichon.quoifaire

## Fonctionnnalités
* Recherche d'adresses en utilisant soit l'adresse soit les coordonnées GPS via [GEO API GOUV ] https://geo.api.gouv.fr/adresse
* Recherche des sorties et informations relativesaux lieux via google place & search place API https://developers.google.com/places/web-service/search
* Calcul d'un point central entre plusieurs coordoonées GPS 
* Sauvegarde des adressesde contact et des lieux favoris
* Guidage vers un lieu via google map, waze etc ...
* Recherche sur le web ou consultation directe du site internet du lieux
* Partage des informations depuis toutes les applications le permettant sur le smartphone

## Présentation du projet
### Ajout des adresses des participants 
1. Selectionnez le type d'activité : Sortie ou Sport
2. Ajoutez une ou plusieurs adresses :
* En saisissant directement l'adress
* Parmis vos contact 
* Localisez votre position

3. L'application calcul le point de RDV entre les participants séléctionnés
* Sauvegardez depuis cet écran vos adresses favorites

![ajout des adresses](http://matthieu-michon.fr/imagesprojet/quoifaire/participants.jpg)

### Séléction des activités
1. Selectionnez votre choix parmis toutes les activités ou via les filtres en haut de page

![Affichage des activités ](http://matthieu-michon.fr/imagesprojet/quoifaire/activite.jpg)

### Affichage de la carte
1. Naviguez entre les markers sur la carte qui affichent les résultats
2. Cliquez sur le marker pour afficher l'adresse, la note globale (si disponible) et le prix (si disponible) 

ou via la liste :
1. Consultez directement l'ensemble des résultats sur la liste et accédez directement aux informations de du lieu

![Affichage sur une carte](http://matthieu-michon.fr/imagesprojet/quoifaire/carte.jpg)

### Consultez les informations d'un lieu
* Conultez le nom, l'adresse et une photo du lieu
* Sauvegardez le lieu en cliquant sur l'étoile en haut a droite de l'écran
* Les fonctions en dessous de l'image vous permettent de partager, consulter le site et être guidé vers le lieu
* En dessous de l'image accédez directement aux commentaires laissés par les viositeurs sur google 

![Affichage des information d'un lieu](http://matthieu-michon.fr/imagesprojet/quoifaire/sauvegarde-site.jpg)

### Futures évolutions
Application :
V2.1
1. Récupération des adresses depuis les contacts du téléphone
2. Ajouts des adresses de l'application vers les contacts du téléphone
3. Ajout de points d'interets : Lieux remarquables lors des balades

V3 
1. Fonction de réseau social : recherche de contact in apps

Autre :
1. Mise en ligne d'un site internet 

