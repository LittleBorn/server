import * as mongoose from 'mongoose';

const ChildSchema = new mongoose.Schema({
    id: { type: String, required: true },
    firstName: { type: String, required: true },
    height: { type: String, required: true },
    weight: { type: String, required: true },
    gender: { type: String, required: true },
    birthDate: { type: Date, required: true },
    created_at: { type: String, required: true },
    updated_at: { type: String, required: true }
});

const ChildModel = mongoose.model("children", ChildSchema);

export default ChildModel;