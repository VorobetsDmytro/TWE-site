import { Module } from '@nestjs/common';
import { DbModule } from './db/db.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TokenModule } from './token/token.module';
import { RoleModule } from './role/role.module';
import { MailTransporterModule } from './mail-transporter/mail-transporter.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { ActivationLinkModule } from './activation-link/activation-link.module';
import { NewsCardModule } from './news-card/news-card.module';
import { GlobalRegionModule } from './global-region/global-region.module';
import { NewsTextModule } from './news-text/news-text.module';
import { FileUploaderModule } from './file-uploader/file-uploader.module';
import { NewsBlockModule } from './news-block/news-block.module';
import { NewsBlockRateModule } from './news-block-rate/news-block-rate.module';
import { UserBlockRateModule } from './user-block-rate/user-block-rate.module';
import { FileModule } from './file/file.module';
import { ResetPasswordModule } from './reset-password/reset-password.module';

@Module({
    imports: [
        MailerModule.forRoot({
            transport: {
              host: process.env.EMAIL_HOST || 'host',
              port: process.env.EMAIL_PORT || 587,
              auth: {
                user: process.env.EMAIL_USER || 'user',
                pass: process.env.EMAIL_PASS || 'pass',
              },
            },
            defaults: {
              from: `Email helper <${process.env.EMAIL_USER || 'user'}>`,
            }
        }),
        DbModule,
        AuthModule,
        UserModule,
        TokenModule,
        RoleModule,
        MailTransporterModule,
        ActivationLinkModule,
        NewsCardModule,
        GlobalRegionModule,
        NewsTextModule,
        FileUploaderModule,
        NewsBlockModule,
        NewsBlockRateModule,
        UserBlockRateModule,
        FileModule,
        ResetPasswordModule
    ]
})
export class AppModule { }
