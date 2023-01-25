import { Prisma } from "../../prisma/postrgreSQL-main/generated/client";
import { v4 } from 'uuid';
import { userSeedData } from "../user/user.seed.data";
import * as path from "path";
import * as fs from "fs";
import { IMAGES_PATH, STATIC_PATH } from "../paths/paths";


class NewsCardSeedData {
    private static imgPath = path.resolve(__dirname, "../../images/TWE-picture.png");
    private users = userSeedData.users;
    public newsCards: Prisma.NewsCardUncheckedCreateInput[] = [];
    constructor() {
        for(let i = 0; i < this.users.length; ++i) {
            for(let j = 0; j < 3; ++j) {
                const imgCopyPath = path.resolve(IMAGES_PATH, v4() + ".png");
                if(!this.copyFile(NewsCardSeedData.imgPath, imgCopyPath))
                    continue;
                this.newsCards.push({
                    id: v4(),
                    createdById: this.users[i].id,
                    imgPath: path.relative(STATIC_PATH, imgCopyPath)
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

export const newsCardSeedData = new NewsCardSeedData();