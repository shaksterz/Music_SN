class ServerEventHandler {

    /**
     * A function that normalises a port into a number, string, or false.
     */
    normalizePort (val: any): any {
        let port: number = parseInt(val, 10);
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
    onError (error: any): void {
        if (error.syscall !== "listen") {
            throw error;
        }

        // handle specific listen errors with friendly messages
        switch (error.code) {
            case "EACCES":
                console.error("Elevated privileges required.");
                process.exit(1);
                break;
            case "EADDRINUSE":
                console.error("Port is already in use");
                process.exit(1);
                break;
            default:
                throw error;
        }
    }

    /**
     * Event listener for HTTP server "listening" event.
     */
     onListening (address) {
        return () => {
            let bind = (typeof address === "string")
                    ? "pipe " + address : "port " + address.port;
            console.log("Listening on " + bind);
        }
    }

}

export default ServerEventHandler;