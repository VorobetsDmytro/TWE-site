import { GlobalRegionTypes } from "../../store/global-region/global-region.state.interface";

export interface AddNewsCardTextText {
    title: string;
    body: string;
    blockTitle: string;
    submit: string;
    back: string;
}

export const addNewsCardTextTextRegion = (globalRegion: GlobalRegionTypes): AddNewsCardTextText => {
    switch(globalRegion) {
    case GlobalRegionTypes.US:
        return {
            title: 'Title',
            body: 'Body',
            blockTitle: 'News card text addition',
            submit: 'Submit',
            back: 'Back'
        }
    case GlobalRegionTypes.UA:
        return {
            title: 'Заголовок',
            body: 'Вміст',
            blockTitle: 'Додання тексту до картки новин',
            submit: 'Відправити',
            back: 'Повернутися'
        }
    }
}