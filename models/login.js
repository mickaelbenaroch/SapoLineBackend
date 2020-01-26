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

//Details - create new user
exports.createUser = (obj_user) => {
    return new Promise(( res, rej) => {
        let auth = db.get().collection('auth');
        if (!obj_user || !obj_user.email || !obj_user.password) {
            rej("Email or Password is undefined!");
        }
        auth.findOne({email: obj_user.email}, (result, error) => {
            if(error || result !== null) {
                rej("Auth user already exist")
            }
            else if (!error && result === null) {
                auth.insertOne(obj_user, (err, resu) => {
                    if(err) {
                        res("create new item failed " + err);
                    } else {
                        let email = obj_user.email;
                        const token = jwt.sign({ email }, jwtKey, {
                            algorithm: 'HS256',
                            expiresIn: jwtExpirySeconds
                            })
                            var mail = {
                                from: "SapoLine <mickaelbenaroch@gmail.com>>",
                                to: obj_user.email,
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
                        res({token: token,  maxAge: jwtExpirySeconds * 1000, message: "User was created successfully" });
                    }
                })
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

