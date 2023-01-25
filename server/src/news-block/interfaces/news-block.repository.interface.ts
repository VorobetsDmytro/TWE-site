import { CRUD } from "src/interfaces/crud.interface";

export interface INewsBlockRepository extends CRUD {
    generateId(): Promise<string>;
    deleteManyByNewsCardId(newsCardId: string);
}