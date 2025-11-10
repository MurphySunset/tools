// Variables globales
let selectedImageFile = null;
let selectedImageUrl = null;
let totalCost = 0; // Variable pour suivre le coût total
let originalImageDimensions = null; // Variable pour stocker les dimensions de l'image

// Écouteurs d'événements
document.addEventListener('DOMContentLoaded', function() {
    // Gestion du téléchargement de fichier
    document.getElementById('imageUpload').addEventListener('change', function(e) {
        if (e.target.files && e.target.files[0]) {
            selectedImageFile = e.target.files[0];
            
            // Affichage de l'aperçu
            const reader = new FileReader();
            reader.onload = function(event) {
                const originalImage = document.getElementById('originalImage');
                originalImage.src = event.target.result;
                document.getElementById('originalImagePreview').style.display = 'block';
                selectedImageUrl = null; // Réinitialiser l'URL
                document.getElementById('imageUrl').value = ''; // Réinitialiser le champ URL
                
                // Calculer les dimensions de l'image et afficher les informations de coût pour tous les modèles
                const img = new Image();
                img.onload = function() {
                    const megapixels = (this.width * this.height) / 1000000;
                    const benCost = parseFloat((megapixels * 0.0035).toFixed(4));
                    const birefnetCost = parseFloat((megapixels * 0.427 * 0.00111).toFixed(4));
                    const rembgCost = parseFloat((megapixels * 0.510 * 0.00111).toFixed(4));
                    const briaCost = 0.018; // Coût fixe de BRIA
                    
                    // Créer un tableau des coûts pour trier et attribuer les symboles 💸
                    const costs = [
                        { model: 'ben', cost: benCost, elementId: 'ben-cost-info' },
                        { model: 'birefnet', cost: birefnetCost, elementId: 'birefnet-cost-info' },
                        { model: 'rembg', cost: rembgCost, elementId: 'rembg-cost-info' },
                        { model: 'bria', cost: briaCost, elementId: 'bria-cost-info' } // Ajout de BRIA
                    ];
                    
                    // Trier les coûts du moins cher au plus cher
                    costs.sort((a, b) => a.cost - b.cost);
                    
                    // Attribuer les symboles 💸 en fonction du classement
                    costs.forEach((item, index) => {
                        let symbols = '';
                        // Ajouter des symboles 💸 en fonction du classement (moins de 💸 = moins cher)
                        for (let i = 0; i <= index; i++) {
                            symbols += '💸';
                        }
                        
                        document.getElementById(item.elementId).innerHTML = 
                            `(~${megapixels.toFixed(2)} mégapixels, ~$${item.cost} est.) ${symbols}`;
                    });
                };
                img.src = event.target.result;
            }
            reader.readAsDataURL(selectedImageFile);
        }
    });
    
    // Gestion de l'URL d'image
    document.getElementById('imageUrl').addEventListener('input', function(e) {
        if (e.target.value.trim() !== '') {
            selectedImageUrl = e.target.value.trim();
            // Affichage de l'aperçu depuis l'URL
            document.getElementById('originalImage').src = selectedImageUrl;
            document.getElementById('originalImagePreview').style.display = 'block';
            document.getElementById('imageUpload').value = ''; // Réinitialiser le téléchargement
            selectedImageFile = null; // Réinitialiser le fichier
            
            // Calculer les dimensions de l'image et afficher les informations de coût pour tous les modèles
            const img = new Image();
            img.onload = function() {
                const megapixels = (this.width * this.height) / 1000000;
                const benCost = parseFloat((megapixels * 0.0035).toFixed(4));
                const birefnetCost = parseFloat((megapixels * 0.427 * 0.00111).toFixed(4));
                const rembgCost = parseFloat((megapixels * 0.510 * 0.00111).toFixed(4));
                const briaCost = 0.018; // Coût fixe de BRIA
                
                // Créer un tableau des coûts pour trier et attribuer les symboles 💸
                const costs = [
                    { model: 'ben', cost: benCost, elementId: 'ben-cost-info' },
                    { model: 'birefnet', cost: birefnetCost, elementId: 'birefnet-cost-info' },
                    { model: 'rembg', cost: rembgCost, elementId: 'rembg-cost-info' },
                    { model: 'bria', cost: briaCost, elementId: 'bria-cost-info' } // Ajout de BRIA
                ];
                
                // Trier les coûts du moins cher au plus cher
                costs.sort((a, b) => a.cost - b.cost);
                
                // Attribuer les symboles 💸 en fonction du classement
                costs.forEach((item, index) => {
                    let symbols = '';
                    // Ajouter des symboles 💸 en fonction du classement (moins de 💸 = moins cher)
                    for (let i = 0; i <= index; i++) {
                        symbols += '💸';
                    }
                    
                    document.getElementById(item.elementId).innerHTML = 
                        `(~${megapixels.toFixed(2)} mégapixels, ~$${item.cost} est.) ${symbols}`;
                });
            };
            img.src = selectedImageUrl;
        } else {
            document.getElementById('originalImagePreview').style.display = 'none';
            selectedImageUrl = null;
            // Réinitialiser les informations de coût
            document.getElementById('ben-cost-info').innerHTML = '(Coût par mégapixel)';
            document.getElementById('birefnet-cost-info').innerHTML = '(0.00111$/seconde)';
            document.getElementById('rembg-cost-info').innerHTML = '(0.00111$/seconde)';
            document.getElementById('bria-cost-info').innerHTML = '(0.018$/génération)';
        }
    });
    
    // Gestion du bouton de traitement
    document.getElementById('processBtn').addEventListener('click', processImage);
});

