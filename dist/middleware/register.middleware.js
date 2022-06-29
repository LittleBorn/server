"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InvalidArgumentException_1 = require("../exceptions/InvalidArgumentException");
async function registerMiddleware(request, response, next) {
    const user = request.body;
    if (typeof user.email === 'undefined' || typeof user.firstName === 'undefined' || typeof user.lastName === 'undefined' || typeof user.password === 'undefined') {
        next(new InvalidArgumentException_1.default());
    }
    else {
        next();
    }
}
exports.default = registerMiddleware;
//# sourceMappingURL=register.middleware.js.map