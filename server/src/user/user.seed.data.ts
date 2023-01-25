import { Prisma } from "../../prisma/postrgreSQL-main/generated/client";
import { v4 } from 'uuid';
import * as bcrypt from "bcryptjs"
import { roleSeedData } from "../role/role.seed.data"
import { RoleTypes } from "../role/role.type";

class UserSeedData {
    userRole = roleSeedData.roles.find((role: Prisma.RoleUncheckedCreateInput) => {
        return role.value == RoleTypes.ADMIN;
    });
    users: Prisma.UserUncheckedCreateInput[] = [];
    constructor() {
        this.users.push({
            id: v4(),
            email: "admin@gmail.com",
            password: bcrypt.hashSync("admin", 5),
            username: "admin",
            roleId: this.userRole.id
        })
    }
}

export const userSeedData = new UserSeedData();