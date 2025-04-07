const express = require('express');
const router = express.Router();
const { Product, Order, OrderItem } = require('../models');
const { isLoggedIn } = require('../middleware/auth');

// Add to cart
router.post('/add', isLoggedIn, async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const product = await Product.findByPk(productId);
        
        if (!product || product.stock < quantity) {
            return res.status(400).send('Invalid product or insufficient stock');
        }
        
        const cart = req.session.cart || [];
        const existingItem = cart.find(item => item.productId == productId);
        
        if (existingItem) {
            existingItem.quantity += parseInt(quantity);
        } else {
            cart.push({
                productId,
                quantity: parseInt(quantity),
                price: product.price,
                name: product.name
            });
        }
        
        req.session.cart = cart;
        res.redirect('/cart');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding to cart');
    }
});

// Checkout process
router.post('/checkout', isLoggedIn, async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const { cart } = req.session;
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        const order = await Order.create({
            userId: req.session.user.id,
            total,
            status: 'pending'
        }, { transaction });
        
        for (const item of cart) {
            await OrderItem.create({
                orderId: order.id,
                productId: item.productId,
                quantity: item.quantity,
                price: item.price
            }, { transaction });
            
            await Product.decrement('stock', {
                by: item.quantity,
                where: { id: item.productId },
                transaction
            });
        }
        
        await transaction.commit();
        req.session.cart = [];
        res.render('cart/success', { orderId: order.id });
    } catch (error) {
        await transaction.rollback();
        console.error(error);
        res.status(500).send('Checkout failed');
    }
});

module.exports = router;