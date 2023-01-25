import { GlobalRegion } from "prisma/postrgreSQL-main/generated/client";
import { CRUD } from "src/interfaces/crud.interface";

export interface IGlobalRegionRepository extends CRUD {
    getOneByName(name: string): Promise<GlobalRegion>;
    generateID(): Promise<string>;
}