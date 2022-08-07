import { AuthService } from "../auth/auth.service";
import { IClientCustomer } from "interfaces/Customer/IClientCustomer.interface";
import CustomerModel from "../schemas/customer.model";

export const get = async (customerId: string) => {
    try{
        const customer = await CustomerModel.findOne({_id: customerId});
        return customer;
    }catch(e){
        return undefined;
    }
}

export const create = async (customer: IClientCustomer) => {

    const authService = new AuthService();
    const customerId: string = await authService.getCustomerIdWithAccessToken(customer.shopifyId);
    try {
        const dbCustomer = await CustomerModel.create({
            shopifyId: customerId,
            children: []
        });

        return dbCustomer;
    } catch (e) {
        return undefined;
    }
}

export const remove = async (id: string) => {

}

export const addChildAssociation = async (customerId: string, childrenId: string): Promise<any | undefined> => {
    const customer = await CustomerModel.findOne({ shopifyId: customerId });
    customer.children.push(childrenId);
    const savedDoc = await customer.save();
    if (customer == savedDoc) {
        return savedDoc;
    } else {
        return undefined;
    }
}

export const removeChildAssociation = async (customerId: string, childrenId: string): Promise<any | undefined> => {
    const customer = await CustomerModel.findOne({ shopifyId: customerId });
    customer.children = customer.children.filter((i: string) => i !== childrenId);
    const savedDoc = await customer.save();
    if (customer == savedDoc) {
        return savedDoc;
    } else {
        return undefined;
    }
}