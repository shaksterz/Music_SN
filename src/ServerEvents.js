import debug from 'debug';

class ServerEvents {
    constructor () {
        this.debug = debug('Music_SN:server');
    }

    /**
     * A function that normalises a port into a number, string, or false.
     */
    normalizePort (val) {
        var port = parseInt(val, 10);
        if (isNaN(port)) {
            // named pipe
            return val;
        } else if (port >= 0) {
            // port number
            return port;
        } else {
            return false;
        }
    }

    /**
     * Event listener for HTTP server "error" event.
     */
    onError (error) {
        if (error.syscall !== 'listen') {
            throw error;
        }
        var bind = (typeof port === 'string')
                ? 'Pipe ' + port : 'Port ' + port;

        // handle specific listen errors with friendly messages
        switch (error.code) {
            case 'EACCES':
                console.error(bind + ' requires elevated privileges');
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(bind + ' is already in use');
                process.exit(1);
                break;
            default:
                throw error;
        }
    }

    /**
     * Event listener for HTTP server "listening" event.
     */
    onListening () {
        var addr = server.address();
        var bind = (typeof addr === 'string')
                ? 'pipe ' + addr : 'port ' + addr.port;
        this.debug('Listening on ' + bind);
    }

}

export default ServerEvents;
