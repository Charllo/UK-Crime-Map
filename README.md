# [UK-Crime-Map | An interactive map of crime in the UK](https://thatguywiththatname.github.io/UK-Crime-Map/)

This map displays all street-level crimes committed from May 2016 to  April 2017 in a 1 mile radius around the blue marker.

The starting location was randomly chosen

Crime markers appear in red, and if you hover over them, it will show you the first crime recorded in that specific location

Click a new location on the map or drag the blue marker to a new location to see different areas of crime

Each red marker is only the approximate location of a crime, and not exact


## Technical details

The map uses the official [UK Police Data API](https://data.police.uk) to gather the location of crimes in a radius around the blue marker

It uses Google's Google Maps Javascript API to provide the mapping, and Google Maps Geocoding API for fiding the street/location names

It is powered using vanilla JS + JQuery 3.2.1


## Credits

Thanks to [@Cutwell](https://github.com/cutwell) for tidying up the structure and fixing the `mode()` problem

Favicon (the detective icon) by [Icons8](https://icons8.com)
