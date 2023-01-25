import { CanActivate, ExecutionContext, HttpException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { ROLES_KEY } from "../decorators/roles.decorator";
import { UserRepository } from "src/user/user.repository";
import { TokenRepository } from "src/token/token.repository";
import { RoleRepository } from "src/role/role.repository";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private jwtService: JwtService,
                private reflector: Reflector,
                private userRepository: UserRepository,
                private tokenRepository: TokenRepository,
                private roleRepository: RoleRepository){}

    async canActivate(context: ExecutionContext) {
        try {
            const roles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
                context.getHandler()
            ])
            if(!roles)
                return true;
            const req = context.switchToHttp().getRequest();
            const token = req.headers.authorization?.split(' ')[1];
            if(!token)
                throw new HttpException('No authorization', 401);
            const user = this.jwtService.verify<Express.User>(token);
            if(!user)
                throw new HttpException('No authorization', 401);
            const tokenDB = await this.tokenRepository.getOneByUserId(user.id);
            if(!tokenDB || !tokenDB.isActive)
                throw new HttpException('No authorization', 401);
            const userDB = await this.userRepository.getOneById(user.id);
            if(!userDB)
                throw new HttpException('No authorization', 401);
            const role = await this.roleRepository.getOneById(userDB.roleId);
            if(!role)
                throw new HttpException('No authorization', 401);
            req.user = user;
            return roles.includes(role.value);
        } catch (error) {
            if(error instanceof HttpException)
                throw error;
            throw new HttpException('No access', 403);
        }
    }
}