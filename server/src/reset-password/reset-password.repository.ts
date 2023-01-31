import { Injectable } from "@nestjs/common";
import { IResetPasswordRepository } from "./interfaces/reset-password.repository.interface";
import { TWEPostgreSQLMainPrismaService } from "src/db/twe-postgreSQL-main.prisma.service";
import { Prisma, ResetPassword } from "prisma/postrgreSQL-main/generated/client";
import { v4 } from "uuid"

@Injectable()
export class ResetPasswordRepository implements IResetPasswordRepository {
    constructor(private tweMainDBService: TWEPostgreSQLMainPrismaService){}

    async create(dto: Prisma.ResetPasswordUncheckedCreateInput): Promise<ResetPassword> {
        return this.tweMainDBService.resetPassword.create({data: dto});
    }

    async getOneById(id: string): Promise<ResetPassword> {
        return this.tweMainDBService.resetPassword.findUnique({where: {id}});
    }

    async getOneByUserId(userId: string) {
        return this.tweMainDBService.resetPassword.findFirst({where: {userId}});
    }

    async getOneByUserIdAndToken(userId: string, token: string) {
        return this.tweMainDBService.resetPassword.findFirst({where: {userId, token}});
    }

    async getMany(): Promise<ResetPassword[]> {
        return this.tweMainDBService.resetPassword.findMany();
    }

    async update(dto: Prisma.ResetPasswordUncheckedUpdateInput, id: string): Promise<ResetPassword> {
        return this.tweMainDBService.resetPassword.update({data: dto, where: {id}});
    }

    async delete(id: string): Promise<ResetPassword> {
        return this.tweMainDBService.resetPassword.delete({where: {id}});
    }

    async generateId(): Promise<string> {
        let resetPassword: ResetPassword | null, id: string;
        do {
            id = v4();
            resetPassword = await this.tweMainDBService.resetPassword.findUnique({where: {id}});
        } while (resetPassword);
        return id;
    }

    async generateToken(): Promise<string> {
        let resetPassword: ResetPassword | null, token: string;
        do {
            token = v4();
            resetPassword = await this.tweMainDBService.resetPassword.findFirst({where: {token}});
        } while (resetPassword);
        return token;
    }
}