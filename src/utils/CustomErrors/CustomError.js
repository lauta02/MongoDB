class MyCustomError {
    static generate({ name = 'Error', cause, message, code = 1 }) {
        const error = new Error(message);
        error.name = name;
        error.code = code;
        error.cause = cause;
        throw error;
    }
}

module.exports = MyCustomError;