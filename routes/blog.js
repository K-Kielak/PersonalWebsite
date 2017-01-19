var express = require('express')
var router = express.Router()

const POSTS_PER_REQUEST = 10

router.use(function(req, res, next){
  req.database.getPosts(0, POSTS_PER_REQUEST, function(err, posts){
    if(err) {
      next(err)
    } else{
      req.posts = posts
      next()
    }

  })
})

router.get('/', function(req, res, next) {
  res.render('blog', {
    chosenPosts: req.posts,
    posts: req.posts
  })

  req.database.incrementBlogVisits()
})

router.get('/post/:shortTitle', function(req, res, next){
  var post = req.posts.filter((post) => {
    return (post.shortTitle.toLowerCase() == req.params.shortTitle.toLowerCase())
  })[0]

  if(post){
    res.render('post', {
      posts: req.posts,
      shortTitle: post.shortTitle,
      title: post.title,
      intro: post.intro,
      body: post.body,
      date: post.date,
      category: post.category,
      tags: post.tags,
      comments: post.comments,
      img: post.img
    })

    req.database.incrementPostVisits(post)
  }
  else{

    var err = new Error("There is no such post as " + req.params.title.toLowerCase() + " :(")
    err.status = 1

    next(err)
  }
})

router.post('/post/:shortTitle/addComment', function(req, res, next){
  var name = req.body.name,
    email = req.body.email,
    text = req.body.text,
    date = new Date()

  var comment = {name, email, text, date}
  var post = req.posts.filter((post) => {
    return (post.shortTitle.toLowerCase() == req.params.shortTitle.toLowerCase())
  })[0]

  if(post){
    req.database.addComment(post, comment, function(err, empty){
      if(err)
        next(err)
      else
        res.end()
    })
  }
  else{
    var err = new Error("There is no such post as " + req.params.shortTitle.toLowerCase() + " :(")
    err.status = 1

    next(err)
  }
})

router.get('/post/:shortTitle/getComments', function(req, res, next){ //TODO add comments limit
  var post = req.posts.filter((post) => {
    return (post.shortTitle.toLowerCase() == req.params.shortTitle.toLowerCase())
  })[0]

  if(post){
    res.send(post.comments)
    console.log("comments sent")
  }
  else{
    var err = new Error("There is no such post as " + req.params.title.toLowerCase() + " :(")
    err.status = 1

    next(err)
  }
})

router.get('/category/:category', function(req, res, next){
  var posts = req.posts.filter((post) => {
    return post.category.toLowerCase() == req.params.category.toLowerCase()
  })

  if(posts.length > 0){
    res.render('blog', {
      chosenPosts: posts,
      posts: req.posts
    })
  }
  else{
    var err = new Error('There are no posts in category "' + req.params.category + '" :(')
    err.status = 1

    next(err)
  }

})

router.get('/tag/:tag', function(req, res, next){
  var posts = req.posts.filter((post) => {
    return post.tags.indexOf(req.params.tag.toLowerCase()) > -1
  })

  if(posts.length > 0){
    res.render('blog', {
      chosenPosts: posts,
      posts: req.posts
    })
  }
  else{
    var err = new Error('There are no posts with tag "' + req.params.tag + '" :(')
    err.status = 1

    next(err)
  }
})

router.use(function(req, res, next) {
  var err = new Error('Page not Found')
  err.status = 404
  next(err)
})

router.use(function(err, req, res, next){
  console.log(err.message)

  if(!err.status){
    err.status = 500
    err.message = 'Unfortunately, internal server error has occured. :( <br/>'
                + 'I will be really grateful if you contact me about the details '
                + 'of this situation (my email adress: kielak.kacper@gmail.com). '
                + 'In the meantime you can go back to <a href="/">HOME</a> page or to my '
                + '<a href="/blog">BLOG</a>'
  }

  var status = err.status
  if(status == 1)
    status = ""

  res.render('blogError', {
    posts: req.posts,
    errStatus: status,
    errMessage: err.message
  })
})

module.exports = router
