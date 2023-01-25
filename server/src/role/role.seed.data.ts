import { Prisma } from "../../prisma/postrgreSQL-main/generated/client";
import { v4 } from 'uuid';

class RoleSeedData {
    roles: Prisma.RoleUncheckedCreateInput[] = [];
    constructor() {
        this.roles.push({
            id: v4(),
            value: "USER"
        });
        this.roles.push({
            id: v4(),
            value: "ADMIN"
        });
    }
}

export const roleSeedData = new RoleSeedData();