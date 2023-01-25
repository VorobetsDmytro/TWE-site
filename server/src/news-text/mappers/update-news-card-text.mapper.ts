import { UpdateNewsCardTextDto } from "../dto/update-news-card-text.dto";

class UpdateNewsCardTextMapper {
    fromControllerToService(dto: UpdateNewsCardTextDto): UpdateNewsCardTextDto {
        return {
            body: dto.body,
            globalRegionName: dto.globalRegionName,
            title: dto.title
        };
    }
}

export const updateNewsCardTextMapper = new UpdateNewsCardTextMapper();