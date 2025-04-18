const express = require('express');
const { getAllUsers, deleteUser } = require('../controllers/users');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

const router = express.Router();

router.get('/', adminMiddleware, getAllUsers);
router.delete('/:id', adminMiddleware, deleteUser);

module.exports = router;