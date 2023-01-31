import { UserAction, UserActionTypes } from "./user.action.interface"
import { UserState } from "./user.state.interface"

const defaultState: UserState = {
    user: {
        id: '',
        email: '',
        username: ''
    },
    isAuth: false
}

export const userReducer = (state = defaultState, action: UserAction): UserState => {
    switch(action.type){
    case UserActionTypes.SET_USER:
        return {
            ...state,
            user: action.payload,
            isAuth: true
        }
    case UserActionTypes.LOGOUT:
        return {
            ...state,
            isAuth: false
        }
    default:
        return state;
    }
}