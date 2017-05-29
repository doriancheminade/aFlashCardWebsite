var mongo = require('mongodb').MongoClient,
    async = require('async');

var state = {
    db: null,
    uri: null,
}

var data = require('./test/database/flashcardDB')

module.exports.connect = function(uri, done){
    if(state.db) return done()
    var uri = uri
    mongo.connect(uri, function(err, db){
        if(err) return done(err)
        state.db = db
        state.uri = uri
        done()
    })
}
module.exports.getDB = function(){
    return state.db
}
module.exports.drop = function(done){
    if(!state.db)return done()
    state.db.collections(function(err, collections){
        async.each(collections, function(collection, cb){
            if(collection.collectionName.indexOf('system') === 0) {
                return cb()
            }
            collection.remove(cb)
            }, done)
    })
}
module.exports.fixtures = function(name, done){
    var db = state.db
    if(!db)return done(new Error('Missing database'))
    db.createCollection(name, function(err, collection){
        if(err){ return console.dir(err);}
        collection.insert(data, function(err, result) {
            if(err){return console.dir(err);}
        })
    })
}
module.mongo = mongo;
