import { GlobalRegionTypes } from "../../../store/global-region/global-region.state.interface";

export interface AddNewsCardDto {
    globalRegionName: GlobalRegionTypes,
    title: string;
    body: string;
    image: File;
}