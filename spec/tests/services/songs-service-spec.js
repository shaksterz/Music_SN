import SongsService from '../../../src/services/songs-service';

describe("Songs Service", () => {
    var service = new SongsService();
    beforeEach(() => {
        //do nothing for now
    });
    afterEach(() => {
        //do nothing for now
    });
    it("can get all songs", function () => expect(service.getAll().length).toEqual(0));
});
