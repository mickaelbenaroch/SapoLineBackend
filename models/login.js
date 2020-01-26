'use strict';
let db = require('./db'); 
var mailer = require("nodemailer");
var conf = require('../configuration/config');
const jwt = require('jsonwebtoken');
const jwtKey = process.env.SECRET
const jwtExpirySeconds = process.env.EXP

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
exports.getAuthUser = (email, password) => {
    return new Promise(( res, rej) => {
        if (!email || !password) {
            return rej('email or password are undefined');
          }
        let auth = db.get().collection('auth');
        auth.findOne({email: email, password: password}, (err, result) => {
            if(err || result === null) {
                rej("Auth user not exist")
            }
            else {
                const token = jwt.sign({ email }, jwtKey, {
                    algorithm: 'HS256',
                    expiresIn: jwtExpirySeconds
                  })
                res({token: token,  maxAge: jwtExpirySeconds * 1000 });
            }
        });
    });
}


//Details - get user profile by email
exports.getAuthUser = (email, password) => {
    return new Promise(( res, rej) => {
        if (!email || !password) {
            return rej('email or password are undefined');
          }
        let auth = db.get().collection('auth');
        auth.findOne({email: email, password: password}, (err, result) => {
            if(err || result === null) {
                rej("Auth user not exist")
            }
            else {
                const token = jwt.sign({ email }, jwtKey, {
                    algorithm: 'HS256',
                    expiresIn: jwtExpirySeconds
                  })
                res({token: token,  maxAge: jwtExpirySeconds * 1000 });
            }
        });
    });
}

//Details - get user profile by email
exports.welcome = (token) => {
    return new Promise(( res, rej) => {  
        if (!token) {
             rej('no token on body request');
        }
        
        var payload
        try {
            payload = jwt.verify(token, jwtKey)
        } catch (e) {
            if (e instanceof jwt.JsonWebTokenError) {
             rej('the JWT is unauthorized' + e);
            }
             rej('bad request error' + e);
        }
        res({username: 'hello user'});
    });
}

