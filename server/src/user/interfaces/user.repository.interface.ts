import { CRUD } from "src/interfaces/crud.interface";

export interface IUserRepository extends CRUD {
    getOneByEmail(email: string),
    generateId(): Promise<string>
}