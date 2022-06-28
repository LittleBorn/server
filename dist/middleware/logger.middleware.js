"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const loggingHelper = require("../utils/loggingHelper");
function loggerMiddleware(request, response, next) {
    console.log(`${request.method} ${request.path}`);
    loggingHelper.log(loggingHelper.LoggingLevel.info, `${request.method} ${request.path}`);
    next();
}
exports.default = loggerMiddleware;
//# sourceMappingURL=logger.middleware.js.map