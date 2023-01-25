import { Injectable } from "@nestjs/common";
import { NewsBlockRate, User, UserBlockRate } from "prisma/postrgreSQL-main/generated/client";
import { UserBlockRateRepository } from "./user-block-rate.repository";
import { NewsBlockRateRepository } from "src/news-block-rate/news-block-rate.repository";
import { RateNewsBlockDto } from "./dto/rate-news-block.dto";

@Injectable()
export class UserBlockRateService {
    constructor(private userBlockRateRepository: UserBlockRateRepository,
                private newsBlockRateRepository: NewsBlockRateRepository) {}

    async updateNewsBlockRate(dto: RateNewsBlockDto, user: User): Promise<NewsBlockRate> {
        let userBlockRate = await this.userBlockRateRepository.getOneByUserIdAndNewsBlockRateId(user.id, dto.newsBlockRateId);
        if(userBlockRate) {
            let newsBlockRate = await this.newsBlockRateRepository.getOneById(userBlockRate.newsBlockRateId);
            if(userBlockRate.isLike == dto.isLike) {
                if(userBlockRate.isLike)
                    newsBlockRate = await this.newsBlockRateRepository.update({likes: newsBlockRate.likes - 1}, newsBlockRate.id);
                else
                    newsBlockRate = await this.newsBlockRateRepository.update({dislikes: newsBlockRate.dislikes - 1}, newsBlockRate.id);
                await this.userBlockRateRepository.delete(userBlockRate);
            } else {
                if(dto.isLike)
                    newsBlockRate = await this.newsBlockRateRepository.update({likes: newsBlockRate.likes + 1, dislikes: newsBlockRate.dislikes - 1}, newsBlockRate.id);
                else
                    newsBlockRate = await this.newsBlockRateRepository.update({likes: newsBlockRate.likes - 1, dislikes: newsBlockRate.dislikes + 1}, newsBlockRate.id);
                await this.userBlockRateRepository.update({isLike: dto.isLike}, userBlockRate);
            } 
            return newsBlockRate;  
        } else {
            userBlockRate = await this.userBlockRateRepository.create({userId: user.id, newsBlockRateId: dto.newsBlockRateId, isLike: dto.isLike});
            let newsBlockRate = await this.newsBlockRateRepository.getOneById(userBlockRate.newsBlockRateId);
            if(userBlockRate.isLike)
                newsBlockRate = await this.newsBlockRateRepository.update({likes: newsBlockRate.likes + 1}, newsBlockRate.id);
            else
                newsBlockRate = await this.newsBlockRateRepository.update({dislikes: newsBlockRate.dislikes + 1}, newsBlockRate.id);
            return newsBlockRate;
        }
    }
}