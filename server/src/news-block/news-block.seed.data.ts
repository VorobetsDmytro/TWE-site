import { Prisma } from "../../prisma/postrgreSQL-main/generated/client";
import { v4 } from 'uuid';
import { userSeedData } from "../user/user.seed.data";
import * as path from "path";
import * as fs from "fs";
import { IMAGES_PATH, STATIC_PATH } from "../paths/paths";
import { newsCardSeedData } from "../news-card/news-card.seed.data";


class NewsBlockSeedData {
    private static imgPath = path.resolve(__dirname, "../../images/TWE-picture.png");
    private users = userSeedData.users;
    private newsCards = newsCardSeedData.newsCards;
    public newsBlocks: Prisma.NewsBlockUncheckedCreateInput[] = [];
    constructor() {
        for(let i = 0; i < this.users.length; ++i) {
            for(let j = 0; j < this.newsCards.length; ++j) {
                const imgCopyPath = path.resolve(IMAGES_PATH, v4() + ".png");
                if(!this.copyFile(NewsBlockSeedData.imgPath, imgCopyPath))
                    continue;
                this.newsBlocks.push({
                    id: v4(),
                    createdById: this.users[i].id,
                    imgPath: path.relative(STATIC_PATH, imgCopyPath),
                    newsCardId: this.newsCards[j].id
                });
            }
        }
    }

    private copyFile(filePath: string, toPath: string): boolean {
        if(!fs.existsSync(filePath))
            return false;
        fs.copyFileSync(filePath, toPath);
        return true;
    }
}

export const newsBlockSeedData = new NewsBlockSeedData();