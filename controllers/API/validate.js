'use strict';
const {logger} = require('../../configuration/config');
const validationResult = logger.validation_Result;

class Validate {
    //chack for empty request
    static * valid_chack( req_body ){ 
        let result = validationResult(req_body)
        let validate_array = result.array();

        if (!result.isEmpty()) {
            yield false;
            yield validate_array;
        }else{
            return true;
        }
    }

    //return error string
    static error_valid(req_body){
        return `${req_body} is require`
    }
}
  
module.exports = Validate;