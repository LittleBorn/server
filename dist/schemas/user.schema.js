"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId, required: false },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    created_at: { type: Date, default: Date.now, required: true },
    updated_at: { type: Date, default: Date.now, required: true },
    children: { type: Array, required: true },
    firebase: { type: Object, required: true },
});
const UserModel = mongoose.model("users", UserSchema);
exports.default = UserModel;
//# sourceMappingURL=user.schema.js.map