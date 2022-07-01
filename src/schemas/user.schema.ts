import * as mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    created_at : { type: Date, required: true },
    updated_at : { type: Date, required: true },
    children: { type: Array, required: true },
    firebase: { type: Object, required: true },
});

const UserModel = mongoose.model("users", UserSchema);

export default UserModel;