import { UserAction, UserActionTypes } from "./user.action.interface";
import { User } from "./user.state.interface";

export const setUserAction = (payload: User): UserAction => ({type: UserActionTypes.SET_USER, payload});
export const logoutAction = (): UserAction => ({type: UserActionTypes.LOGOUT});