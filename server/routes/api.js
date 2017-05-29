const express = require('express');
const router = express.Router();

var DB = require('../../db')
var db = DB.getDB()
var flashcards = "flashcardDB"
var FLASHCARD_URI = 'mongodb://localhost:27017/'+flashcards


DB.connect(FLASHCARD_URI, function(err){
    if(err){return console.dir(err);}
    DB.drop(function(done){
        if(err){return console.dir(err);}
        DB.fixtures(flashcards, function(done){

        })
    })
})
router.get('/getAllFlashCards', (req, res) => {
    DB.getDB().collection(flashcards).find().toArray(function (err, result) {
        if (err) {
            console.error('Find failed', err);
        } else {
            console.log('Find successful', result);
            res.send({ 'cards': result});
        }
    })
});

router.get('/', (req, res) => {
  res.send('api works');
});

module.exports = router;
