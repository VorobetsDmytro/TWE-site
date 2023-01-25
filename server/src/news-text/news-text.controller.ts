import { Body, Controller, Delete, Get, HttpException, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { NewsTextRepository } from './news-text.repository';
import { AddToNewsCardDto } from './dto/add-to-news-card.dto';
import { addToNewsCardMapper } from './mappers/add-to-news-card.mapper';
import { Roles } from 'src/decorators/roles.decorator';
import { RoleTypes } from 'src/role/role.type';
import { RolesGuard } from 'src/guards/roles.guard';
import { GlobalRegionRepository } from 'src/global-region/global-region.repository';
import { NewsCardRepository } from 'src/news-card/news-card.repository';
import { AddToNewsBlockDto } from './dto/add-to-news-block.dto';
import { addToNewsBlockMapper } from './mappers/add-to-news-block.mapper';
import { NewsBlockRepository } from 'src/news-block/news-block.repository';
import { UpdateNewsCardTextDto } from './dto/update-news-card-text.dto';
import { updateNewsCardTextMapper } from './mappers/update-news-card-text.mapper';
import { GlobalRegion } from 'prisma/postrgreSQL-main/generated/client';

@Controller('news-text')
export class NewsTextController {
    constructor(private newsTextRepository: NewsTextRepository,
                private globalRegionRepository: GlobalRegionRepository,
                private newsCardRepository: NewsCardRepository,
                private newsBlockRepository: NewsBlockRepository) {}

    @Get()
    async getAll() {
        return this.newsTextRepository.getMany();
    }

    @Post('/news-card/add')
    @Roles([RoleTypes.ADMIN])
    @UseGuards(RolesGuard)
    async addToNewsCard(@Body() dto: AddToNewsCardDto) {
        dto = addToNewsCardMapper.fromControllerToService(dto);
        const newsCard = await this.newsCardRepository.getOneById(dto.newsCardId);
        if(!newsCard)
            throw new HttpException('The news card was not found.', 404);
        const globalRegion = await this.globalRegionRepository.getOneByName(dto.globalRegionName);
        if(!globalRegion)
            throw new HttpException('The global region was not found.', 404);
        const checkNewsTextUnique = await this.newsTextRepository.getOneByNewsCardIdAndGlobalRegionId(newsCard.id, globalRegion.id);
        if(checkNewsTextUnique)
            throw new HttpException(`The news text for this card by < ${globalRegion.name} > region is already exists`, 400);
        const id = await this.newsTextRepository.generateId();
        return this.newsTextRepository.create({
            id, 
            title: dto.title, 
            body: dto.body,
            globalRegionId: globalRegion.id,
            newsCardId: newsCard.id
        });
    }

    @Post('/news-block/add')
    @Roles([RoleTypes.ADMIN])
    @UseGuards(RolesGuard)
    async addToNewsBlock(@Body() dto: AddToNewsBlockDto) {
        dto = addToNewsBlockMapper.fromControllerToService(dto);
        const newsBlock = await this.newsBlockRepository.getOneById(dto.newsBlockId);
        if(!newsBlock)
            throw new HttpException('The news block was not found.', 404);
        const globalRegion = await this.globalRegionRepository.getOneByName(dto.globalRegionName);
        if(!globalRegion)
            throw new HttpException('The global region was not found.', 404);
        const checkNewsTextUnique = await this.newsTextRepository.getOneByNewsBlockIdAndGlobalRegionId(newsBlock.id, globalRegion.id);
        if(checkNewsTextUnique)
            throw new HttpException(`The news text for this block by < ${globalRegion.name} > region is already exists`, 400);
        const id = await this.newsTextRepository.generateId();
        return this.newsTextRepository.create({
            id, 
            title: dto.title, 
            body: dto.body,
            globalRegionId: globalRegion.id,
            newsBlockId: newsBlock.id
        });
    }

    @Patch('/update/:newsTextId')
    @Roles([RoleTypes.ADMIN])
    @UseGuards(RolesGuard)
    async updateNewsText(@Body() dto: UpdateNewsCardTextDto, @Param('newsTextId') newsTextId: string) {
        dto = updateNewsCardTextMapper.fromControllerToService(dto);
        const newsText = await this.newsTextRepository.getOneById(newsTextId);
        if(!newsText)
            throw new HttpException('The news text was not found.', 404);
        let globalRegion: GlobalRegion | undefined = undefined;
        if(dto.globalRegionName) {
            globalRegion = await this.globalRegionRepository.getOneByName(dto.globalRegionName);
            if(!globalRegion)
                throw new HttpException('The global region was not found.', 404);
            if(globalRegion.id == newsText.globalRegionId)
                throw new HttpException('The news text already has this global region.', 400);
            if(newsText.newsCardId) {
                const newsCard = await this.newsCardRepository.getOneById(newsText.newsCardId);
                if(!newsCard)
                    throw new HttpException('The news card was not found.', 404);
                const checkNewsTextUnique = await this.newsTextRepository.getOneByNewsCardIdAndGlobalRegionId(newsCard.id, globalRegion.id);
                if(checkNewsTextUnique)
                    throw new HttpException('The news text already has this global region.', 400);
            }
            if(newsText.newsBlockId) {
                const newsBlock = await this.newsBlockRepository.getOneById(newsText.newsBlockId);
                if(!newsBlock)
                    throw new HttpException('The news block was not found.', 404);
                const checkNewsTextUnique = await this.newsTextRepository.getOneByNewsBlockIdAndGlobalRegionId(newsBlock.id, globalRegion.id);
                if(checkNewsTextUnique)
                    throw new HttpException('The news text already has this global region.', 400);
            }
        }
        if(globalRegion)
            return this.newsTextRepository.update({body: dto.body, globalRegionId: globalRegion.id, title: dto.title}, newsText.id);
        return this.newsTextRepository.update({body: dto.body, title: dto.title}, newsText.id);
    }

    @Delete('/:newsTextId')
    @Roles([RoleTypes.ADMIN])
    @UseGuards(RolesGuard)
    async delete(@Param('newsTextId') newsTextId: string) {
        const newsText = await this.newsTextRepository.getOneById(newsTextId);
        if(!newsText)
            throw new HttpException('The news text was not found.', 404);
        await this.newsTextRepository.delete(newsText.id);
        return { message: 'The news text has been deleted successfully.' };
    }
}
