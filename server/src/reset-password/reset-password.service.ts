import { Injectable } from "@nestjs/common";

@Injectable()
export class ResetPasswordService {
    createResetPasswordLink(userId: string, token: string) {
        return `${process.env.FRONT_URL}/reset-password/${userId}/${token}`;
    }
}