var crypto = require("crypto"),
  type = "mongodb",
  client = require('mongodb').MongoClient,
  articlesCollection,
  visitsCollection

connection = process.env.MONGODB_URI || "mongodb://localhost:27017/blog"

client.connect(connection, function(err, db){
  if(err) throw new Error("Cannot connect to database")
  else{
    console.log("Connection to MongoDB database sucessful.")
    console.log("URI: " + connection);
    articlesCollection = db.collection("articles")
    visitsCollection = db.collection("visits")
  }
})

module.exports = function() {
  return {
    getPosts: function(start, limit, callback){
      articlesCollection.find().skip(start).limit(limit).sort({date: -1}).toArray(callback)
    },

    addComment: function(post, comment, callback){
      articlesCollection.update({shortTitle: post.shortTitle}, {$set:{comments: [comment].concat(post.comments)}}, {}, callback)
    },

    incrementHomeVisits: function(){
        visitsCollection.find().toArray(function(err, visits){
          if(err) throw(err)

          visitsCollection.update({}, {$set:{home: visits[0].home+1}})
        })
    },

    incrementBlogVisits: function(){
        visitsCollection.find().toArray(function(err, visits){
          if(err) throw(err)

          visitsCollection.update({}, {$set:{blogHome: visits[0].blogHome+1}})
        })
    },

    incrementPostVisits: function(post){
      articlesCollection.update({shortTitle: post.shortTitle}, {$set:{visits: post.visits+1}})
    }
  }
}
