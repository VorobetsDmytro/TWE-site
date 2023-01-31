import { Module } from '@nestjs/common';
import { ResetPasswordController } from './reset-password.controller';
import { ResetPasswordRepository } from './reset-password.repository';
import { DbModule } from 'src/db/db.module';
import { UserModule } from 'src/user/user.module';
import { MailTransporterModule } from 'src/mail-transporter/mail-transporter.module';
import { ResetPasswordService } from './reset-password.service';

@Module({
  providers: [
    ResetPasswordRepository,
    ResetPasswordService
  ],
  controllers: [ResetPasswordController],
  imports: [
    DbModule,
    UserModule,
    MailTransporterModule
  ]
})
export class ResetPasswordModule {}
