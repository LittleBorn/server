import ChildModel from "../schemas/child.model";
import { IClientChild } from "../interfaces/Child/IClientChild.interface";
 
export const create = async (child: IClientChild) => {
    const dbChild = await ChildModel.create({
        firstName: child.firstName,
        height: child.height,
        weight: child.weight,
        gender: child.gender,
        birthDate: child.birthDate,
        created_at: new Date().valueOf(),
        updated_at: new Date().valueOf()
    });

    return dbChild;
}

export const remove = async (id: string) => {

}