import * as mongoose from 'mongoose';

const CustomerSchema = new mongoose.Schema({
    id: { type: String, required: true },
    children: { type: Array<String>, required: true },
    customer: { type: Object, required: true },
    created_at: { type: String, required: true },
    updated_at: { type: String, required: true }
});

const CustomerModel = mongoose.model("customers", CustomerSchema);

export default CustomerModel;