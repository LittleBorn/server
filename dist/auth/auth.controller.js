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
        this.getShopifyIdFromAccessToken = async (request, response, next) => {
            const accessToken = request.headers.authorization.split(' ')[1];
            const shopifyId = await this.authService.getShopifyIdWithAccessToken(accessToken);
            response.status(200).json({
                id: shopifyId
            });
        };
        this.getCustomerIdFromAccessToken = async (request, response, next) => {
            const accessToken = request.headers.authorization.split(' ')[1];
            const customerId = await this.authService.getCustomerIdWithAccessToken(accessToken);
            response.status(200).json({
                id: customerId
            });
        };
        console.log("Initialize Authentication...");
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}/logout`, auth_middleware_1.default, this.logout);
        this.router.get(`${this.path}/getShopifyIdFromAccessToken`, auth_middleware_1.default, this.getShopifyIdFromAccessToken);
        this.router.get(`${this.path}/getCustomerIdFromAccessToken`, auth_middleware_1.default, this.getCustomerIdFromAccessToken);
    }
}
exports.default = AuthenticationController;
//# sourceMappingURL=auth.controller.js.map