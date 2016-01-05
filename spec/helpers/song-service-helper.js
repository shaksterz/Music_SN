import neo4j from 'neo4j';

class SongServiceHelper {
    constructor () {
        this.repository = neo4j.GraphDatabase({
            url: serverConfig.neo4j.url,
            auth: serverConfig.neo4j.auth
        });
    }

    createOne () {

    }

    createMultiple () {

    }

    deleteAll () {

    }
}

export default SongServiceHelper;
