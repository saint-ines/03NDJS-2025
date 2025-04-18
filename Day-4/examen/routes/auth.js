const express = require('express');
const router = express.Router();
const {
    register,
    login,
    getMe,
    deleteUser,    
}   = require('../controllers/auth');
const { authenticate } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);

router.get('/me', authenticate, getMe);
router.get('/users', authenticate, getMe);
router.delete('/users/:id', authenticate, deleteUser);

    module.exports = router;