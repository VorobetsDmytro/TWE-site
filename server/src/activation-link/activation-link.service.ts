import { Injectable } from "@nestjs/common";
import { ActivationLinkRepository } from "./activation-link.repository";

@Injectable()
export class ActivationLinkService {
    constructor(private activationLinkRepository: ActivationLinkRepository) {}

    createActiovationLinkUrl(userId: string, link: string): string{
        return `${process.env.FRONT_URL}/registration/accept/${userId}/${link}`;
    }
}