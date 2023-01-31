import { GlobalRegionTypes } from "../../store/global-region/global-region.state.interface";

export interface RegistrationText {
    register: string;
    username: string;
    password: string;
    repeatPassword: string;
    submit: string;
    uncorrectSubmit: string;
}

export const registrationTextRegion = (globalRegion: GlobalRegionTypes): RegistrationText => {
    switch(globalRegion) {
    case GlobalRegionTypes.US:
        return {
            register: 'Sign up',
            username: 'Username',
            password: 'Password',
            repeatPassword: "Repeat password",
            submit: 'Submit',
            uncorrectSubmit: 'Password and Repeat password are not equaled!'
        }
    case GlobalRegionTypes.UA:
        return {
            register: 'Зареєструватися',
            username: "Ім'я користувача",
            password: 'Пароль',
            repeatPassword: 'Повторення паролю',
            submit: 'Відправити',
            uncorrectSubmit: 'Пароль та Повторення паролю не співпадають!'
        }
    }
}