const express = require('express');
const { check } = require('express-validator');
const authController = require('../controllers/auth');
const authMiddleware = require('../middleware/auth');


const router = express.Router();

router.post('/register', [
  check('email', 'Veuillez inclure un email valide').isEmail(),
  check('password', 'Le mot de passe doit contenir au moins 6 caractères').isLength({ min: 6 })
], register);

router.post('/login', [
  check('email', 'Veuillez inclure un email valide').isEmail(),
  check('password', 'Le mot de passe est requis').exists()
], login);

router.get('/me', authMiddleware, authController.getMe);

module.exports = router;