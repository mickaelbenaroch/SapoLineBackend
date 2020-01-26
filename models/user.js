'use strict';
let db = require('./db'); 
var mailer = require("nodemailer");
var conf = require('../configuration/config');
const jwt = require('jsonwebtoken');
const jwtKey = process.env.SECRET

// Use Smtp Protocol to send Email
console.log(conf.info.co);
var smtpTransport = mailer.createTransport({
    service: "Gmail",
    auth: {
        user: "mickaelbenaroch@gmail.com",
        pass: conf.info.co
    }
});

//Details - create new exercise
exports.createUser = (obj_user) => {
    return new Promise(( res, rej) => {
        if (!obj_user.token) {
            res("unauthorize, no token on request!")
        } else {
            var payload;
            try {
                payload = jwt.verify(obj_user.token, jwtKey)
            } catch (e) {
                if (e instanceof jwt.JsonWebTokenError) {
                 rej('the JWT is unauthorized' + e);
                }
                 rej('bad request error' + e);
            }
            let profile = db.get().collection('user');
            profile.findOne({email: obj_user.email}, (err, result) => {
                if(err || result === null) {
                    let newUser = {
                        email: obj_user.email,
                        first_name: obj_user.first_name,
                        last_name: obj_user.last_name,
                        phone: obj_user.phone,
                        address: obj_user.address,
                    }
                    profile.insertOne(obj_user, (err, resu) => {
                        if (err) {
                            rej("failed to create new user " + newUser);
                        } else {
                            res({user: newUser, message: 'hello user'});
                        }
                    })
                } else {
                    rej("profile already exists")
                }
            });
        }
    });
}

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

