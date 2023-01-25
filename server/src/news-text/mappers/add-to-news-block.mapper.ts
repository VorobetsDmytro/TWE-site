import { AddToNewsBlockDto } from "../dto/add-to-news-block.dto";

class AddToNewsBlockMapper {
    fromControllerToService(dto: AddToNewsBlockDto): AddToNewsBlockDto {
        return {
            id: dto.id,
            title: dto.title,
            body: dto.body,
            globalRegionName: dto.globalRegionName,
            newsBlockId: dto.newsBlockId
        }
    }
}

export const addToNewsBlockMapper = new AddToNewsBlockMapper();