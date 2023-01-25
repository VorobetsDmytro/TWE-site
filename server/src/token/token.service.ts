import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenRepository } from './token.repository';
import { Prisma, Token } from 'prisma/postrgreSQL-main/generated/client';

@Injectable()
export class TokenService {
    constructor(private tokenRepository: TokenRepository,
                private jwtService: JwtService){}

    async generateToken(user: Prisma.UserUncheckedCreateInput): Promise<string> {
        const payload = {
            id: user.id,
            email: user.email
        }
        return this.jwtService.sign(payload);
    }

    async saveToken(userId: string, accessToken: string): Promise<Token> {
        const token = await this.tokenRepository.getOneByUserId(userId);
        if(!token)
            return this.tokenRepository.create({
                userId, 
                accessToken, 
                isActive: true
            });
        return this.tokenRepository.update({ accessToken, isActive: true, lastAuthorization: new Date() }, userId);
    }

    async disactivateToken(token: Token): Promise<Token> {
        return this.tokenRepository.update({isActive: false}, token.userId);
    }
}
