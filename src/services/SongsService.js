import repository from '../repository/SongsRepository';

class SongsService {
    constructor () {
        repository = new SongsRepository();
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
