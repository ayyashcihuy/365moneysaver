import { DbUser, User } from "../Types/User";

export interface IUser {
    getUsers(): Promise<DbUser[]>;
    getSingleUser(id: number): Promise<DbUser | null>;
    createUser(data: User): Promise<void>;
    updateUser(id: number, data: User): Promise<void>;
    deleteUser(id: number): Promise<void>;
}