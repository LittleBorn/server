"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AuthTokenException_1 = require("../exceptions/AuthTokenException");
const auth_service_1 = require("../auth/auth.service");
const NotAuthorizedException_1 = require("../exceptions/NotAuthorizedException");
async function authMiddleware(request, response, next) {
    const authHeader = request.headers.authorization;
    try {
        const token = authHeader.split(' ')[1];
        if (typeof token === 'undefined') {
            next(new AuthTokenException_1.default());
        }
        else {
            const authService = new auth_service_1.AuthService();
            const userAuthenticated = await authService.authenticateClient(token);
            if (userAuthenticated) {
                request.headers.token = token;
                next();
            }
            else {
                next(new NotAuthorizedException_1.default());
            }
        }
    }
    catch (_a) {
        next(new AuthTokenException_1.default());
    }
}
exports.default = authMiddleware;
//# sourceMappingURL=auth.middleware.js.map