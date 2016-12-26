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
  }
});

module.exports = function() {
  return {
    getPosts: function(number, start, callback){
      postsCollection.find().toArray(callback);
    },

    addComment: function(post, comment, callback){
      postsCollection.update({shortTitle: post.shortTitle}, {$set:{comments: [comment].concat(post.comments)}}, {}, callback);
    }
  }
}
