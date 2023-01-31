import { GlobalRegionTypes } from "../../store/global-region/global-region.state.interface";

export interface AddNewsBlockTextText {
    title: string;
    body: string;
    blockTitle: string;
    submit: string;
    back: string;
}

export const addNewsBlockTextTextRegion = (globalRegion: GlobalRegionTypes): AddNewsBlockTextText => {
    switch(globalRegion) {
    case GlobalRegionTypes.US:
        return {
            title: 'Title',
            body: 'Body',
            blockTitle: 'News block text addition',
            submit: 'Submit',
            back: 'Back'
        }
    case GlobalRegionTypes.UA:
        return {
            title: 'Заголовок',
            body: 'Вміст',
            blockTitle: 'Додання тексту до блоку новин',
            submit: 'Відправити',
            back: 'Повернутися'
        }
    }
}