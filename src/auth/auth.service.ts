import CustomerModel from "../schemas/customer.model";
import { decodeShopifyId } from "../utils/formattingHelper";
import { sendStorefrontQuery } from "../utils/shopifyStorefrontHelper";

export class AuthService {

    async authenticateClient(accessToken: string)  {
        var data = JSON.stringify({
            query: `query {
            customer(customerAccessToken: "${accessToken}") {
              id
            }
          }`,
            variables: {}
        });
        const result = await sendStorefrontQuery<{ data: { customer: { id: string; } | null } }>(data);
        if(result.data?.customer && typeof result.data?.customer?.id == "string"){
            return true;
        }else{
            return false;
        }
    }

    async getShopifyIdWithAccessToken(accessToken: string): Promise<undefined|string> {
        var data = JSON.stringify({
            query: `query {
            customer(customerAccessToken: "${accessToken}") {
              id
            }
          }`,
            variables: {}
        });
        const result = await sendStorefrontQuery<{ data: { customer: { id: string; } | null } }>(data);
        if(result.data?.customer && typeof result.data?.customer?.id == "string"){
            return result.data?.customer?.id;
        }else{
            return undefined;
        }
    }

    async getCustomerIdWithAccessToken(accessToken: string): Promise<undefined|string> {
        
        const shopifyId: string | undefined = await this.getShopifyIdWithAccessToken(accessToken);
        if(!shopifyId) return undefined;

        const customer = await CustomerModel.findOne({ shopifyId: shopifyId });
        if (!customer) return undefined;

        return customer._id;

    }

}