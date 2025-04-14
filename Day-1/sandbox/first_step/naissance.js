const readline = require('readline');

// Création de l'interface pour lire les entrées utilisateur
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Fonction principale
function demanderInfosUtilisateur() {
  rl.question("Quel est ton nom ? ", (nom) => {
    rl.question("Quel est ton âge ? ", (age) => {
      const anneeActuelle = new Date().getFullYear();
      const anneeNaissance = anneeActuelle - parseInt(age);
      
      console.log(`\nBonjour ${nom} !`);
      console.log(`Tu es né(e) en ${anneeNaissance}.\n`);

      rl.close(); // on ferme l'interface readline
    });
  });
}

// Lancer la fonction
demanderInfosUtilisateur();
