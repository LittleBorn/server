import * as mongoose from 'mongoose';

const n_schema = new mongoose.Schema({
    value: { type: Number, required: true },
    updated_at: { type: Number, required: true }
})

const ChildSchema = new mongoose.Schema({
    childName: { type: String, required: true },
    height: { type: [n_schema], required: true },
    weight: { type: [n_schema], required: true },
    gender: { type: String, required: true },
    birthDate: { type: Date, required: true },
    created_at: { type: Number, required: false },
    updated_at: { type: Number, required: false }
});

const ChildModel = mongoose.model("children", ChildSchema);

export default ChildModel;