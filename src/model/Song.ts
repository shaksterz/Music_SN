import IShareable from "./IShareable";

class Song implements IShareable {
    public title: string;
    public link: string;
    public artist: string;
    public album: string;
    public created: Date;

    constructor (title: string = "", link: string = "", artist: string, album: string, created: Date) {
        this.title = title;
        this.link = link;
        this.artist = artist;
        this.album = album;
        this.created = created;
    }
}

export default Song;
