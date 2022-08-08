import * as mongoose from 'mongoose';

const CustomerSchema = new mongoose.Schema({
    shopifyId: { type: String, required: true },
    children: [{ type: mongoose.Schema.Types.ObjectId, ref: 'children' }]
});

const CustomerModel = mongoose.model("customers", CustomerSchema);

export default CustomerModel;