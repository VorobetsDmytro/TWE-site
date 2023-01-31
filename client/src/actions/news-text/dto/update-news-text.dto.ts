import { GlobalRegionTypes } from "../../../store/global-region/global-region.state.interface";

export interface UpdateNewsTextDto {
    globalRegionName: GlobalRegionTypes;
    title: string;
    body: string;
}