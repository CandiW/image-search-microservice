'use strict';

module.exports = function(app,db){

    let request = require('request');

function createCollection(db,response){
    let collection = db.collection('images');
    collection.insert(response,function(err,result){
        if(err){console.log(err);}
        else {
            console.log("Inserted collection...");
        }
    });
}

let array = [];

function createResponse(body){
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
}

    app.get('/images/:value(*)',function(req,res){

        let query = req.params.value;
        let offset = req.params.offset;

        let url = "";

        if(offset){
            //if there is an offset
            url = 'https://www.googleapis.com/customsearch/v1' + '?key=' + process.env.CSE_API_Key + '&cx=' + process.env.CSE_ID + '&searchType=image' + '&q=' + query + '&start=' + offset;
        } 
    
        else {

            url = 'https://www.googleapis.com/customsearch/v1' + '?key=' + process.env.CSE_API_Key + '&cx=' + process.env.CSE_ID + '&searchType=image' + '&q=' + query;

        }

    request({
            uri: url,
            method: "GET",
            timeout: 10000
        }, function(error, response, body) {
            if(error){console.log(error);}
            else {
                let resObject = {
                    search_term: query,
                    date: new Date()
                }

                createCollection(db,resObject);
                createResponse(body);
                console.log(body);
            }
        });
        res.send(array);
    });

    
}