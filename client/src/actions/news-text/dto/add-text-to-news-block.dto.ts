import { GlobalRegionTypes } from "../../../store/global-region/global-region.state.interface"

export interface AddTextToNewsBlockDto {
    globalRegionName: GlobalRegionTypes;
    title: string;
    body: string;
    newsBlockId: string;
}