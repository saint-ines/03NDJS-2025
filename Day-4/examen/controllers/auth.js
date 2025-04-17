const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const User = require('../models/user');
const { JWT_SECRET } = process.env;

exports.register = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = user.create({
            id: uuidv4(),
            email,
            password: hashedPassword,
        });

        const { password: _, ...userWithoutPassword } = user;

        res.status(201).json(userWithoutPassword);
    } catch (error) {
        res.status(500).json({ message: 'error.message' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }
    const user = User.findByEmail(email);
    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'error.message' });
    }
};

exports.getMe = async (req, res) => {
    try {
      const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const { password: _, ...userWithoutPassword } = user;
        res.json(userWithoutPassword);
    } catch (error) {
        res.status(500).json({ message: 'error.message' });
    }
};

exports.getUsers = async (req, res) => {
    try {
        const users = User.findAll().map(user => {
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'error.message' });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = user.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.delete(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'error.message' });
    }
};