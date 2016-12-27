var crypto = require("crypto"),
  type = "mongodb",
  client = require('mongodb').MongoClient,
  dbHost = "127.0.0.1",
  dbPort = "27017",
  postsCollection;

connection = "mongodb://" + dbHost + ":" + dbPort + "/blog";
client.connect(connection, function(err, db){
  if(err) throw new Error("Cannot connect to database");
  else{
    console.log("Connection to MongoDB database sucessful.");
    postsCollection = db.collection("posts");
    visitsCollection = db.collection("visits");
  }
});

module.exports = function() {
  return {
    getPosts: function(number, start, callback){
      postsCollection.find().toArray(callback);
    },

    addComment: function(post, comment, callback){
      postsCollection.update({shortTitle: post.shortTitle}, {$set:{comments: [comment].concat(post.comments)}}, {}, callback);
    },

    incrementHomeVisits: function(){
        visitsCollection.find().toArray(function(err, visits){
          if(err) throw(err);

          visitsCollection.update({}, {$set:{home: visits[0].home+1}});
        });
    },

    incrementBlogVisits: function(){
        visitsCollection.find().toArray(function(err, visits){
          if(err) throw(err);

          visitsCollection.update({}, {$set:{blogHome: visits[0].blogHome+1}});
        });
    },

    incrementPostVisits: function(post){
      postsCollection.update({shortTitle: post.shortTitle}, {$set:{visits: post.visits+1}});
    }
  }
}
