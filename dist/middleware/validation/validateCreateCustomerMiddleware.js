"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InvalidArgumentException_1 = require("../../exceptions/InvalidArgumentException");
async function validateCreateCustomerMiddleware(request, response, next) {
    const customer = request.body;
    if (typeof customer.shopifyId === 'undefined') {
        next(new InvalidArgumentException_1.default());
    }
    else {
        next();
    }
}
exports.default = validateCreateCustomerMiddleware;
//# sourceMappingURL=validateCreateCustomerMiddleware.js.map