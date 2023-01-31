import { GlobalRegionTypes } from "../../store/global-region/global-region.state.interface";

export interface LoginText {
    login: string;
    password: string;
    submit: string;
    forgotPassword: string;
}

export const loginTextRegion = (globalRegion: GlobalRegionTypes): LoginText => {
    switch(globalRegion) {
    case GlobalRegionTypes.US:
        return {
            login: 'Sign in',
            password: 'Password',
            submit: 'Submit',
            forgotPassword: 'Forgot password'
        }
    case GlobalRegionTypes.UA:
        return {
            login: 'Увійти',
            password: 'Пароль',
            submit: 'Відправити',
            forgotPassword: 'Забув пароль'
        }
    }
}