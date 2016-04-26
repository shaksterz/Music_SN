import ISuccessfulResult from "./ISuccessfulResult";

class QueryResult<T> implements ISuccessfulResult {
    public data: T;

    constructor (data: T) {
        this.data = data;
    }
}

export default QueryResult;