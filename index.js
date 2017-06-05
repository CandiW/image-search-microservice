const express = require('express');
const mongodb = require('mongodb').MongoClient;
const path = require('path');
const dotenv = require('dotenv').config({path: "./.env"});
const myRequest1 = require("./request1.js"); 
const myRequest2 = require('./request2.js');
const bodyparser = require('body-parser');
let app = express();
let mLab = "mongodb://localhost:3000/";

function search(port){

    app.use('/',express.static(path.join(__dirname,'/public')));

    app.get('/', function(req, res){
        res.sendFile(path.join(__dirname, 'public/index.html'));
    });    

    app.use(bodyparser.urlencoded({extended: false}));

    mongodb.connect(mLab,function(err,db){
        if(err){console.log("Error: " + err);}
        console.log("connected on " + port);
        myRequest1(app,db);
        myRequest2(app,db);
        db.close();                               
    });

    app.listen(port);

}

search(process.env.PORT || 3000);
