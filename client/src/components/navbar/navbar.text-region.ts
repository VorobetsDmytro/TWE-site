import { GlobalRegionTypes } from "../../store/global-region/global-region.state.interface";

export interface NavbarText {
    main: string;
    news: string;
    login: string;
    registration: string;
    logout: string;
}

export const navbarTextRegion = (globalRegion: GlobalRegionTypes): NavbarText => {
    switch(globalRegion) {
    case GlobalRegionTypes.US:
        return {
            main: 'Main',
            news: 'News',
            login: 'Sign in',
            registration: 'Sign up',
            logout: 'Logout'
        }
    case GlobalRegionTypes.UA:
        return {
            main: 'Головна',
            news: 'Новини',
            login: 'Увійти',
            registration: 'Зареєструватися',
            logout: 'Вийти'
        }
    }
}