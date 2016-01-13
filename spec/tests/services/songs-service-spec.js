import SongsService from '../../../src/services/songs-service';
import Neo4jServer from '../../../src/repository/neo4j-server';

describe("Songs Service", () => {
    var service = new SongsService();
    var neo4jServer = new Neo4jServer();
    beforeEach(() => {
        //do nothing for now
        neo4jServer.query()
    });
    afterEach(() => {
        //do nothing for now


    });
    it("can get all songs", (done) => {
        var songs = service.getAll((error) => {
            expect(error).toBeUndefined();
            done();
        }, (songs) => {
            expect(songs.length).toEqual(1);
            expect(songs[0].title).toBe("My Title");
            done();
        });
    });
});
