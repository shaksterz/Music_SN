import express from 'express';
import path from 'path';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import http from 'http';

import ServerEvents from './server-events';
import ErrorHandler from './error-handler';
import routes from './routes';

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Import all rest-routes to the express app
for (var route of routes) {
    app.use(route.url, route.router);
}

var serverEvents = new ServerEvents();
var errorHandler = new ErrorHandler();

// catch 404 and forward to error handler
app.use(errorHandler.notFoundErrorHandler);

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(errorHandler.developmentErrorHandler);
}

// production error handler
// no stacktraces leaked to user
app.use(errorHandler.productionErrorHandler);

/**
 * Get port from environment and store in Express.
 */
var port = serverEvents.normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server and listen on provided port and all network interfaces
 */
var server = http.createServer(app);
server.listen(port);
server.on('error', serverEvents.onError);
server.on('listening', serverEvents.onListening(server.address));
