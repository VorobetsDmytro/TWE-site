export enum RoleTypes {
    USER = 'USER',
    ADMIN = 'ADMIN'
}

export interface User {
    id: string;
    email: string;
    role?: {value: RoleTypes};
    username: string;
}

export interface UserState {
    user: User;
    isAuth: boolean;
}