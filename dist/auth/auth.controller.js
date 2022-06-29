"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class AuthenticationController {
    constructor() {
        this.path = '/auth';
        this.router = express_1.Router();
        this.register = async (request, response, next) => {
        };
        this.login = async (request, response, next) => {
        };
        this.logout = async (request, response, next) => {
        };
        console.log("Initialize Authentication...");
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}/login`, this.login);
        this.router.post(`${this.path}/register`, this.register);
        this.router.get(`${this.path}/logout/:id`, this.logout);
    }
}
exports.default = AuthenticationController;
//# sourceMappingURL=auth.controller.js.map