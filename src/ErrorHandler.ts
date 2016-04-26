class ErrorHandler {
    // development error handler
    // will print stacktrace
    developmentErrorHandler (error: any, request: any, response: any, next: any): void {
        response.status(error.status || 500);
        response.send({
            message: error.message,
            error: error
        });
    }

    // production error handler
    // no stacktraces leaked to user
    productionErrorHandler (error: any, request: any, response: any, next: any): void {
        response.status(error.status || 500);
        response.send({
            message: error.message,
            error: {}
        });
    }

    notFoundErrorHandler (request: any, response: any, next: any): void {
        let error = new Error("Not Found");
        response.status(404);
        next(error);
    }
}

export default ErrorHandler;
