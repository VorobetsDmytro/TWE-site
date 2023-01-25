import { TWEPostgreSQLMainDB } from "./db.instance";

const start = async () => {
    console.log('Dropping start...');
    await TWEPostgreSQLMainDB.userBlockRate.deleteMany();
    await TWEPostgreSQLMainDB.newsBlockRate.deleteMany();
    await TWEPostgreSQLMainDB.newsBlock.deleteMany();
    await TWEPostgreSQLMainDB.newsCard.deleteMany();
    await TWEPostgreSQLMainDB.newsText.deleteMany();
    await TWEPostgreSQLMainDB.globalRegion.deleteMany();
    await TWEPostgreSQLMainDB.role.deleteMany();
    await TWEPostgreSQLMainDB.token.deleteMany();
    await TWEPostgreSQLMainDB.activationlink.deleteMany();
    await TWEPostgreSQLMainDB.user.deleteMany();
};

start();