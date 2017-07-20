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
  "bicycle-theft": "https://png.icons8.com/bicycle/color/48"
};

var police_api_base_url = "https://data.police.uk/api/crimes-street/all-crime?lat=";

function create_crime_markers(lat, lng) {
  var num_of_crimes = 0;
  var crimes = {};
  var committed = false;

  for (var a = 0; a < 12; a++) {
    var request = police_api_base_url + lat + "&lng=" + lng + police_api_dates[a]

    get_JSON(a, request, function(data, url, iter) {
      /*
       * STILL NEED TO FIX:
       * Find a way of waiting for all requests to complete before checking
       * if iter is at the max number
       */

      /*
       * Why does the url and iter need to be passed into and returned from
       * get_JSON for this to work, but num_of_crimes, commited and crimes
       * doesent? Who knows, but they do...
       */

      /*
      This will always print the "&date=2017-04" request
      console.log(request);

      Wheras when put into get_JSON, and returned exactly the same, it prints the correct url:
      console.log(url);
      */

      console.log("Getting stats for", url)
      var data_len = data.length;

      if (data[0] != undefined) {
        committed = true;

        for (var i = 0; i < data_len; i++) {
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
          document.getElementById("num_of_crimes").innerText = num_of_crimes;
        }
      }

      if (iter == 11){
        console.log("Requests done");
        console.log(crimes);
        console.log(Object.keys(crimes).length);
        if (committed){
          document.getElementById("popular_crime").innerText = mode(crimes);
        } else {
          document.getElementById("popular_crime").innerText = "None";
        }
      }

    });
  }
}
