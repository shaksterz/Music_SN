import neo4jServer from 'neo4j';

import serverConfig from '../../server-config';

class Neo4jRepository {
    constructor () {
        this.repository = new neo4jServer.GraphDatabase({
            url: serverConfig.neo4j.url,
            auth: serverConfig.neo4j.auth
        });
        if (this.repository === null || this.repository === undefined)
            throw new Error("Connection to Neo4j failed.");
    }

    query (cypher = "", params = {}, errorCallback, resultCallback) {
        this.coreQuery(cypher, params, true, errorCallback, resultCallback);
    }

    fullQuery (cypher = "", params = {}, errorCallback, resultCallback) {
        this.coreQuery(cypher, params, false, errorCallback, resultCallback);
    }

    coreQuery (cypher = "", params = {}, lean = true, errorCallback, resultCallback) {
        this.repository.cypher({
            query: cypher,
            params: params,
            headers: {},
            lean: lean
        }, (error, retrievedObjects) => {
            if (error) {
                if (error instanceof TransientError) {
                    //retry, but for now...
                    errorCallback(error);
                } else
                    errorCallback(error);
            } else
                resultCallback(retrievedObjects);
        });
    }
}

export default Neo4jRepository;
