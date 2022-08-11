"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const customer_model_1 = require("../schemas/customer.model");
const shopifyStorefrontHelper_1 = require("../utils/shopifyStorefrontHelper");
class AuthService {
    async authenticateClient(accessToken) {
        var _a, _b, _c;
        var data = JSON.stringify({
            query: `query {
            customer(customerAccessToken: "${accessToken}") {
              id
            }
          }`,
            variables: {}
        });
        const result = await shopifyStorefrontHelper_1.sendStorefrontQuery(data);
        if (((_a = result.data) === null || _a === void 0 ? void 0 : _a.customer) && typeof ((_c = (_b = result.data) === null || _b === void 0 ? void 0 : _b.customer) === null || _c === void 0 ? void 0 : _c.id) == "string") {
            return true;
        }
        else {
            return false;
        }
    }
    async getShopifyIdWithAccessToken(accessToken) {
        var _a, _b, _c, _d, _e;
        var data = JSON.stringify({
            query: `query {
            customer(customerAccessToken: "${accessToken}") {
              id
            }
          }`,
            variables: {}
        });
        const result = await shopifyStorefrontHelper_1.sendStorefrontQuery(data);
        if (((_a = result.data) === null || _a === void 0 ? void 0 : _a.customer) && typeof ((_c = (_b = result.data) === null || _b === void 0 ? void 0 : _b.customer) === null || _c === void 0 ? void 0 : _c.id) == "string") {
            return (_e = (_d = result.data) === null || _d === void 0 ? void 0 : _d.customer) === null || _e === void 0 ? void 0 : _e.id;
        }
        else {
            return undefined;
        }
    }
    async getCustomerIdWithAccessToken(accessToken) {
        const shopifyId = await this.getShopifyIdWithAccessToken(accessToken);
        if (!shopifyId)
            return undefined;
        const customer = await customer_model_1.default.findOne({ shopifyId: shopifyId });
        if (!customer)
            return undefined;
        return customer._id;
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map