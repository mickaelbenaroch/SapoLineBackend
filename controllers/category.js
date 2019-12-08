'use strict';

const { check } = require('express-validator'),
express         = require('express'),
route           = express.Router(),
item        = require('../models/category'),
valid_class     = require('../controllers/API/validate'),
log             = require('../controllers/API/logger');

//Details - get items
//require - none (exercises fields is optional) - if empty req body return all exercises
//return  - items data by request
route.post('/getCategory', (req, res)=>{
    let obj_cat = JSON.parse(JSON.stringify({
        id: id,
        name: req.body.name,
    }));

    item.getCat(obj_cat).then((data) => {
        res.status(200).json({isValid: true, item: data});   
        res.end(); 
    }).catch(err => {
        res.json({isValid: false, error: err})
        res.status(500)
        res.end()
    })
});