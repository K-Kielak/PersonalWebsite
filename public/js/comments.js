$(document).ready(function(){
  var shortTitle = $("#short-title").val();
  refreshComments();

  $('#comment-form').submit(function() {
    var comment = $('#comment-form').formSerialize();
    $.post('/blog/post/' + shortTitle + '/addComment', comment, function(data, status){
      if(status == 'success'){
        refreshComments();
      }
    });
    return false;
  });

  function refreshComments(){
    $.get('/blog/post/' + shortTitle + '/getComments', function(data, status){
        if(status == "success"){
          showComments(data);
        }
    });
  }

  function showComments(comments){
    var commentsHolder = $("#comments");
    commentsHolder.empty();
    for(i in comments){
      var commentHTML = createCommentHTML(comments[i]);
      commentsHolder.append(commentHTML);
    }
  }

  function createCommentHTML(comment){
    var userName = document.createElement("h4");
    userName.className = "pull-left";
    userName.innerHTML = comment.name;
    var commentDate = document.createElement("p");
    commentDate.className = "pull-right";
    commentDate.innerHTML = comment.date;

    var userDataDiv = document.createElement("div");
    userDataDiv.className = "clearfix";
    userDataDiv.appendChild(userName);
    userDataDiv.appendChild(commentDate);

    var commentText = document.createElement("em");
    commentText.innerHTML = comment.text;

    var commentParagraph = document.createElement("p");
    commentParagraph.appendChild(commentText);

    var horLine = document.createElement("hr");

    var li = document.createElement("li");
    li.className = "comment";
    li.appendChild(userDataDiv);
    li.appendChild(commentParagraph);
    li.appendChild(horLine);
    return li;
  }
});
