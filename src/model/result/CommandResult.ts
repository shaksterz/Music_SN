import ISuccessfulResult from "./ISuccessfulResult";

class CommandResult implements ISuccessfulResult {
    public id: string;

    constructor (id: string) {
        this.id = id;
    }
}

export default CommandResult;