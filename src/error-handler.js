class ErrorHandler {
    // development error handler
    // will print stacktrace
    developmentErrorHandler (error, request, response, next) {
        response.status(err.status || 500);
        response.send({
            message: error.message,
            error: error
        });
    }

    // production error handler
    // no stacktraces leaked to user
    productionErrorHandler (error, request, response, next) {
        response.status(error.status || 500);
        response.send({
            message: error.message,
            error: {}
        });
    }

    notFoundErrorHandler (request, response, next) {
        var error = new Error('Not Found');
        error.status = 404;
        next(error);
    }
}

export default ErrorHandler;
