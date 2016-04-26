import * as mongodb from "mongodb";
import serverConfig from "../../server-config";
import * as Promise from "bluebird";
Promise.promisifyAll(mongodb);

class MongoServer {
    private mongoConnectionPromise: Promise<mongodb.Db>;
    private mongoConfig: any = serverConfig.mongodb;

    constructor () {
        this.mongoConnectionPromise = mongodb.MongoClient.connect(this.mongoConfig.url);
        this.mongoConnectionPromise.catch((error: any) => {
            console.log("Mongo DB Connection Error: ", error);
            process.exit(1);
        });
    }

    public getCollection (collection: string): Promise<mongodb.Collection> {
        return this.mongoConnectionPromise.then((connection: mongodb.Db) => connection.collection(collection));
    }

    public close (): void {
        this.mongoConnectionPromise.then((connection: mongodb.Db) => connection.close());
    }

}

export default MongoServer;