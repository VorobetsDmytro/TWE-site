import { Injectable } from '@nestjs/common';
import { TWEPostgreSQLMainPrismaService } from '../db/twe-postgreSQL-main.prisma.service';
import { INewsCardRepository } from "./interfaces/news-card.repository.interface";
import { Prisma, NewsCard } from "prisma/postrgreSQL-main/generated/client";
import { v4 } from "uuid"
import { SecureUserSelect } from 'src/user/user.select';

@Injectable()
export class NewsCardRepository implements INewsCardRepository {
    constructor(private tweMainDBService: TWEPostgreSQLMainPrismaService){}

    async getTotal(globalRegionName: string): Promise<number> {
        return (await this.tweMainDBService.newsCard.aggregate({
            where: {
                newsTexts: {
                    some: {
                        globalRegion: {
                            name: globalRegionName
                        }
                    }
                }
            },
            _count: true,
        }))._count;
    }

    async create(dto: Prisma.NewsCardUncheckedCreateInput): Promise<NewsCard> {
        return this.tweMainDBService.newsCard.create({data: dto});
    }

    async getOneById(id: string): Promise<NewsCard> {
        return this.tweMainDBService.newsCard.findUnique({where: {id}});
    }

    async getOneByIdFront(id: string, userId?: string, globalRegionName?: string,): Promise<NewsCard> {
        if(globalRegionName)
            return this.tweMainDBService.newsCard.findUnique({
                include: {
                    newsTexts: {
                        where: {
                            globalRegion: {
                                name: globalRegionName
                            }
                        }
                    },
                    newsBlocks: {
                        include: {
                            newsTexts: {
                                where: {
                                    globalRegion: {
                                        name: globalRegionName
                                    }
                                }
                            },
                            newsBlockRate: {
                                include: {
                                    userBlockRates: {
                                        where: {
                                            userId
                                        }
                                    }
                                }
                            }
                        },
                        where: {
                            newsCardId: id
                        }
                    }
                },
                where: {id}
            });
        return this.tweMainDBService.newsCard.findUnique({where: {id}});
    }

    async getMany(): Promise<NewsCard[]> {
        return this.tweMainDBService.newsCard.findMany();
    }

    async getManyFront(globalRegionName: string, limit: number, offset: number) {
        return this.tweMainDBService.newsCard.findMany({
            where: {
                newsTexts: {
                    some: {
                        globalRegion: {
                            name: globalRegionName
                        }
                    }
                }
            },
            include: {
                newsTexts: {
                    where: {
                        globalRegion: {
                            name: globalRegionName
                        }
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            },
            skip: offset, take: limit
        });
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