'use strict';

let db = require('./db'); 

//Details - get user profile by email
exports.getUser = (email) => {
    return new Promise(( res, rej) => {
        let profile = db.get().collection('user');
        
        profile.findOne({email: email}, (err, result) => {
            if(err || result === null)
                rej("profile not exist")
            else
                res(result);
        });
    });
}