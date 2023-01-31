import { GlobalRegionTypes } from "../../store/global-region/global-region.state.interface";

export interface EditNewsCardImageText {
    blockTitle: string;
    image: string;
    submit: string;
    back: string;
}

export const editNewsCardImageTextRegion = (globalRegion: GlobalRegionTypes): EditNewsCardImageText => {
    switch(globalRegion) {
    case GlobalRegionTypes.US:
        return {
            blockTitle: 'News card image editing',
            image: 'Image',
            submit: 'Submit',
            back: 'Back'
        }
    case GlobalRegionTypes.UA:
        return {
            blockTitle: 'Зміна зображення картки новин',
            image: 'Зображення',
            submit: 'Відправити',
            back: 'Повернутися'
        }
    }
}