import { CreateRoleDto } from "../dto/create-role.dto";

export class CreateRoleMapper {
    fromControllerToService(dto: CreateRoleDto): CreateRoleDto {
        return {
            id: dto.id,
            value: dto.value,
        }
    }
}

export const createRoleMapper = new CreateRoleMapper();