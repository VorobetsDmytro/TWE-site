import { TWEPostgreSQLMainDB } from "../db/db.instance";
import { userSeedData } from "./user.seed.data";

export const userSeed = async () => {
    console.log('User seeding start...');
    for(const data of userSeedData.users)
        await TWEPostgreSQLMainDB.user.create({data});
};