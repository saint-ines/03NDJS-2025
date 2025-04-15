import * as cheerio from 'cheerio';
import fs from 'fs';

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
    if (headers.length === 0) {
      tableau.find('tr').first().find('td, th').each((i, el) => {
        headers.push($(el).text().trim());
      });
    }
    
    // Étape 2 : Parcourir les lignes du tableau pour récupérer les données
    let lignes = [];
    // Trouver les lignes du corps du tableau
    let rows = tableau.find('tbody tr');
    if (rows.length === 0) {
      // Aucune balise <tbody>, on récupère tous les <tr> et on passe la première ligne
      rows = tableau.find('tr').slice(1);
    }
    
    rows.each((i, element) => {
      let ligne = {};
      // Pour chaque cellule <td> de la ligne
      $(element).find('td').each((j, cell) => {
        const key = headers[j] || `col${j + 1}`;
        ligne[key] = $(cell).text().trim();
      });
      lignes.push(ligne);
    });
    
    // return lignes;
    console.log(lignes)
  } catch (error) {
    console.error("Erreur lors de la récupération du tableau :", error);
    return [];
  }
}
recupererTableau()
