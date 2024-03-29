import ChildModel from "../schemas/child.model";
import { IClientChild } from "../interfaces/Child/IClientChild.interface";
 
export const get = async (id: string) => {
    try{
        const dbChild = await ChildModel.findOne({_id: id});
        return dbChild;
    }catch(e){
        return undefined;
    }
}

export const create = async (child: IClientChild) => {
    const dbChild = await ChildModel.create({
        childName: child.childName,
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