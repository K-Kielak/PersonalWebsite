var express = require('express');
var router = express.Router();
var blogDB = require('./../models/blogDB')();

router.use(function(req, res, next){
  blogDB.getPosts(function(err, posts){
    if(err) throw err;
    req.posts = posts;
    next();
  });
});

router.get('/', function(req, res, next) {
  res.render('blog', {
    chosenPosts: req.posts,
    posts: req.posts
  });
});

router.get('/post/:title', function(req, res, next){
  var post = req.posts.filter((post) => {
    return (post.title.toLowerCase() == req.params.title.toLowerCase());
  })[0];

  if(post){
    res.render('post', {
      posts: req.posts,
      title: post.title,
      intro: post.intro,
      body: post.body,
      date: post.date,
      category: post.category,
      tags: post.tags
    });
  }
  else{

    var err = new Error("There is no such post as " + req.params.title.toLowerCase() + " :(");
    err.status = 1;

    next(err);
  }
});

router.get('/category/:category', function(req, res, next){ //TODO
  var posts = req.posts.filter((post) => {
    return post.category.toLowerCase() == req.params.category.toLowerCase();
  });

  if(posts.length > 0){
    res.render('blog', {
      chosenPosts: posts,
      posts: req.posts
    });
  }
  else{
    var err = new Error('There are no posts in category "' + req.params.category + '" :(');
    err.status = 1;

    next(err);
  }

});

router.get('/tag/:tag', function(req, res, next){ //TODO
  var posts = req.posts.filter((post) => {
    return post.tags.indexOf(req.params.tag.toLowerCase()) > -1;
  });

  if(posts.length > 0){
    res.render('blog', {
      chosenPosts: posts,
      posts: req.posts
    });
  }
  else{
    var err = new Error('There are no posts with tag "' + req.params.tag + '" :(');
    err.status = 1;

    next(err);
  }
});

router.use(function(req, res, next) {
  var err = new Error('Page not Found');
  err.status = 404;
  next(err);
});

router.use(function(err, req, res, next){
  console.log(err.message);

  if(!err.status){
    err.status = 500;
    err.message = 'Internal server error';
  }

  var status = err.status;
  if(status == 1)
    status = "";

  res.render('blogError', {
    errStatus: status,
    errMessage: err.message
  })
});

module.exports = router;
