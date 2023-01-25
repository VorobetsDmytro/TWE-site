import { Prisma } from "../../prisma/postrgreSQL-main/generated/client";
import { v4 } from 'uuid';

class GlobalRegionSeedData {
    globalRegionds: Prisma.GlobalRegionUncheckedCreateInput[] = [];
    constructor() {
        this.globalRegionds.push({
            id: v4(),
            name: "US"
        });
        this.globalRegionds.push({
            id: v4(),
            name: "UA"
        });
    }
}

export const globalRegionSeedData = new GlobalRegionSeedData();