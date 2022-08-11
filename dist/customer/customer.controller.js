"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const validateCreateCustomerMiddleware_1 = require("../middleware/validation/validateCreateCustomerMiddleware");
const customer_service_1 = require("./customer.service");
const auth_service_1 = require("../auth/auth.service");
const InternalServerErrorException_1 = require("../exceptions/InternalServerErrorException");
class CustomerController {
    constructor() {
        this.path = '/customer';
        this.router = express_1.Router();
        this.getCustomer = async (request, response, next) => {
            const customerId = request.params.id;
            const result = await customer_service_1.get(customerId);
            if (result) {
                response.status(200).json(result);
            }
            else {
                next(new InternalServerErrorException_1.default("Could not fetch from Database!"));
            }
        };
        this.addCustomer = async (request, response, next) => {
            const customer = request.body;
            const result = await customer_service_1.create(customer);
            if (result) {
                response.status(200).json(result);
            }
            else {
                next(new InternalServerErrorException_1.default("Could not create Customer at database"));
            }
        };
        this.removeCustomer = async (request, response, next) => {
            const customerId = request.params.id;
        };
        this.modifyCustomer = async (request, response, next) => {
        };
        this.addChildAssociation = async (request, response, next) => {
            const childrenId = request.params.id;
            const accessToken = request.headers.authorization.split(' ')[1];
            const authService = new auth_service_1.AuthService();
            const shopifyId = await authService.getShopifyIdWithAccessToken(accessToken);
            if (typeof childrenId === "string" && typeof shopifyId === "string") {
                const savedDoc = await customer_service_1.addChildAssociation(shopifyId, childrenId);
                if (savedDoc) {
                    response.json({ id: 0, customer: savedDoc });
                }
                else {
                    next(new InternalServerErrorException_1.default("Unable to change data in the database"));
                }
            }
            else {
                next(new InternalServerErrorException_1.default("Error occured while processing provided id's"));
            }
        };
        this.removeChildAssociation = async (request, response, next) => {
            const childrenId = request.params.id;
            const accessToken = request.headers.authorization.split(' ')[1];
            const authService = new auth_service_1.AuthService();
            const shopifyId = await authService.getShopifyIdWithAccessToken(accessToken);
            if (typeof childrenId === "string" && typeof shopifyId === "string") {
                const savedDoc = await customer_service_1.removeChildAssociation(shopifyId, childrenId);
                if (savedDoc) {
                    response.json({ id: 0, customer: savedDoc });
                }
                else {
                    next(new InternalServerErrorException_1.default("Unable to change data in the database"));
                }
            }
            else {
                next(new InternalServerErrorException_1.default("Error occured while processing provided id's"));
            }
        };
        console.log("Initialize Customer Controller...");
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}/`, auth_middleware_1.default, validateCreateCustomerMiddleware_1.default, this.addCustomer);
        this.router.get(`${this.path}/:id`, auth_middleware_1.default, this.getCustomer);
        this.router.delete(`${this.path}/:id`, auth_middleware_1.default, this.removeCustomer);
        this.router.put(`${this.path}/`, auth_middleware_1.default, validateCreateCustomerMiddleware_1.default, this.modifyCustomer);
        this.router.get(`${this.path}/addChildAssociation/:id`, auth_middleware_1.default, this.addChildAssociation);
        this.router.delete(`${this.path}/removeChildAssociation/:id`, auth_middleware_1.default, this.removeChildAssociation);
    }
}
exports.default = CustomerController;
//# sourceMappingURL=customer.controller.js.map