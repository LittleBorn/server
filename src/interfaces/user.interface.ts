import { IChild } from "./child.interface";
import { Firebase } from "./firebase.interface";

export interface IUser{
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    created_at: Date;
    updated_at: Date;
    children: IChild[];
    firebase: Firebase;
}