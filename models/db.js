const MongoClient = require('mongodb').MongoClient;

let collection = {
    db: null,
}

//connect mongo db - if connect succeed connect node server 
exports.connect = (url, done) => {
    if (collection.db) return done();

    MongoClient.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true}, (err, client) => {
        if(err) return done(err);
        console.log("Connect to MongoDB");
        collection.db = client.db('sapo');
        done();
    });
}

//get db collection
exports.get = function() {
    return collection.db
}

//close connection
exports.close = function(done) {
    if (collection.db) {
        collection.db.close(function(err, result) {
            collection.db = null
            collection.mode = null
            done(err)
        })
    }
}


