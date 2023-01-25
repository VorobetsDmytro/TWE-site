import { Injectable } from "@nestjs/common";
import { ITokenRpository } from "./interfaces/token.repository.interface";
import { TWEPostgreSQLMainPrismaService } from "src/db/twe-postgreSQL-main.prisma.service";
import { Prisma, Token } from "prisma/postrgreSQL-main/generated/client";

@Injectable()
export class TokenRepository implements ITokenRpository {
    constructor(private tweMainDBService: TWEPostgreSQLMainPrismaService){}

    async create(dto: Prisma.TokenUncheckedCreateInput): Promise<Token> {
        return this.tweMainDBService.token.create({data: dto});
    }

    async getOneByUserId(id: string): Promise<Token> {
        return this.tweMainDBService.token.findUnique({where: {userId: id}});
    }

    async getMany(): Promise<Token[]> {
        return this.tweMainDBService.token.findMany();
    }

    async update(dto: Prisma.TokenUncheckedUpdateInput, userId: string): Promise<Token> {
        return this.tweMainDBService.token.update({where: {userId}, data: dto});
    }

    async delete(userId: string): Promise<Token> {
        return this.tweMainDBService.token.delete({where: {userId}});
    }
    
}