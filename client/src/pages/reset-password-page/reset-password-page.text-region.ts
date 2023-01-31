import { GlobalRegionTypes } from "../../store/global-region/global-region.state.interface";

export interface ResetPasswordText {
    blockTitle: string;
    submit: string;
    alertValidate: string;
    alertError: string;
    password: string;
}

export const resetPasswordTextRegion = (globalRegion: GlobalRegionTypes): ResetPasswordText => {
    switch(globalRegion) {
    case GlobalRegionTypes.US:
        return {
            blockTitle: 'Reset password',
            submit: 'Submit',
            alertValidate: 'The password is required',
            alertError: 'Params error',
            password: 'Password'
        }
    case GlobalRegionTypes.UA:
        return {
            blockTitle: 'Відновити пароль',
            submit: 'Відправити',
            alertValidate: "Пароль є обов'язковим полем",
            alertError: 'Помилка параметрів',
            password: 'Пароль'
        }
    }
}