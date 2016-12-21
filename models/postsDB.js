var MongoClient = require('mongodb').MongoClient;

var url = "mongodb://localhost:27017/blog";

var state = {
  db: null,
};

MongoClient.connect(url, function(err, db) {
  if (err){
    console.log('Unable to connect to Mongo.');
    process.exit(1);
  }
  else {
    state.db = db;
    console.log('Connection to MongoDB successful');
  }
});

var postsCollection = state.db.collection('posts');

exports.getAll = function(callback){
  return postsCollection.find().toArray(callback);
}
