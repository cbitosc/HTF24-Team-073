const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose'); // Make sure Mongoose is imported
const User = require('../models/User');

const router = express.Router();

// Register User
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User created' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Login User
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get User Dashboard Data
router.get('/dashboard', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.json({
            totalHours: user.totalVolunteerHours,
            totalDonated: user.totalDonated,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.post('/update-hours', authenticateToken, async (req, res) => {
    const { hours } = req.body;

    try {
        const user = await User.findById(req.user.id);
        user.totalVolunteerHours += hours; // Increment the existing hours
        await user.save();
        res.json({ message: 'Volunteer hours updated', totalVolunteerHours: user.totalVolunteerHours });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// Update Donations
router.post('/update-donations', authenticateToken, async (req, res) => {
    const { amount } = req.body;

    try {
        const user = await User.findById(req.user.id);
        user.totalDonated += amount; // Increment the existing donations
        await user.save();
        res.json({ message: 'Donations updated', totalDonated: user.totalDonated });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Middleware to Authenticate Token
function authenticateToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

module.exports = router;

