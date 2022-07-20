import { IRegisterUser } from "../interfaces/registerUser.interface";
import { ILoginUser } from "../interfaces/loginUser.interface";
import { IShopifyCustomer } from "../interfaces/Shopify/IShopifyCustomer.interface";
import { get, post } from "../utils/shopifyHelper";
import * as bcrypt from "bcrypt"
import UserModel from "../schemas/user.schema";
import * as jwt from "jsonwebtoken";
import TokenModel from "../schemas/token.schema";

export class AuthService{

    async login(user: ILoginUser): Promise<string>{
        const result = await get<{customers: IShopifyCustomer[]}>("customers");

        return new Promise<string>((resolve, reject) => {
            const customer = result.customers.find(customer => customer.email == user.email);
            // check password of customer
            if(true /* Password is correct */){
                
            }else{
                return undefined;
            }
        })
    }

    async register(user: IRegisterUser): Promise<any>{
        // const result = await post<{customer: IShopifyCustomer}>("customers", {
        //     customer: {
        //         first_name: user.firstName,
        //         last_name: user.lastName,
        //         email: user.email
        //     }
        // })
        // debug
        const result = {customer: {id: "klasjdlkasjd"+ Date.now().toString()}}

        const passwordHash = await bcrypt.hash(user.password, 10);

        await UserModel.create({
            id: result.customer.id,
            password_hash: passwordHash,
            customer: result.customer,
        })

        const jwtToken = jwt.sign(JSON.stringify(result.customer), process.env.JWT_SECRET);

        const dbTokenResult = await TokenModel.create({
            token: jwtToken,
            from: result.customer.id 
        })
        return dbTokenResult;
    }

}