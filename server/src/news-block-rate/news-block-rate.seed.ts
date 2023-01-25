import { TWEPostgreSQLMainDB } from "../db/db.instance";
import { newsBlockRateSeedData } from "./news-block-rate.seed.data";

export const newsBlockRateSeed = async () => {
    console.log('News block rate seeding start...');
    for(const data of newsBlockRateSeedData.newsBlockRates)
        await TWEPostgreSQLMainDB.newsBlockRate.create({data});
};