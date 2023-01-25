import { Activationlink, Prisma } from "prisma/postrgreSQL-main/generated/client";

export interface IActiovationLinkRepository{
    create(dto: Prisma.ActivationlinkUncheckedCreateInput): Promise<Activationlink>;
    getOneByUserId(userId: string): Promise<Activationlink | null>;
    getOneByUserIdAndLink(userId: string, link: string): Promise<Activationlink | null>;
    getOneByLink(link: string): Promise<Activationlink | null>;
    getMany(): Promise<Array<Activationlink>>;
    update(dto: Prisma.ActivationlinkUncheckedUpdateInput, userId: string): Promise<Activationlink | null>;
    delete(userId: string): Promise<Activationlink | null>;
    generateLink(): Promise<string>;
}