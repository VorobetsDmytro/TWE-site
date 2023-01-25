import { CRUD } from "src/interfaces/crud.interface";

export interface INewsCardRepository extends CRUD {
    generateId(): Promise<string>;
}