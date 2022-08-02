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

}