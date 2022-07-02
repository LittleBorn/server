import UserModel from "../schemas/user.schema";
import { auth, createUserWithEmailAndPassword, sendEmailVerification } from "../utils/firebaseHelper";
import { IRegisterUser } from "../interfaces/registerUser.interface";
import TokenModel from "../schemas/token.schema";
import * as jwt from "jsonwebtoken";
import { User } from "firebase/auth";

export default class RegisterService{

    constructor(){}

    createUserAtFirebase = async (usr: IRegisterUser): Promise<User> => {
        const {user} = await createUserWithEmailAndPassword(auth, usr.email, usr.password);
        return user;
    }

    sendEmailVerification = async (usr: User) => {
        await sendEmailVerification(usr);
    }

    createUserAtDatabase = async (usr: IRegisterUser, fbUser: User) => {
        return await UserModel.create({
            fb_id: fbUser.uid,
            email: usr.email,
            firstName: usr.firstName,
            lastName: usr.lastName,
            children: [],
            // logic to remove circular dependencys
            firebase: JSON.parse(JSON.stringify(fbUser))
        })
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