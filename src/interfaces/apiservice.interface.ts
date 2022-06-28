export default interface ApiService<T>{

    reload(): Promise<T[]>;
    delete(object: T): Promise<boolean>;

}