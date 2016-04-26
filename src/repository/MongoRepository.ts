import { Collection, InsertOneWriteOpResult, UpdateWriteOpResult, DeleteWriteOpResultObject }  from "mongodb";
import {Promise} from "bluebird";
import MongoServer from "./MongoServer";
import IRepository from "./IRepository";
import ITransform from "./data-modelling/ITransform";
import CommandResult from "../model/result/CommandResult";
import QueryResult from "../model/result/QueryResult";

class MongoRepository<T, DTO> extends MongoServer implements IRepository<T> {
    private collectionPromise: Promise<Collection>;
    private transformer: ITransform<T, DTO>;

    constructor (collectionName: string, transformer: ITransform<T, DTO>) {
        super();
        this.collectionPromise = super.getCollection(collectionName);
        this.transformer = transformer;
    }

    public create (object: T): Promise<CommandResult> {
        let transformedObject = null;
        if (this.transformer !== null && this.transformer !== undefined)
            transformedObject = this.transformer.toStorage(object);
        return this.collectionPromise
            .then((collection: Collection) => collection.insertOne(transformedObject))
            .then((result: InsertOneWriteOpResult) => new CommandResult(result.insertedId.toHexString()));
    }

    public find (parameters: any): Promise<QueryResult<T[]>> {
        let findPromise = this.collectionPromise.then((collection: Collection) => collection.find(parameters).toArray());
        if (this.transformer !== null && this.transformer !== undefined)
            findPromise = findPromise.map((data: DTO) => this.transformer.toObject(data));
        return findPromise.then((data: T[]) => new QueryResult<T[]>(data));
    }

    public findOne (id: string): Promise<QueryResult<T>> {
        let idParam: any = {
            "_id": id
        };
        let findPromise = this.collectionPromise
            .then((collection: Collection) => collection.find(idParam).limit(1).next());
        if (this.transformer !== null && this.transformer !== undefined)
            findPromise = findPromise.then((data: DTO) => this.transformer.toObject(data));
        return findPromise.then((object: T) => new QueryResult<T>(object));
    }

    public update (id: string, properties: any): Promise<CommandResult> {
        return this.collectionPromise
            .then((collection: Collection) => {
                return collection.updateOne(
                    { "_id": id },
                    { $set: properties }
                );
            }).then((result: UpdateWriteOpResult) => new CommandResult(result.upsertedId._id.toHexString()));
    }

    public delete (id: string): Promise<CommandResult> {
        let params: any = {
            "_id": id
        };
        return this.collectionPromise
            .then((collection: Collection) => collection.deleteMany(id))
            .then((result: DeleteWriteOpResultObject) => new CommandResult(id));
    }
}

export default MongoRepository;