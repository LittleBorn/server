"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_service_1 = require("./auth.service");
const auth_middleware_1 = require("../middleware/auth.middleware");
class AuthenticationController {
    constructor() {
        this.path = '/auth';
        this.router = express_1.Router();
        this.authService = new auth_service_1.AuthService();
        this.logout = async (request, response, next) => {
            response.send(JSON.stringify(new Date()));
        };
        console.log("Initialize Authentication...");
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}/logout`, auth_middleware_1.default, this.logout);
    }
}
exports.default = AuthenticationController;
//# sourceMappingURL=auth.controller.js.map