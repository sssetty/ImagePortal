module.exports.getList  =function() {
  return new Promise(function(resolve,reject){
  var MongoClient = require('mongodb').MongoClient;
  MongoClient.connect("mongodb://localhost:27017/ImagePortal",function(err,db){
    if(err){
        console.log("Could not Connect to DB");
              reject("Error");
        }
        else{
           console.log("Successfully retreived the List");
            db.collection('ImageNameScope').find().toArray(function(err,result){
               console.log(result);
               if(result != null) {
                //console.log("Inside dbconnect");
              //  console.log(results);
              //  return results;
                resolve(result);
               }else{
                 reject("Error");
               }
             });

           }
         });
       });
     };

module.exports.getCategory  = function(name) {
  console.log(name);
       return new Promise(function(resolve,reject){
       var MongoClient = require('mongodb').MongoClient;
       MongoClient.connect("mongodb://localhost:27017/ImagePortal",function(err,db){
         if(err){
             console.log("Could not Connect to DB");
                   reject("Error");
             }
             else{
                db.collection(name).find().toArray(function(err,result){
                   if(result != null) {
                    console.log("inside db "+ JSON.stringify(result));
                    resolve(result);
                   }else{
                     console.log(err);
                     reject("Error");
                   }
                 });
                }
              });
            });
          };
