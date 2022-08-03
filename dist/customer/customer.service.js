"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.create = void 0;
const child_model_1 = require("../schemas/child.model");
exports.create = async (child) => {
    const dbChild = await child_model_1.default.create({
        firstName: child.firstName,
        height: child.height,
        weight: child.weight,
        gender: child.gender,
        birthDate: child.birthDate,
        created_at: new Date().valueOf(),
        updated_at: new Date().valueOf()
    });
    return dbChild;
};
exports.remove = async (id) => {
};
//# sourceMappingURL=customer.service.js.map