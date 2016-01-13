import Neo4jRepository from '../repository/neo4j-repository';
import Song from '../model/nodes/song';
import Artist from '../model/nodes/artist';
import Album from '../model/nodes/album';
import SongTransform from '../repository/data-modelling/song-transform';

class SongsService {
    constructor () {
        this.repository = new Neo4jRepository();
        this.songTransform = new SongTransform();
    }

    getAll (errorCallback, resultCallback) {
        var cypher = "MATCH (song:Song)<-[created:made]-(artist:Artist) " +
                    "OPTIONAL MATCH (album:Album)-[contain:contains]->(song) " +
                    "RETURN song, artist, created, contain, album"
        this.repository.findNodes(cypher, {}, errorCallback, resultCallback);
    }

    getSongByName (name, errorCallback, resultCallback) {
        var cypher = "MATCH (song:Song) " +
                     "OPTIONAL MATCH (artist:Artist)-[:made]->(song) " +
                     "OPTIONAL MATCH (album:Album)-[:contains]->(song) "
                     "WHERE song.name = {name} " +
                     "RETURN song, artist, album";
         var params = {
             name: name,
         };
         this.repository.findNodes(cypher, params, errorCallback, resultCallback);
    }

    getSongByNameAndArtist (name, artistName, errorCallback, resultCallback) {
        var cypher = "MATCH (song:Song)<-[:made]-(artist:Artist) " +
                     "OPTIONAL MATCH (album:Album)-[:contains]->(song) "
                     "WHERE song.name = {name} AND artist.name = {artistName} " +
                     "RETURN song, artist, album";
        var params = {
            name: name,
            artistName: artistName
        };
        this.repository.findNodes(cypher, params, errorCallback, resultCallback);
    }

    create (song, errorCallback, resultCallback) {
        this.repository.createNode("Song", song, errorCallback, resultCallback);
    }

    update (id, song, errorCallback, resultCallback) {
        this.repository.updateNode("Song", { id: id }, song, errorCallback, resultCallback);
    }

    delete (id, errorCallback, resultCallback) {
        this.repository.deleteNode("Song", { id: id }, errorCallback, resultCallback);
    }

}

export default SongsService;
