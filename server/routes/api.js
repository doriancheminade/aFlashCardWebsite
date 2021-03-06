const express = require('express');
const router = express.Router();
var mongo = require('mongodb');
var fs = require('fs');

var DB = require('../../db');
var gridfs = require('../../handleSlightlyBiggerFiles');

var flashcards = "flashcards";
var FLASHCARD_URI = 'mongodb://localhost:27017/'+flashcards;
var flashcardsData = require('../../test/database/flashcardDB')
var images = [{f: 'mug.png', name: "mug",id:0},
              {f: 'spoon.png', name: "spoon",id:0}, 
              {f: 'sugar.png', name: "sugar",id:0}, 
              {f: 'teapot.png', name: "teapot",id:0}, 
              {f: 'toBoil.png', name: "boil",id:0}];
var p = __dirname + '/../../test/database/imgs/'

//sets the database
DB.connect(FLASHCARD_URI, function(err){
    if(err){return console.log(err);}
    //drop flash cards
    DB.drop(function(done){
        if(err){return console.log(err);}
        //drop images
        gridfs.DeleteAllFiles(function(){            
            //insert images
            var n = 0;
            images.forEach(function(i){
                var s = fs.createReadStream(p + i.f)
                gridfs.createFile(s, i.f, function(imageId){
                    console.log('    image -> database: OK', imageId); 
                    i.id = imageId;//set ObjectId here
                
                    console.log('   added image ref to flashcard')
                    //add image ObjectId to flashcard
                    flashcardsData.forEach(function(f){
                        if(f.name == i.name){
                            f.image = i.id;
                            n++;
                        }
                    })
                    
                    //insert example flash cards
                    if(n >= 5){
                    console.log('flashcard set ...')
                    DB.fixtures(flashcards, flashcardsData, function(err){
                        console.error('    image insert fail ', err);
                    },function(err, files){
                        if(err) console.error('load test database fail')
                        console.log('flashcard set', files)
                    })
                    }
                })
            },function(){})
        }, function(err){console.error('    image deletion fail ', err);})
    })
})
//actual API
router.get('/cards/getAll', (req, res, next) => {
    DB.getDB().collection(flashcards).find().toArray(function (err, result) {
        if (err) {
            return next(err);
        } else {
            res.send(result);
        }
    })
});
router.get('/cards/getById/:id', (req, res, next) => {
    DB.getDB().collection(flashcards).find({"_id": mongo.ObjectId(req.params.id)}).toArray(function (err, result) {
        if (err) {
            return next(err);
        } else {
            res.send(result);
        }
    })
});
router.get('/cards/getRandom/:number', (req, res, next) => {
    DB.getDB().collection(flashcards).aggregate([{$sample: {size: parseInt(req.params.number)}}]).toArray(function(err, result){
        if (err) {
            return next(err);
        } else {
            res.send(result);
        }
    })
});
router.post('/cards/upload/', (req, res, next) => {
    console.log('REQ: ',req.body);
    DB.getDB().collection(flashcards).insertOne(JSON.parse(req.body.card), function(err, res1){
        if(err) {
            return next(err);
        }
        res.send(res1);
    })
});


router.post('/imgs/upload/', (req, res, next) => {
    gridfs.createFile(req, function(fileId){
        console.log('upload img ',fileId);
        res.send(fileId);
    }, function(err){
        return next(err);
    })
});
router.get('/imgs/getById/:id', (req, res, next) => {
    gridfs.readFile(req.params.id+'', function(s){
        s.on("data", function(chunk) {
            res.write(chunk)
        })
        s.on("end", function(chunk) {
            res.end()
        })
    },function(err){
        return next(err);
    })
});

router.get('/', (req, res) => {
  res.send('api works');
});

module.exports = router;
