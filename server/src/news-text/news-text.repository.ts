import { Injectable } from "@nestjs/common";
import { INewsTextRepository } from "./interfaces/news-text.repository.interface";
import { NewsText, Prisma } from "prisma/postrgreSQL-main/generated/client";
import { TWEPostgreSQLMainPrismaService } from "src/db/twe-postgreSQL-main.prisma.service";
import { v4 } from "uuid"

@Injectable()
export class NewsTextRepository implements INewsTextRepository {
    constructor(private tweMainDBService: TWEPostgreSQLMainPrismaService){}

    async create(dto: Prisma.NewsTextUncheckedCreateInput): Promise<NewsText> {
        return this.tweMainDBService.newsText.create({data: dto});
    }

    async getOneById(id: string): Promise<NewsText> {
        return this.tweMainDBService.newsText.findUnique({where: {id}});
    }

    async getOneByNewsCardIdAndGlobalRegionId(newsCardId: string, globalRegionId: string): Promise<NewsText> {
        return this.tweMainDBService.newsText.findFirst({where: {newsCardId, globalRegionId}});
    }

    async getOneByNewsBlockIdAndGlobalRegionId(newsBlockId: string, globalRegionId: string): Promise<NewsText> {
        return this.tweMainDBService.newsText.findFirst({where: {newsBlockId, globalRegionId}});
    }

    async getMany() {
        return this.tweMainDBService.newsText.findMany({
            select: {
                id: true,
                title: true,
                body: true,
                globalRegion: true,
                globalRegionId: false,
                newsBlockId: true,
                newsCardId: true
            }
        });
    }
    
    async update(dto: Prisma.NewsTextUncheckedUpdateInput, id: string): Promise<NewsText> {
        return this.tweMainDBService.newsText.update({data: dto, where: {id}});
    }

    async delete(id: string): Promise<NewsText> {
        return this.tweMainDBService.newsText.delete({where: {id}});
    }

    async deleteManyByNewsCardId(newsCardId: string) {
        await this.tweMainDBService.newsText.deleteMany({where: {newsCardId}});
        await this.tweMainDBService.newsText.deleteMany({where: {
            newsBlock: {
                newsCardId
            }
        }});
    }

    async deleteManyByNewsBlockId(newsBlockId: string) {
        return this.tweMainDBService.newsText.deleteMany({where: {newsBlockId}});
    }

    async generateId(): Promise<string> {
        let newsText: NewsText | null, id: string;
        do {
            id = v4();
            newsText = await this.tweMainDBService.newsText.findUnique({where: {id}});
        } while (newsText);
        return id;
    }
}