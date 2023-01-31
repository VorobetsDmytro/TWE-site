import { GlobalRegionTypes } from "../../store/global-region/global-region.state.interface";

export interface MainPageText {
    theWorstExpereience: string;
    justTryItNow: string;
    download: string
}

export const mainPageTextRegion = (globalRegion: GlobalRegionTypes): MainPageText => {
    switch(globalRegion) {
    case GlobalRegionTypes.US:
        return {
            theWorstExpereience: 'Do you wanna get the worst experience in your video game development ever?',
            justTryItNow: 'Just try it NOW!',
            download: 'Download'
        }
    case GlobalRegionTypes.UA:
        return {
            theWorstExpereience: 'Хочете отримати найгірший досвід у розробці відео ігр?',
            justTryItNow: 'Тоді спробуйте це прямо зараз!',
            download: 'Завантажити'
        }
    }
}