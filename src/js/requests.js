function get_JSON(url, callback_func){
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function (){
    var check1 = xmlhttp.readyState == 4 && this.status == 200;
    var check2 = check1 && typeof callback_func === "function";
    if(check2){
      json_obj = JSON.parse(this.responseText);
      callback_func(json_obj);
    }
  }
  console.log("Getting stats for", url)
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}

/*
Example:

get_JSON("URL_HERE", function (dataobj) {
  console.log(dataobj[0].category);
});
*/
