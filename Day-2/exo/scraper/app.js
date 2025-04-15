import * as cheerio from 'cheerio';

// Fonction pour récupérer et parser le tableau
async function recupererTableau(url, tableSelector) {
  try {

const $ = await cheerio.fromURL('https://www.footmercato.net/europe/ligue-des-champions-uefa/classement');
    
    // Sélectionner le tableau avec le sélecteur passé en paramètre
    const tableau = $(tableSelector);
    
    // Étape 1 : Extraire les en-têtes (headers) du tableau
    // Essayer de cibler le <thead> pour plus de précision
    let headers = [];
    if (tableau.find('thead').length > 0) {
      tableau.find('thead tr th').each((i, element) => {
        headers.push($(element).text().trim());
      });
    } else {
      // Si pas de <thead>, on suppose que la première ligne de <tr> contient les headers
      tableau.find('tr').first().find('td, th').each((i, element) => {
        headers.push($(element).text().trim());
      });
    }
    
    // Étape 2 : Parcourir les lignes du tableau pour récupérer les données
    let lignes = [];
    
    // On commence à récupérer les lignes. Si un <tbody> existe, on utilise ses <tr>,
    // sinon on prend tous les <tr> en ignorant la première ligne (headers).
    let rows = tableau.find('tbody tr');
    if (rows.length === 0) {
      // Aucune balise <tbody>, on récupère tous les <tr> et on passe la première ligne
      rows = tableau.find('tr').slice(1);
    }

    rows.each((i, element) => {
      let ligne = {};
      // Pour chaque cellule <td> de la ligne
      $(element).find('td').each((j, cell) => {
        // Si un header est présent, utiliser son texte, sinon générer une clé automatique
        const key = headers[j] || `col${j + 1}`;
        ligne[key] = $(cell).text().trim();
      });
      // On ajoute la ligne dans le tableau de résultats
      lignes.push(ligne);
    });
    
    return lignes;
    
  } catch (error) {
    console.error("Erreur lors de la récupération du tableau :", error);
    return [];
  }
}

// Exemple d'utilisation de la fonction
(async () => {
  const url = 'https://www.footmercato.net/europe/ligue-des-champions-uefa/classement';
  const tableSelector = 'table'; // Adapte le sélecteur au tableau que tu veux récupérer

  const tableauObjet = await recupererTableau(url, tableSelector);
  console.log("Tableau en objets :", tableauObjet);
})();
