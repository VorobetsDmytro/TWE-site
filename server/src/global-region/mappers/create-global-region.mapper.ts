import { CreateGlobalRegionDto } from "../dto/create-global-region.dto";

class CreateGlobalRegionMapper {
    fromControllerToService(dto: CreateGlobalRegionDto): CreateGlobalRegionDto {
        return {
            id: dto.id,
            name: dto.name,
        }
    }
}

export const createGlobalRegionMapper = new CreateGlobalRegionMapper();