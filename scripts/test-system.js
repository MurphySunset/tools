const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔍 Démarrage des tests du système...');

let testsPassed = 0;
let testsTotal = 0;

function assert(condition, message) {
    if (condition) {
        console.log(`✅ Test passé: ${message}`);
        testsPassed++;
    } else {
        console.log(`❌ Test échoué: ${message}`);
    }
    testsTotal++;
}

// Test 1: Vérifier que le script de génération existe
console.log('\n--- Test 1: Vérification de l\'existence du script de génération ---');
const generatorPath = path.join(__dirname, 'tool-list-generator.js');
assert(fs.existsSync(generatorPath), 'Le script tool-list-generator.js existe');

// Test 2: Vérifier que le template d'outil existe
console.log('\n--- Test 2: Vérification de l\'existence du template d\'outil ---');
const templatePath = path.join(__dirname, '..', 'tools', 'template', 'index.html');
assert(fs.existsSync(templatePath), 'Le template d\'outil existe');

// Test 3: Vérifier que le fichier tools.json existe
console.log('\n--- Test 3: Vérification de l\'existence du fichier de configuration ---');
const toolsConfigPath = path.join(__dirname, '..', 'tools.json');
assert(fs.existsSync(toolsConfigPath), 'Le fichier tools.json existe');

// Test 4: Vérifier que les dossiers d'outils existent
console.log('\n--- Test 4: Vérification de l\'existence des dossiers d\'outils ---');
const toolsDir = path.join(__dirname, '..', 'tools');
const toolFolders = fs.readdirSync(toolsDir).filter(file => {
    return fs.statSync(path.join(toolsDir, file)).isDirectory() && file !== 'template';
});
assert(toolFolders.length >= 2, `Au moins 2 dossiers d'outils existent (${toolFolders.join(', ')})`);

// Test 5: Vérifier que les marqueurs sont présents dans index.html
console.log('\n--- Test 5: Vérification des marqueurs dans index.html ---');
const indexPath = path.join(__dirname, '..', 'index.html');
const indexContent = fs.readFileSync(indexPath, 'utf8');
const hasStartMarker = indexContent.includes('<!-- START: Tools List -->');
const hasEndMarker = indexContent.includes('<!-- END: Tools List -->');
assert(hasStartMarker && hasEndMarker, 'Les marqueurs de remplacement sont présents dans index.html');

// Test 6: Exécuter le script de génération et vérifier qu'il ne génère pas d'erreurs
console.log('\n--- Test 6: Exécution du script de génération ---');
try {
    execSync('node ./scripts/tool-list-generator.js', { stdio: 'pipe' });
    console.log('✅ Test 6 passé: Le script de génération s\'exécute sans erreur');
    testsPassed++;
    testsTotal++;
} catch (error) {
    console.log('❌ Test 6 échoué: Le script de génération a généré une erreur');
    console.log(`Erreur: ${error.stderr || error.message}`);
    testsTotal++;
}

// Test 7: Vérifier que le fichier index.html a été mis à jour avec les outils
console.log('\n--- Test 7: Vérification de la mise à jour de index.html ---');
const updatedIndexContent = fs.readFileSync(indexPath, 'utf8');
// Vérifier que le contenu généré contient des éléments d'outils
const hasToolItems = updatedIndexContent.includes('tool-item');
assert(hasToolItems, 'Le fichier index.html a été mis à jour avec des éléments d\'outils');

// Test 8: Vérifier qu'un outil spécifique est présent dans index.html
console.log('\n--- Test 8: Vérification de la présence d\'un outil spécifique ---');
const hasBackgroundRemover = updatedIndexContent.includes('tools/background-remover/');
const hasPasswordGenerator = updatedIndexContent.includes('tools/password-generator/');
assert(hasBackgroundRemover && hasPasswordGenerator, 'Les outils background-remover et password-generator sont présents dans index.html');

// Test 9: Vérifier la mise à jour du package.json
console.log('\n--- Test 9: Vérification de la mise à jour du package.json ---');
const packageJsonPath = path.join(__dirname, '..', 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
const hasGenerateScript = packageJson.scripts && packageJson.scripts['generate:index'];
const hasUpdatedBuildScript = packageJson.scripts && packageJson.scripts.build.includes('generate:index');
assert(hasGenerateScript && hasUpdatedBuildScript, 'Le package.json a été mis à jour avec les scripts nécessaires');

// Résumé des tests
console.log('\n--- Résumé des tests ---');
console.log(`Tests passés: ${testsPassed}/${testsTotal}`);

if (testsPassed === testsTotal) {
    console.log('🎉 Tous les tests ont réussi ! Le système est fonctionnel.');
    process.exit(0);
} else {
    console.log('⚠️  Certains tests ont échoué. Veuillez vérifier les erreurs ci-dessus.');
    process.exit(1);
}