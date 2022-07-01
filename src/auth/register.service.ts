import UserModel from "../schemas/user.schema";
import { auth, createUserWithEmailAndPassword, sendEmailVerification } from "../utils/firebaseHelper";
import { IRegisterUser } from "../interfaces/registerUser.interface";

export default class RegisterService{

    private user: IRegisterUser;
    private firebaseUserData: any;
    private databaseUserData: any;

    constructor(user: IRegisterUser){
        this.user = user;
    }

    createUserAtFirebase = async () => {
        const firebaseCredentails = await createUserWithEmailAndPassword(auth, this.user.email, this.user.password);
        this.firebaseUserData = firebaseCredentails.user;
    }

    sendEmailVerification = async () => {
        await sendEmailVerification(this.firebaseUserData);
    }

    createUserAtDatabase = async () => {
        this.databaseUserData = await UserModel.create({
            email: this.user.email,
            firstName: this.user.firstName,
            lastName: this.user.lastName,
            created_at: new Date(Date.now()),
            updated_at: new Date(Date.now()),
            children: [],
            // logic to remove circular dependencys
            firebase: JSON.parse(JSON.stringify(this.firebaseUserData))
        })
    }

    createTokenForUser = (): Promise<string> => {
        return new Promise((resolve, reject) => {
            resolve("token");
        })
    }

    getResponse = async () => {
        return this.databaseUserData;
    }

}