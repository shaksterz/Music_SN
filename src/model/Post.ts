import IReceiver from "./IReceiver";
import IShareable from "./IShareable";

class Post {
    public message: string;
    public created: Date;
    public sharedContent: IShareable[];
    public sharedTo: IReceiver[];

    constructor (message: string, created: Date, sharedContent: IShareable[], sharedTo: IReceiver[]) {
        this.message = message;
        this.created = created;
        this.sharedContent = sharedContent;
        this.sharedTo = sharedTo;
    }
}

export default Post;
