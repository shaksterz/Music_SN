import IReceiver from "./IReceiver";

class User implements IReceiver {
    public username: string;
    public name: string;
    private _password: string;

    constructor (username: string = "", name: string = "", password: string = "") {
        this.username = username;
        this.name = name;
        this._password = password;
    }
}

export default User;
