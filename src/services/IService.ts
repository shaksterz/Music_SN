import * as Promise from "bluebird";
import CommandResult from "../model/result/CommandResult";
import QueryResult from "../model/result/QueryResult";

interface IService<T> {
    create (object: T): Promise<CommandResult>;
    update (id: string, object: T): Promise<CommandResult>;
    delete (id: string): Promise<CommandResult>;
    getElement (id: string): Promise<QueryResult<T>>;
    getAll (): Promise<QueryResult<T[]>>;
}

export default IService;