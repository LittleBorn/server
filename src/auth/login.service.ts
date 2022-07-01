import { auth, signInWithEmailAndPassword } from "../utils/firebaseHelper";
import { ILoginUser } from "interfaces/loginUser.interface";

export default class LoginService{

    private user: ILoginUser;
    private firebaseUserData: any;

    constructor(user: ILoginUser){
        this.user = user;
    }

    loginUserAtFirebase = async () => {
        const firebaseCredentails = await signInWithEmailAndPassword(auth, this.user.email, this.user.password);
        this.firebaseUserData = firebaseCredentails.user;
    }

    getResponse = async () => {
        return this.firebaseUserData;
    } 

}