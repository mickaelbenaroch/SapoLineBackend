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

//login-refresh
route.post('/refresh', check('token').not().isEmpty(), (req, res) => {
    let token = req.body.token;
    profile.refreshUserToken(token).then((data) => {
        res.status(200).json({isValid: true, data: data});   
        res.end(); 
    }).catch(err => {
        res.json({isValid: false, error: err})
        res.status(500)
        res.end()
    })
});

//login-refresh
route.post('/welcome', check('token').not().isEmpty(), (req, res) => {
    let token = req.body.token;
    profile.welcome(token).then((data) => {
        console.log(data)
        res.status(200).json({isValid: true, data: data});   
        res.end(); 
    }).catch(err => {
        res.json({isValid: false, error: err})
        res.status(500)
        res.end()
    })
});

//Details - create new exercise
//require - none
//return  - boolean, true/false
route.post('/new', (req, res)=>{
    let obj_profile = JSON.parse(JSON.stringify({
        user:           req.body.user,
        first_name:     req.body.first_name, 
        last_name:      req.body.last_name,
        age:            req.body.age,
        email:          req.body.email,
        phone:          req.body.phone,
        street:         req.body.address,
        pass_id:        req.body.pass_id,
        item_id:        req.body.item_id
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

//Details - get all users by group type
//require - group 
//return  - user  
route.post('/getGroup', check('group').not().isEmpty(), (req, res)=>{
    let group_query     = req.body.group;
    let validat_result  = valid_class.valid_chack(req);

    if(validat_result.next().value == false){
        res.status(422).json({ errors: valid_class.error_valid(validat_result.next().value[0].param) });
    }else{
        profile.getGroup(group_query).then((data) => {
            res.status(200).json({isValid: true, data});   
            res.end(); 
        }).catch(err => {
            res.json({isValid: false, error: err})
            res.status(500)
            res.end()
        })
    }
});

//Details - get all user by key object
//require - none (all fields optional)
//return  - user  
route.post('/getUser', (req, res)=>{
    let obj_profile = JSON.parse(JSON.stringify({
        user:           req.body.user,
        first_name:     req.body.first_name, 
        last_name:      req.body.last_name,
        age:            req.body.age,
        phone:          req.body.phone,
        street:         req.body.street,
        city:           req.body.city,
        street_number:  req.body.street_number,
        floor:          req.body.floor,
        apt_number:     req.body.apt_number,
        pass_id:        req.body.pass_id,
    }));

    if(Object.entries(obj_profile).length === 0){
        res.status(500);   
        res.json({isTrue: false, error: "empty object"})
        res.status(500)
        res.end()
    }

    profile.getProfile(obj_profile).then((data) => {
        res.status(200).json({isValid: true, data});   
        res.end(); 
    }).catch(err => {
        res.json({isValid: false, error: err})
        res.status(500)
        res.end()
    })
});

//Details - get all users
//require - none (all fields optional)
//return  - users users array
route.post('/getAllUsers', (req, res)=>{
    profile.getAllProfile().then((data) => {
        res.status(200).json({isValid: true, data});   
        res.end(); 
    }).catch(err => {
        res.json({isValid: false, error: err})
        res.status(500)
        res.end()
    })
});

//Details - get all users
//require - none (all fields optional)
//return  - users users array
route.post('/updateUser', (req, res)=>{
    let obj_profile = JSON.parse(JSON.stringify({
        email:        req.body.email,
        picture:      req.body.picture,
    }));
    profile.updateProfile(obj_profile).then((data) => {
        res.status(200).json({isValid: true, data});   
        res.end(); 
    }).catch(err => {
        res.json({isValid: false, error: err})
        res.status(500)
        res.end()
    })
});
module.exports = route