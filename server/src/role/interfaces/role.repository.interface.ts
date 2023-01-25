import { Role } from "prisma/postrgreSQL-main/generated/client";
import { CRUD } from "src/interfaces/crud.interface";

export interface IRoleRepository extends CRUD {
    getOneByValue(value: string): Promise<Role>
    generateId(): Promise<string>
}