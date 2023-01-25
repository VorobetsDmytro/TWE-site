import { CreateNewsCardDto } from "../dto/create-news-card.dto";

class CreateNewsCardMapper {
    fromControllerToService(dto: CreateNewsCardDto):CreateNewsCardDto {
        return {
            id: dto.id,
            body: dto.body,
            globalRegionName: dto.globalRegionName,
            title: dto.title,
            createdById: dto.createdById,
            imgPath: dto.imgPath
        }
    }
}

export const createNewsCardMapper = new CreateNewsCardMapper();