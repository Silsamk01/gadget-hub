const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { isLoggedIn, isNotLoggedIn } = require('../middleware/auth');

// User registration
router.post('/register', isNotLoggedIn, async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
            role
        });
        
        req.session.user = user;
        res.redirect(role === 'vendor' ? '/vendors/register' : '/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Registration failed');
    }
});

// User login
router.post('/login', isNotLoggedIn, async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).send('Invalid credentials');
        }
        
        req.session.user = user;
        res.redirect(user.role === 'vendor' ? '/vendors/dashboard' : '/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Login failed');
    }
});

// Logout
router.get('/logout', isLoggedIn, (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});

module.exports = router;