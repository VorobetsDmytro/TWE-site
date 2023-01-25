import { TWEPostgreSQLMainDB } from "../db/db.instance";
import { activationLinkSeedData } from "./activation-link.seed.data";

export const activationLinkSeed = async () => {
    console.log('Activation link seeding start...');
    for(const data of activationLinkSeedData.activationLinks)
        await TWEPostgreSQLMainDB.activationlink.create({data});
};