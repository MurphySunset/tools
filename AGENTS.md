# Agents et Outils - Mourey Tools

## Description du projet

"Tools - Mourey" est une collection d'outils utiles pour le développement et l'analyse, hébergée sur GitHub Pages. Le projet vise à fournir une variété d'outils web accessibles facilement via une interface unifiée.

## Outils disponibles

Les outils disponibles dans ce projet se trouvent dans le répertoire `tools/`. Pour connaître les outils disponibles, il suffit de regarder les dossiers présents dans le répertoire `tools/`.

Actuellement, le projet contient les outils suivants :
- **Background Remover** (`tools/background-remover/`) : Outil de suppression d'arrière-plan d'images avec différents modèles IA
- **Password Generator** (`tools/password-generator/`) : Générateur de mots de passe sécurisés avec différents formats (Base64, hexadécimal)

## Guidelines de style

Le projet utilisera DaisyUI comme framework CSS à la place de Bootstrap pour tous les nouveaux développements. Veuillez vous référer au fichier [docs/daisyui.md](./docs/daisyui.md) pour les détails techniques sur l'utilisation de DaisyUI dans ce projet, y compris l'installation, l'utilisation des composants et les bonnes pratiques.

## Gestion du CSS global

Le CSS global du projet est géré via un processus de build Tailwind CSS. Les fichiers de configuration se trouvent dans :
- `src/input.css` : fichier source CSS avec la configuration DaisyUI
- `global.css` : fichier CSS généré à la racine du projet

Le thème principal utilisé est 'cupcake'. Pour modifier les styles globaux ou le thème :
1. Modifiez le fichier `src/input.css`
2. Générez le CSS avec la commande : `npm run build:css` (ou `npx tailwindcss -i ./src/input.css -o ./global.css --minify`)
3. Le fichier `global.css` à la racine contiendra alors les nouveaux styles

Pour qu'un outil utilise ces styles globaux, incluez simplement la balise `<link rel="stylesheet" href="../../global.css">` dans l'en-tête HTML (le chemin relatif dépend de la profondeur du dossier de l'outil dans le répertoire `tools/`).

## Ajout de nouveaux outils

Pour ajouter un nouvel outil au projet :
1. Copiez le modèle dans `tools/template/` et renommez-le avec un nom descriptif
2. Implémentez votre outil en utilisant DaisyUI pour le style
3. Assurez-vous que votre outil inclut le fichier global CSS avec `<link rel="stylesheet" href="../global.css">`
4. Assurez-vous que votre outil est accessible via une page HTML à la racine de votre dossier
5. Exécutez `npm run generate:index` pour que votre outil apparaisse automatiquement sur la page d'accueil
6. Assurez-vous que votre outil suit les guidelines de style établies

## Système de gestion automatisé

Le projet inclut un système de gestion automatisé qui :
- Génère dynamiquement la liste des outils sur la page d'accueil
- Utilise des templates standardisés pour une cohérence entre les outils
- Fournit des scripts de build pour automatiser les tâches répétitives

Pour exécuter le build complet (CSS + génération de l'index) :
```
npm run build
```

Pour générer uniquement la page d'accueil avec la liste des outils :
```
npm run generate:index
```

## Tests

Le projet inclut un script de test pour vérifier le bon fonctionnement du système :
```
node scripts/test-system.js
```

Ce script vérifie que :
- Le script de génération d'index existe et fonctionne
- Le template d'outil standardisé existe
- Le fichier de configuration tools.json existe
- Les marqueurs sont présents dans index.html
- La génération de l'index met à jour correctement la page d'accueil
- Les outils existants sont bien présents dans la page d'accueil
- Les scripts dans package.json sont correctement configurés