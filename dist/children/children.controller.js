"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateChildMiddleware_1 = require("../middleware/validation/validateChildMiddleware");
const auth_middleware_1 = require("../middleware/auth.middleware");
const children_service_1 = require("./children.service");
class ChildrenController {
    constructor() {
        this.path = '/children';
        this.router = express_1.Router();
        this.addChild = async (request, response, next) => {
            const child = request.body;
            const result = await children_service_1.create(child);
            response.json(result);
        };
        this.removeChild = async (request, response, next) => {
            const id = request.params.id;
            console.log("Got ID: ", id);
            const result = await children_service_1.remove(id);
        };
        console.log("Initialize Children Controller...");
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}/`, auth_middleware_1.default, validateChildMiddleware_1.default, this.addChild);
        this.router.delete(`${this.path}/:id`, auth_middleware_1.default, this.removeChild);
    }
}
exports.default = ChildrenController;
//# sourceMappingURL=children.controller.js.map