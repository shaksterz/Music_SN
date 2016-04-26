import SongsService from "../../../src/services/SongsService";
import MongoServer from "../../../src/repository/MongoServer";
import Song from "../../../src/model/Song";

describe("Songs Service", () => {
    let service = null;
    let repository = null;
    let collectionPromise = null;

    beforeAll(() => {
        service = new SongsService();
        repository = new MongoServer();
        return collectionPromise = repository.getCollection("Song");
    });

    beforeEach(() => {
        let song = new Song("My Song", "My Link", "My Artist", "My Album", new Date());
        return collectionPromise.then((collection) => collection.insertOne(song));
    });

    afterEach(() => {
        return collectionPromise.then((collection) => collection.remove());
    });

    afterAll(() => {
        return repository.close();
    });

    it("can get all songs", (done) => {
        service.getAll().then((songs) => {
            expect(songs.data.length).toEqual(1);
            expect(songs.data[0].title).toBe("My Song");
            done();
        });
    });
});
