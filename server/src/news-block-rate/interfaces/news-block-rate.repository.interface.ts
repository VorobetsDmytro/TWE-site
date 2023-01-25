import { NewsBlockRate } from "prisma/postrgreSQL-main/generated/client";
import { CRUD } from "src/interfaces/crud.interface";

export interface INewsBlockRateRepository extends CRUD {
    generateId(): Promise<string>;
    getOneByNewsBlockId(newsBlockId): Promise<NewsBlockRate>;
    deleteManyByNewsCardId(newsCardId);
}