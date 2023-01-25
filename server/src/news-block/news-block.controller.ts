import { Body, Controller, Post, UploadedFile, UseGuards, UseInterceptors, Request, HttpException, Get, Query, Patch, Param, Delete } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { RoleTypes } from 'src/role/role.type';
import { NewsBlockRepository } from './news-block.repository';
import { CreateNewsBlockDto } from './dto/create-news-block.dto';
import { createNewsBlockMapper } from './mappers/create-news-block.mapper';
import { UserRepository } from 'src/user/user.repository';
import { IMAGES_PATH, STATIC_PATH } from 'src/paths/paths';
import { FileUploaderService } from 'src/file-uploader/file-uploader.service';
import { GlobalRegionRepository } from 'src/global-region/global-region.repository';
import * as path from 'path';
import { NewsCardRepository } from 'src/news-card/news-card.repository';
import { NewsTextRepository } from 'src/news-text/news-text.repository';
import { GlobalRegionTypes } from 'src/global-region/global-region.types';
import { NewsBlockRateRepository } from 'src/news-block-rate/news-block-rate.repository';
import { UserBlockRateRepository } from 'src/user-block-rate/user-block-rate.repository';

@Controller('news-block')
export class NewsBlockController {
    constructor(private newsBlockRepository: NewsBlockRepository,
                private userRepository: UserRepository,
                private fileUploaderService: FileUploaderService,
                private globalRegionRepository: GlobalRegionRepository,
                private newsCardRepository: NewsCardRepository,
                private newsTextRepository: NewsTextRepository,
                private newsBlockRateRepository: NewsBlockRateRepository,
                private userBlockRateRepository: UserBlockRateRepository){}
                
    @Get()
    async getAll(@Query('gr') globalRegion?: string) {
        if(!globalRegion)
            return this.newsBlockRepository.getMany(GlobalRegionTypes.US);
        return this.newsBlockRepository.getMany(globalRegion);
    }
    
    @Post()
    @Roles([RoleTypes.ADMIN])
    @UseGuards(RolesGuard)
    @UseInterceptors(FileInterceptor('image'))
    async create(@Body() dto: CreateNewsBlockDto, @UploadedFile() image: Express.Multer.File, @Request() req) {
        if(!image)
            throw new HttpException('The iamge is required.', 400);
        dto = createNewsBlockMapper.fromControllerToService(dto);
        const userReq = req.user;
        const user = await this.userRepository.getOneById(userReq.id);
        if(!user)
            throw new HttpException('The user was not found.', 404);
        const newsCard = await this.newsCardRepository.getOneById(dto.newsCardId);
        if(!newsCard)
            throw new HttpException('The news card was not found.', 404);
        const globalRegion = await this.globalRegionRepository.getOneByName(dto.globalRegionName);
        if(!globalRegion)
            throw new HttpException('The global region was not found.', 404);
        const imgPath = this.fileUploaderService.uploadFile(image, IMAGES_PATH);
        const newsBlockId = await this.newsBlockRepository.generateId();
        const newsBlock = await this.newsBlockRepository.create({id: newsBlockId, imgPath: path.relative(STATIC_PATH, imgPath), createdById: user.id, newsCardId: newsCard.id});
        const newsTextId = await this.newsTextRepository.generateId();
        const newsText = await this.newsTextRepository.create({id: newsTextId, globalRegionId: globalRegion.id, title: dto.title, body: dto.body, newsBlockId});
        const newsBlockRateId = await this.newsBlockRateRepository.generateId();
        await this.newsBlockRateRepository.create({id: newsBlockRateId, newsBlockId});
        return {
            ...newsBlock,
            newsTexts: [newsText]
        };
    }

    @Patch('/:newsBlockId')
    @Roles([RoleTypes.ADMIN])
    @UseGuards(RolesGuard)
    @UseInterceptors(FileInterceptor('image'))
    async update(@UploadedFile() image: Express.Multer.File, @Param('newsBlockId') newsBlockId: string) {
        let newsBlock = await this.newsBlockRepository.getOneById(newsBlockId);
        if(!newsBlock)
            throw new HttpException('The news block was not found.', 404);
        if(image) {
            if(newsBlock.imgPath)
                this.fileUploaderService.deleteFile(path.resolve(STATIC_PATH, newsBlock.imgPath));
            const imgPath = this.fileUploaderService.uploadFile(image, IMAGES_PATH);
            newsBlock = await this.newsBlockRepository.update({imgPath: path.relative(STATIC_PATH, imgPath)}, newsBlock.id);
        }
        return newsBlock;
    }

    @Delete('/:newsBlockId')
    @Roles([RoleTypes.ADMIN])
    @UseGuards(RolesGuard)
    async delete(@Param('newsBlockId') newsBlockId: string) {
        const newsBlock = await this.newsBlockRepository.getOneById(newsBlockId);
        if(!newsBlock)
            throw new HttpException('The news block was not found.', 404);
        await this.userBlockRateRepository.deleteManyByNewsBlockId(newsBlock.id);
        await this.newsTextRepository.deleteManyByNewsBlockId(newsBlock.id);
        if(newsBlock.imgPath)
            this.fileUploaderService.deleteFile(path.resolve(STATIC_PATH, newsBlock.imgPath));
        const newsBlockRate = await this.newsBlockRateRepository.getOneByNewsBlockId(newsBlock.id);
        if(newsBlockRate)
            await this.newsBlockRateRepository.delete(newsBlockRate.id);
        await this.newsBlockRepository.delete(newsBlock.id);
        return { message: 'The news block has been deleted successfully.' };
    }
}
