import { GlobalRegionTypes } from "../../store/global-region/global-region.state.interface";

export interface EditNewsBlockText {
    blockTitle: string;
    image: string;
    submit: string;
    back: string;
}

export const editNewsBlockImageTextRegion = (globalRegion: GlobalRegionTypes): EditNewsBlockText => {
    switch(globalRegion) {
    case GlobalRegionTypes.US:
        return {
            blockTitle: 'News block image editing',
            image: 'Image',
            submit: 'Submit',
            back: 'Back'
        }
    case GlobalRegionTypes.UA:
        return {
            blockTitle: 'Зміна зображення блоку новин',
            image: 'Зображення',
            submit: 'Відправити',
            back: 'Повернутися'
        }
    }
}