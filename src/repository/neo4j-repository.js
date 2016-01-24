import Neo4jServer from './neo4j-server';

class Neo4jRepository extends Neo4jServer {
    constructor () {
        super();
    }

    createNode (label, properties, callback) {
        properties = { properties: properties };
        var cypher = "CREATE (node:" + label + " {properties}) RETURN node";
        super.query(cypher, properties, callback);
    }

    updateNode (label, identifyingProperties, properties, callback) {
        properties = {
            properties: properties,
            identifyingProperties: identifyingProperties
        };
        var cypher = "MATCH (node:" + label + " {identifyingProperties}) SET node = {properties}";
        super.query(cypher, properties, callback);
    }

    deleteNode (label, identifyingProperties, callback) {
        var properties = {
            identifyingProperties: identifyingProperties
        };
        var cypher = "MATCH (node:" + label + " {identifyingProperties}) DETACH DELETE node";
        super.query(cypher, properties, callback);
    }

    findNodes (cypher, params, transformer, callback) {
        this.repository.query(cypher, {},
                (error) => callback(error, null),
                (data) => {
                    var result = data.map(
                        (item) => this.transformer.toObject(item));
                    callback(null, result);
                }
        );
    }
}

export default Neo4jRepository;