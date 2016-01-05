class Post {
    constructor (message = "", created = new Date(), sharedContent = []) {
        this.message = message;
        this.created = created;
        this.sharedContent = sharedContent;
    }
}

export default Post;
