import { Module } from '@nestjs/common';
import { UserBlockRateController } from './user-block-rate.controller';
import { UserBlockRateRepository } from './user-block-rate.repository';
import { DbModule } from 'src/db/db.module';
import { TokenModule } from 'src/token/token.module';
import { UserModule } from 'src/user/user.module';
import { NewsBlockRateModule } from 'src/news-block-rate/news-block-rate.module';
import { UserBlockRateService } from './user-block-rate.service';

@Module({
  providers: [
    UserBlockRateRepository,
    UserBlockRateService
  ],
  controllers: [UserBlockRateController],
  exports: [
    UserBlockRateRepository,
    UserBlockRateService
  ],
  imports: [
    DbModule,
    TokenModule,
    UserModule,
    NewsBlockRateModule
  ]
})
export class UserBlockRateModule {}
