import { Injectable } from "@nestjs/common";
import { INewsBlockRepository } from "./interfaces/news-block.repository.interface";
import { TWEPostgreSQLMainPrismaService } from "src/db/twe-postgreSQL-main.prisma.service";
import { NewsBlock, Prisma } from "prisma/postrgreSQL-main/generated/client";
import { v4 } from "uuid"

@Injectable()
export class NewsBlockRepository implements INewsBlockRepository {
    constructor(private tweMainDBService: TWEPostgreSQLMainPrismaService){}

    async create(dto: Prisma.NewsBlockUncheckedCreateInput): Promise<NewsBlock> {
        return this.tweMainDBService.newsBlock.create({data: dto});
    }

    async getOneById(id: string): Promise<NewsBlock> {
        return this.tweMainDBService.newsBlock.findUnique({where: {id}});
    }

    async getMany(globalRegionName?: string): Promise<NewsBlock[]> {
        if(globalRegionName)
            return this.tweMainDBService.newsBlock.findMany({
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
        return this.tweMainDBService.newsBlock.findMany();
    }

    async update(dto: Prisma.NewsBlockUncheckedUpdateInput, id: string): Promise<NewsBlock> {
        return this.tweMainDBService.newsBlock.update({data: dto, where: {id}});
    }

    async delete(id: string): Promise<NewsBlock> {
        return this.tweMainDBService.newsBlock.delete({where: {id}});
    }

    async deleteManyByNewsCardId(newsCardId: string) {
        return this.tweMainDBService.newsBlock.deleteMany({where: {
            newsCardId
        }});
    }

    async generateId(): Promise<string> {
        let newsBlock: NewsBlock | null, id: string;
        do {
            id = v4();
            newsBlock = await this.tweMainDBService.newsBlock.findUnique({where: {id}});
        } while (newsBlock);
        return id;
    }
}