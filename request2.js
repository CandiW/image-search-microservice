'use strict';

module.exports = function(url,app){

const mongodb = require('mongodb').MongoClient;

let response;

function findRecents(){

    mongodb.connect(url,function(err,db){
    if(err){console.log(err);}
    let collection = db.collection('images');
    collection.find().toArray(function(err,doc){
        response = doc;
        return response;
    });
    db.close();
});
    
app.get('/images/recent',function(req,resp){
    resp.send(response);
});


}

findRecents();

}