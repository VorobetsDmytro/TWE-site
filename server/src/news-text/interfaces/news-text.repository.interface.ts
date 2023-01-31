import { NewsText } from "prisma/postrgreSQL-main/generated/client";
import { CRUD } from "src/interfaces/crud.interface";

export interface INewsTextRepository extends CRUD {
    generateId(): Promise<string>;
    getOneByNewsCardIdAndGlobalRegionId(newsCardId: string, globalRegionId: string): Promise<NewsText>;
    getOneByNewsBlockIdAndGlobalRegionId(newsBlockId: string, globalRegionId: string): Promise<NewsText>;
    getManyByNewsCardId(newsCardId: string): Promise<NewsText[]>;
    getManyByNewsBlockId(newsBlockId: string): Promise<NewsText[]>;
    deleteManyByNewsCardId(newsCardId: string);
    deleteManyByNewsBlockId(newsBlockId: string);
}