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
  let description = '';
  let title = folder.charAt(0).toUpperCase() + folder.slice(1);
  
  // Descriptions par défaut pour les outils connus
  const defaultDescriptions = {
    'background-remover': 'Suppression d\'arrière-plan d\'images avec différents modèles IA',
    'password-generator': 'Génération de mots de passe sécurisés en Base64 et Hexadécimal'
  };
  
  if (fs.existsSync(readmePath)) {
    const readmeContent = fs.readFileSync(readmePath, 'utf8');
    // Extraire le titre et la description du README
    const titleMatch = readmeContent.match(/^#\s+(.*)/m);
    if (titleMatch) title = titleMatch[1];
    
    const descMatch = readmeContent.match(/\n(.*)/);
    if (descMatch) description = descMatch[1].trim();
  }
  
  // Utiliser la description par défaut si aucune description trouvée
  if (!description && defaultDescriptions[folder]) {
    description = defaultDescriptions[folder];
  }
  
  // Générer une icône SVG basique en fonction du nom de l'outil
  const icon = getIconForTool(folder);
  
  return `
            <li>
              <a href="tools/${folder}/" class="tool-item">
                <span class="tool-icon">${icon}</span>
                <div class="tool-content">
                  <div class="tool-title">${title}</div>
                  <div class="tool-description">${description}</div>
                </div>
              </a>
            </li>`;
}).join('\n\n');

// Fonction pour associer une icône SVG à un type d'outil
function getIconForTool(folderName) {
  const iconMap = {
    'password-generator': '🔑',
    'background-remover': '🗑️',
    // Ajouter d'autres mappings ici
  };
  
  // Retourner l'icône spécifique ou une icône générique
  return iconMap[folderName] || '🔧';
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