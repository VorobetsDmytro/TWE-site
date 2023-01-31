import { CanActivate, ExecutionContext, HttpException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { TokenRepository } from "src/token/token.repository";

@Injectable()
export class TryLogedInGuard implements CanActivate {
    constructor(private jwtService: JwtService,
                private tokenRepository: TokenRepository){}

    async canActivate(context: ExecutionContext) {
        try {
            const req = context.switchToHttp().getRequest();
            const token = req.headers.authorization?.split(' ')[1];
            if(!token)
                return true;
            const user = this.jwtService.verify<Express.User>(token);
            if(!user)
                return true;
            const tokenDB = await this.tokenRepository.getOneByUserId(user.id);
            if(!tokenDB || !tokenDB.isActive)
                return true;
            req.user = user;
            return true;
        } catch (error) {
            if(error instanceof HttpException)
                throw error;
            return true;
        }
    }
}