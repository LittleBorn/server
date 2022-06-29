"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("./HttpException");
class InvalidArgumentException extends HttpException_1.default {
    constructor() {
        super(401, "Error occured while trying to perform authentication request");
    }
}
exports.default = InvalidArgumentException;
//# sourceMappingURL=AuthenticationException.js.map