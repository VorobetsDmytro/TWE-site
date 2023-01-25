import { Body, Controller, HttpException, Post, Request, UseGuards } from '@nestjs/common';
import { IsLogedInGuard } from 'src/guards/is-loged-in.guard';
import { RateNewsBlockDto } from './dto/rate-news-block.dto';
import { UserRepository } from 'src/user/user.repository';
import { UserBlockRateService } from './user-block-rate.service';
import { User } from 'prisma/postrgreSQL-main/generated/client';
import { NewsBlockRateRepository } from 'src/news-block-rate/news-block-rate.repository';

@Controller('user-block-rate')
export class UserBlockRateController {
    constructor(private userRepository: UserRepository,
                private userBlockRateService: UserBlockRateService,
                private newsBlockRateRepository: NewsBlockRateRepository) {}

    @Post('/rate-news-block')
    @UseGuards(IsLogedInGuard)
    async rateNewsBlock(@Body() dto: RateNewsBlockDto, @Request() req) {
        const userReq = req.user;
        const user = await this.userRepository.getOneById(userReq.id);
        if(!user)
            throw new HttpException('The user was not found.', 404);
        const newsBlockRate = await this.newsBlockRateRepository.getOneById(dto.newsBlockRateId);
        if(!newsBlockRate)
            throw new HttpException('The news block rate was not found.', 404);
        return this.userBlockRateService.updateNewsBlockRate(dto, user as User);
    }
}
