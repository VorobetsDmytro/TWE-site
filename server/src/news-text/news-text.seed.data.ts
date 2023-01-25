import { Prisma } from "../../prisma/postrgreSQL-main/generated/client";
import { v4 } from 'uuid';
import { globalRegionSeedData } from "../global-region/global-region.seed.data";
import { newsCardSeedData } from "../news-card/news-card.seed.data";
import { newsBlockSeedData } from "../news-block/news-block.seed.data";


class NewsTextSeedData {
    private globalRegions = globalRegionSeedData.globalRegionds;
    private newsCards = newsCardSeedData.newsCards;
    private newsBlocks = newsBlockSeedData.newsBlocks;
    public newsTexts: Prisma.NewsTextUncheckedCreateInput[] = [];
    constructor() {
        for(let i = 0; i < this.globalRegions.length; ++i) {
            for(let j = 0; j < this.newsCards.length; ++j) {
                this.newsTexts.push({
                    id: v4(),
                    title: this.getTitle(this.globalRegions[i].name),
                    body: this.getBody(this.globalRegions[i].name),
                    globalRegionId: this.globalRegions[i].id,
                    newsCardId: this.newsCards[j].id
                });
            }
            for(let j = 0; j < this.newsBlocks.length; ++j) {
                this.newsTexts.push({
                    id: v4(),
                    title: this.getTitle(this.globalRegions[i].name),
                    body: this.getBody(this.globalRegions[i].name),
                    globalRegionId: this.globalRegions[i].id,
                    newsBlockId: this.newsBlocks[j].id
                });
            }
        }
    }

    private getTitle(globalRegionName: string): string {
        switch(globalRegionName){
        case "UA":
            return "TWE заголовок";
        default:
            return "TWE title";
        }
    }

    private getBody(globalRegionName: string): string {
        switch(globalRegionName){
        case "UA":
            return "TWE вмicт";
        default:
            return "TWE body";
        }
    }
}

export const newsTextSeedData = new NewsTextSeedData();