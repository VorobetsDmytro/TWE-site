import { User } from "./user.state.interface";

export enum UserActionTypes {
    SET_USER = 'SET_USER',
    LOGOUT   = 'LOGOUT'
}

export interface SetUserAction {
    type: UserActionTypes.SET_USER,
    payload: User
}

export interface LogoutAction {
    type: UserActionTypes.LOGOUT
}

export type UserAction = SetUserAction
                       | LogoutAction;