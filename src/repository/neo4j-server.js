import neo4jServer from 'neo4j';

import serverConfig from '../../server-config';

class Neo4jServer {
    constructor () {
        this.repository = new neo4jServer.GraphDatabase({
            url: serverConfig.neo4j.url,
            auth: serverConfig.neo4j.auth
        });
        if (this.repository === null || this.repository === undefined)
            throw new Error("Connection to Neo4j failed.");
    }

    query (cypher = "", params = {}, callback) {
        this._coreQuery(cypher, params, true, callback);
    }

    fullQuery (cypher = "", params = {}, callback) {
        this._coreQuery(cypher, params, false, callback);
    }

    _coreQuery (cypher = "", params = {}, lean = true, callback) {
        this.repository.cypher({
            query: cypher,
            params: params,
            headers: {},
            lean: lean
        }, (error, retrievedObjects) => {
            if (error) {
                if (error instanceof TransientError) {
                    //should retry, but for now...
                    callback(error, null);
                } else
                    callback(error, null);
            } else
                callback(null, retrievedObjects);
        });
    }
}

export default Neo4jServer;
