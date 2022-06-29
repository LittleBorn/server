"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("./HttpException");
class InvalidArgumentException extends HttpException_1.default {
    constructor() {
        super(422, "Invalid Arguments Provided");
    }
}
exports.default = InvalidArgumentException;
//# sourceMappingURL=InvalidArgumentException.js.map