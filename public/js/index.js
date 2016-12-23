$(document).ready(function(){

   function checkNavbar(){
     if($(window).scrollTop() > 850)
      $("#navbar-fixed").fadeIn();
     else
      $("#navbar-fixed").fadeOut();
   }

   function checkBackground(){
     if($(window).scrollTop() < 2000){
      if($(window).width() < 768){
        $(".img-bg-small").css("display", "block");
        $(".img-bg-big").css("display", "none");
      }
      else{
        $(".img-bg-big").css("display", "block");
        $(".img-bg-small").css("display", "none");
      }
    }
    else{
      $(".img-bg-big").css("display", "none");
      $(".img-bg-small").css("display", "none");
    }
   }

   checkNavbar();
   checkBackground();

   $(window).scroll(function(){
     checkNavbar();
     checkBackground();
   })

   $(window).resize(function(){
     checkBackground();
   })

  $(".navbar a, footer a[href='#about']").on('click', function(event) {

   // Make sure this.hash has a value before overriding default behavior
  if (this.hash !== "") {

    // Prevent default anchor click behavior
    event.preventDefault();

    // Store hash
    var hash = this.hash;

    // Using jQuery's animate() method to add smooth page scroll
    // The optional number (900) specifies the number of milliseconds it takes to scroll to the specified area
    $('html, body').animate({
      scrollTop: ($(hash).offset().top - 30)
    }, 900);
    } // End if
  });

});
