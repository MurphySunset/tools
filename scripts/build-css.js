const fs = require('fs');
const path = require('path');

// Lire le contenu du fichier d'entrée
const inputPath = path.join(__dirname, '..', 'src', 'input.css');
const outputPath = path.join(__dirname, '..', 'global.css');

// Vérifier que le fichier d'entrée existe
if (!fs.existsSync(inputPath)) {
    console.error('Le fichier input.css n\'existe pas à :', inputPath);
    process.exit(1);
}

// Lire le contenu du fichier d'entrée
const inputContent = fs.readFileSync(inputPath, 'utf8');

// Options de configuration pour Tailwind CSS et DaisyUI
const config = {
    content: [
        // Vous pouvez ajouter ici les chemins vers vos fichiers HTML
        // où les classes Tailwind sont utilisées
        './index.html',
        './tools/**/*.html'
    ],
    plugins: [
        require('daisyui')
    ],
    daisyui: {
        themes: ["cupcake"],
    }
};

// Utiliser Tailwind CSS via l'API Node.js
const tailwindcss = require('@tailwindcss/postcss');
const postcss = require('postcss');

postcss([
    tailwindcss(config)
])
.process(inputContent, {
    from: inputPath,
    to: outputPath
})
.then(result => {
    fs.writeFileSync(outputPath, result.css);
    console.log(`CSS généré avec succès dans : ${outputPath}`);

    // Afficher les avertissements s'il y en a
    result.warnings().forEach(warn => {
        console.warn(warn.toString());
    });
})
.catch(error => {
    console.error('Erreur lors de la génération du CSS :', error);
    process.exit(1);
});