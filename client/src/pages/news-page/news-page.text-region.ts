import { GlobalRegionTypes } from "../../store/global-region/global-region.state.interface";

export interface NewsPageText {
    addNewsCard: string;
    emptyTitle: string;
}

export const newsPageTextRegion = (globalRegion: GlobalRegionTypes): NewsPageText => {
    switch(globalRegion) {
    case GlobalRegionTypes.US:
        return {
            addNewsCard: 'Add a news card',
            emptyTitle: 'This page is empty'
        }
    case GlobalRegionTypes.UA:
        return {
            addNewsCard: 'Додати картку новин',
            emptyTitle: 'Ця сторінка порожня'
        }
    }
}