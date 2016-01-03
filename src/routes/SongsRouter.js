import express from 'express';
import service from 'SongsService';

var router = express.Router();
service = new SongsService();

/* GET songs listing. */
router.get('/', function (request, response, next) {
    //service.doSomething();
    response.send('song resource');
});

router.put('/create', function (request, response, next) {
    //service.create();
});

router.get('/:songID', function (request, response, next) {
    //service.get(request.params.songID);
});

router.post('/:songID', function (request, response, next) {
    //service.update(request.params.songID, request.body);
});

router.delete('/:songID', function (request, response, next) {
    //service.delete(request.params.songID);
});

exports default router;
