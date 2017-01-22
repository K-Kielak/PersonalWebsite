$(document).ready(function(){
  $('#comment-error').hide();
  var shortTitle = $("#short-title").val();
  refreshComments();

  $('#comment-form').submit(function() {
    if(!isFormValid()){
      $('#comment-error').show();
      return false;
    }

    var comment = $('#comment-form').formSerialize();
    $.post('/blog/post/' + shortTitle + '/addComment', comment, function(data, status){
      if(status == 'success'){
        console.log(data);
        $('#comment-error').hide();
        $("#comment-form").trigger('reset');
        refreshComments();
      }
    });
    return false;
  });

  function isFormValid(){
    var name = $('#name').val();
    if(!name || name.length < 3){
      $('#comment-error-message').text("Name has to be at least 3 characters long");
      return false;
    }

    if(name.length > 30){
      $('#comment-error-message').text("Name can be maximum 30 characters long");
      return false;
    }

    var email = $("#email").val();
    if(!email || email.length < 6 || email.length > 50){
      $('#comment-error-message').text("Invalid email");
      return false;
    }

    var text = $("#text").val();
    if(!text || text.length < 3){
      $('#comment-error-message').text("Comment has to be at least 3 characters long");
      return false;
    }

    if(text.length > 1000){
      $('#comment-error-message').text("Comment can be maximum 1000 characters long");
      return false;
    }

    return true;
  }

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

    $("#comments-number").html(comments.length + " comment(s)");
  }

  function createCommentHTML(comment){
    var userName = document.createElement("h4");
    userName.className = "pull-left";
    userName.innerHTML = comment.name;
    var commentDate = document.createElement("p");
    commentDate.className = "pull-right";
    var date = new Date(comment.date);
    commentDate.innerHTML = date.getHours() + ":" + date.getMinutes() + " " + date.toDateString();

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
