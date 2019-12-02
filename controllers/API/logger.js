const config = require('../../configuration/config');
log = require('simple-node-logger').createRollingFileLogger( config.logger );

class Logger {
    constructor() {}

    static log_info(message) {
        log.info(message , new Date().toJSON());
    }

    static log_error(message) {
        log.error(message , new Date().toJSON());
    }

    static log_debug(message) {
        log.error(message , new Date().toJSON());
    }

    static log_trace(message) {
        log.error(message , new Date().toJSON());
    }

    static log_warn(message) {
        log.error(message , new Date().toJSON());
    }

    static log_fatal(message) {
        log.error(message , new Date().toJSON());
    }
}
  
module.exports = Logger;