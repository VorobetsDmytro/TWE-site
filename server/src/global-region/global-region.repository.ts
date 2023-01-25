import { TWEPostgreSQLMainPrismaService } from "src/db/twe-postgreSQL-main.prisma.service";
import { IGlobalRegionRepository } from "./interfaces/global-region.repository.interface";
import { GlobalRegion, Prisma } from "prisma/postrgreSQL-main/generated/client";
import { v4 } from "uuid"
import { Injectable } from "@nestjs/common";

@Injectable()
export class GlobalRegionRepository implements IGlobalRegionRepository {
    constructor(private tweMainDBService: TWEPostgreSQLMainPrismaService){}

    async create(dto: Prisma.GlobalRegionUncheckedCreateInput): Promise<GlobalRegion> {
        return this.tweMainDBService.globalRegion.create({data: dto});
    }

    async getOneById(id: string): Promise<GlobalRegion> {
        return this.tweMainDBService.globalRegion.findUnique({where: {id}});
    }

    async getOneByName(name: string): Promise<GlobalRegion> {
        return this.tweMainDBService.globalRegion.findFirst({where: {name}});
    }

    async getMany(): Promise<GlobalRegion[]> {
        return this.tweMainDBService.globalRegion.findMany();
    }

    async update(dto: Prisma.GlobalRegionUncheckedUpdateInput, id: string): Promise<GlobalRegion> {
        return this.tweMainDBService.globalRegion.update({data: dto, where: {id}});
    }
    
    async delete(id: string): Promise<GlobalRegion> {
        return this.tweMainDBService.globalRegion.delete({where: {id}});
    }

    async generateID(): Promise<string> {
        let globalRegion: GlobalRegion | null, id: string;
        do {
            id = v4();
            globalRegion = await this.tweMainDBService.globalRegion.findUnique({where: {id}});
        } while (globalRegion);
        return id;
    }
}