import { GlobalRegionTypes } from "../../store/global-region/global-region.state.interface";

export interface NewsCardOpenText {
    emptyTitle: string;
    addNewsText: string;
    editCardImage: string;
    editCardText: string;
    addNewBlock: string;
    removeNewsBlock: string;
    popupRemove: string;
}

export const newsCardOpenTextRegion = (globalRegion: GlobalRegionTypes): NewsCardOpenText => {
    switch(globalRegion) {
    case GlobalRegionTypes.US:
        return {
            emptyTitle: 'The text for this region was not found',
            addNewsText: 'Add a news text',
            editCardImage: 'Edit the card image',
            editCardText: 'Edit the card text',
            addNewBlock: 'Add a new block',
            removeNewsBlock: 'Remove the news card',
            popupRemove: 'Do you wanna remove the news card?'
        }
    case GlobalRegionTypes.UA:
        return {
            emptyTitle: 'Текст для поточного регіону не було знайдено',
            addNewsText: 'Додати новинний текст',
            editCardImage: 'Змінити зображення картки',
            editCardText: 'Змінити текст картки',
            addNewBlock: 'Додати новий блок',
            removeNewsBlock: 'Прибрати картку новин',
            popupRemove: 'Прибрати картку новин?'
        }
    }
}