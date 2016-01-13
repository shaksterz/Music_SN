class Album {
    constructor (name = "", created = new Date(), songs = []) {
        this.name = name;
        this.created = created;
        this.songs = songs;
    }
}

export default Album;
