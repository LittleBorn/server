import ChildModel from "../schemas/child.model";
import { IClientChild } from "../interfaces/Child/IClientChild.interface";
 
export const create = async (child: IClientChild) => {
    const dbChild = await ChildModel.create({
        firstName: child.firstName,
        height: [{
            value: child.height,
            updated_at: Date.now()
        }],
        weight: [{
            value: child.height,
            updated_at: Date.now()
        }],
        gender: child.gender,
        birthDate: child.birthDate,
        created_at: Date.now(),
        updated_at: Date.now()
    });

    return dbChild;
}

export const remove = async (id: string) => {

}