import { Injectable } from "@nestjs/common";
import { IRoleRepository } from "./interfaces/role.repository.interface";
import { TWEPostgreSQLMainPrismaService } from "src/db/twe-postgreSQL-main.prisma.service";
import { Prisma, Role } from "prisma/postrgreSQL-main/generated/client";
import { v4 } from "uuid"

@Injectable()
export class RoleRepository implements IRoleRepository {
    constructor(private tweMainDBService: TWEPostgreSQLMainPrismaService){}

    async create(dto: Prisma.RoleUncheckedCreateInput): Promise<Role> {
        return this.tweMainDBService.role.create({data: dto});
    }

    async getOneById(id: string): Promise<Role> {
        return this.tweMainDBService.role.findUnique({where: {id}});
    }

    async getOneByValue(value: string): Promise<Role> {
        return this.tweMainDBService.role.findFirst({where: {value}});
    }

    async getMany(): Promise<Role[]> {
        return this.tweMainDBService.role.findMany();
    }

    async update(dto: Prisma.RoleUncheckedUpdateInput, id: string): Promise<Role> {
        return this.tweMainDBService.role.update({data: dto, where: {id}});
    }

    async delete(id: string): Promise<Role> {
        return this.tweMainDBService.role.delete({where: {id}});
    }

    async generateId(): Promise<string> {
        let role: Role | null, id: string;
        do {
            id = v4();
            role = await this.tweMainDBService.role.findUnique({where: {id}});
        } while (role);
        return id;
    }
}