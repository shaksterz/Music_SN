import SongsService from '../../../src/services/songs-service';

describe("Songs Service", () => {
    var service = new SongsService();
    beforeEach(() => {
        //do nothing for now
    });
    afterEach(() => {
        //do nothing for now


    });
    it("can get all songs", (done) => {
        var songs = service.getAll((error) => {
            expect(error).toBeUndefined();
            done();
        }, (songs) => {
            expect(songs.length).toEqual(2);
            expect(songs[0].title).toBe("My Title");
            done();
        });
    });
});
