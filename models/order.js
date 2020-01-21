'use strict';

let db = require('./db'); 

//Details - create new order
exports.createOrder = (obj_order) => {
    return new Promise(( res, rej) => {
        let item = db.get().collection('order');
        item.insertOne(obj_order, (err, result) => {
            if(err)
                rej("create new order faild")
            else{
                res(obj_order);
            }
        });
    });
}

//Details - get orders
exports.getOrders = (obj_order) => {
    return new Promise(( res, rej) => {
        let item = db.get().collection('order');
        item.find(obj_order).toArray((err, result) =>{
            if(err || result === undefined || result.length == 0)
                rej("error to get orders")
            else
                res(result);
        });
    });
}

//Details - update items
exports.updateOder = (obj_order) => {
    return new Promise(( res, rej) => {
        let item = db.get().collection('item');
        item.updateOne({"order_id": obj_order.order_id}).then((response, err) =>{
            if (response) {
                res(response);
            } else {
                rej(err);
            }
        });
    });
}