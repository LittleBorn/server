"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeChildAssociation = exports.addChildAssociation = exports.remove = exports.create = exports.get = void 0;
const auth_service_1 = require("../auth/auth.service");
const customer_model_1 = require("../schemas/customer.model");
exports.get = async (customerId) => {
    try {
        const customer = await customer_model_1.default.findOne({ _id: customerId });
        return customer;
    }
    catch (e) {
        return undefined;
    }
};
exports.create = async (customer) => {
    const authService = new auth_service_1.AuthService();
    const customerId = await authService.getShopifyIdWithAccessToken(customer.shopifyId);
    try {
        const dbCustomer = await customer_model_1.default.create({
            shopifyId: customerId,
            children: []
        });
        return dbCustomer;
    }
    catch (e) {
        return undefined;
    }
};
exports.remove = async (id) => {
};
exports.addChildAssociation = async (shopifyId, childrenId) => {
    const customer = await customer_model_1.default.findOne({ shopifyId: shopifyId });
    customer.children.push(childrenId);
    const savedDoc = await customer.save();
    if (customer == savedDoc) {
        return savedDoc;
    }
    else {
        return undefined;
    }
};
exports.removeChildAssociation = async (shopifyId, childrenId) => {
    const customer = await customer_model_1.default.findOne({ shopifyId: shopifyId });
    customer.children = customer.children.filter((i) => i !== childrenId);
    const savedDoc = await customer.save();
    if (customer == savedDoc) {
        return savedDoc;
    }
    else {
        return undefined;
    }
};
//# sourceMappingURL=customer.service.js.map