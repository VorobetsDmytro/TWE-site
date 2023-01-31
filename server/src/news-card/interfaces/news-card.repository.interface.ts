import { NewsCard } from "prisma/postrgreSQL-main/generated/client";
import { CRUD } from "src/interfaces/crud.interface";

export interface INewsCardRepository extends CRUD {
    generateId(): Promise<string>;
    getManyFront(globalRegionName: string, limit: number, offset: number): Promise<NewsCard[]>;
    getOneByIdFront(id: string, userId?: string, globalRegionName?: string): Promise<NewsCard>;
    getTotal(globalRegionName: string): Promise<number>;
}