// backend/middleware/auth.js
const { Vendor, User } = require('../models');

// Middleware to check if user is logged in
const isLoggedIn = (req, res, next) => {
    if (req.session.user) return next();
    res.redirect('/login');
};

// Middleware to check vendor role
const isVendor = (req, res, next) => {
    if (req.session.user?.role === 'vendor') return next();
    res.status(403).render('error', { 
        message: 'Vendor access required' 
    });
};

// Middleware to check verified vendor status
const isVerifiedVendor = async (req, res, next) => {
    try {
        if (!req.session.user) {
            return res.redirect('/login');
        }
        
        const vendor = await Vendor.findOne({ 
            where: { userId: req.session.user.id },
            include: [User]
        });

        if (!vendor) {
            return res.status(403).render('error', {
                message: 'Vendor profile not found'
            });
        }

        if (!vendor.verified) {
            return res.redirect('/vendor/verification-pending');
        }

        req.vendor = vendor; // Attach vendor to request object
        next();
    } catch (error) {
        console.error('Verification error:', error);
        res.status(500).render('error', {
            message: 'Server error during verification'
        });
    }
};

// Admin check middleware
const isAdmin = (req, res, next) => {
    if (req.session.user?.role === 'admin') return next();
    res.status(403).render('error', {
        message: 'Admin privileges required'
    });
};

module.exports = {
    isLoggedIn,
    isVendor,
    isVerifiedVendor,
    isAdmin
};