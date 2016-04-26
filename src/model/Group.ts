import User from "./User";
import IReceiver from "./IReceiver";

class Group implements IReceiver {
    public users: User[];

    constructor (users: User[] = []) {
        this.users = users;
    }

    addUser (user: User): void {
        if (!this.doesUserBelong(user))
            this.users.push(user);
    }

    addUsers (users: User[]): void {

    }

    removeUser (user: User): void {
        this.users = this.users.filter((storedUser) => storedUser.username !== user.username);
    }

    doesUserBelong (user: User): boolean {
        return this.users.filter((storedUser) => storedUser.username === user.username).length > 0;
    }

}

export default Group;
