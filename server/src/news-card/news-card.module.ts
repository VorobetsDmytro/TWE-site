import { Module, forwardRef } from '@nestjs/common';
import { NewsCardController } from './news-card.controller';
import { NewsCardRepository } from './news-card.repository';
import { DbModule } from 'src/db/db.module';
import { TokenModule } from 'src/token/token.module';
import { UserModule } from 'src/user/user.module';
import { RoleModule } from 'src/role/role.module';
import { FileUploaderModule } from 'src/file-uploader/file-uploader.module';
import { NewsTextModule } from 'src/news-text/news-text.module';
import { GlobalRegionModule } from 'src/global-region/global-region.module';
import { NewsBlockModule } from 'src/news-block/news-block.module';
import { NewsBlockRateModule } from 'src/news-block-rate/news-block-rate.module';
import { UserBlockRateModule } from 'src/user-block-rate/user-block-rate.module';

@Module({
	controllers: [NewsCardController],
	providers: [
		NewsCardRepository
	],
	imports: [
		DbModule,
		TokenModule,
    	UserModule,
    	RoleModule,
		FileUploaderModule,
		GlobalRegionModule,
		NewsBlockModule,
		NewsBlockRateModule,
		UserBlockRateModule,
		forwardRef(() => NewsTextModule),
	],
	exports: [
		NewsCardRepository
	]
})
export class NewsCardModule { }
