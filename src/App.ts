import * as express from "express";
import * as path from "path";
import * as logger from "morgan";
import * as cookieParser from "cookie-parser";
import * as bodyParser from "body-parser";
import * as http from "http";

import ServerEventHandler from "./ServerEventHandler";
import ErrorHandler from "./ErrorHandler";
import routes from "./Routes";

let app = express();

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Import all rest-routes to the Express app
for (let route of routes) {
    app.use(route.url, route.router);
}

let serverEvents = new ServerEventHandler();
let errorHandler = new ErrorHandler();

// catch 404 and forward to error handler
app.use(errorHandler.notFoundErrorHandler);

// error handlers

// development error handler
// will print stacktrace
if (app.get("env") === "development") {
    app.use(errorHandler.developmentErrorHandler);
}

// production error handler
// no stacktraces leaked to user
app.use(errorHandler.productionErrorHandler);

/**
 * Get port from environment and store in Express.
 */
let port = serverEvents.normalizePort(process.env.PORT || "3000");
app.set("port", port);

/**
 * Create HTTP server and listen on provided port and all network interfaces
 */
let server = http.createServer(app);
server.listen(port);
server.on("error", serverEvents.onError);
server.on("listening", serverEvents.onListening(server.address));