// Fonction pour obtenir les dimensions d'une image
function getImageDimensions(imageUrl) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = function() {
            resolve({
                width: this.width,
                height: this.height,
                megapixels: (this.width * this.height) / 1000000 // Calcul du nombre de mégapixels
            });
        };
        img.onerror = reject;
        img.src = imageUrl;
    });
}

// Fonction pour convertir un fichier en Base64
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            // Récupérer la chaîne de données encodées
            const base64String = reader.result;
            // Ajouter le préfixe de type MIME approprié
            const mimeType = file.type;
            const dataUrl = `data:${mimeType};base64,${base64String.split(',')[1]}`;
            resolve(dataUrl);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

// Fonction pour obtenir les modèles sélectionnés
function getSelectedModels() {
    const models = [];
    if (document.getElementById('briaCheckbox').checked) models.push('bria');
    if (document.getElementById('birefnetCheckbox').checked) models.push('birefnet');
    if (document.getElementById('benCheckbox').checked) models.push('ben');
    if (document.getElementById('rembgCheckbox').checked) models.push('rembg');
    return models;
}

// Fonction pour traiter l'image
async function processImage() {
    const apiKey = document.getElementById('apiKey').value.trim();
    const selectedModels = getSelectedModels();
    
    if (!apiKey) {
        showMessage('Veuillez entrer votre clé API', 'danger');
        return;
    }
    
    if (selectedModels.length === 0) {
        showMessage('Veuillez sélectionner au moins un modèle', 'danger');
        return;
    }
    
    if (!selectedImageFile && !selectedImageUrl) {
        showMessage('Veuillez sélectionner une image à traiter', 'danger');
        return;
    }
    
    // Vérification du format de l'image pour BRIA qui a des limitations
    if (selectedModels.includes('bria') && selectedImageFile) {
        if (!['image/jpeg', 'image/png', 'image/webp'].includes(selectedImageFile.type)) {
            showMessage('Le modèle BRIA ne supporte que les formats JPEG, PNG et WebP', 'danger');
            return;
        }
    }
    
    // Afficher l'indicateur de chargement
    showLoading(true);
    
    try {
        let originalImageForProcessing;
        let imagePreviewUrl;
        
        // Si c'est une URL, on l'utilise directement, sinon on encode le fichier en Base64
        if (selectedImageUrl) {
            originalImageForProcessing = selectedImageUrl;
            imagePreviewUrl = selectedImageUrl;
        } else if (selectedImageFile) {
            // Convertir le fichier en Base64
            originalImageForProcessing = await fileToBase64(selectedImageFile);
            imagePreviewUrl = URL.createObjectURL(selectedImageFile);
        }
        
        // Obtenir les dimensions de l'image pour les calculs de prix
        originalImageDimensions = await getImageDimensions(imagePreviewUrl);
        
        // Réinitialiser le coût total
        totalCost = 0;
        
        // Créer un tableau de promesses pour traiter l'image avec tous les modèles sélectionnés
        const promises = selectedModels.map(model => {
            return processWithModel(apiKey, originalImageForProcessing, model);
        });
        
        // Attendre que toutes les promesses se résolvent
        const results = await Promise.allSettled(promises);
        
        // Afficher les résultats
        let successCount = 0;
        results.forEach((result, index) => {
            if (result.status === 'fulfilled') {
                successCount++;
                // Afficher le résultat pour le modèle correspondant
                displayResultForModel(imagePreviewUrl, result.value.url, selectedModels[index], result.value.cost);
            } else {
                console.error(`Erreur lors du traitement avec le modèle ${selectedModels[index]}:`, result.reason);
                // Afficher l'erreur spécifique pour ce modèle
                displayErrorForModel(selectedModels[index], result.reason);
            }
        });
        
        if (successCount > 0) {
            showMessage(`Traitement terminé avec succès ! ${successCount}/${selectedModels.length} modèles ont abouti. Coût total estimé : ${totalCost.toFixed(6)}$`, 'success');
        } else {
            showMessage('Aucun modèle n\'a pu traiter l\'image avec succès', 'danger');
        }
    } catch (error) {
        console.error('Erreur lors du traitement:', error);
        let errorMessage = `Erreur: ${error.message}`;
        
        // Messages d'erreur plus spécifiques
        if (error.message.includes('401') || error.message.toLowerCase().includes('authorization')) {
            errorMessage = 'Erreur d\'authentification: Veuillez vérifier votre clé API.';
        } else if (error.message.includes('400')) {
            errorMessage = 'Erreur de requête: Les paramètres envoyés sont invalides.';
        } else if (error.message.includes('404')) {
            errorMessage = 'Erreur: Le modèle ou l\'URL demandé n\'existe pas.';
        } else if (error.message.includes('429')) {
            errorMessage = 'Erreur: Trop de requêtes, veuillez réessayer plus tard.';
        } else if (error.message.includes('500') || error.message.includes('502') || error.message.includes('503')) {
            errorMessage = 'Erreur du serveur: Le service est temporairement indisponible.';
        } else if (error.message.includes('NetworkError') || error.message.includes('Failed to fetch')) {
            errorMessage = 'Erreur réseau: Impossible de contacter le service. Vérifiez votre connexion internet.';
        }
        
        showMessage(errorMessage, 'danger');
    } finally {
        showLoading(false);
    }
}

