import { Controller, Get, UseGuards } from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { RoleTypes } from 'src/role/role.type';
import { UserRepository } from './user.repository';
import { SecureUserSelect } from './user.select';

@Controller('user')
export class UserController {
    constructor(private userRepository: UserRepository) {}

    @Get()
    @Roles([RoleTypes.ADMIN])
    @UseGuards(RolesGuard)
    async getAll() {
        return this.userRepository.getMany(SecureUserSelect);
    }
}
