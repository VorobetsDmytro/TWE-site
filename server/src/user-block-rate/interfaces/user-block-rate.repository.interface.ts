import { Prisma, UserBlockRate } from "prisma/postrgreSQL-main/generated/client";

export interface IUserBlockRateRepository {
    create(dto: Prisma.UserBlockRateUncheckedCreateInput): Promise<UserBlockRate>;
    getOneByUserId(userId: string): Promise<UserBlockRate>;
    getOneByNewsBlockRateId(newsBlockRateId: string): Promise<UserBlockRate>;
    getOneByUserIdAndNewsBlockRateId(userId: string, newsBlockRateId: string): Promise<UserBlockRate>;
    getMany(): Promise<UserBlockRate[]>;
    getManyByUserId(userId: string): Promise<UserBlockRate[]>;
    getManyByNewsBlockRateId(newsBlockRateId: string): Promise<UserBlockRate[]>;
    update(dto: Prisma.UserBlockRateUncheckedUpdateInput, userBlockRate: UserBlockRate): Promise<UserBlockRate>;
    delete(userBlockRate: UserBlockRate);
    deleteManyByUserId(userId: string);
    deleteManyByNewsBlockRateId(newsBlockRateId: string);
    deleteManyByNewsBlockId(newsBlockId: string);
    deleteManyByNewsCardId(newsCardId: string);
}