// Fonction pour traiter une image avec un modèle spécifique
async function processWithModel(apiKey, imageUrl, model) {
    let resultUrl, cost = 0;
    
    switch(model) {
        case 'bria':
            resultUrl = await processWithBria(apiKey, imageUrl);
            cost = 0.018; // Coût fixe par génération
            totalCost += cost;
            break;
        case 'birefnet':
            resultUrl = await processWithBirefnet(apiKey, imageUrl);
            // BiRefNet est facturé à $0.00111/seconde, basé sur nos tests : ~0.427 secondes/mégapixel
            if (originalImageDimensions) {
                const megapixels = originalImageDimensions.megapixels;
                const estimatedTime = megapixels * 0.427; // secondes
                cost = estimatedTime * 0.00111; // $0.00111 par seconde
            } else {
                cost = 0.01; // estimation par défaut
            }
            totalCost += cost;
            break;
        case 'ben':
            resultUrl = await processWithBen(apiKey, imageUrl);
            // Ben V2 est facturé par mégapixel - environ $0.0035 par mégapixel
            if (originalImageDimensions) {
                const megapixels = originalImageDimensions.megapixels;
                cost = megapixels * 0.0035; // Prix par mégapixel pour Ben V2
            } else {
                cost = 0.01; // estimation par défaut
            }
            totalCost += cost;
            break;
        case 'rembg':
            resultUrl = await processWithRembg(apiKey, imageUrl);
            // REMBG est facturé à $0.00111/seconde, basé sur nos tests : ~0.510 secondes/mégapixel
            if (originalImageDimensions) {
                const megapixels = originalImageDimensions.megapixels;
                const estimatedTime = megapixels * 0.510; // secondes
                cost = estimatedTime * 0.00111; // $0.00111 par seconde
            } else {
                cost = 0.01; // estimation par défaut
            }
            totalCost += cost;
            break;
        default:
            throw new Error('Modèle non supporté');
    }
    
    return { url: resultUrl, cost: cost };
}

// Fonction pour afficher un message
function showMessage(message, type) {
    const statusDiv = document.getElementById('statusMessage');
    statusDiv.innerHTML = `<div class="alert alert-${type}" role="alert">${message}</div>`;
}

// Fonction pour afficher/cacher l'indicateur de chargement
function showLoading(show) {
    const loadingIndicator = document.getElementById('loadingIndicator');
    loadingIndicator.style.display = show ? 'block' : 'none';
}

