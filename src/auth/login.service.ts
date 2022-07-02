import { auth, signInWithEmailAndPassword } from "../utils/firebaseHelper";
import { ILoginUser } from "interfaces/loginUser.interface";
import { User } from "firebase/auth";
import * as jwt from "jsonwebtoken";
import TokenModel from "../schemas/token.schema";

export default class LoginService{

    constructor(){
    }

    loginUserAtFirebase = async (usr: ILoginUser): Promise<User> => {
        const { user } = await signInWithEmailAndPassword(auth, usr.email, usr.password);
        return user;
    }
    
    generateAuthToken = async (from: string, payload: any): Promise<any> => {
        const jwtToken = jwt.sign(JSON.stringify(payload), process.env.JWT_SECRET);
        const dbTokenResult = await TokenModel.create({
            token: jwtToken,
            from: from 
        })
        return dbTokenResult;
    }

}