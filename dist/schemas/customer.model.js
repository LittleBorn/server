"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const CustomerSchema = new mongoose.Schema({
    id: { type: String, required: true },
    children: { type: Array, required: true },
});
const CustomerModel = mongoose.model("customers", CustomerSchema);
exports.default = CustomerModel;
//# sourceMappingURL=customer.model.js.map