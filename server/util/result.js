class Result {
    constructor(code, message, data) {
        this.code = code;
        this.message = message;
        this.data = data;
    }

    static Success(data) {
        return new Result(200, "成功", data);
    }

    static Fail(code, message) {
        return new Result(code, message, null);
    }
}

module.exports = Result