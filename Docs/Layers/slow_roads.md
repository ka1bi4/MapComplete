[//]: # (WARNING: this file is automatically generated. Please find the sources at the bottom and edit those sources)

 slow_roads 
============



<img src='https://mapcomplete.org/./assets/layers/slow_roads/slow_road.svg' height="100px"> 

All carfree roads






  - This layer is shown at zoomlevel **16** and higher


This is a special layer - data is not sourced from OpenStreetMap



 Supported attributes 
----------------------



Warning: 

this quick overview is incomplete



attribute | type | values which are supported by this layer
----------- | ------ | ------------------------------------------
[<img src='https://mapcomplete.org/assets/svg/statistics.svg' height='18px'>](https://taginfo.openstreetmap.org/keys/id#values) [id](https://wiki.openstreetmap.org/wiki/Key:id) | Multiple choice | 
[<img src='https://mapcomplete.org/assets/svg/statistics.svg' height='18px'>](https://taginfo.openstreetmap.org/keys/highway#values) [highway](https://wiki.openstreetmap.org/wiki/Key:highway) | Multiple choice | [living_street](https://wiki.openstreetmap.org/wiki/Tag:highway%3Dliving_street) [pedestrian](https://wiki.openstreetmap.org/wiki/Tag:highway%3Dpedestrian) [footway](https://wiki.openstreetmap.org/wiki/Tag:highway%3Dfootway) [path](https://wiki.openstreetmap.org/wiki/Tag:highway%3Dpath) [bridleway](https://wiki.openstreetmap.org/wiki/Tag:highway%3Dbridleway) [track](https://wiki.openstreetmap.org/wiki/Tag:highway%3Dtrack)
[<img src='https://mapcomplete.org/assets/svg/statistics.svg' height='18px'>](https://taginfo.openstreetmap.org/keys/surface#values) [surface](https://wiki.openstreetmap.org/wiki/Key:surface) | [string](../SpecialInputElements.md#string) | [grass](https://wiki.openstreetmap.org/wiki/Tag:surface%3Dgrass) [ground](https://wiki.openstreetmap.org/wiki/Tag:surface%3Dground) [sand](https://wiki.openstreetmap.org/wiki/Tag:surface%3Dsand) [paving_stones](https://wiki.openstreetmap.org/wiki/Tag:surface%3Dpaving_stones) [asphalt](https://wiki.openstreetmap.org/wiki/Tag:surface%3Dasphalt) [concrete](https://wiki.openstreetmap.org/wiki/Tag:surface%3Dconcrete)
[<img src='https://mapcomplete.org/assets/svg/statistics.svg' height='18px'>](https://taginfo.openstreetmap.org/keys/lit#values) [lit](https://wiki.openstreetmap.org/wiki/Key:lit) | Multiple choice | [yes](https://wiki.openstreetmap.org/wiki/Tag:lit%3Dyes) [no](https://wiki.openstreetmap.org/wiki/Tag:lit%3Dno)




### just_created 



This element shows a 'thank you' that the contributor has recently created this element

This tagrendering has no question and is thus read-only





  - *You just created this element! Thanks for sharing this info with the world and helping people worldwide.*  corresponds with  `id~.+`


This tagrendering is only visible in the popup if the following condition is met: `_backend~.+&_last_edit:passed_time<300&|_version_number=1`



### images 



This block shows the known images which are linked with the `image`-keys, but also via `mapillary` and `wikidata` and shows the button to upload new images

This tagrendering has no question and is thus read-only





### explanation 



This tagrendering has no question and is thus read-only





  - *<div> Dit is een woonerf: <ul><li>Voetgangers mogen hier de volledige breedte van de straat gebruiken</li><li>Gemotoriseerd verkeer mag maximaal <b>20km/h</b> rijden</li></ul></div>*  corresponds with  `highway=living_street`
  - *Dit is een brede, autovrije straat*  corresponds with  `highway=pedestrian`
  - *Dit is een voetpaadje*  corresponds with  `highway=footway`
  - *Dit is een wegeltje of bospad*  corresponds with  `highway=path`
  - *Dit is een ruiterswegel*  corresponds with  `highway=bridleway`
  - *Dit is een tractorspoor of weg om landbouwgrond te bereikken*  corresponds with  `highway=track`




### slow_roads-surface 



The question is  *Wat is de wegverharding van dit pad?*

This rendering asks information about the property  [surface](https://wiki.openstreetmap.org/wiki/Key:surface) 

This is rendered with  `The surface is <b>{surface}</b>`





  - *The surface is <b>grass</b>*  corresponds with  `surface=grass`
  - *The surface is <b>ground</b>*  corresponds with  `surface=ground`
  - *The surface is <b>unpaved</b>*  corresponds with  `surface=unpaved`
  - This option cannot be chosen as answer
  - *The surface is <b>sand</b>*  corresponds with  `surface=sand`
  - *The surface is <b>paving stones</b>*  corresponds with  `surface=paving_stones`
  - *The surface is <b>asphalt</b>*  corresponds with  `surface=asphalt`
  - *The surface is <b>concrete</b>*  corresponds with  `surface=concrete`
  - *The surface is <b>paved</b>*  corresponds with  `surface=paved`
  - This option cannot be chosen as answer




### slow_road_is_lit 



The question is  *Is deze weg 's nachts verlicht?*





  - *'s nachts verlicht*  corresponds with  `lit=yes`
  - *Niet verlicht*  corresponds with  `lit=no`




### leftover-questions 



This tagrendering has no question and is thus read-only





### minimap 



Shows a small map with the feature. Added by default to every popup

This tagrendering has no question and is thus read-only





### last_edit 



Gives some metainfo about the last edit and who did edit it - rendering only

This tagrendering has no question and is thus read-only



This tagrendering is only visible in the popup if the following condition is met: `_last_edit:contributor~.+&_last_edit:changeset~.+`



### all-tags 



This tagrendering has no question and is thus read-only

 

This document is autogenerated from [assets/layers/slow_roads/slow_roads.json](https://github.com/pietervdvn/MapComplete/blob/develop/assets/layers/slow_roads/slow_roads.json)
