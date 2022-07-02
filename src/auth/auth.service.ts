import TokenModel from "../schemas/token.schema";
import * as jwt from "jsonwebtoken"

export default class AuthService{

    constructor(){
    }
    
    removeTokenFromDatabase = async (token: string) => {
        await TokenModel.deleteOne({token: token});
    }

    decodeToken = async (token: string) => {
        return await jwt.verify(token, process.env.JWT_SECRET);
    }

}