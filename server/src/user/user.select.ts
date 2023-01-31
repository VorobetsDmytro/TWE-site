export interface ISelectUser {
    id: boolean;
    email: boolean;
    username: boolean;
    password: boolean;
    roleId: boolean;
    role: boolean;
    createdAt: boolean;
}

export const SelectUser: ISelectUser = {
    id: true,
    email: true,
    username: true,
    password: true,
    roleId: false,
    role: true,
    createdAt: true
}

export const SecureUserSelect: ISelectUser = {
    id: true,
    email: true,
    username: true,
    password: false,
    roleId: false,
    role: true,
    createdAt: false
};