// connectDB.js
const mongoose = require('mongoose');

/**
 * Fonction pour se connecter à la base de données MongoDB
 * @param {string} uri - URI de connexion MongoDB
 * @returns {Promise} - Promesse de connexion Mongoose
 */
const connectDB = async (uri) => {
  try {
    // Options de connexion
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    // Connexion à MongoDB
    const conn = await mongoose.connect(uri, options);
    
    console.log(`MongoDB connecté: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`Erreur de connexion: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
