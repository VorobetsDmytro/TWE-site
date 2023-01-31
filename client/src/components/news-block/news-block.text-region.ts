import { GlobalRegionTypes } from "../../store/global-region/global-region.state.interface";

export interface AddNewsBlockText {
    editBlockImage: string;
    editBlockText: string;
    addNewsText: string;
    removeNewsBlock: string;
    popupRemove: string;
}

export const addNewsBlockTextRegion = (globalRegion: GlobalRegionTypes): AddNewsBlockText => {
    switch(globalRegion) {
    case GlobalRegionTypes.US:
        return {
            editBlockImage: 'Edit the block image',
            editBlockText: 'Edit the block text',
            addNewsText: 'Add a news text',
            removeNewsBlock: 'Remove the news block',
            popupRemove: 'Do you wanna remove the news block?'
        }
    case GlobalRegionTypes.UA:
        return {
            editBlockImage: 'Змінити зображення блоку',
            editBlockText: 'Змінити текст блоку',
            addNewsText: 'Додати текст новин',
            removeNewsBlock: 'Прибрати блок новин',
            popupRemove: 'Прибрати блок новин?'
        }
    }
}