import { Injectable } from '@nestjs/common';
import { IUserRepository } from './interfaces/user.repository.interface';
import { Prisma, User } from 'prisma/postrgreSQL-main/generated/client';
import { TWEPostgreSQLMainPrismaService } from 'src/db/twe-postgreSQL-main.prisma.service';
import { v4 } from "uuid"
import { ISelectUser } from './user.select';

@Injectable()
export class UserRepository implements IUserRepository {
    constructor(private tweMainDBService: TWEPostgreSQLMainPrismaService){}

    async create(dto: Prisma.UserUncheckedCreateInput): Promise<User> {
        return this.tweMainDBService.user.create({data: dto});
    }

    async getOneById(id: string, select?: ISelectUser) {
        return this.tweMainDBService.user.findUnique({where: {id}, select});
    }

    async getOneByEmail(email: string, select?: ISelectUser) {
        return this.tweMainDBService.user.findFirst({where: {email}, select});
    }

    async getMany(select?: ISelectUser) {
        return this.tweMainDBService.user.findMany({select});
    }

    async update(dto: Prisma.UserUncheckedUpdateInput, id: string): Promise<User> {
        return this.tweMainDBService.user.update({where: {id}, data: dto});
    }

    async delete(id: string): Promise<User> {
        return this.tweMainDBService.user.delete({where: {id}});
    }

    async generateId(): Promise<string> {
        let user: User | null, id: string;
        do {
            id = v4();
            user = await this.tweMainDBService.user.findUnique({where: {id}});
        } while (user);
        return id;
    }
}