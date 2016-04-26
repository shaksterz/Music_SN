import { Router, Request, Response }  from "express";
import SongsService from "../services/SongsService";
import Song from "../model/Song";
import QueryResult from "../model/result/QueryResult";
import CommandResult from "../model/result/CommandResult";

const service: SongsService = new SongsService();
const router: Router = Router();

// TODO: Package error and songs into HATEOAS

/* GET songs listing. */
router.get("/", (request: Request, response: Response) : void => {
    if (request.query !== null && request.query !== undefined && request.query.length > 0) {
        // TODO: Query Parameters, do something with it
    } else {
        service.getAll()
            .then((songsResult: QueryResult<Song[]>) => response.status(200).send(songsResult))
            .catch((error: any) => response.status(500).send(error));
    }
});

/* PUT create song */
router.put("/create", (request: Request, response: Response): void => {
    service.create(request.body)
        .then((result: CommandResult) => response.status(200).send(result))
        .catch((error: any) => response.status(500).send(error));
});

/* GET song by ID */
router.get("/:songID", (request: Request, response: Response): void => {
    service.getElement(request.params.songID)
        .then((songResult: QueryResult<Song>) => response.status(200).send(songResult))
        .catch((error: any) => response.status(500).send(error));
});

/* POST update song with given ID */
router.post("/:songID", (request: Request, response: Response): void => {
    service.update(request.params.songID, request.body)
        .then((result: CommandResult) => response.status(200).send(result))
        .catch((error: any) => response.status(500).send(error));
});

/* DELETE song with given ID */
router.delete("/:songID", (request: Request, response: Response): void => {
    service.delete(request.params.songID)
        .then((result: CommandResult) => response.status(200).send(result))
        .catch((error: any) => response.status(500).send(error));
});

export default router;
