import { Controller, Get } from '@nestjs/common';
import { NewsBlockRateRepository } from './news-block-rate.repository';

@Controller('news-block-rate')
export class NewsBlockRateController {
    constructor(private newsBlockRateRepository: NewsBlockRateRepository){}

    @Get()
    async getAll() {
        return this.newsBlockRateRepository.getMany();
    }
}
