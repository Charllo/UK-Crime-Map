// Help button jquery
$(document).ready(function(){
  $("#close_help_btn").click(function(){
      $("#help-div").fadeOut()
  });
  $("#show_help_btn").click(function(){
      $("#help-div").fadeIn();
  });
});


// Maps JS API stuff
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
]

var police_api_base_url = "https://data.police.uk/api/crimes-street/all-crime?lat=";
var markers = []; // To erase markers later
var marker_positions = []; // So there aren't multiple markers in the same place

function clear_markers(){
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers = [];
}

function mode(c) {
  // Large complexity, but, meh
  var previous = 0;
  var popular = "";
  for (var i in c) {
    if (c[i] > previous) {
      popular = i;
    }
  }
  return popular;
}

function create_crime_markers(lat, lng, map_obj) {
  var num_of_crimes = 0;
  var crimes = {};
  var commited = false;

  for (var a = 0; a < 12; a++) {
    var request = police_api_base_url + lat + "&lng=" + lng + police_api_dates[a]
    console.log("Getting stats for", request)

    $.getJSON(request, function(data) {
      var data_len = data.length;

      if (data[0] != undefined) {
        commited = true;

        for (var i = 0; i < data_len; i++) {
          cat = data[i]["category"]
          lat = data[i]["location"]["latitude"];
          lng = data[i]["location"]["longitude"];

          if (cat in crimes) {
            crimes[cat]++;
          } else {
            crimes[cat] = 1;
          }

          create_marker(lat, lng, cat, map_obj);
          num_of_crimes++;

          document.getElementById("popular_crime").innerText = mode(crimes);
          document.getElementById("num_of_crimes").innerText = num_of_crimes;
        }
      }
    });
    if (!commited) {
      document.getElementById("popular_crime").innerText = "None";
      document.getElementById("num_of_crimes").innerText = 0;
    }
  }
}

function create_marker(lat, lng, title, map_obj){
  if ([lat, lng] in marker_positions) {
    // Do nothing, dont need multiple markers in one place
  } else {
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(lat, lng),
        map: map_obj,
        title: title
    });
    markers.push(marker);
    marker_positions.push([lat, lng]);
  }
}

function draggable_callback(draggable_marker, map_obj, geocoder) {
  new_lat = draggable_marker.getPosition().lat()
  new_lng = draggable_marker.getPosition().lng()

  document.getElementById("lat").innerText = new_lat;
  document.getElementById("lng").innerText = new_lng;

  console.log(new_lat, new_lng);
  clear_markers();
  create_crime_markers(new_lat, new_lng, map_obj);

  geocoder.geocode({"location": {lat: new_lat, lng: new_lng}}, function(results, status) {
   if (status === "OK") {
     if (results[1]) {
       document.getElementById("loc_name").innerText = results[1].formatted_address;
     } else {
       document.getElementById("loc_name").innerText = "No results found";
     }
   } else {
     document.getElementById("loc_name").innerText = "Geocoder failed: "+status;
   }
 });
}

function map_callback() {
  var geocoder = new google.maps.Geocoder;
  var shaftesbury = new google.maps.LatLng(51.0046, -2.198083);
  var map_properties = {center: shaftesbury, zoom: 15, mapTypeId: "satellite" };
  var map = new google.maps.Map(document.getElementById("google_map"), map_properties);
  var draggable_marker = new google.maps.Marker({
      position: shaftesbury,
      map: map,
      draggable: true,
      title: "Drag me",
      icon: "blue_marker.png"
  });
  google.maps.event.addListener(draggable_marker, "dragend", function(){draggable_callback(draggable_marker, map, geocoder);});
  draggable_callback(draggable_marker, map, geocoder); // Trigger first load
}
