import { GlobalRegionTypes } from "../../../store/global-region/global-region.state.interface";

export interface AddNewsBlockDto {
    globalRegionName:  GlobalRegionTypes;
    title: string;
    body: string;
    newsCardId: string;
    image: File;
}