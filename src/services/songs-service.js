import SongsRepository from '../repository/songs-repository';

class SongsService {
    constructor () {
        this.repository = new SongsRepository();
    }

    getAll () {
        return [];
    }

    getSong (id) {
        return {};
    }

    update (id, song) {

    }

    delete (id) {

    }
}

export default SongsService;
