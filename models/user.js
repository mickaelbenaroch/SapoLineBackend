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

//Details - get all profile by sex type
exports.getGroup = (sex) => {
    return new Promise(( res, rej) => {
        let profile = db.get().collection('user');
        
        profile.find({sex: sex}).toArray((err, result) =>{
            if(err || result === undefined || result.length == 0)
                rej("profile sex not found")
            else
                res(result);
        });
    });
}


//Details - get all profile by key object
exports.getProfile = (obj_profile) => {
    return new Promise(( res, rej) => {
        let profile = db.get().collection('user');

        profile.find(obj_profile).toArray((err, result) =>{
            if(err || result === undefined || result.length == 0)
                rej("error to get profiles")
            else
                res(result);
        });
    });
}

//Details - get all profiles
exports.getAllProfile = () => {
    return new Promise(( res, rej) => {
        let profile = db.get().collection('user');

        profile.find().toArray((err, result) =>{
            if(err || result === undefined || result.length == 0)
                rej("error to get profiles " + err)
            else
                res(result);
        });
    });
}

//Details - update all profiles
exports.updateProfile = (objectToUpdate) => {
    return new Promise(( res, rej) => {
        let profile = db.get().collection('user');

        profile.updateOne({email: objectToUpdate.email}, {$set: {picture: objectToUpdate.picture}}, (err, result) =>{
            if(err || result === undefined || result.length == 0)
                rej("error to update swimmers")
            else
                res(result);
        });
    });
}

