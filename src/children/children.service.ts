import ChildModel from "../schemas/child.model";
import { v4 as uuidv4 } from "uuid"
import { IClientChild } from "../interfaces/Child/IClientChild.interface";
 
export const create = async (child: IClientChild) => {
    const dbChild = await ChildModel.create({
        id: uuidv4(),
        firstName: child.firstName,
        height: child.height,
        weight: child.weight,
        gender: child.gender,
        birthDate: child.birthDate,
        created_at: new Date(),
        updated_at: new Date()
    });

    return dbChild;
}