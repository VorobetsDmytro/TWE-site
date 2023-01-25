import { newsBlockSeedData } from "../news-block/news-block.seed.data";
import { Prisma } from "../../prisma/postrgreSQL-main/generated/client";
import { v4 } from 'uuid';

class NewsBlockRateSeedData {
    private newsBlocks = newsBlockSeedData.newsBlocks;
    public newsBlockRates: Prisma.NewsBlockRateUncheckedCreateInput[] = [];
    constructor() {
        for(let i = 0; i < this.newsBlocks.length; ++i)
            this.newsBlockRates.push({
                id: v4(),
                newsBlockId: this.newsBlocks[i].id
            });
    }
}

export const newsBlockRateSeedData = new NewsBlockRateSeedData();