import { AddToNewsCardDto } from "../dto/add-to-news-card.dto";

class AddToNewsCardMapper {
    fromControllerToService(dto: AddToNewsCardDto): AddToNewsCardDto {
        return {
            id: dto.id,
            title: dto.title,
            body: dto.body,
            globalRegionName: dto.globalRegionName,
            newsCardId: dto.newsCardId
        }
    }
}

export const addToNewsCardMapper = new AddToNewsCardMapper();