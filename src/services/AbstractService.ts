import MongoRepository from "../repository/MongoRepository";
import * as Promise from "bluebird";
import QueryResult from "../model/result/QueryResult";
import CommandResult from "../model/result/CommandResult";
import ITransform from "../repository/data-modelling/ITransform";
import IService from "./IService";

class AbstractService<T, DTO> implements IService<T> {
    protected repository: MongoRepository<T, DTO>;

    constructor (collectionName: string, transformer: ITransform<T, DTO>) {
        this.repository = new MongoRepository<T, DTO>(collectionName, transformer);
    }

    protected getRepository (): MongoRepository<T, DTO> {
        return this.repository;
    }

    public getAll (): Promise<QueryResult<T[]>> {
        return this.repository.find({});
    }

    public getElement (id: string): Promise<QueryResult<T>> {
        return this.repository.findOne(id);
    }

    public create (object: T): Promise<CommandResult> {
        return this.repository.create(object);
    }

    public update (id: string, object: T): Promise<CommandResult> {
        return this.repository.update(id, object);
    }

    public delete (id: string): Promise<CommandResult> {
        return this.repository.delete(id);
    }
}

export default AbstractService;