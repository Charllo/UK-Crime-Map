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

var custom_icons = {
  "vehicle-crime": "https://png.icons8.com/car-theft/color/48",
  "other-theft": "https://png.icons8.com/pickpocket/color/48",
  "theft-from-the-person": "https://png.icons8.com/pickpocket/color/48",
  "burglary": "https://png.icons8.com/ski-mask/office/40",
  "criminal-damage-arson": "https://png.icons8.com/fire-station/color/48",
  "drugs": "https://png.icons8.com/syringe/ultraviolet/40",
  "violent-crime": "https://png.icons8.com/fist/color/48"
}

var police_api_base_url = "https://data.police.uk/api/crimes-street/all-crime?lat=";
var markers = []; // To erase markers later
var marker_positions = []; // So there aren't multiple markers in the same place
var user_lat = 52.358409; // Random default location
var user_lng = -1.549072;

function clear_markers(){
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers = [];
  marker_positions = [];
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
        }
      }
      if (commited){
        document.getElementById("num_of_crimes").innerText = num_of_crimes;
        document.getElementById("popular_crime").innerText = mode(crimes);
      } else {
        document.getElementById("popular_crime").innerText = "None";
        document.getElementById("num_of_crimes").innerText = 0;
      }
    });
  }
}

function create_marker(lat, lng, title, map_obj){
  var current_lat_lng = lat.toString() + lng.toString();

  if (marker_positions.includes(current_lat_lng)) {
    // Do nothing, dont need multiple markers in one place
  }

  else {
    // Default icon
    var custom_icon = "https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi.png";
    if (title in custom_icons) {custom_icon = custom_icons[title];}
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(lat, lng),
        map: map_obj,
        icon: custom_icon,
        title: title
    });
    markers.push(marker);
    marker_positions.push(current_lat_lng);
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

function clicked_move(loc, draggable_marker, map, geocoder) {
  // Called when user left clicks, set new blue marker loc then find crimes
  draggable_marker.setPosition(loc);
  draggable_callback(draggable_marker, map, geocoder);
}

function map_callback() {
  var geocoder = new google.maps.Geocoder;
  var new_location = new google.maps.LatLng(user_lat, user_lng);
  var map_properties = {center: new_location, zoom: 15, mapTypeId: "hybrid", zoomControlOptions: {style: google.maps.ZoomControlStyle.SMALL, position: google.maps.ControlPosition.LEFT_BOTTOM}, streetViewControlOptions:{position: google.maps.ControlPosition.LEFT_BOTTOM}};
  var map = new google.maps.Map(document.getElementById("google_map"), map_properties);
  var draggable_marker = new google.maps.Marker({
      position: new_location,
      map: map,
      draggable: true,
      title: "Drag me",
      icon: "src/img/blue_marker.png"
  });
  google.maps.event.addListener(draggable_marker, "dragend", function() {draggable_callback(draggable_marker, map, geocoder);});
  google.maps.event.addListener(map, "click", function(event) {clicked_move(event.latLng, draggable_marker, map, geocoder);});
  draggable_callback(draggable_marker, map, geocoder); // Trigger first load
}
