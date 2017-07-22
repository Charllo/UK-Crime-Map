var markers = []; // To erase markers later
var marker_positions = []; // So there aren't multiple markers in the same place
var user_lat = 52.358409; // Random default location
var user_lng = -1.549072;

function map_callback(){
  // Without var = set to global scope
  geocoder = new google.maps.Geocoder();
  var new_location = new google.maps.LatLng(user_lat, user_lng);
  var map_properties = {center: new_location, zoom: 15, mapTypeId: "hybrid", zoomControlOptions: {style: google.maps.ZoomControlStyle.SMALL, position: google.maps.ControlPosition.LEFT_BOTTOM}, streetViewControlOptions:{position: google.maps.ControlPosition.LEFT_BOTTOM}};
  map = new google.maps.Map(document.getElementById("google_map"), map_properties);
  draggable_marker = new google.maps.Marker({
      position: new_location,
      map: map,
      draggable: true,
      title: "Drag me",
      icon: "src/img/blue_marker.png"
  });
  google.maps.event.addListener(draggable_marker, "dragend", function(){draggable_callback();});
  google.maps.event.addListener(map, "click", function(event){draggable_callback(event.latLng);});
  draggable_callback(); // Trigger first load
}

function search(){
  var address = document.getElementById("search_box").value;
  if (address != ""){
    geocoder.geocode( {
        "address": address,
        componentRestrictions: {country: "UK"}
      },
      function(results, status){
        if (status == "OK") {
          var loc = results[0].geometry.location
          draggable_callback(loc);
          map.panTo(loc);
        } else {
          alert("Cannot perform search, reason: " + status);
        }
    });
  }
}

function clear_markers(){
  for (var i = 0; i < markers.length; i++){
    markers[i].setMap(null);
  }
  markers = [];
  marker_positions = [];
}

function create_marker(lat, lng, title){
  var current_lat_lng = lat.toString() + lng.toString();

  if (marker_positions.includes(current_lat_lng)){
    // Do nothing, dont need multiple markers in one place
  }

  else {
    // Default icon
    var custom_icon = "https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi.png";
    if (title in custom_icons) {custom_icon = custom_icons[title];}
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(lat, lng),
        map: map,
        icon: custom_icon,
        title: title
    });
    markers.push(marker);
    marker_positions.push(current_lat_lng);
  }
}

function draggable_callback(loc){
  if (loc != undefined) {draggable_marker.setPosition(loc);}

  new_lat = draggable_marker.getPosition().lat();
  new_lng = draggable_marker.getPosition().lng();

  console.log(new_lat, new_lng);
  clear_markers();
  create_crime_markers(new_lat, new_lng);
}

function get_my_loc(){
  if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(success_callback, error_callback);
  }
}

function success_callback(position){
  var new_location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
  draggable_callback(new_location);
  map.panTo(new_location);
}

function error_callback(error){
  switch(error.code){
    case error.PERMISSION_DENIED:
      alert("Denied request for Geolocation");
      break;
    case error.POSITION_UNAVAILABLE:
      alert("Your location information is unavailable");
      break;
    case error.TIMEOUT:
      alert("The request to get your location timed out");
      break;
    case error.UNKNOWN_ERROR:
      alert("An unknown error in finding your location occurred");
      break;
  }
}
