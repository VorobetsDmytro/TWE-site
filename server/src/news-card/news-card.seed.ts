import { TWEPostgreSQLMainDB } from "../db/db.instance";
import { newsCardSeedData } from "./news-card.seed.data";

export const newsCardSeed = async () => {
    console.log('News card seeding start...');
    for(const data of newsCardSeedData.newsCards)
        await TWEPostgreSQLMainDB.newsCard.create({data});
};