"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const ChildSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    height: { type: String, required: true },
    weight: { type: String, required: true },
    gender: { type: String, required: true },
    birthDate: { type: Date, required: true },
    created_at: { type: String, required: false },
    updated_at: { type: String, required: false }
});
const ChildModel = mongoose.model("children", ChildSchema);
exports.default = ChildModel;
//# sourceMappingURL=child.model.js.map