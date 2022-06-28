"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WrongCredentialsException_1 = require("../exceptions/WrongCredentialsException");
const express_1 = require("express");
const authenticationHelper = require("./authenticationHelper");
class AuthenticationController {
    constructor() {
        this.path = '/auth';
        this.router = express_1.Router();
        this.loggingIn = async (request, response, next) => {
            const AuthToken = await authenticationHelper.checkLDAPCredentials(request.body.username, request.body.password);
            if (AuthToken) {
                console.log("Generated AuthToken: ", AuthToken);
                response.json({ token: AuthToken });
            }
            else {
                next(new WrongCredentialsException_1.default());
            }
        };
        this.clearToken = async (request, response, next) => {
            const token = request.params.id;
            let res = authenticationHelper.clearToken(token);
            if (res) {
                response.send(true);
            }
            else {
                response.send(false);
            }
        };
        console.log("Initialize Authentication...");
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}/login`, this.loggingIn);
        this.router.get(`${this.path}/clearToken/:id`, this.clearToken);
    }
}
exports.default = AuthenticationController;
//# sourceMappingURL=authentication.controller.js.map