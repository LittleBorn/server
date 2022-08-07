import * as mongoose from 'mongoose';

const ChildSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    height: { type: String, required: true },
    weight: { type: Array, required: true },
    gender: { type: String, required: true },
    birthDate: { type: Date, required: true },
    created_at: { type: Number, required: false },
    updated_at: { type: Number, required: false }
});

const ChildModel = mongoose.model("children", ChildSchema);

export default ChildModel;