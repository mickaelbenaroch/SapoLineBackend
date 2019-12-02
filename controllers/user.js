'use strict';

const { check } = require('express-validator'),
express         = require('express'),
route           = express.Router(),
profile         = require('../models/user'),
log             = require('../controllers/API/logger');

//Details - get user profile by email
//require - email 
//return  - user profile
route.post('/', check('email').not().isEmpty(), (req, res)=>{
    let email          = req.body.email;

        profile.getUser(email).then((data) => {
            res.status(200).json({isValid: true, data});   
            res.end(); 
        }).catch(err => {
            res.json({isValid: false, error: err})
            res.status(500)
            res.end()
        })
});
module.exports = route