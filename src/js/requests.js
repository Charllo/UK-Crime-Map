function get_JSON(iter, url, callback_func){
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function (){
    if (xmlhttp.readyState == 4 && this.status == 200){
      if (typeof callback_func === "function"){
        json_obj = JSON.parse(this.responseText);
        callback_func(json_obj, url, iter);
      }
    }
  }
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}

/*

Example:

get_JSON("URL_HERE", function (dataobj) {
  console.log(dataobj[0].category);
});

*/
