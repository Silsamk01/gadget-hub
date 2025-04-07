const sequelize = require('../config/db');

// Import models
const UserModel = require('./User');
const VendorModel = require('./Vendor');
const ProductModel = require('./Product');
const OrderModel = require('./Order');
const OrderItemModel = require('./OrderItem');

// Define associations
UserModel.hasOne(VendorModel, { foreignKey: 'userId' });
VendorModel.belongsTo(UserModel, { foreignKey: 'userId' });

VendorModel.hasMany(ProductModel, { foreignKey: 'vendorId' });
ProductModel.belongsTo(VendorModel, { foreignKey: 'vendorId' });

UserModel.hasMany(OrderModel, { foreignKey: 'userId' });
OrderModel.belongsTo(UserModel, { foreignKey: 'userId' });

OrderModel.hasMany(OrderItemModel, { foreignKey: 'orderId' });
OrderItemModel.belongsTo(OrderModel, { foreignKey: 'orderId' });

ProductModel.hasMany(OrderItemModel, { foreignKey: 'productId' });
OrderItemModel.belongsTo(ProductModel, { foreignKey: 'productId' });

module.exports = {
    sequelize,
    User: UserModel,
    Vendor: VendorModel,
    Product: ProductModel,
    Order: OrderModel,
    OrderItem: OrderItemModel
};
