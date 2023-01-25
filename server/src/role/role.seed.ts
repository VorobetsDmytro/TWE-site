import { TWEPostgreSQLMainDB } from "../db/db.instance";
import { roleSeedData } from "./role.seed.data";

export const roleSeed = async () => {
    console.log('Role seeding start...');
    for(const data of roleSeedData.roles)
        await TWEPostgreSQLMainDB.role.create({data});
};