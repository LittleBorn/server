"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.create = exports.get = void 0;
const child_model_1 = require("../schemas/child.model");
exports.get = async (id) => {
    try {
        const dbChild = await child_model_1.default.findOne({ _id: id });
        return dbChild;
    }
    catch (e) {
        return undefined;
    }
};
exports.create = async (child) => {
    const dbChild = await child_model_1.default.create({
        childName: child.childName,
        height: [{
                value: child.height,
                updated_at: Date.now()
            }],
        weight: [{
                value: child.height,
                updated_at: Date.now()
            }],
        gender: child.gender,
        birthDate: child.birthDate,
        created_at: Date.now(),
        updated_at: Date.now()
    });
    return dbChild;
};
exports.remove = async (id) => {
};
//# sourceMappingURL=children.service.js.map