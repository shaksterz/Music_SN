import express from 'express';
import SongsService from '../services/songs-service';

var router = express.Router();
var service = new SongsService();

/* GET songs listing. */
router.get('/', function (request, response, next) {
    var songs = service.getAll();
    response.send(songs);
});

router.put('/create', function (request, response, next) {
    var song = service.create();
    response.send(song);
});

router.get('/:songID', function (request, response, next) {
    var song = service.get(request.params.songID);
    response.send(song);
});

router.post('/:songID', function (request, response, next) {
    var song = service.update(request.params.songID, request.body);
    response.send(song);
});

router.delete('/:songID', function (request, response, next) {
    var deleteResponse = service.delete(request.params.songID);
    response.send(response);
});

export default router;
