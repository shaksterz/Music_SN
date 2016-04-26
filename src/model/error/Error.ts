import IUnsuccessfulResult from "../result/IUnsuccessfulResult";

class Error implements IUnsuccessfulResult {
    public message: string;

    constructor (message: string) {
        this.message = message;
    }
}

export default Error;