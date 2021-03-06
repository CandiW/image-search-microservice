'use strict';

module.exports = function(url,app){
    let mongodb=require('mongodb').MongoClient;
    let request = require('request');

let array = [];

function createResponse(body,object){
    let parsedBody = JSON.parse(body);
    let imageList = parsedBody.items;

    for(let i = 0; i<imageList.length; i++){
        let image = {
            url: imageList[i].link,
            snippet: imageList[i].snippet,
            thumbnail: imageList[i].image.thumbnailLink,
            context: imageList[i].displayLink
        }
        array.push(image);
    }
mongodb.connect(url,function(err,db){

    let collection = db.collection('images');
    collection.insert(object);
    db.close();
});
        
}

    app.get('/search/:query(*)',function(req,res){

        let q = req.params.query;
        let offset = req.query.offset;

        let url = "";

        if(offset){
            //if there is an offset
            url = 'https://www.googleapis.com/customsearch/v1' + '?key=' + process.env.CSE_API_Key + '&cx=' + process.env.CSE_ID + '&searchType=image' + '&q=' + q + '&start=' + offset;
        } 
    
        else {

            url = 'https://www.googleapis.com/customsearch/v1' + '?key=' + process.env.CSE_API_Key + '&cx=' + process.env.CSE_ID + '&searchType=image' + '&q=' + q;

        }

    request({
            uri: url,
            method: "GET",
            timeout: 10000
        }, function(error, response, body) {
            if(error){console.log(error);}
            
                let resObject = {
                    search_term: q,
                    date: new Date()
                }

                createResponse(body,resObject);
            
            res.send(array);
            array = [];
        });
    });

    
}