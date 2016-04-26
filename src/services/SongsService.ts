import MongoRepository from "../repository/MongoRepository";
import * as Promise from "bluebird";
import Song from "../model/Song";
import QueryResult from "../model/result/QueryResult";
import CommandResult from "../model/result/CommandResult";
import AbstractService from "./AbstractService";

class SongsService extends AbstractService<Song, Song> {
    constructor () {
        super("Song", null);
    }

    public getByName (name: string): Promise<QueryResult<Song[]>> {
        let nameParam = {
            name: name
        };
        return this.repository.find(nameParam);
    }

    public getByNameAndArtist (name: string, artistName: string): Promise<QueryResult<Song[]>> {
        let params: any = {
            name: name,
            artistName: artistName
        };
        return this.repository.find(params);
    }
}

export default SongsService;
