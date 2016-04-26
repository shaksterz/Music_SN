interface IRepository<T> {
    create: (toCreate: T, callback: (error: any, result: any) => void) => void;

    update: (identifiers: any, toUpdate: any, callback: (error: any, result: any) => void) => void;

    delete: (identifiers: any, callback: (error: any, result: boolean) => void) => void;

    find: (parameters: any, callback: (error: any, result: any) => void) => void;

    findOne: (id: string, callback: (error: any, result: any) => void) => void;
}

export default IRepository;