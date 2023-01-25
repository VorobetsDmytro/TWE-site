import { Body, Controller, Delete, Get, HttpException, Param, Patch, Post, Query, Request, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { RoleTypes } from 'src/role/role.type';
import { CreateNewsCardDto } from './dto/create-news-card.dto';
import { createNewsCardMapper } from './mappers/create-news-card.mapper';
import { NewsCardRepository } from './news-card.repository';
import { UserRepository } from 'src/user/user.repository';
import { FileUploaderService } from 'src/file-uploader/file-uploader.service';
import { IMAGES_PATH, STATIC_PATH } from 'src/paths/paths';
import { NewsTextRepository } from 'src/news-text/news-text.repository';
import { GlobalRegionRepository } from 'src/global-region/global-region.repository';
import * as path from 'path';
import { GlobalRegionTypes } from 'src/global-region/global-region.types';
import { NewsBlockRepository } from 'src/news-block/news-block.repository';
import { NewsBlockRateRepository } from 'src/news-block-rate/news-block-rate.repository';
import { UserBlockRateRepository } from 'src/user-block-rate/user-block-rate.repository';

@Controller('news-card')
export class NewsCardController {
    constructor(private newsCardRepository: NewsCardRepository,
                private userRepository: UserRepository,
                private fileUploaderService: FileUploaderService,
                private newsTextRepository: NewsTextRepository,
                private globalRegionRepository: GlobalRegionRepository,
                private newsBlockRepository: NewsBlockRepository,
                private newsBlockRateRepository: NewsBlockRateRepository,
                private userBlockRateRepository: UserBlockRateRepository) {}

    @Get()
    async getAll(@Query('gr') globalRegion?: string) {
        if(!globalRegion)
            return this.newsCardRepository.getMany(GlobalRegionTypes.US);
        return this.newsCardRepository.getMany(globalRegion);
    }

    @Post()
    @Roles([RoleTypes.ADMIN])
    @UseGuards(RolesGuard)
    @UseInterceptors(FileInterceptor('image'))
    async create(@Body() dto: CreateNewsCardDto, @UploadedFile() image: Express.Multer.File, @Request() req) {
        if(!image)
            throw new HttpException('The iamge is required.', 400);
        dto = createNewsCardMapper.fromControllerToService(dto);
        const userReq = req.user;
        const user = await this.userRepository.getOneById(userReq.id);
        if(!user)
            throw new HttpException('The user was not found.', 404);
        const globalRegion = await this.globalRegionRepository.getOneByName(dto.globalRegionName);
        if(!globalRegion)
            throw new HttpException('The global region was not found.', 404);
        const imgPath = this.fileUploaderService.uploadFile(image, IMAGES_PATH);
        const newsCardId = await this.newsCardRepository.generateId();
        const newsCard = await this.newsCardRepository.create({ id: newsCardId, imgPath: path.relative(STATIC_PATH, imgPath), createdById: user.id });
        const newsTextId = await this.newsTextRepository.generateId();
        const newsText = await this.newsTextRepository.create({id: newsTextId, globalRegionId: globalRegion.id, title: dto.title, body: dto.body, newsCardId});
        return {
            ...newsCard,
            newsTexts: [newsText]
        };
    }

    @Patch('/:newsCardId')
    @Roles([RoleTypes.ADMIN])
    @UseGuards(RolesGuard)
    @UseInterceptors(FileInterceptor('image'))
    async update(@UploadedFile() image: Express.Multer.File, @Param('newsCardId') newsCardId: string) {
        let newsCard = await this.newsCardRepository.getOneById(newsCardId);
        if(!newsCard)
            throw new HttpException('The news card was not found.', 404);
        if(image) {
            if(newsCard.imgPath)
                this.fileUploaderService.deleteFile(path.resolve(STATIC_PATH, newsCard.imgPath));
            const imgPath = this.fileUploaderService.uploadFile(image, IMAGES_PATH);
            newsCard = await this.newsCardRepository.update({imgPath: path.relative(STATIC_PATH, imgPath)}, newsCard.id);
        }
        return newsCard;
    }

    @Delete('/:newsCardId')
    @Roles([RoleTypes.ADMIN])
    @UseGuards(RolesGuard)
    async delete(@Param('newsCardId') newsCardId: string) {
        const newsCard = await this.newsCardRepository.getOneById(newsCardId);
        if(!newsCard)
            throw new HttpException('The news card was not found.', 404);
        await this.userBlockRateRepository.deleteManyByNewsCardId(newsCard.id);
        await this.newsTextRepository.deleteManyByNewsCardId(newsCard.id);
        await this.newsBlockRateRepository.deleteManyByNewsCardId(newsCard.id);
        await this.newsBlockRepository.deleteManyByNewsCardId(newsCard.id);
        if(newsCard.imgPath)
            this.fileUploaderService.deleteFile(path.resolve(STATIC_PATH, newsCard.imgPath));
        await this.newsCardRepository.delete(newsCard.id);
        return { message: 'The news card has been deleted successfully.' };
    }
}
