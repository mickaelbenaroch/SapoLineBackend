
'use strict';

let db = require('./db'); 

//Details - get items
exports.getCat = (obj_cat) => {
    return new Promise(( res, rej) => {
        let item = db.get().collection('category');

        item.find(obj_cat).toArray((err, result) =>{
            if(err || result === undefined || result.length == 0)
                rej("error to get categories")
            else
                res(result);
        });
    });
}