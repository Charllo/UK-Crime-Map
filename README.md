# [UK-Crime-Map | An interactive map of crime in the UK](https://thatguywiththatname.github.io/UK-Crime-Map/)

This map displays all street-level crimes committed from May 2016 to  April 2017 in a 1 mile radius around the blue marker.

The starting location was randomly chosen

Crime markers appear in red, and if you hover over them, it will show you the first crime recorded in that specific location

Click a new location on the map or drag the blue marker to a new location to see different areas of crime

Each red marker is only the approximate location of a crime, and not exact


## Technical details

The map uses the official [UK Police Data API](https://data.police.uk) to gather the location of crimes in a radius around the blue marker

It uses Google's Google Maps Javascript API to provide the mapping, and Google Maps Geocoding API for finding the street/location names

It is powered using vanilla JS + BootstrapCSS


## Credits

Thanks to [@Cutwell](https://github.com/cutwell) for tidying up the structure and helping with the `mode()` problem, and helping with several other bugs

All custom icons by [Icons8](https://icons8.com)

## ToDo

 - Add FAQ button/menu
 - Add a statistics window that shows more info about the area
 - Add filters for different crimes in the `Icons` menu

## Changelog

 - Added custom icons
 - Fixed various lag related bugs
 - Changed icon help menu to bootstrap grid
 - Added "My Location" button
 - Removed JQuery dependency
 - Fixed `mode()`
 - Show a loading symbol when retrieving data from police API
 - Replace `current location` with search bar to find a location by name / address
