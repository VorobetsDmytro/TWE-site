import { Prisma } from "../../prisma/postrgreSQL-main/generated/client";
import { userSeedData } from "../user/user.seed.data";
import { v4 } from 'uuid';

class ActivationLinkSeedData {
    private users = userSeedData.users;
    activationLinks: Prisma.ActivationlinkUncheckedCreateInput[] = [];
    constructor() {
        for(const user of this.users) {
            this.activationLinks.push({
                link: v4(),
                isActivated: true,
                userId: user.id
            });
        }
    }
}

export const activationLinkSeedData = new ActivationLinkSeedData();