import User from './user';

class Group {
    constructor (users = []) {
        this.users = users;
    }

    addUser (user) {
        if (user instanceof User) {
            if (!doesUserBelong(user))
                this.users.push(user);
        }
    }

    addUsers (users) {

    }

    removeUser (user) {
        if (user instanceof User) {
            this.users = this.users.filter((storedUser) => storedUser.username !== user.username);
        }
    }

    doesUserBelong (user) {
        for (storedUser of this.users) {
            if (storedUser.username === user.username)
                return true;
        }
        return false;
    }


}

export default Group;
