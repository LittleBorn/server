"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const firebaseHelper_1 = require("../utils/firebaseHelper");
const register_middleware_1 = require("../middleware/register.middleware");
class AuthenticationController {
    constructor() {
        this.path = '/auth';
        this.router = express_1.Router();
        this.register = async (request, response, next) => {
            console.log("Register...");
            const user = request.body;
            try {
                const userCredential = await firebaseHelper_1.createUserWithEmailAndPassword(firebaseHelper_1.auth, user.email, user.password);
                await firebaseHelper_1.sendEmailVerification(userCredential.user);
                console.log(userCredential);
                response.send(userCredential);
            }
            catch (error) {
                response.json({
                    error: error.code,
                    message: error.message
                });
            }
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
        this.router.post(`${this.path}/register`, register_middleware_1.default, this.register);
        this.router.get(`${this.path}/logout/:id`, this.logout);
    }
}
exports.default = AuthenticationController;
//# sourceMappingURL=auth.controller.js.map