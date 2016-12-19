$(document).ready(function(){
  var articles;
  $.get("/api/get/articles", function(data){
    articles = data.articles;
  });
});
