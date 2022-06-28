

export default interface Model<T>{

    create: (newObject: any) => Promise<T>;
    find: () => Promise<T[]>;
    findById: (id: string) => Promise<T>;
    findByIdAndUpdate: (id: string, newObject: T) => Promise<T>;
    findByIdAndDelete: (id: string) => Promise<Boolean>;

}