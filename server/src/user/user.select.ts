export interface ISelectUser {
    id: boolean;
    email: boolean;
    username: boolean;
    password: boolean;
    roleId: boolean;
}

export const SecureUserSelect: ISelectUser = {
    id: true,
    email: true,
    username: true,
    password: false,
    roleId: true
};