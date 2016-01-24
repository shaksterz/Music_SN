import express from 'express';
import SongsService from '../services/songs-service';

var router = express.Router();
var service = new SongsService();

/* GET songs listing. */
router.get('/', (request, response, next) => {
    var songs = service.getAll((error, songs) => {
        //TODO: Package error and songs
        if (error) 
            response.send(error);
        else
            response.send(songs);
    });
    response.send(songs);
});

router.put('/create', (request, response, next) => {
    var song = service.create(request.body, (error, song) => {
        //TODO: Package error and songs
        if (error) 
            response.send(error);
        else
            response.send(song);
    });
    response.send(song);
});

router.get('/:songID', (request, response, next) => {
    var song = service.get(request.params.songID, (error, song) => {
        //TODO: Package error and songs
        if (error) 
            response.send(error);
        else
            response.send(song);
    });
    response.send(song);
});

router.post('/:songID', (request, response, next) => {
    var song = service.update(request.params.songID, request.body, (error, song) => {
        //TODO: Package error and songs
        if (error) 
            response.send(error);
        else
            response.send(song);
    });
    response.send(song);
});

router.delete('/:songID', (request, response, next) => {
    var deleteResponse = service.delete(request.params.songID, (error, result) => {
        //TODO: Package error and songs
        if (error) 
            response.send(error);
        else
            response.send(result);
    });
    response.send(deleteResponse);
});

export default router;
