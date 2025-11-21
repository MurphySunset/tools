# Tools - Mourey

Site web : https://tools.mourey.info

"Tools - Mourey" est une collection d'outils utiles pour le développement et l'analyse, hébergée sur GitHub Pages. Le projet vise à fournir une variété d'outils web accessibles facilement via une interface unifiée.

## Structure du projet

- `index.html` : Page d'accueil qui liste tous les outils disponibles
- `global.css` : Fichier CSS global généré par Tailwind CSS et DaisyUI
- `src/input.css` : Fichier source CSS avec la configuration DaisyUI
- `tools/` : Dossier contenant tous les outils individuels
- `tools/template/` : Modèle standard pour créer de nouveaux outils
- `scripts/` : Scripts utilitaires pour la gestion du projet
- `docs/` : Documentation complémentaire

## Technologies utilisées

- HTML5, CSS3
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utilitaire
- [DaisyUI](https://daisyui.com/) - Composants UI pour Tailwind CSS
- JavaScript (côté client)
- Node.js (pour les scripts de build)

## Installation et développement

1. Clonez le dépôt :
   ```bash
   git clone https://github.com/votre-compte/tools.baptiste.mourey.info.git
   ```

2. Installez les dépendances :
   ```bash
   npm install
   ```

3. Générez le CSS :
   ```bash
   npm run build:css
   ```

4. Générez la page d'accueil avec la liste des outils :
   ```bash
   npm run generate:index
   ```

5. Pour exécuter l'ensemble du build (CSS + génération de l'index) :
   ```bash
   npm run build
   ```

## Outils disponibles

### Background Remover
Outil permettant de supprimer l'arrière-plan d'images en utilisant différents modèles d'IA :
- BRIA RMBG 2.0
- BiRefNet
- Ben V2 Image
- REMBG

L'outil permet de tester plusieurs modèles simultanément et de comparer les résultats.

### Password Generator
Générateur de mots de passe sécurisés avec différents formats :
- Base64
- Hexadécimal

L'outil utilise l'API Web Cryptography pour une génération sécurisée directement dans le navigateur.

## Ajouter un nouvel outil

1. Copiez le dossier `tools/template/` et renommez-le avec le nom de votre nouvel outil
2. Modifiez le contenu du nouveau dossier selon les besoins de votre outil
3. Exécutez `npm run generate:index` pour que votre outil apparaisse sur la page d'accueil
4. Vous pouvez également ajouter une description dans un fichier `README.md` à la racine de votre dossier d'outil

## Scripts disponibles

- `npm run build:css` : Génère le fichier CSS global à partir de src/input.css
- `npm run watch:css` : Lance un watcher pour générer automatiquement le CSS
- `npm run generate:index` : Génère automatiquement la liste des outils dans index.html
- `npm run build` : Exécute le build complet (CSS + génération de l'index)

## Tests

Pour exécuter les tests de vérification du système :
```bash
node scripts/test-system.js
```

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

Ce projet est open-source et disponible sous la licence GPL v3 (ou toute version ultérieure). Les dérivés doivent également être distribués sous la même licence.