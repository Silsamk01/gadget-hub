const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const UserModel = require('./User');

const VendorModel = sequelize.define('Vendor', {
    businessName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    rating: {
        type: DataTypes.DECIMAL(3, 2),
        defaultValue: 0.0
    },
    location: {
        type: DataTypes.GEOMETRY('POINT')
    }
});

// Association with User
VendorModel.belongsTo(UserModel, { foreignKey: 'userId' });

module.exports = VendorModel;