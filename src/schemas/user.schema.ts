import * as mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    fb_id: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    children: { type: Array, required: true },
    firebase: { type: Object, required: true },
});

const UserModel = mongoose.model("users", UserSchema);

export default UserModel;