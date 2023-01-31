import { GlobalRegionTypes } from "../../store/global-region/global-region.state.interface";

export interface UserActivationText {
    userActivation: string;
    password: string;
    submit: string;
}

export const userActivationTextRegion = (globalRegion: GlobalRegionTypes): UserActivationText => {
    switch(globalRegion) {
    case GlobalRegionTypes.US:
        return {
            userActivation: 'User activation',
            password: 'Password',
            submit: 'Submit',
        }
    case GlobalRegionTypes.UA:
        return {
            userActivation: 'Активація користувача',
            password: 'Пароль',
            submit: 'Відправити',
        }
    }
}