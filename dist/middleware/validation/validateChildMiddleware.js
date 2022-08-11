"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InvalidArgumentException_1 = require("../../exceptions/InvalidArgumentException");
async function validateChildMiddleware(request, response, next) {
    const child = request.body;
    if (typeof child.childName === 'undefined' || typeof child.height === 'undefined' || typeof child.weight === 'undefined' || typeof child.gender === 'undefined' || typeof child.birthDate === 'undefined') {
        next(new InvalidArgumentException_1.default());
    }
    else {
        next();
    }
}
exports.default = validateChildMiddleware;
//# sourceMappingURL=validateChildMiddleware.js.map