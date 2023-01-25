import { Prisma, Token } from "prisma/postrgreSQL-main/generated/client";

export interface ITokenRpository {
    create(dto: Prisma.TokenUncheckedCreateInput): Promise<Token>;
    getOneByUserId(id: string): Promise<Token | null>;
    getMany(): Promise<Array<Token>>;
    update(dto: Prisma.TokenUncheckedUpdateInput, userId: string): Promise<Token | null>;
    delete(userId: string): Promise<Token | null>;
}