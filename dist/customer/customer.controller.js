"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const customer_model_1 = require("../schemas/customer.model");
const auth_middleware_1 = require("../middleware/auth.middleware");
class CustomerController {
    constructor() {
        this.path = '/customer';
        this.router = express_1.Router();
        this.addChildAssociation = async (request, response, next) => {
            const childrenId = request.params.id;
            const parentId = request.headers.authorization.split(' ')[1];
            if (typeof childrenId === "string" && typeof parentId === "string") {
                const parent = await customer_model_1.default.findOne({ _id: parentId });
                response.json(parent);
            }
            else {
                response.status(402).json({ err: "error occured" });
            }
        };
        console.log("Initialize Customer Controller...");
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}/:id`, auth_middleware_1.default, this.addChildAssociation);
        // this.router.delete(`${this.path}/:id`, authMiddleware, this.removeChild);
    }
}
exports.default = CustomerController;
//# sourceMappingURL=customer.controller.js.map