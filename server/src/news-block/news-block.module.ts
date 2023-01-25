import { Module, forwardRef } from '@nestjs/common';
import { NewsBlockController } from './news-block.controller';
import { NewsBlockRepository } from './news-block.repository';
import { DbModule } from 'src/db/db.module';
import { TokenModule } from 'src/token/token.module';
import { UserModule } from 'src/user/user.module';
import { RoleModule } from 'src/role/role.module';
import { FileUploaderModule } from 'src/file-uploader/file-uploader.module';
import { GlobalRegionModule } from 'src/global-region/global-region.module';
import { NewsCardModule } from 'src/news-card/news-card.module';
import { NewsTextModule } from 'src/news-text/news-text.module';
import { NewsBlockRateModule } from 'src/news-block-rate/news-block-rate.module';
import { UserBlockRateModule } from 'src/user-block-rate/user-block-rate.module';

@Module({
  controllers: [NewsBlockController],
  providers: [NewsBlockRepository],
  exports: [
    NewsBlockRepository
  ],
  imports: [
    DbModule,
    TokenModule,
    UserModule,
    RoleModule,
    FileUploaderModule,
    GlobalRegionModule,
    NewsBlockRateModule,
    UserBlockRateModule,
    forwardRef(() => NewsCardModule),
    forwardRef(() => NewsTextModule)
  ]
})
export class NewsBlockModule {}
