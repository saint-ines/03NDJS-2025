const fs = require('fs');
const cheerio = require('cheerio');

// Fonction pour récupérer et parser le tableau
async function recupererTableau() {
    try {
        const $ = await cheerio.fromURL("https://www.footmercato.net/europe/ligue-des-champions-uefa/classement");
        
        // Sélectionner le tableau avec le sélecteur passé en paramètre
        const tableau = $('table');
        
        // Étape 1 : Récupérer les en-têtes du tableau
        const headers = [];
        tableau.find('thead tr th').each((i, el) => {
            headers.push($(el).text().trim());
        });
        
        // Si aucun en-tête n'est trouvé, utiliser les premières cellules
        if (headers.length == 0) {
            tableau.find('tr').first().find('td, th').each((i, el) => {
                headers.push($(el).text().trim());
            });
        }
        
        // Étape 2 : Parcourir les lignes du tableau pour récupérer les données
        let lignes = [];
        // Trouver les lignes du corps du tableau
        let rows = tableau.find('table');
        if (rows.length == 0) {
            // Aucune balise <tbody>, on récupère tous les <tr> et on passe la première ligne
            rows = tableau.find('tr').slice(1);
        }
        
        rows.each((i, element) => {
            let ligne = {};
            // Pour chaque cellule <td> de la ligne
            $(element).find('td').each((j, cell) => {
                const key = headers[j] || 'col' + (j + 1);
                ligne[key] = $(cell).text().trim();
            });
            lignes.push(ligne);
        });
        
        // Sauvegarder les données dans un fichier JSON
        await sauvegarderDonnees(lignes);
        
        return lignes;
    } catch (error) {
        console.error("Erreur lors de la récupération du tableau :", error);
        return [];
    }
}

// Fonction pour sauvegarder les données dans un fichier JSON
async function sauvegarderDonnees(data) {
    try {
        const jsonData = JSON.stringify(data, null, 2);
        fs.writeFileSync('sauvegarde.json', jsonData);
        console.log('Données sauvegardées avec succès dans sauvegarde.json');
    } catch (error) {
        console.error("Erreur lors de la sauvegarde des données :", error);
    }
}

// Appeler la fonction principale
recupererTableau();
