import { IRegisterUser } from "../interfaces/registerUser.interface";
import { ILoginUser } from "../interfaces/loginUser.interface";
import { IShopifyCustomer } from "../interfaces/Shopify/IShopifyCustomer.interface";
import { get, post } from "../utils/shopifyHelper";
import * as bcrypt from "bcrypt"
import UserModel from "../schemas/user.schema";
import * as jwt from "jsonwebtoken";
import TokenModel from "../schemas/token.schema";
import { db } from "../utils/firebaseHelper"
import { addDoc, collection } from "firebase/firestore";
import { adminAuth } from "../utils/firebaseAdminHelper";


export class AuthService {

    async login(user: ILoginUser): Promise<string> {
        const result = await get<{ customers: IShopifyCustomer[] }>("customers");

        return new Promise<string>((resolve, reject) => {
            const customer = result.customers.find(customer => customer.email == user.email);
            // check password of customer
            if (true /* Password is correct */) {

            } else {
                return undefined;
            }
        })
    }

    async register(user: IRegisterUser): Promise<any> {

        // create new customer in shopify
        // const result = await post<{customer: IShopifyCustomer}>("customers", {
        //     customer: {
        //         first_name: user.firstName,
        //         last_name: user.lastName,
        //         email: user.email
        //     }
        // })

        // debug
        const result = { customer: { id: "klasjdlkasjd" + Date.now().toString() } }

        // add new customer to firestore
        try {
            const docRef = await addDoc(collection(db, "users"), {
                id: result.customer.id,
                customer: result.customer,
            });
        } catch (e) {
            console.log("Error writing to Firestore")
        }

        // create custom token with admin api
        const customToken = await adminAuth.createCustomToken(result.customer.id);

        return customToken;
    }

}