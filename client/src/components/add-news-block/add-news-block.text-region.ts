import { GlobalRegionTypes } from "../../store/global-region/global-region.state.interface";

export interface AddNewsBlockText {
    title: string;
    body: string;
    blockTitle: string;
    image: string;
    submit: string;
    back: string;
}

export const addNewsBlockTextRegion = (globalRegion: GlobalRegionTypes): AddNewsBlockText => {
    switch(globalRegion) {
    case GlobalRegionTypes.US:
        return {
            title: 'Title',
            body: 'Body',
            blockTitle: 'News block creation',
            image: 'Image',
            submit: 'Submit',
            back: 'Back'
        }
    case GlobalRegionTypes.UA:
        return {
            title: 'Заголовок',
            body: 'Вміст',
            blockTitle: 'Створення блоку новин',
            image: 'Зображення',
            submit: 'Відправити',
            back: 'Повернутися'
        }
    }
}