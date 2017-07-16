// For the help menu fade in/out
$(document).ready(function(){
  $("#close_help_btn").click(function(){
      $("#help-div").fadeOut()
  });
  $("#show_help_btn").click(function(){
      $("#help-div").fadeIn();
  });

  $("#close_icon_help_btn").click(function(){
      $("#icon-help-div").fadeOut()
  });
  $("#show_icon_help_btn").click(function(){
      $("#icon-help-div").fadeIn();
  });
});
