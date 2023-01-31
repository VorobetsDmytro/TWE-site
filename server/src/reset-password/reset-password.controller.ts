import { Body, Controller, Get, HttpException, Param, Post } from '@nestjs/common';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { UserRepository } from 'src/user/user.repository';
import { ResetPasswordRepository } from './reset-password.repository';
import { ResetPasswordService } from './reset-password.service';
import { MailTransporterService } from 'src/mail-transporter/mail-transporter.service';
import * as bcrypt from 'bcryptjs';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { resetPasswordMapper } from './mappers/reset-password.mapper';

@Controller('reset-password')
export class ResetPasswordController {
    constructor(private userRepository: UserRepository,
                private resetPasswordRepository: ResetPasswordRepository,
                private resetPasswordService: ResetPasswordService,
                private mailTransporterService: MailTransporterService){}

    @Post('/forgot')
    async forgotPassword(@Body() dto: ForgotPasswordDto) {
        const user = await this.userRepository.getOneByEmail(dto.email);
        if(!user)
            throw new HttpException('The user was not found.', 404);
        let resetPassword = await this.resetPasswordRepository.getOneByUserId(user.id);
        if(!resetPassword) {
            const id = await this.resetPasswordRepository.generateId();
            const token = await this.resetPasswordRepository.generateToken();
            resetPassword = await this.resetPasswordRepository.create({id, token, userId: user.id});
        }
        const link = this.resetPasswordService.createResetPasswordLink(user.id, resetPassword.token);
        await this.mailTransporterService.sendEmail(user.email, 'Reset password', link);
        return { message: 'To complete your reset password you have to move on the link in your email.' }
    }

    @Post('/reset/:userId/:token')
    async resetPassword(@Body() dto: ResetPasswordDto, @Param('userId') userId: string, @Param('token') token: string) {
        dto = resetPasswordMapper.fromControllerToService(dto);
        const user = await this.userRepository.getOneById(userId);
        if(!user)
            throw new HttpException('Incorrect data.', 400);
        const resetPassword = await this.resetPasswordRepository.getOneByUserIdAndToken(user.id, token);
        if(!resetPassword)
            throw new HttpException('Incorrect data.', 400);
        const hashPassword = await bcrypt.hash(dto.password, 5);
        await this.userRepository.update({password: hashPassword}, user.id);
        await this.resetPasswordRepository.delete(resetPassword.id);
        return {message: `The password has been changed successfully.`};
    }
}
