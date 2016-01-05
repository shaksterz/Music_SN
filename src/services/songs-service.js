import Neo4jRepository from '../repository/neo4j-repository';

import serverConfig from '../../server-config';
import Song from '../model/nodes/song';

class SongsService {
    constructor () {
        this.repository = new Neo4jRepository();
    }

    getAll (errorCallback, resultCallback) {
        this.repository.query("MATCH (album:Album)-[contain:contains]->(song:Song)<-[created:made]-(artist:Artist) RETURN song, artist, created, contain", {},
                (error) => errorCallback(error),
                (retrievedSongs) => {
                    resultCallback(retrievedSongs.map(
                        (song) => new Song(song.title, song.link)));
                }
        );
    }

    getSong (id) {
        return {};
    }

    create (song) {
        return {};
    }

    update (id, song) {
        return {};
    }

    delete (id) {
        return true;
    }
}

export default SongsService;
