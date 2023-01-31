import { GlobalRegionTypes } from "../../store/global-region/global-region.state.interface";

export interface ForgotPasswordText {
    blockTitle: string;
    submit: string;
    alert: string;
}

export const forgotPasswordTextRegion = (globalRegion: GlobalRegionTypes): ForgotPasswordText => {
    switch(globalRegion) {
    case GlobalRegionTypes.US:
        return {
            blockTitle: 'Forgot password',
            submit: 'Submit',
            alert: 'The email is required'
        }
    case GlobalRegionTypes.UA:
        return {
            blockTitle: 'Забув пароль',
            submit: 'Відправити',
            alert: "Email є обов'язковим полем"
        }
    }
}