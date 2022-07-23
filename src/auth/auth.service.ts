import { IRegisterUser } from "../interfaces/registerUser.interface";
import { ILoginUser } from "../interfaces/loginUser.interface";
import { IShopifyCustomer } from "../interfaces/Shopify/IShopifyCustomer.interface";
import { get, post } from "../utils/shopifyAdminHelper";
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
        //const shopifyUserCredentials = await this.addUserToShopify(user);
        const shopifyUserCredentials = {
            "customer": {
                "id": 6522878918921 + Date.now().toString(),
                "email": user.email,
                "accepts_marketing": false,
                "created_at": "2022-07-16T10:54:15+02:00",
                "updated_at": "2022-07-16T10:54:59+02:00",
                "first_name": user.firstName,
                "last_name": user.lastName,
                "orders_count": 1,
                "state": "disabled",
                "total_spent": "130.90",
                "last_order_id": 5083313504521,
                "note": "",
                "verified_email": true,
                "multipass_identifier": "",
                "tax_exempt": false,
                "tags": "",
                "last_order_name": "#1401",
                "currency": "EUR",
                "phone": "",
                "addresses": [
                    {
                        "id": 8311769235721,
                        "customer_id": 6522878918921,
                        "first_name": "Paul",
                        "last_name": "test",
                        "company": "",
                        "address1": "Test 123",
                        "address2": "",
                        "city": "DTW",
                        "province": "",
                        "country": "Germany",
                        "zip": "23743",
                        "phone": "",
                        "name": "Dennis Halili",
                        "province_code": "",
                        "country_code": "DE",
                        "country_name": "Germany",
                        "default": true
                    }
                ],
                "accepts_marketing_updated_at": "2022-07-16T10:54:15+02:00",
                "marketing_opt_in_level": "",
                "tax_exemptions": [""],
                "email_marketing_consent": {
                    "state": "pending",
                    "opt_in_level": "confirmed_opt_in",
                    "consent_updated_at": ""
                },
                "sms_marketing_consent": "",
                "admin_graphql_api_id": "gid://shopify/Customer/6522878918921",
                "default_address": {
                    "id": 8311769235721,
                    "customer_id": 6522878918921,
                    "first_name": "Test",
                    "last_name": "Test",
                    "company": "",
                    "address1": "Test 56",
                    "address2": "",
                    "city": "Grömitz",
                    "province": "",
                    "country": "Germany",
                    "zip": "23743",
                    "phone": "",
                    "name": "Test Test",
                    "province_code": "",
                    "country_code": "DE",
                    "country_name": "Germany",
                    "default": true
                }
            }
        }

        // create custom token with admin api
        const customToken = await adminAuth.createCustomToken(shopifyUserCredentials.customer.id);

        return customToken;
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