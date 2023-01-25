import { Body, Controller, Delete, Get, HttpCode, HttpException, Param, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { RoleRepository } from './role.repository';
import { Roles } from 'src/decorators/roles.decorator';
import { RoleTypes } from './role.type';
import { RolesGuard } from 'src/guards/roles.guard';
import { CreateRoleDto } from './dto/create-role.dto';
import { createRoleMapper } from './mappers/create-role.mapper';
import { UserRepository } from 'src/user/user.repository';

@Controller('roles')
export class RoleController {
    constructor(private roleRepository: RoleRepository,
                private userRepository: UserRepository){}

    @Post('/create')
    @Roles([RoleTypes.ADMIN])
    @UseGuards(RolesGuard)
    @HttpCode(201)
    async create(@Body() dto: CreateRoleDto, @Req() req: Request){
        dto = createRoleMapper.fromControllerToService(dto);
        const userReq = req.user as Express.User;
        const user = await this.userRepository.getOneById(userReq.id);
        if(!user)
            throw new HttpException('The user was not found.', 404);
        const checkRole = await this.roleRepository.getOneByValue(dto.value);
        if(checkRole)
            throw new HttpException('This role already exists.', 400);
        const roleId = await this.roleRepository.generateId();
        return this.roleRepository.create({...dto, id: roleId});
    }

    @Get('/')
    @Roles([RoleTypes.ADMIN])
    @UseGuards(RolesGuard)
    @HttpCode(200)
    async getAll(@Req() req: Request){
        const userReq = req.user as Express.User;
        const user = await this.userRepository.getOneById(userReq.id);
        if(!user)
            throw new HttpException('The user was not found.', 404);
        return this.roleRepository.getMany();
    }

    @Delete('/delete/:value')
    @Roles([RoleTypes.ADMIN])
    @UseGuards(RolesGuard)
    @HttpCode(200)
    async delete(@Param('value') value: string, @Req() req: Request){
        const userReq = req.user as Express.User;
        const user = await this.userRepository.getOneById(userReq.id);
        if(!user)
            throw new HttpException('The user was not found.', 404);
        const role = await this.roleRepository.getOneByValue(value);
        if(!role)
            throw new HttpException('The role was not found.', 404);
        await this.roleRepository.delete(role.id);
        return { message: `Role <${role.value}> has been deleted successfully.` };
    }
}
