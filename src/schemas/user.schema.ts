import * as mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    id: { type: String, required: true },
    password_hash: { type: String, require: true },
    customer: { type: Object, required: true },
});

const UserModel = mongoose.model("users", UserSchema);

export default UserModel;