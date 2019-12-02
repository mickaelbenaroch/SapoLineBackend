//validate
const { check, validationResult } = require('express-validator')

module.exports = {
    server: {
      host: 'localhost',
      port: process.env.PORT || 3030
    },
    db: {
      client:   'MongoDB',
      db_model:  require('../models/db'),
      connection: {
        uri:      'mongodb+srv://mickaelbenaroch@yahoo.fr:shenkar_4@cluster0-okcdn.mongodb.net/test?retryWrites=true&w=majority',
        database: 'Sapo',
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
    }
  };