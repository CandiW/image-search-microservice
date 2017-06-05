'use strict';

module.exports = function(url,app){

    const mongodb = require('mongodb').MongoClient;

    app.get('/images/recent',function(req,res){
        mongodb.connect(url,function(err,db){

            if(err){console.log(err);}

        let array = [];
        let collection = db.collection('images');

        let findRecent = collection.find().sort({ _id: 0 }).limit(10);

        findRecent.map(function(el){
            let mostRecent = {
                    search_term: el.search_term,
                    date: el.date
                };

                array.push(mostRecent);

                if(array.length <= 10){
                    res.send(array);
                }

        });

        });

    });

}