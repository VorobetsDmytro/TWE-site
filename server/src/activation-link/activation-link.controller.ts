import { Body, Controller, HttpException, Param, Post } from "@nestjs/common";
import { ActivationLinkRepository } from "./activation-link.repository";
import { ActivationDto } from "./dto/activation.dto";
import { activationMapper } from "./mappers/activation.mapper";
import { UserRepository } from "src/user/user.repository";
import * as bcrypt from 'bcryptjs';
import { TokenService } from "src/token/token.service";

@Controller('activation-link')
export class ActivationLinkController {
    constructor(private activationLinkRepository: ActivationLinkRepository,
                private userRepository: UserRepository,
                private tokenService: TokenService) {}

    @Post('/activation/:userId/:link')
    async activation(@Body() dto: ActivationDto, @Param('userId') userId: string, @Param('link') link: string) {
        dto = activationMapper.fromControllerToService(dto);
        const user = await this.userRepository.getOneById(userId);
        if(!user)
            throw new HttpException('Incorrect data.', 400);
        const comparePasswords = await bcrypt.compare(dto.password, user.password);
        if(!comparePasswords)
            throw new HttpException('Incorrect data.', 400);
        const activationLink = await this.activationLinkRepository.getOneByUserIdAndLink(user.id, link);
        if(!activationLink || activationLink.isActivated)
            throw new HttpException('Incorrect data.', 400);
        const token = await this.tokenService.generateToken(user);
        if(!token)
            throw new HttpException('Error creating a token.', 400);
        await this.tokenService.saveToken(user.id, token);
        await this.activationLinkRepository.update({isActivated: true}, user.id);
        return { 
            message: 'Your account has been activated successfully!' ,
            user,
            token
        };
    }
}