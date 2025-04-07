const express = require('express');
const router = express.Router();
// Example in home.js
const { Product, Vendor } = require('../models');

router.get('/', async (req, res) => {
    try {
        const featuredProducts = await Product.findAll({
            where: { featured: true },
            limit: 6,
            include: [{ model: Vendor }]
        });

        const verifiedVendors = await Vendor.findAll({
            where: { verified: true },
            limit: 3
        });

        res.render('home/index', {
            featuredProducts,
            verifiedVendors,
            userLocation: req.session.location || { lat: 0, lng: 0 }
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

module.exports = router;