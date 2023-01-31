import { CRUD } from "src/interfaces/crud.interface";

export interface IResetPasswordRepository extends CRUD {
    generateId(): Promise<string>;
    generateToken(): Promise<string>;
    getOneByUserId(userId: string);
    getOneByUserIdAndToken(userId: string, token: string);
}