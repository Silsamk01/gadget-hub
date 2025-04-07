const express = require('express');
const router = express.Router();
const { Product, Vendor } = require('../models');
const { isVerifiedVendor } = require('../middleware/auth');

// Product listing
router.get('/', async (req, res) => {
    try {
        const products = await Product.findAll({
            include: [Vendor],
            where: { vendorId: req.query.vendor_id }
        });
        res.render('products/catalog', { products });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

// Product creation
router.post('/', isVerifiedVendor, async (req, res) => {
    try {
        const { name, description, price, category, stock } = req.body;
        const product = await Product.create({
            vendorId: req.session.user.id,
            name,
            description,
            price: parseFloat(price),
            category,
            stock: parseInt(stock)
        });
        res.redirect(`/products/${product.id}`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Product creation failed');
    }
});

// Product details
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id, {
            include: [Vendor]
        });
        res.render('products/detail', { product });
    } catch (error) {
        console.error(error);
        res.status(500).send('Product not found');
    }
});

module.exports = router;