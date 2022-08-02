import { IRegisterUser } from "../interfaces/registerUser.interface";
import { ILoginUser } from "../interfaces/loginUser.interface";
import { IShopifyCustomer } from "../interfaces/Shopify/IShopifyCustomer.interface";
import { get, post } from "../utils/shopifyAdminHelper";
import { SessionCookieOptions } from "firebase-admin/auth";

export class AuthService {

    async login(user: ILoginUser): Promise<string> {
        const result = await get<{ customers: IShopifyCustomer[] }>(`customers/search.json?query=email:test@shopify.com`);

        return new Promise<string>((resolve, reject) => {
            if(result.customers.length === 1){
                const customer = result.customers[0];
                // check password of customer
                
                if (true /* Password is correct */) {
                    
                } else {
                    // error credentials wrong
                }
            }else{
                // authentication failure
            }
        })
    }



    async addUserToShopify(user: IRegisterUser) {
        return await post<{ customer: IShopifyCustomer }>("customers", {
            customer: {
                first_name: user.firstName,
                last_name: user.lastName,
                email: user.email
            }
        })
    }

}