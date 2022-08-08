export interface IChild{
    _id: string;
    childName: string;
    height: Array<{
        value: number;
        changed_at: number;
    }>;
    weight: Array<{
        value: number;
        changed_at: number;
    }>;
    gender: string;
    birthDate: Date;
    created_at: number;
    changed_at: number;
}