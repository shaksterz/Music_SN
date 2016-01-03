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
