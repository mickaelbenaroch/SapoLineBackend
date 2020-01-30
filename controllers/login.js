'use strict';

const { check } = require('express-validator'),
express         = require('express'),
route           = express.Router(),
profile         = require('../models/login'),
valid_class     = require('../controllers/API/validate');


//login-signin
route.post('/signin', check('email').not().isEmpty(),check('password').not().isEmpty(), (req, res)=>{
    let email    = req.body.email;
    let password = req.body.password;
    profile.getAuthUser(email, password).then((data) => {
        res.status(200).json({isValid: true, data: data});   
        res.end(); 
    }).catch(err => {
        res.json({isValid: false, error: err})
        res.status(500)
        res.end()
    })
    
});

//login-signup
route.post('/newuser', (req, res)=>{
    let obj_profile = JSON.parse(JSON.stringify({
        email: req.body.email,
        password: req.body.password
    }));

    profile.createUser(obj_profile).then((data) => {
        res.status(200).json({isValid: true, user: data});   
        res.end(); 
    }).catch(err => {
        res.json({isValid: false, error: err})
        res.status(500)
        res.end()
    })
});

//login-signup
route.post('/checktoken', (req, res)=>{
    let obj_token = JSON.parse(JSON.stringify({
        token: req.headers.token
    }));

    profile.checkToken(obj_token).then((data) => {
        res.status(200).json({isValid: true, token: data});   
        res.end(); 
    }).catch(err => {
        res.json({isValid: false, error: err})
        res.status(500)
        res.end()
    })
});

module.exports = route