import Song from '../../model/nodes/song';
import Artist from '../../model/nodes/artist';
import Album from '../../model/nodes/album';

class SongTransform {
    constructor () {

    }

    toObject (item) {
        var artist = null;
        var album = null;
        if (item.artist !== null && item.artist !== undefined)
            artist = new Artist(artist.name);
        if (item.album !== null && item.album !== undefined)
            album = new Album(album.name, album.created);
        return new Song(item.song.title, item.song.link, artist, album);
    }

    toGraph (song) {

    }
}

export default SongTransform;
