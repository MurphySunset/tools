const fs = require('fs');
const path = require('path');

// Chemin vers le dossier des outils
const toolsDir = path.join(__dirname, '..', 'tools');
const indexPath = path.join(__dirname, '..', 'index.html');

// Obtenir la liste des dossiers dans tools/
const toolFolders = fs.readdirSync(toolsDir).filter(file => {
  return fs.statSync(path.join(toolsDir, file)).isDirectory() && file !== 'template';
});

// Générer les cartes d'outils
const toolCards = toolFolders.map(folder => {
  // Lire le fichier README.md de l'outil s'il existe pour obtenir une description
  const readmePath = path.join(toolsDir, folder, 'README.md');
  let description = 'Outil sans description';
  let title = folder.charAt(0).toUpperCase() + folder.slice(1);
  
  if (fs.existsSync(readmePath)) {
    const readmeContent = fs.readFileSync(readmePath, 'utf8');
    // Extraire le titre et la description du README
    const titleMatch = readmeContent.match(/^#\s+(.*)/m);
    if (titleMatch) title = titleMatch[1];
    
    const descMatch = readmeContent.match(/\n(.*)/);
    if (descMatch) description = descMatch[1].trim();
  }
  
  // Générer une icône SVG basique en fonction du nom de l'outil
  const icon = getIconForTool(folder);
  
  return `
            <!-- ${title} -->
            <div class="card tool-card bg-base-100 shadow-xl h-full">
                <div class="card-body text-center">
                    <div class="tool-icon mb-3 text-primary">
                        ${icon}
                    </div>
                    <h5 class="card-title text-xl font-semibold">${title}</h5>
                    <p class="card-text">${description}</p>
                    <a href="tools/${folder}/" class="btn btn-primary mt-4">Accéder à l'outil</a>
                </div>
            </div>`;
}).join('\n\n');

// Fonction pour associer une icône SVG à un type d'outil
function getIconForTool(folderName) {
  const iconMap = {
    'password-generator': '<svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>',
    'background-remover': '<svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>',
    // Ajouter d'autres mappings ici
  };
  
  // Retourner l'icône spécifique ou une icône générique
  return iconMap[folderName] || '<svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>';
}

// Lire le fichier index.html existant
let indexContent = fs.readFileSync(indexPath, 'utf8');

// Remplacer la section des outils
const startMarker = '<!-- START: Tools List -->';
const endMarker = '<!-- END: Tools List -->';

const startIndex = indexContent.indexOf(startMarker);
const endIndex = indexContent.indexOf(endMarker);

if (startIndex !== -1 && endIndex !== -1) {
  const beforeContent = indexContent.substring(0, startIndex + startMarker.length);
  const afterContent = indexContent.substring(endIndex);
  
  indexContent = beforeContent + '\n' + toolCards + '\n        ' + afterContent;
  
  // Écrire le fichier mis à jour
  fs.writeFileSync(indexPath, indexContent);
  console.log('index.html mis à jour avec succès !');
} else {
  console.log('Marqueurs de remplacement non trouvés dans index.html');
}