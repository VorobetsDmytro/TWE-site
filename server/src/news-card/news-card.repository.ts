import { Injectable } from '@nestjs/common';
import { TWEPostgreSQLMainPrismaService } from '../db/twe-postgreSQL-main.prisma.service';
import { INewsCardRepository } from "./interfaces/news-card.repository.interface";
import { Prisma, NewsCard } from "prisma/postrgreSQL-main/generated/client";
import { v4 } from "uuid"

@Injectable()
export class NewsCardRepository implements INewsCardRepository {
    constructor(private tweMainDBService: TWEPostgreSQLMainPrismaService){}

    async create(dto: Prisma.NewsCardUncheckedCreateInput): Promise<NewsCard> {
        return this.tweMainDBService.newsCard.create({data: dto});
    }

    async getOneById(id: string): Promise<NewsCard> {
        return this.tweMainDBService.newsCard.findUnique({where: {id}});
    }

    async getMany(globalRegionName?: string): Promise<NewsCard[]> {
        if(globalRegionName)
            return this.tweMainDBService.newsCard.findMany({
                include: {
                    newsTexts: {
                        where: {
                            globalRegion: {
                                name: globalRegionName
                            }
                        }
                    }
                }
            });
        return this.tweMainDBService.newsCard.findMany();
    }

    async update(dto: Prisma.NewsCardUncheckedUpdateInput, id: string): Promise<NewsCard> {
        return this.tweMainDBService.newsCard.update({data: dto, where: {id}});
    }

    async delete(id: string): Promise<NewsCard> {
        return this.tweMainDBService.newsCard.delete({where: {id}});
    }

    async generateId(): Promise<string> {
        let newsCard: NewsCard | null, id: string;
        do {
            id = v4();
            newsCard = await this.tweMainDBService.newsCard.findUnique({where: {id}});
        } while (newsCard);
        return id;
    }
}