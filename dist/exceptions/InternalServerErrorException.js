"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("./HttpException");
class InternalServerErrorException extends HttpException_1.default {
    constructor(msg) {
        super(401, msg || "Error occured while processing the request!");
    }
}
exports.default = InternalServerErrorException;
//# sourceMappingURL=InternalServerErrorException.js.map