// Fonction pour afficher le résultat pour un modèle spécifique
function displayResultForModel(originalUrl, resultUrl, model, cost) {
    const resultsGrid = document.getElementById('resultsGrid');
    
    // Créer un conteneur pour ce résultat spécifique
    const resultDiv = document.createElement('div');
    resultDiv.className = 'col-md-6 mb-4';
    resultDiv.id = `result-${model}`;
    
    resultDiv.innerHTML = `
        <div class="card">
            <div class="card-header">
                <h6>${getModelName(model)} 
                ${cost > 0 ? `<small class="text-success float-end">Coût: ${cost.toFixed(6)}$</small>` : ''}
                </h6>
            </div>
            <div class="card-body text-center">
                <div class="row">
                    <div class="col-6">
                        <h7>Avant</h7>
                        <img src="${originalUrl}" class="image-preview" alt="Image originale">
                    </div>
                    <div class="col-6">
                        <h7>Après</h7>
                        <img src="${resultUrl}" class="image-preview" alt="Image traitée avec ${getModelName(model)}">
                    </div>
                </div>
                <div class="mt-3">
                    <button class="btn btn-sm btn-success" onclick="downloadImage('${resultUrl}', 'resultat-${model}.png')">Télécharger</button>
                </div>
            </div>
        </div>
    `;
    
    resultsGrid.appendChild(resultDiv);
    
    // Afficher le conteneur de résultats
    document.getElementById('resultContainer').style.display = 'block';
}

// Fonction pour afficher une erreur pour un modèle spécifique
function displayErrorForModel(model, error) {
    const resultsGrid = document.getElementById('resultsGrid');
    
    // Créer un conteneur pour cette erreur spécifique
    const errorDiv = document.createElement('div');
    errorDiv.className = 'col-md-6 mb-4';
    errorDiv.id = `error-${model}`;
    
    let errorMessage = error.message;
    
    // Messages d'erreur plus spécifiques
    if (error.message.includes('401') || error.message.toLowerCase().includes('authorization')) {
        errorMessage = 'Erreur d\'authentification: Veuillez vérifier votre clé API.';
    } else if (error.message.includes('400')) {
        errorMessage = 'Erreur de requête: Les paramètres envoyés sont invalides.';
    } else if (error.message.includes('404')) {
        errorMessage = 'Erreur: Le modèle ou l\'URL demandé n\'existe pas.';
    } else if (error.message.includes('429')) {
        errorMessage = 'Erreur: Trop de requêtes, veuillez réessayer plus tard.';
    } else if (error.message.includes('500') || error.message.includes('502') || error.message.includes('503')) {
        errorMessage = 'Erreur du serveur: Le service est temporairement indisponible.';
    } else if (error.message.includes('NetworkError') || error.message.includes('Failed to fetch')) {
        errorMessage = 'Erreur réseau: Impossible de contacter le service. Vérifiez votre connexion internet.';
    }
    
    errorDiv.innerHTML = `
        <div class="card">
            <div class="card-header bg-danger text-white">
                <h6>${getModelName(model)}</h6>
            </div>
            <div class="card-body text-center">
                <div class="alert alert-danger" role="alert">
                    <i class="fas fa-exclamation-triangle"></i> ${errorMessage}
                </div>
            </div>
        </div>
    `;
    
    resultsGrid.appendChild(errorDiv);
    
    // Afficher le conteneur de résultats
    document.getElementById('resultContainer').style.display = 'block';
}

// Fonction pour télécharger une image
function downloadImage(imageUrl, filename) {
    // Créer une balise <a> temporaire
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = filename; // Nom du fichier à télécharger
    
    // Cacher la balise et l'ajouter au DOM
    link.style.display = 'none';
    document.body.appendChild(link);
    
    // Simuler un clic sur le lien
    link.click();
    
    // Retirer la balise du DOM
    document.body.removeChild(link);
}

// Fonction pour obtenir le nom complet d'un modèle
function getModelName(model) {
    const modelNames = {
        'bria': 'BRIA RMBG 2.0',
        'birefnet': 'BiRefNet',
        'ben': 'Ben V2 Image',
        'rembg': 'REMBG'
    };
    return modelNames[model] || model;
}

