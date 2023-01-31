import { Body, Controller, Get, HttpCode, HttpException, Post, Req, UseGuards } from '@nestjs/common';
import { UserRepository } from 'src/user/user.repository';
import { RegistrationDto } from './dto/registration.dto';
import { registrationMapper } from './mappers/registration.mapper';
import * as bcrypt from 'bcryptjs';
import { TokenService } from 'src/token/token.service';
import { LoginDto } from './dto/login.dto';
import { loginMapper } from './mappers/login.mapper';
import { IsLogedInGuard } from 'src/guards/is-loged-in.guard';
import { Request } from 'express';
import { TokenRepository } from 'src/token/token.repository';
import { RoleRepository } from 'src/role/role.repository';
import { RoleTypes } from 'src/role/role.type';
import { ActivationLinkRepository } from 'src/activation-link/activation-link.repository';
import { ActivationLinkService } from 'src/activation-link/activation-link.service';
import { MailTransporterService } from 'src/mail-transporter/mail-transporter.service';
import { SecureUserSelect, SelectUser } from 'src/user/user.select';

@Controller('auth')
export class AuthController {
    constructor(private userRepository: UserRepository,
                private tokenService: TokenService,
                private tokenRepository: TokenRepository,
                private roleRepository: RoleRepository,
                private activationLinkRepository: ActivationLinkRepository,
                private activationLinkService: ActivationLinkService,
                private mailTransporterService: MailTransporterService) {}

    @Get()
    @UseGuards(IsLogedInGuard)
    async auth(@Req() req: Request) {
        const userReq = req.user;
        const user = await this.userRepository.getOneById(userReq.id, SecureUserSelect);
        if(!user)
            throw new HttpException('The user was not found.', 404);
        const token = await this.tokenService.generateToken(user);
        if(!token)
            throw new HttpException('Error creating a token.', 400);
        await this.tokenService.saveToken(user.id, token);
        return { user, token };
    }

    @Get('/logout')
    @UseGuards(IsLogedInGuard)
    async logout(@Req() req: Request){
        const userReq = req.user;
        const user = await this.userRepository.getOneById(userReq.id);
        if(!user)
            throw new HttpException('The user was not found.', 404);
        const token = await this.tokenRepository.getOneByUserId(user.id);
        if(!token)
            throw new HttpException('The token was not found.', 404);
        await this.tokenService.disactivateToken(token);
        return { message: 'Logout has been executed successfully.' };
    }

    @Post('/registration')
    @HttpCode(201)
    async registration(@Body() dto: RegistrationDto) {
        dto = registrationMapper.fromControllerToService(dto);
        const checkAdminExisting = await this.userRepository.getOneByEmail(dto.email);
        if(checkAdminExisting)
            throw new HttpException('This email is already in use.', 400);
        const role = await this.roleRepository.getOneByValue(RoleTypes.USER);
        if(!role)
            throw new HttpException('The role was not found', 404);
        const hashPassword = await bcrypt.hash(dto.password!, 5);
        const id = await this.userRepository.generateId();
        const user = await this.userRepository.create({...dto, id, password: hashPassword, roleId: role.id});
        const token = await this.tokenService.generateToken(user);
        if(!token)
            throw new HttpException('Error creating a token.', 400);
        const link = await this.activationLinkRepository.generateLink();
        const linkURL = this.activationLinkService.createActiovationLinkUrl(user.id, link);
        await this.activationLinkRepository.create({link, userId: user.id});
        await this.mailTransporterService.sendEmail(user.email, 'TWE-site: Activation link', `Your activation link: < ${linkURL} >`);
        await this.tokenService.saveToken(user.id, token);
        return { message: 'To complete your registration you have to move on the link in your email.' };
    }

    @Post('/login')
    async login(@Body() dto: LoginDto){
        dto = loginMapper.fromControllerToService(dto);
        const user = await this.userRepository.getOneByEmail(dto.email, SelectUser);
        if(!user)
            throw new HttpException('Incorrect data.', 400);
        const activationLink = await this.activationLinkRepository.getOneByUserId(user.id);
        if(!activationLink || !activationLink.isActivated)
            throw new HttpException('Incorrect data.', 400);
        const comparePasswords = await bcrypt.compare(dto.password, user.password);
        if(!comparePasswords)
            throw new HttpException('Incorrect data.', 400);
        const token = await this.tokenService.generateToken(user);
        if(!token)
            throw new HttpException('Error creating a token.', 400);
        await this.tokenService.saveToken(user.id, token);
        delete user.password;
        return { user, token };
    }
}
