// Fonction pour générer un mot de passe au format Base64 (32 octets)
async function generateBase64() {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return btoa(String.fromCharCode.apply(null, array));
}

// Fonction pour générer un mot de passe au format Hexadécimal (32 octets)
async function generateHex() {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

// Fonction pour copier le texte dans le presse-papier
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (err) {
        console.error('Erreur lors de la copie dans le presse-papier : ', err);
        return false;
    }
}

// Afficher le conteneur de résultat
function showResultContainer(containerId) {
    document.getElementById(containerId).style.display = 'block';
}

// Écouteurs d'événements pour les boutons de génération
document.getElementById('btn-base64').addEventListener('click', async () => {
    const password = await generateBase64();
    document.getElementById('result-base64').value = password;
    showResultContainer('result-container-base64');
});

document.getElementById('btn-hex').addEventListener('click', async () => {
    const password = await generateHex();
    document.getElementById('result-hex').value = password;
    showResultContainer('result-container-hex');
});

// Écouteurs d'événements pour les boutons de copie
document.getElementById('copy-base64').addEventListener('click', async () => {
    const password = document.getElementById('result-base64').value;
    const success = await copyToClipboard(password);
    if (success) {
        // Afficher un message temporaire à la place de l'alerte
        const originalText = document.querySelector('#copy-base64').textContent;
        document.querySelector('#copy-base64').textContent = 'Copié!';
        setTimeout(() => {
            document.querySelector('#copy-base64').textContent = originalText;
        }, 2000);
    } else {
        alert('Erreur lors de la copie du mot de passe.');
    }
});

document.getElementById('copy-hex').addEventListener('click', async () => {
    const password = document.getElementById('result-hex').value;
    const success = await copyToClipboard(password);
    if (success) {
        // Afficher un message temporaire à la place de l'alerte
        const originalText = document.querySelector('#copy-hex').textContent;
        document.querySelector('#copy-hex').textContent = 'Copié!';
        setTimeout(() => {
            document.querySelector('#copy-hex').textContent = originalText;
        }, 2000);
    } else {
        alert('Erreur lors de la copie du mot de passe.');
    }
});