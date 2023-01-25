import { Injectable } from "@nestjs/common";
import { IUserBlockRateRepository } from "./interfaces/user-block-rate.repository.interface";
import { Prisma, UserBlockRate } from "prisma/postrgreSQL-main/generated/client";
import { TWEPostgreSQLMainPrismaService } from "src/db/twe-postgreSQL-main.prisma.service";

@Injectable()
export class UserBlockRateRepository implements IUserBlockRateRepository {
    constructor(private tweMainDBService: TWEPostgreSQLMainPrismaService){}

    async create(dto: Prisma.UserBlockRateUncheckedCreateInput): Promise<UserBlockRate> {
        return this.tweMainDBService.userBlockRate.create({data: dto});
    }

    async getOneByUserId(userId: string): Promise<UserBlockRate> {
        return this.tweMainDBService.userBlockRate.findFirst({where: {userId}});
    }

    async getOneByNewsBlockRateId(newsBlockRateId: string): Promise<UserBlockRate> {
        return this.tweMainDBService.userBlockRate.findFirst({where: {newsBlockRateId}});
    }
    
    async getOneByUserIdAndNewsBlockRateId(userId: string, newsBlockRateId: string): Promise<UserBlockRate> {
        return this.tweMainDBService.userBlockRate.findFirst({where: {userId, newsBlockRateId}});
    }

    async getMany(): Promise<UserBlockRate[]> {
        return this.tweMainDBService.userBlockRate.findMany();
    }

    async getManyByUserId(userId: string): Promise<UserBlockRate[]> {
        return this.tweMainDBService.userBlockRate.findMany({where: {userId}});
    }

    async getManyByNewsBlockRateId(newsBlockRateId: string): Promise<UserBlockRate[]> {
        return this.tweMainDBService.userBlockRate.findMany({where: {newsBlockRateId}});
    }

    async update(dto: Prisma.UserBlockRateUncheckedUpdateInput, userBlockRate: UserBlockRate): Promise<UserBlockRate> {
        return this.tweMainDBService.userBlockRate.update({data: dto, where: {
            newsBlockRateId_userId: {
                newsBlockRateId: userBlockRate.newsBlockRateId,
                userId: userBlockRate.userId
            }
        }});
    }

    async delete(userBlockRate: UserBlockRate) {
        return this.tweMainDBService.userBlockRate.delete({where: {
            newsBlockRateId_userId: {
                newsBlockRateId: userBlockRate.newsBlockRateId,
                userId: userBlockRate.userId
            }
        }});
    }

    async deleteManyByUserId(userId: string) {
        return this.tweMainDBService.userBlockRate.deleteMany({where: {userId}});
    }

    async deleteManyByNewsBlockRateId(newsBlockRateId: string) {
        return this.tweMainDBService.userBlockRate.deleteMany({where: {newsBlockRateId}});
    }

    async deleteManyByNewsBlockId(newsBlockId: string) {
        return this.tweMainDBService.userBlockRate.deleteMany({where: {
            newsBlockRate: {
                newsBlockId
            }
        }});
    }

    async deleteManyByNewsCardId(newsCardId: string) {
        return this.tweMainDBService.userBlockRate.deleteMany({where: {
            newsBlockRate: {
                newsBlock: {
                    newsCardId
                }
            }
        }});
    }
}