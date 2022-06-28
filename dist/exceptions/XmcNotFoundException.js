"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("./HttpException");
class XmcNotFoundException extends HttpException_1.default {
    constructor(id) {
        super(404, `Xmc with id ${id} not found`);
    }
}
exports.default = XmcNotFoundException;
//# sourceMappingURL=XmcNotFoundException.js.map