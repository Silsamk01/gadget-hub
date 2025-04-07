const express = require('express');
const router = express.Router();
const { Vendor } = require('../models');
const { isVerifiedVendor } = require('../middleware/auth');

router.get('/register', (req, res) => {
    res.render('vendors/register');
});

router.post('/register', async (req, res) => {
    try {
        const vendor = await Vendor.create({
            userId: req.session.user.id,
            ...req.body
        });
        res.redirect('/vendors/dashboard');
    } catch (error) {
        console.error(error);
        res.status(500).send('Vendor registration failed');
    }
});

module.exports = router;