const express = require('express');
const path = require('path');
const dotenv = require('dotenv').config({path: "./.env"});
const myRequest1 = require("./request1.js"); 
const myRequest2 = require('./request2.js');
const bodyparser = require('body-parser');
let mongodb = require('mongodb').MongoClient;
let app = express();
//let mLab = "mongodb://herokumecw:herokume@ds163721.mlab.com:63721/image-search-microservice";
let mLab = "mongodb://localhost:3000/"

function search(port){

    app.use('/',express.static(path.join(__dirname,'/public')));

    app.get('/', function(req, res){
        res.sendFile(path.join(__dirname, 'public/index.html'));
    });    

    app.use(bodyparser.urlencoded({extended: false}));
    
   
        myRequest1(mLab,app);
        myRequest2(mLab,app);
            
    app.listen(port);

}

search(process.env.PORT || 3000);
