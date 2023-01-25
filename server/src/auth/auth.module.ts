import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { TokenModule } from 'src/token/token.module';
import { RoleModule } from 'src/role/role.module';
import { ActivationLinkModule } from 'src/activation-link/activation-link.module';
import { MailTransporterModule } from 'src/mail-transporter/mail-transporter.module';

@Module({
  controllers: [AuthController],
  imports: [
    UserModule,
    TokenModule,
    RoleModule,
    ActivationLinkModule,
    MailTransporterModule
  ]
})
export class AuthModule {}
