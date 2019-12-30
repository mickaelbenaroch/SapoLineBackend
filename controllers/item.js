'use strict';

const { check } = require('express-validator'),
express         = require('express'),
route           = express.Router(),
item        = require('../models/item'),
valid_class     = require('../controllers/API/validate'),
log             = require('../controllers/API/logger');

//Details - create new item
//require - none
//return  - boolean, true/false
route.post('/', (req, res)=>{
    let obj_item = {
        category_id: req.body.category_id,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        discount: req.body.discount,
        picture: req.body.picture
    };

    item.createItem(obj_item).then((data) => {
        res.status(200).json({isValid: true, item_id: data});   
        res.end(); 
    }).catch(err => {
        res.json({isValid: false, error: err})
        res.status(500)
        res.end()
    })
});

//Details - get items
//require - none (exercises fields is optional) - if empty req body return all exercises
//return  - items data by request
route.post('/getItems', (req, res)=>{
    let obj_item = JSON.parse(JSON.stringify({
        category_id: req.body.category_id,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        discount: req.body.discount,
        picture: req.body.picture,
        descriptionEnglish: req.body.descriptionEnglish,
        sizes: req.body.sizes,
        quantity: req.body.quantity
    }));

    item.getItems(obj_item).then((data) => {
        res.status(200).json({isValid: true, item: data});   
        res.end(); 
    }).catch(err => {
        res.json({isValid: false, error: err})
        res.status(500)
        res.end()
    })
});


//Details - update items
//require - id (item id)
//return  - boolean, true/false
route.post('/updateItem', check('id').not().isEmpty(), (req, res)=>{

    let obj_item = JSON.parse(JSON.stringify({
        category_id: req.body.category_id,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        discount: req.body.discount,
        picture: req.body.picture
    }));

    let validat_result = valid_class.valid_chack(req);

    if(validat_result.next().value == false){
        res.status(422).json({ errors: valid_class.error_valid(validat_result.next().value[0].param) });
    }else{
        item.updateItem(obj_item).then((data) => {
            res.status(200).json({isValid: true, item: data});   
            res.end(); 
        }).catch(err => {
            res.json({isValid: false, error: err})
            res.status(500)
            res.end()
        })
    }
});

//Details - get swimmer items 
//require - _id (item id)
//return  - item
route.post('/getCategoryItem', check('_id').not().isEmpty(), (req, res)=>{

    let obj_item    = req.body.category_id;
    let validat_result  = valid_class.valid_chack(req);

    if(validat_result.next().value == false){
        res.status(422).json({ errors: valid_class.error_valid(validat_result.next().value[0].param) });
    }else{
        item.getCategoryItem(obj_item).then((data) => {
            res.status(200).json({isValid: true, item: data});   
            res.end(); 
        }).catch(err => {
            res.json({isTrue: false, error: err})
            res.status(500)
            res.end()
        })
    }
});

module.exports = route