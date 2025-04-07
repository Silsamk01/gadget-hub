const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const { isLoggedIn } = require('../middleware/auth');

router.post('/:productId', isLoggedIn, async (req, res) => {
    try {
        const { rating, comment } = req.body;
        const review = await Review.create({
            productId: req.params.productId,
            userId: req.session.user.id,
            rating,
            comment
        });
        
        // Update product rating
        const product = await Product.findByPk(req.params.productId);
        await product.Vendor.updateRating();
        
        res.redirect(`/products/${req.params.productId}`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Review submission failed');
    }
});