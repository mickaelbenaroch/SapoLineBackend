'use strict';

const express         = require('express'),
route           = express.Router(),
order        = require('../models/order')

//Details - create new order
//require - none
//return  - boolean, true/false
route.post('/', (req, res)=>{
    let obj_order = {
        date: req.body.date,
        order_id: req.body.order_id,
        user: req.body.user,
        orderItem: req.body.orderItem,
        status: req.body.status,
        token: req.headers.token
    };

    order.createOrder(obj_order).then((data) => {
        res.status(200).json({isValid: true, order: data});   
        res.end(); 
    }).catch(err => {
        res.json({isValid: false, error: err})
        res.status(500)
        res.end()
    })
});

//Details - get order
//require - none (exercises fields is optional) - if empty req body return all orders
//return  - items data by request
route.post('/getOrders', (req, res)=>{
    let obj_order = JSON.parse(JSON.stringify({
        from_date: req.body.date,
        until_date: req.body.date,
        order_id: req.body.order_id,
        user_phone: req.body.user_phone,
        status: req.body.status
    }));

    order.getOrders(obj_order).then((data) => {
        res.status(200).json({isValid: true, orders: data});   
        res.end(); 
    }).catch(err => {
        res.json({isValid: false, error: err})
        res.status(500)
        res.end()
    })
});


//Details - update order
//require - id (item id)
//return  - boolean, true/false
route.post('/updateOder', (req, res)=>{

    let obj_oder = JSON.parse(JSON.stringify({
        date: req.body.date,
        order_id: req.body.order_id,
        user: req.body.user,
        orderItems: req.body.orderItems,
        status: req.body.status
    }));

    order.updateItem(obj_oder).then((data) => {
        res.status(200).json({isValid: true, order: data});   
        res.end(); 
    }).catch(err => {
        res.json({isValid: false, error: err})
        res.status(500)
        res.end()
    })
});

//TODO: DELETE ORDER

module.exports = route