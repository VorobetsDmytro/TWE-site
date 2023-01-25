import { Body, Controller, Get, HttpException, Post, UseGuards } from '@nestjs/common';
import { GlobalRegionRepository } from './global-region.repository';
import { Roles } from 'src/decorators/roles.decorator';
import { RoleTypes } from 'src/role/role.type';
import { RolesGuard } from 'src/guards/roles.guard';
import { CreateGlobalRegionDto } from './dto/create-global-region.dto';
import { createGlobalRegionMapper } from './mappers/create-global-region.mapper';

@Controller('global-region')
export class GlobalRegionController {
    constructor(private globalRegionRepository: GlobalRegionRepository){}

    @Post()
    @Roles([RoleTypes.ADMIN])
    @UseGuards(RolesGuard)
    async create(@Body() dto: CreateGlobalRegionDto) {
        dto = createGlobalRegionMapper.fromControllerToService(dto);
        const checkNameUnique = await this.globalRegionRepository.getOneByName(dto.name);
        if(checkNameUnique)
            throw new HttpException("This name is already in use.", 400);
        const id = await this.globalRegionRepository.generateID();
        return this.globalRegionRepository.create({...dto, id});
    }

    @Get()
    async getAll(){
        return this.globalRegionRepository.getMany();
    }
}
