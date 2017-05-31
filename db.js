var mongo = require('mongodb').MongoClient,
    async = require('async');

var state = {
    db: null,
    uri: null,
}

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
module.exports.fixtures = function(name, data, err, done){
    if(!state.db)return err('no database')
    state.db.createCollection(name, function(err1, collection){
        if(err1){ return err(err1)}
        collection.insert(data, function(err2, res) {
            if(err2){return err(err2)}
            return done(res);
        })
    })
}
