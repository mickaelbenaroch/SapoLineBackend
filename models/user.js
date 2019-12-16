'use strict';
let db = require('./db'); 
var mailer = require("nodemailer");
var conf = require('../configuration/config');

// Use Smtp Protocol to send Email
var smtpTransport = mailer.createTransport({
    service: "Gmail",
    auth: {
        user: "mickaelbenaroch@gmail.com",
        pass: conf.info.co
    }
});

//Details - create new exercise
exports.createUser = (obj_exercise) => {
    return new Promise(( res, rej) => {
        let user = db.get().collection('user');
        let order = db.get().collection('order');
        
        user.insertOne(obj_exercise, (err, result) => {
            if(err)
                rej("create new user faild")
            else{
                order.insertOne({_id: obj_exercise.item_id, user_mail: obj_exercise.email, user_phone: obj_exercise.phone},(err, result) => {
                    if(err)
                        rej("create new item faild")
                    else {
                        var mail = {
                            from: "SapoLine <mickaelbenaroch@gmail.com>>",
                            to: obj_exercise.email,
                            subject: "Welcome to SapoLine",
                            text: "Thank you for your purchase!",
                            html: "<b>Thank you for your purchase! SapoLine Team...</b>"
                        }
                        
                        smtpTransport.sendMail(mail, function(error, response){
                            if(error){
                                console.log(error);
                            }else{
                                console.log("Message sent mail: " + response.message);
                            }
                        
                            smtpTransport.close();
                        });
                    }
                        res(obj_exercise._id)
                });
            }
        });
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

