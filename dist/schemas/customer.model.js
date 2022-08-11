"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const CustomerSchema = new mongoose.Schema({
    shopifyId: { type: String, required: true },
    children: [{ type: mongoose.Schema.Types.ObjectId, ref: 'children' }]
});
const CustomerModel = mongoose.model("customers", CustomerSchema);
exports.default = CustomerModel;
//# sourceMappingURL=customer.model.js.map