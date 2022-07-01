import * as mongoose from 'mongoose';

const TestSchema = new mongoose.Schema({
    name: { type: String, required: true }
});

const TestModel = mongoose.model("tests", TestSchema);

export default TestModel;