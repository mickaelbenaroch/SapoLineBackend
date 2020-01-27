'use strict';

let db = require('./db'); 
const jwt = require('jsonwebtoken');
const jwtKey = process.env.SECRET
const jwtExpirySeconds = process.env.EXP

//Details - create new order
exports.createOrder = (obj_order) => {
    return new Promise(( res, rej) => {
        if (!obj_order.token) {
            rej("unauthorized: no token on request")
        } else {   
           var payload;
           try {
               payload = jwt.verify(token, jwtKey)
           } catch (e) {
               if (e instanceof jwt.JsonWebTokenError) {
                rej('the JWT is unauthorized' + e);
               }
                rej('bad request error' + e);
           }
            let auth = db.get().collection('auth');
            auth.findOne({email: obj_order.user.email}, (error, resu) => {
                if (error) {
                    rej('user not found, cannot create order')
                } else {
                    let item = db.get().collection('order');
                    item.insertOne(obj_order, (err, result) => {
                        if(err) {
                            rej("create new order faild")
                        } else {
                            res(obj_order);
                        }
                    });
                }
            });
        }
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