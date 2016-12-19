var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('blog');
});

router.get('/:date/:article', function(req, res, next){ //TODO
  var date = req.params.date;
  var article = req.params.article;
  res.send("Article written on: " + date + ", title: " + article)
});

router.get('/category/:category', function(req, res, next){ //TODO
  var category = req.params.category;
  res.send("Category: " + category);
});

router.get('/tag/:tag', function(req, res, next){ //TODO
  var tag = req.params.tag;
  res.send("Tag: " + tag);
});

module.exports = router;
