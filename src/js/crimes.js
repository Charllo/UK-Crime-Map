var police_api_dates = [
  "&date=2016-05",
  "&date=2016-06",
  "&date=2016-07",
  "&date=2016-08",
  "&date=2016-09",
  "&date=2016-10",
  "&date=2016-11",
  "&date=2016-12",
  "&date=2017-01",
  "&date=2017-02",
  "&date=2017-03",
  "&date=2017-04",
  "&date=2017-05",
  "&date=2017-06",
  "&date=2017-07",
];

var custom_icons = {
  "vehicle-crime": "https://png.icons8.com/car-theft/color/48",
  "other-theft": "https://png.icons8.com/pickpocket/color/48",
  "theft-from-the-person": "https://png.icons8.com/pickpocket/color/48",
  "burglary": "https://png.icons8.com/ski-mask/office/40",
  "criminal-damage-arson": "https://png.icons8.com/fire-station/color/48",
  "drugs": "https://png.icons8.com/syringe/ultraviolet/40",
  "violent-crime": "https://png.icons8.com/fist/color/48",
  "shoplifting": "https://png.icons8.com/shopping-cart/color/48",
  "bicycle-theft": "https://png.icons8.com/bicycle/color/48",
  "possession-of-weapons": "https://png.icons8.com/gun/color/48",
  "robbery": "https://png.icons8.com/robbery/office/40",
  "terrorism": "https://png.icons8.com/jihadis/gun/40"
};

var police_api_base_url = "https://data.police.uk/api/crimes-street/all-crime?lat=";
var completed_requests = 0;
var num_of_crimes = 0;
var crimes = {};
var committed = false;

function JSON_callback(data){
  completed_requests++;
  var data_len = data.length;
  hide_by_id("num_of_crimes_load_img");

  if (data[0] != undefined){
    for (var i = 0; i < data_len; i++){
      cat = data[i]["category"];
      lat = data[i]["location"]["latitude"];
      lng = data[i]["location"]["longitude"];

      if (cat in crimes) {
        crimes[cat]++;
      } else {
        crimes[cat] = 1;
      }

      create_marker(lat, lng, cat);
      num_of_crimes++;
      committed = true;
    }
  }

  document.getElementById("num_of_crimes").innerText = num_of_crimes;

  if (completed_requests == 12){
    console.log("Requests done");
    console.log(crimes);
    hide_by_id("popular_crime_load_img");
    if (committed){
      document.getElementById("popular_crime").innerText = mode(crimes);
    } else{
      document.getElementById("popular_crime").innerText = "None";
    }
  }
}

function create_crime_markers(lat, lng){
  show_by_id("num_of_crimes_load_img");
  show_by_id("popular_crime_load_img");
  completed_requests = 0;
  num_of_crimes = 0;
  crimes = {};
  committed = false;
  document.getElementById("popular_crime").innerText = "";
  document.getElementById("num_of_crimes").innerText = "";
  for (var a = 0; a < 12; a++){
    var request = police_api_base_url + lat + "&lng=" + lng + police_api_dates[a]
    get_JSON(request, JSON_callback);
  }
}
