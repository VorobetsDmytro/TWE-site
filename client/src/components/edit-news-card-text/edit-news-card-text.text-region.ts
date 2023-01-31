import { GlobalRegionTypes } from "../../store/global-region/global-region.state.interface";

export interface EditNewsCardTextText {
    title: string;
    body: string;
    blockTitle: string;
    submit: string;
    back: string;
    remove: string;
    popupRemove: string;
}

export const editNewsCardTextTextRegion = (globalRegion: GlobalRegionTypes): EditNewsCardTextText => {
    switch(globalRegion) {
    case GlobalRegionTypes.US:
        return {
            title: 'Title',
            body: 'Body',
            blockTitle: 'News card text editing',
            submit: 'Submit',
            back: 'Back',
            remove: 'Remove',
            popupRemove: 'Do you wanna remove the news card text for current region?'
        }
    case GlobalRegionTypes.UA:
        return {
            title: 'Заголовок',
            body: 'Вміст',
            blockTitle: 'Зміна тексту картки новин',
            submit: 'Відправити',
            back: 'Повернутися',
            remove: 'Прибрати',
            popupRemove: 'Прибрати текст картки новин поточного регіону?'
        }
    }
}