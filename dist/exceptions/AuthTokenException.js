"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("./HttpException");
class AuthTokenException extends HttpException_1.default {
    constructor() {
        super(401, "Invalid Token");
    }
}
exports.default = AuthTokenException;
//# sourceMappingURL=AuthTokenException.js.map