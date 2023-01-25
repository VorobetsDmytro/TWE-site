import { TWEPostgreSQLMainDB } from "../db/db.instance";
import { newsBlockSeedData } from "./news-block.seed.data";

export const newsBlockSeed = async () => {
    console.log('News block seeding start...');
    for(const data of newsBlockSeedData.newsBlocks)
        await TWEPostgreSQLMainDB.newsBlock.create({data});
};