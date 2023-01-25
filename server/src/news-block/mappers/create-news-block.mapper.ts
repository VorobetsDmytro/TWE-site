import { CreateNewsBlockDto } from "../dto/create-news-block.dto";

class CreateNewsBlockMapper {
    fromControllerToService(dto: CreateNewsBlockDto):CreateNewsBlockDto {
        return {
            id: dto.id,
            body: dto.body,
            globalRegionName: dto.globalRegionName,
            title: dto.title,
            createdById: dto.createdById,
            imgPath: dto.imgPath,
            newsCardId: dto.newsCardId
        }
    }
}

export const createNewsBlockMapper = new CreateNewsBlockMapper();