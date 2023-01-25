import { Module } from '@nestjs/common';
import { DbModule } from '../db/db.module';
import { TokenModule } from 'src/token/token.module';
import { UserModule } from 'src/user/user.module';
import { ActivationLinkRepository } from './activation-link.repository';
import { ActivationLinkService } from './activation-link.service';
import { ActivationLinkController } from './activation-link.controller';

@Module({
  providers: [
    ActivationLinkRepository,
    ActivationLinkService
  ],
  imports: [
    DbModule,
    TokenModule,
    UserModule
  ],
  exports: [
    ActivationLinkRepository,
    ActivationLinkService
  ],
  controllers: [ActivationLinkController]
})
export class ActivationLinkModule {}
