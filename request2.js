'use strict';

module.exports = function(url,app,db){

    app.get('/images/recent',function(req,res){
            
        let array = [];
        let collection = db.collection('images');
        let findRecent = collection.find().sort({ _id: 0 }).limit(15);

        findRecent.map(function(el){
            let mostRecent = {
                    search_term: el.search_term,
                    date: el.date
                };

                array.push(mostRecent);

                res.send(array);
            
        });

        });

}