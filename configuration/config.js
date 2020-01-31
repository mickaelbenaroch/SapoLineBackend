//validate
const { check, validationResult } = require('express-validator')

module.exports = {
    server: {
      host: 'localhost',
      port: process.env.PORT || 8000
    },
    db: {
      client:   'MongoDB',
      db_model:  require('../models/db'),
      connection: {
        uri:      process.env.DB,
        database: process.env.DB_NAME
      }
    },
    corss: {
      bodyParser:   require('body-parser'),
      cors_parser:  require('cors')
    },
    logger: {
      logDirectory:       './logs',
      fileNamePattern:    'roll-<DATE>.log',
      dateFormat:         'YYYY.MM.DD',
      validation_Result:  validationResult,
      check_body:         check,
    },
    info: {
      co: process.env.MAIL
    }
  };