export interface CRUD {
    create(dto: Object): Promise<Object>;
    getOneById(id: string): Promise<Object | null>;
    getMany(): Promise<Array<Object>>;
    update(dto: Object, id: string): Promise<Object | null>;
    delete(id: string): Promise<Object | null>;
}