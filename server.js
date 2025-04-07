const express = require('express');
const app = express();
const session = require('express-session');
const path = require('path');
const ejs = require('ejs');
const { sequelize } = require('./backend/models');

// Configure middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: process.env.SESSION_SECRET || 'your_strong_secret_here',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === 'production' }
}));

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Import routes after app initialization
const homeRouter = require('./backend/routes/home');
const vendorsRouter = require('./backend/routes/vendors');
const productsRouter = require('./backend/routes/products');
const searchRouter = require('./backend/routes/search');
const cartRouter = require('./backend/routes/cart');

// Mount routes
app.use('/', homeRouter);
app.use('/vendors', vendorsRouter);
app.use('/products', productsRouter);
app.use('/search', searchRouter);
app.use('/cart', cartRouter);

// Database synchronization
sequelize.sync({ alter: true })
    .then(() => {
        console.log('Database synchronized');
        // Start the server after synchronization
        app.listen(3000, () => {
            console.log('Server running on port 3000');
        });
    })
    .catch(error => {
        console.error('Database sync error:', error);
        process.exit(1);
    });
