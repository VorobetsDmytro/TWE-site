import { GlobalRegionTypes } from "../../store/global-region/global-region.state.interface";

export interface AddNewsCardText {
    title: string;
    body: string;
    blockTitle: string;
    image: string;
    submit: string;
    back: string;
}

export const addNewsCardTextRegion = (globalRegion: GlobalRegionTypes): AddNewsCardText => {
    switch(globalRegion) {
    case GlobalRegionTypes.US:
        return {
            title: 'Title',
            body: 'Body',
            blockTitle: 'News card creation',
            image: 'Image',
            submit: 'Submit',
            back: 'Back'
        }
    case GlobalRegionTypes.UA:
        return {
            title: 'Заголовок',
            body: 'Вміст',
            blockTitle: 'Створення картки новин',
            image: 'Зображення',
            submit: 'Відправити',
            back: 'Повернутися'
        }
    }
}