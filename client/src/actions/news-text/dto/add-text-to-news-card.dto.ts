import { GlobalRegionTypes } from "../../../store/global-region/global-region.state.interface"

export interface AddTextToNewsCardDto {
    globalRegionName: GlobalRegionTypes;
    title: string;
    body: string;
    newsCardId: string;
}