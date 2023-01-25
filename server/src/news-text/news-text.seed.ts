import { TWEPostgreSQLMainDB } from "../db/db.instance";
import { newsTextSeedData } from "./news-text.seed.data";

export const newsTextSeed = async () => {
    console.log('News text seeding start...');
    for(const data of newsTextSeedData.newsTexts)
        await TWEPostgreSQLMainDB.newsText.create({data});
};