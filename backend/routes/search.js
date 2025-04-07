const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Vendor = require('../models/Vendor');

router.get('/', async (req, res) => {
    try {
        const { query, category, minPrice, maxPrice } = req.query;
        
        let searchConditions = { verified: true };
        if (query) {
            searchConditions.name = { [Op.like]: `%${query}%` };
        }
        if (category) {
            searchConditions.category = category;
        }
        if (minPrice || maxPrice) {
            searchConditions.price = {
                ...(minPrice && { [Op.gte]: minPrice }),
                ...(maxPrice && { [Op.lte]: maxPrice })
            };
        }
        
        const products = await Product.findAll({
            where: searchConditions,
            include: [{ model: Vendor, attributes: ['businessName', 'rating'] }]
        });
        
        res.render('search/results', { products, query });
    } catch (error) {
        console.error(error);
        res.status(500).send('Search failed');
    }
});

// In search.js add this route
router.get('/nearby', async (req, res) => {
    try {
        const { latitude, longitude } = req.query;
        const maxDistance = 5000; // 5km
        
        const vendors = await Vendor.findAll({
            where: sequelize.where(
                sequelize.fn('ST_Distance',
                    sequelize.col('location'),
                    sequelize.fn('ST_GeomFromText', `POINT(${longitude} ${latitude})`)
                ),
                '<=',
                maxDistance
            ),
            include: [{ model: Product }]
        });
        
        res.render('search/nearby', { vendors });
    } catch (error) {
        console.error(error);
        res.status(500).send('Location search failed');
    }
});