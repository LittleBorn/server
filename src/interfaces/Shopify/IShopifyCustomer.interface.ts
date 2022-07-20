
export interface IShopifyCustomer {
    id: number;
    email: string;
    accepts_marketing: boolean;
    created_at: Date;
    updated_at: Date;
    first_name: string;
    last_name: string;
    orders_count: number;
    state: string;
    total_spent: string;
    last_order_id?: any;
    note?: any;
    verified_email: boolean;
    multipass_identifier?: any;
    tax_exempt: boolean;
    phone?: any;
    tags: string;
    last_order_name?: any;
    currency: string;
    addresses: any[];
    accepts_marketing_updated_at: Date;
    marketing_opt_in_level?: any;
    tax_exemptions: any[];
    email_marketing_consent: any[];
    sms_marketing_consent?: any;
    admin_graphql_api_id: string;
    default_address: any[];
}


