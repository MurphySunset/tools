# Tools - Mourey

Site web : https://tools.mourey.info

Une collection d'outils utiles pour le développement et l'analyse, hébergée sur GitHub Pages.

## Structure du projet

- `/` - Page d'accueil listant tous les outils
- `/background-remover/` - Outil de suppression d'arrière-plan d'images

## Outils disponibles

### Background Remover
Outil permettant de supprimer l'arrière-plan d'images en utilisant différents modèles d'IA :
- BRIA RMBG 2.0
- BiRefNet
- Ben V2 Image
- REMBG

L'outil permet de tester plusieurs modèles simultanément et de comparer les résultats.

## Déploiement

Ce site est configuré pour être déployé sur GitHub Pages. Le déploiement se fait automatiquement à partir de la branche `main`.

### Méthode 1 : GitHub Pages (recommandée)
1. Poussez vos modifications sur la branche `main`
2. Le site sera automatiquement mis à jour

### Méthode 2 : Déploiement manuel
Pour un déploiement manuel, assurez-vous que tous les fichiers sont accessibles à la racine du serveur web.

## Développement

Pour tester localement :
1. Assurez-vous que votre serveur web local est configuré pour servir les fichiers à partir de la racine du projet
2. Accédez à l'URL racine pour voir la liste des outils
3. Accédez à `/background-remover/` pour utiliser l'outil de suppression d'arrière-plan

## Licence

Ce projet est open-source et disponible sous la licence MIT.