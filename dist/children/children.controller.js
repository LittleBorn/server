"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateChildMiddleware_1 = require("../middleware/validation/validateChildMiddleware");
const auth_middleware_1 = require("../middleware/auth.middleware");
const children_service_1 = require("./children.service");
const InternalServerErrorException_1 = require("../exceptions/InternalServerErrorException");
class ChildrenController {
    constructor() {
        this.path = '/children';
        this.router = express_1.Router();
        this.getChild = async (request, response, next) => {
            const id = request.params.id;
            if (typeof id === "string") {
                const result = await children_service_1.get(id);
                if (result) {
                    response.json(result);
                }
                else {
                    next(new InternalServerErrorException_1.default("Could not read Child from database"));
                }
            }
            else {
                next(new InternalServerErrorException_1.default("Error occured while processing provided id"));
            }
        };
        this.addChild = async (request, response, next) => {
            const child = request.body;
            const result = await children_service_1.create(child);
            response.json(result);
        };
        this.removeChild = async (request, response, next) => {
            const id = request.params.id;
            const result = await children_service_1.remove(id);
        };
        console.log("Initialize Children Controller...");
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}/:id`, auth_middleware_1.default, this.getChild);
        this.router.post(`${this.path}/`, auth_middleware_1.default, validateChildMiddleware_1.default, this.addChild);
        this.router.delete(`${this.path}/:id`, auth_middleware_1.default, this.removeChild);
    }
}
exports.default = ChildrenController;
//# sourceMappingURL=children.controller.js.map