var express = require('express');
var router = express.Router();

const posts = [
  {
    title: 'Templating with EJS',
    intro: "Aries is the first sign of the zodiac, and that's pretty much how those born under this sign see themselves: first. Aries are the leaders of the pack, first in line to get things going.",
    body: "Whether or not everything gets done is another question altogether, for an Aries prefers to initiate rather than to complete. Do you have a project needing a kick-start? Call an Aries, by all means. The leadership displayed by Aries is most impressive, so don't be surprised if they can rally the troops against seemingly insurmountable odds.The symbol of Aries is the Ram, and that's both good and bad news. Impulsive Aries might be tempted to ram their ideas down everyone's throats without even bothering to ask if they want to know. It's these times when you may wish Aries' symbol were a more subdued creature, more lamb than ram perhaps. You're not likely to convince the Ram to soften up; these folks are blunt and to the point. Along with those qualities comes the sheer force of the Aries nature, a force that can actually accomplish a great deal. Much of Aries' drive to compete and to win comes from its Cardinal Quality. Cardinal Signs love to get things going, and Aries exemplifies this even better than Cancer, Libra or Capricorn.",
    date: "19-12-2016",
    category: "Software Engineering",
    tags: ["cybersecurity", "machine learning", "technology"]
  },
  {
    title: 'xd',
    intro: "super intro",
    body: 'Blog post number 2',
    date: "10-12-2016",
    category: "Entrepreneurship",
    tags: ["productivity", "wellbeing"]
  }
];

router.get('/', function(req, res, next) {
  res.render('blog', {chosenPosts: posts}); //TODO dodaj limit na strone
});

router.get('post/:title', function(req, res, next){
  var post = posts.filter((post) => {
    return (post.title.toLowerCase() == req.params.title.toLowerCase());
  })[0];

  if(post){
    res.render('post', {
      posts: posts,
      title: post.title,
      intro: post.intro,
      body: post.body,
      date: post.date,
      category: post.category,
      tags: post.tags
    });
  }
  else{
    var message = "There is no such post as " + req.params.title.toLowerCase()
    res.render('blog', {
      chosenPosts: [],
      errMessage: message
    })
  }
});

router.get('/category/:category', function(req, res, next){ //TODO
  var postsInCategory = posts.filter((post) => {
    return post.category.toLowerCase() == req.params.category.toLowerCase();
  });

  res.render('blog', {
    chosenPosts: postsInCategory,
    errMessage: 'There are no posts in category "' + req.params.category + '" :('
  });
});

router.get('/tag/:tag', function(req, res, next){ //TODO
  var taggedPosts = posts.filter((post) => {
    return post.tags.indexOf(req.params.tag.toLowerCase()) > -1;
  });

  res.render('blog', {
    chosenPosts: taggedPosts,
    errMessage: 'There are no posts with tag "' + req.params.tag + '" :('
  });
});

module.exports = router;
