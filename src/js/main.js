// For the help menu fade in/out
$(document).ready(function(){
  $("#close_help_btn").click(function(){
      $("#help-div").fadeOut()
  });
  $("#show_help_btn").click(function(){
      $("#help-div").fadeIn();
  });
});
