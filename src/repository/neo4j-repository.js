import Neo4jServer from './neo4j-server';

class Neo4jRepository extends Neo4jServer {
    constructor () {
        super();
    }

    createNode (label, properties, errorCallback, resultCallback) {
        properties = { properties: properties };
        super.query("CREATE (node:" + label + " {properties}) RETURN node", properties, errorCallback, resultCallback);
    }

    updateNode (label, identifyingProperties, properties, errorCallback, resultCallback) {
        properties = {
            properties: properties,
            identifyingProperties: identifyingProperties
        };
        super.query("MATCH (node:" + label + " {identifyingProperties}) SET node = {properties}",
        properties, errorCallback, resultCallback);
    }

    deleteNode (label, identifyingProperties, errorCallback, resultCallback) {
        var properties = {
            identifyingProperties: identifyingProperties
        };
        super.query("MATCH (node:" + label + " {identifyingProperties}) DETACH DELETE node",
        properties, errorCallback, resultCallback);
    }

    findNodes (cypher, params, transformer, errorCallback, resultCallback) {
        this.repository.query(cypher, {},
                (error) => errorCallback(error),
                (data) => {
                    var result = data.map(
                        (item) => this.transformer.toObject(item));
                    resultCallback(result);
                }
        );
    }
}

export default Neo4jRepository;
