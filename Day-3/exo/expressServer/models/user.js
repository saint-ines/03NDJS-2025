// authController.js

const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Configuration
const JWT_SECRET = process.env.JWT_SECRET || 'votre_clé_secrète';
const JWT_EXPIRES_IN = '24h';

// Contrôleur d'authentification
const authController = {
  // Inscription d'un nouvel utilisateur
  register: async (req, res) => {
    try {
      const { username, email, password } = req.body;
      
      // Vérifier si l'utilisateur existe déjà
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: 'Cet email est déjà utilisé' });
      }
      
      // Hasher le mot de passe
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      
      // Créer un nouvel utilisateur
      const newUser = new User({
        username,
        email,
        password: hashedPassword
      });
      
      // Sauvegarder l'utilisateur
      const savedUser = await newUser.save();
      
      // Génération du token JWT
      const token = jwt.sign(
        { id: savedUser._id, email: savedUser.email },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
      );
      
      res.status(201).json({
        message: 'Utilisateur créé avec succès',
        token,
        user: {
          id: savedUser._id,
          username: savedUser.username,
          email: savedUser.email
        }
      });
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de l\'inscription', error: error.message });
    }
  },
  
  // Connexion d'un utilisateur
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      
      // Vérifier si l'utilisateur existe
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }
      
      // Vérifier le mot de passe
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Mot de passe incorrect' });
      }
      
      // Génération du token JWT
      const token = jwt.sign(
        { id: user._id, email: user.email },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
      );
      
      res.status(200).json({
        message: 'Connexion réussie',
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email
        }
      });
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la connexion', error: error.message });
    }
  },
  
  // Vérifier le token JWT (middleware)
  verifyToken: (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token manquant ou invalide' });
      }
      
      const token = authHeader.split(' ')[1];
      
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
      
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Token invalide', error: error.message });
    }
  },
  
  // Obtenir les informations de l'utilisateur connecté
  getCurrentUser: async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password');
      
      if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }
      
      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la récupération des données', error: error.message });
    }
  },
  
  // Déconnexion (côté client)
  logout: (req, res) => {
    res.status(200).json({ message: 'Déconnexion réussie' });
    // Note: La déconnexion réelle se fait côté client en supprimant le token
  }
};

module.exports = authController;
