import { Injectable } from "@nestjs/common";
import { TWEPostgreSQLMainPrismaService } from "src/db/twe-postgreSQL-main.prisma.service";
import { IActiovationLinkRepository } from "./interfaces/activation-link.repository.interface";
import { Activationlink, Prisma } from "prisma/postrgreSQL-main/generated/client";
import { v4 } from "uuid"

@Injectable()
export class ActivationLinkRepository implements IActiovationLinkRepository {
    constructor(private tweMainDBService: TWEPostgreSQLMainPrismaService){}

    async create(dto: Prisma.ActivationlinkUncheckedCreateInput): Promise<Activationlink> {
        return this.tweMainDBService.activationlink.create({data: dto});
    }

    async getOneByUserId(userId: string): Promise<Activationlink | null> {
        return this.tweMainDBService.activationlink.findFirst({where: {userId}});
    }

    async getOneByUserIdAndLink(userId: string, link: string): Promise<Activationlink> {
        return this.tweMainDBService.activationlink.findFirst({where: {userId, link}});
    }

    async getOneByLink(link: string): Promise<Activationlink> {
        return this.tweMainDBService.activationlink.findFirst({where: {link}});
    }

    async getMany(): Promise<Activationlink[]> {
        return this.tweMainDBService.activationlink.findMany();
    }

    async update(dto: Prisma.ActivationlinkUncheckedUpdateInput, userId: string): Promise<Activationlink> {
        return this.tweMainDBService.activationlink.update({data: dto, where: {userId}});
    }

    async delete(userId: string): Promise<Activationlink> {
        return this.tweMainDBService.activationlink.delete({where: {userId}});
    }

    async generateLink(): Promise<string> {
        let activationlink: Activationlink | null, link: string;
        do {
            link = v4();
            activationlink = await this.tweMainDBService.activationlink.findUnique({where: {link}});
        } while (activationlink);
        return link;
    }
}