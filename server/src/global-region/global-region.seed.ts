import { TWEPostgreSQLMainDB } from "../db/db.instance";
import { globalRegionSeedData } from "./global-region.seed.data";

export const globalRegionSeed = async () => {
    console.log('Global region seeding start...');
    for(const data of globalRegionSeedData.globalRegionds)
        await TWEPostgreSQLMainDB.globalRegion.create({data});
};