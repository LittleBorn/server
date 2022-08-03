import * as mongoose from 'mongoose';

const CustomerSchema = new mongoose.Schema({
    shopifyId: { type: String, required: true },
    children: { type: Array, required: true },
});

const CustomerModel = mongoose.model("customers", CustomerSchema);

export default CustomerModel;