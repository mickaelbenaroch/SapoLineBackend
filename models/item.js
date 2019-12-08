'use strict';

let db = require('./db'); 

//Details - create new item
exports.createItem = (obj_item) => {
    return new Promise(( res, rej) => {
        let item = db.get().collection('item');
        
        item.insertOne(obj_item, (err, result) => {
            if(err)
                rej("create new item faild")
            else{
                res(obj_item);
            }
        });
    });
}

//Details - get items
exports.getItems = (obj_item) => {
    return new Promise(( res, rej) => {
        let item = db.get().collection('item');

        item.find(obj_item).toArray((err, result) =>{
            if(err || result === undefined || result.length == 0)
                rej("error to get items")
            else
                res(result);
        });
    });
}

//Details - update items
exports.updateItem = (obj_item) => {
    return new Promise(( res, rej) => {

        let item = db.get().collection('item');

        item.updateOne({"_id": obj_item.id}).then((response, err) =>{
            if (response) {
                res(response);
            } else {
                rej(err);
            }
        });

    });
}

//Details - get items
exports.getCategoryItem = (obj_item) => {
    return new Promise(( res, rej) => {
        let item = db.get().collection('item');

        item.find({category_id: obj_item.category_id}).toArray((err, result) =>{
            if(err || result === undefined || result.length == 0)
                rej("error to get items")
            else
                res(result);
        });
    });
}