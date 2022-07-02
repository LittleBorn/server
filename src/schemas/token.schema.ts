import * as mongoose from 'mongoose';

const TokenSchema = new mongoose.Schema({
    token: { type: String, required: true },
    from: { type: String, required: true },
});

const TokenModel = mongoose.model("tokens", TokenSchema);

export default TokenModel;