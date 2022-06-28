"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.agent = void 0;
const https = require("https");
// At request level
exports.agent = new https.Agent({
    rejectUnauthorized: false,
});
//# sourceMappingURL=connectionHelper.js.map