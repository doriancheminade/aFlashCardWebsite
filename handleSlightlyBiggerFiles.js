var Db = require('mongodb').Db,
    MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server,
    ReplSetServers = require('mongodb').ReplSetServers,
    ObjectID = require('mongodb').ObjectID,
    Binary = require('mongodb').Binary,
    GridStore = require('mongodb').GridStore,
    Grid = require('mongodb').Grid,
    Code = require('mongodb').Code

var DB = require('./db')
    
var fs = require('fs')
var Grid = require('gridfs')

module.exports.readFile = function(fileId, done, err){
    if(!DB.getDB())return err('no database')
    
    var gs = new GridStore(DB.getDB(), new ObjectID(fileId), "r")
    gs.open(function(err1, gs) {
        if(err1) return err(err1) 
            var s = gs.stream(true)        
            return done(s)
    })
}

module.exports.createFile = function(data, done, err){
    if(!DB.getDB())return err('no database')

    var fileId = new ObjectID()
    var gridStore = new GridStore(DB.getDB(), fileId, data, "w")
    gridStore.open(function(err1, gridStore) {
        if(err1) return err(err1)        
        var s = fs.createReadStream(data)        
        s.on('data', function(chunk) {        
            gridStore.write(chunk, function(err2, gridStore) {
                if(err2) return err(err2)
            })
        })
        s.on('end', function() {
            // Flush the file to GridFS
            gridStore.close(function(err3, fileData) {
                if(err3) return err(err3)
                return done(fileId)
            })        
        })
    })
}

module.exports.deleteFile = function(fileId, done, err){
    if(!DB.getDB())return err('no database')
    new GridStore(DB.getDB(), fileId, 'r').open(function(err1, gridStore) {
        if(err1) return err(err1)
        gridStore.unlink(function(err2, res) {
            if(err2) return err(err2)
            return done()
        })
    })
}

module.exports.DeleteAllFiles = function(done, err){
    if(!DB.getDB())return err('no database')
    GridStore.list(DB.getDB(), function(err1, items) {
        items.forEach(function(filename) {
            GridStore.unlink(DB.getDB(), filename,function(err2, res) {
                if(err2) return err(err2)
            })
        })
        return done()
    })
}
