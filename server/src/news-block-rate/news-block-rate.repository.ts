import { Injectable } from "@nestjs/common";
import { INewsBlockRateRepository } from "./interfaces/news-block-rate.repository.interface";
import { TWEPostgreSQLMainPrismaService } from "src/db/twe-postgreSQL-main.prisma.service";
import { NewsBlockRate, Prisma } from "prisma/postrgreSQL-main/generated/client";
import { v4 } from "uuid"

@Injectable()
export class NewsBlockRateRepository implements INewsBlockRateRepository {
    constructor(private tweMainDBService: TWEPostgreSQLMainPrismaService){}
    
    async create(dto: Prisma.NewsBlockRateUncheckedCreateInput): Promise<NewsBlockRate> {
        return this.tweMainDBService.newsBlockRate.create({data: dto});
    }

    async getOneById(id: string): Promise<NewsBlockRate> {
        return this.tweMainDBService.newsBlockRate.findUnique({where: {id}});
    }

    async getOneByNewsBlockId(newsBlockId: any): Promise<NewsBlockRate> {
        return this.tweMainDBService.newsBlockRate.findFirst({where: {newsBlockId}});
    }

    async getMany(): Promise<NewsBlockRate[]> {
        return this.tweMainDBService.newsBlockRate.findMany();
    }

    async update(dto: Prisma.NewsBlockRateUncheckedUpdateInput, id: string): Promise<NewsBlockRate> {
        return this.tweMainDBService.newsBlockRate.update({data: dto, where: {id}});
    }

    async delete(id: string): Promise<NewsBlockRate> {
        return this.tweMainDBService.newsBlockRate.delete({where: {id}});
    }

    async deleteManyByNewsCardId(newsCardId: any) {
        return this.tweMainDBService.newsBlockRate.deleteMany({where: {
            newsBlock: {
                newsCardId
            }
        }});
    }

    async generateId(): Promise<string> {
        let newsBlockRate: NewsBlockRate | null, id: string;
        do {
            id = v4();
            newsBlockRate = await this.tweMainDBService.newsBlockRate.findUnique({where: {id}});
        } while (newsBlockRate);
        return id;
    }
}