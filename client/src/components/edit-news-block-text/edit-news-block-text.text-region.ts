import { GlobalRegionTypes } from "../../store/global-region/global-region.state.interface";

export interface EditNewsBlockTextText {
    title: string;
    body: string;
    blockTitle: string;
    submit: string;
    back: string;
    remove: string;
    popupRemove: string;
}

export const editNewsBlockTextTextRegion = (globalRegion: GlobalRegionTypes): EditNewsBlockTextText => {
    switch(globalRegion) {
    case GlobalRegionTypes.US:
        return {
            title: 'Title',
            body: 'Body',
            blockTitle: 'News card text editing',
            submit: 'Submit',
            back: 'Back',
            remove: 'Remove',
            popupRemove: 'Do you wanna remove the news block text for current region?'
        }
    case GlobalRegionTypes.UA:
        return {
            title: 'Заголовок',
            body: 'Вміст',
            blockTitle: 'Зміна тексту картки новин',
            submit: 'Відправити',
            back: 'Повернутися',
            remove: 'Прибрати',
            popupRemove: 'Прибрати текст блоку новин для поточного регіону?'
        }
    }
}