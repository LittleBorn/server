import { ILoginUser } from "../interfaces/loginUser.interface";
import { IShopifyCustomer } from "../interfaces/Shopify/IShopifyCustomer.interface";
import { get } from "../utils/shopifyHelper";

export class AuthService{

    async login(user: ILoginUser): Promise<string>{
        const result = await get<{customers: IShopifyCustomer[]}>("customers");

        return new Promise<string>((resolve, reject) => {

        })
    }

}