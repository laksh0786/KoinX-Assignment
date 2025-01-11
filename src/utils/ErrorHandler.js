//creating errorHandler class which is child of Error class


// Error Handler Class
class ErrorHandler extends Error {
    constructor(message , statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}


export {ErrorHandler};