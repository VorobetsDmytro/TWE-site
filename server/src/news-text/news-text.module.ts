import { Module, forwardRef } from '@nestjs/common';
import { NewsTextController } from './news-text.controller';
import { NewsTextRepository } from './news-text.repository';
import { DbModule } from 'src/db/db.module';
import { TokenModule } from 'src/token/token.module';
import { UserModule } from 'src/user/user.module';
import { RoleModule } from 'src/role/role.module';
import { GlobalRegionModule } from 'src/global-region/global-region.module';
import { NewsCardModule } from 'src/news-card/news-card.module';
import { NewsBlockModule } from 'src/news-block/news-block.module';

@Module({
  controllers: [NewsTextController],
  providers: [NewsTextRepository],
  exports: [
    NewsTextRepository
  ],
  imports: [
    DbModule,
    TokenModule,
    UserModule,
    RoleModule,
    GlobalRegionModule,
    forwardRef(() => NewsCardModule),
    forwardRef(() => NewsBlockModule)
  ]
})
export class NewsTextModule {}
