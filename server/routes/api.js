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
        images.forEach(function(i){
            gridfs.createFile(p + i.f, function(imageId){
                console.log('    image -> database: OK', imageId); 
                i.id = imageId;//set ObjectId here
            
                console.log('   added image ref to flashcard')
                //add image ObjectId to flashcard
                flashcardsData.forEach(function(f){
                    if(f.name == i.name){
                        f.image = i.id;
                        //console.log('image id set', i.id)
                    }
                })
            },function(){
                //insert example flash cards
                DB.fixtures(flashcards, flashcardsData, function(err){
                    console.error('    image insert fail ', err);
                },function(err, files){
                    if(err) console.error('load test database fail')
                    console.log('flashcard set', files)
                })
            })
        })
        }, function(err){console.error('    image deletion fail ', err);})
    })
})
//actual API
router.get('/getAllFlashCards', (req, res) => {
    DB.getDB().collection(flashcards).find().toArray(function (err, result) {
        if (err) {
            console.error('    Find failed', err);
        } else {
            console.log('   Find successful', result);
            res.send(result);
        }
    })
});
router.get('/getByIdFlashCards/:id', (req, res) => {
    DB.getDB().collection(flashcards).find({"_id": mongo.ObjectId(req.params.id)}).toArray(function (err, result) {
        if (err) {
            console.error('Find failed', err);
        } else {
            console.log('Find successful', req.params);
            console.log('               ', result);
            res.send(result);
        }
    })
});

router.get('/imgs/getById/:id', (req, res) => {
    gridfs.readFile(req.params.id+'', function(s){
        s.on("data", function(chunk) {
            res.write(chunk)
        })
        s.on("end", function(chunk) {
            res.end()
        })
    },function(err){
        console.error('get image fail ', err)
        res.send({'err': 'file not found'})
    })
});

router.get('/', (req, res) => {
  res.send('api works');
});

module.exports = router;
