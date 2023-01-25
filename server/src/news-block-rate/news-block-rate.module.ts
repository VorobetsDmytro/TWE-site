import { Module } from '@nestjs/common';
import { NewsBlockRateRepository } from './news-block-rate.repository';
import { DbModule } from 'src/db/db.module';
import { NewsBlockRateController } from './news-block-rate.controller';

@Module({
    providers: [NewsBlockRateRepository],
    exports: [NewsBlockRateRepository],
    imports: [
        DbModule
    ],
    controllers: [NewsBlockRateController]
})
export class NewsBlockRateModule {}
