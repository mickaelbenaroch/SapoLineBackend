'use strict';

let db = require('./db'); 
const jwt = require('jsonwebtoken');
const jwtKey = process.env.SECRET;
var mailer = require("nodemailer");
var conf = require('../configuration/config');

// Use Smtp Protocol to send Email
var smtpTransport = mailer.createTransport({
    service: "Gmail",
    auth: {
        user: "mickaelbenaroch@gmail.com",
        pass: conf.info.co
    }
});

//Details - create new order
exports.createOrder = (obj_order) => {
    return new Promise(( res, rej) => {
        if (!obj_order.token) {
            rej("unauthorized: no token on request")
        } else {   
           var payload;
           try {
               payload = jwt.verify(obj_order.token, jwtKey)
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
                            let total = 0;
                            if(obj_order && obj_order.orderItem && obj_order.orderItem.length > 0) {
                                obj_order.orderItem.forEach(item => {
                                    let temp = [];
                                    let fixed = '';
                                    if (item.price.includes(',')) {
                                      temp = item.price.split(',');
                                      if (temp.length >= 2) {
                                        if (temp[1].includes('₪')) {
                                           temp[1] = temp[1].substring(0, temp[1].length - 1);
                                        } else {
                                          temp[1] = temp[1].substring(0, temp[1].length - 3);
                                        }
                                        fixed = temp[0] + '.' + temp[1];
                                      }
                                    }
                                    total += (Number(fixed) * Number(item.quantity))
                                  });
                                }
                            
                            console.log(total.toString() + 'nis');
                            var mail = {
                                from: "SapoLine <mickaelbenaroch@gmail.com>>",
                                to: obj_order.user.email,
                                subject:`Hi ${obj_order.user.first_name}! Your order was succesfully created`,
                                text: "Thank you for your purchase!",
                                html: `<p>In order to continue, please pay by Pepper Pay, or PayBox, or Bit a montant of ${total.toString()} ₪ for order number ${obj_order.order_id}. The order will be finally approved after the payment and you can track the progress of the order on the site. </br>SapoLine Team...</p>`
                            }
                            smtpTransport.sendMail(mail, function(error, response){
                                if(error){
                                    console.log(error);
                                }else{
                                    console.log("Message sent mail: " + response);
                                }
                                smtpTransport.close();
                            });
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
