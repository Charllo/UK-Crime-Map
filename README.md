# [UK-Crime-Map | An interactive map of crime in the UK](https://thatguywiththatname.github.io/UK-Crime-Map/)

##### This map displays all street-level crimes commited from May 2016 to  April 2017 in a 1 mile radius around the blue marker.
&nbsp;
The map Uses [UK Police data](https://data.police.uk) to gather the location of crimes in a radius around the blue marker

Crime markers appear in red, and if you hover over them, it will show you the first crime recorded in that specific location

Drag the blue marker to a new location to see different areas of crime

Each red marker is only the approximate location of a crime, and not exact

# ToDo

In `crimes.js`, `mode()` is called for every crime found, which causes quite a lot of lag. Find a way for it to only be called
after all crimes have be found