// Fonction pour envoyer la requête à BRIA RMBG 2.0
async function processWithBria(apiKey, imageInput) {
    try {
        // Vérifier si l'entrée est une URL (commence par http) ou une chaîne de données Base64
        let requestBody;
        if (imageInput.startsWith('http')) {
            // C'est une URL, on l'envoie comme image_url
            requestBody = JSON.stringify({ image_url: imageInput });
        } else {
            // C'est une chaîne Base64, on l'envoie comme image_data
            // Selon la documentation, on peut envoyer une Base64 data URI
            requestBody = JSON.stringify({ image_url: imageInput });
        }
        
        const response = await fetch('https://fal.run/fal-ai/bria/background/remove', {
            method: 'POST',
            headers: {
                'Authorization': `Key ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: requestBody
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Erreur BRIA API: ${response.status} ${response.statusText}. Détails: ${errorText}`);
        }
        
        const result = await response.json();
        if (!result.image || !result.image.url) {
            throw new Error('Réponse invalide de l\'API BRIA: URL de l\'image manquante');
        }
        return result.image.url;
    } catch (error) {
        console.error('Erreur détaillée avec BRIA:', error);
        throw error;
    }
}

// Fonction pour envoyer la requête à BiRefNet
async function processWithBirefnet(apiKey, imageInput) {
    try {
        // Vérifier si l'entrée est une URL (commence par http) ou une chaîne de données Base64
        let requestBody;
        if (imageInput.startsWith('http')) {
            // C'est une URL, on l'envoie comme image_url
            requestBody = JSON.stringify({ image_url: imageInput });
        } else {
            // C'est une chaîne Base64, on l'envoie comme image_url
            requestBody = JSON.stringify({ image_url: imageInput });
        }
        
        const response = await fetch('https://fal.run/fal-ai/birefnet/v2', {
            method: 'POST',
            headers: {
                'Authorization': `Key ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: requestBody
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Erreur BiRefNet API: ${response.status} ${response.statusText}. Détails: ${errorText}`);
        }
        
        const result = await response.json();
        if (!result.image || !result.image.url) {
            throw new Error('Réponse invalide de l\'API BiRefNet: URL de l\'image manquante');
        }
        return result.image.url;
    } catch (error) {
        console.error('Erreur détaillée avec BiRefNet:', error);
        throw error;
    }
}

// Fonction pour envoyer la requête à Ben V2 Image
async function processWithBen(apiKey, imageInput) {
    try {
        // Vérifier si l'entrée est une URL (commence par http) ou une chaîne de données Base64
        let requestBody;
        if (imageInput.startsWith('http')) {
            // C'est une URL, on l'envoie comme image_url
            requestBody = JSON.stringify({ image_url: imageInput });
        } else {
            // C'est une chaîne Base64, on l'envoie comme image_url
            requestBody = JSON.stringify({ image_url: imageInput });
        }
        
        const response = await fetch('https://fal.run/fal-ai/ben/v2/image', {
            method: 'POST',
            headers: {
                'Authorization': `Key ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: requestBody
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Erreur Ben V2 API: ${response.status} ${response.statusText}. Détails: ${errorText}`);
        }
        
        const result = await response.json();
        if (!result.image || !result.image.url) {
            throw new Error('Réponse invalide de l\'API Ben V2: URL de l\'image manquante');
        }
        return result.image.url;
    } catch (error) {
        console.error('Erreur détaillée avec Ben V2:', error);
        throw error;
    }
}

// Fonction pour envoyer la requête à REMBG
async function processWithRembg(apiKey, imageInput) {
    try {
        // Vérifier si l'entrée est une URL (commence par http) ou une chaîne de données Base64
        let requestBody;
        if (imageInput.startsWith('http')) {
            // C'est une URL, on l'envoie comme image_url
            requestBody = JSON.stringify({ image_url: imageInput });
        } else {
            // C'est une chaîne Base64, on l'envoie comme image_url
            requestBody = JSON.stringify({ image_url: imageInput });
        }
        
        const response = await fetch('https://fal.run/fal-ai/imageutils/rembg', {
            method: 'POST',
            headers: {
                'Authorization': `Key ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: requestBody
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Erreur REMBG API: ${response.status} ${response.statusText}. Détails: ${errorText}`);
        }
        
        const result = await response.json();
        if (!result.image || !result.image.url) {
            throw new Error('Réponse invalide de l\'API REMBG: URL de l\'image manquante');
        }
        return result.image.url;
    } catch (error) {
        console.error('Erreur détaillée avec REMBG:', error);
        throw error;
    }
}