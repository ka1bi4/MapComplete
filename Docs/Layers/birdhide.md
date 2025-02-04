[//]: # (WARNING: this file is automatically generated. Please find the sources at the bottom and edit those sources)

 birdhide 
==========



<img src='https://mapcomplete.org/./assets/layers/birdhide/birdhide.svg' height="100px"> 

A birdhide






  - This layer is shown at zoomlevel **14** and higher




#### Themes using this layer 





  - [nature](https://mapcomplete.org/nature)
  - [personal](https://mapcomplete.org/personal)


This is a special layer - data is not sourced from OpenStreetMap



 Supported attributes 
----------------------



Warning: 

this quick overview is incomplete



attribute | type | values which are supported by this layer
----------- | ------ | ------------------------------------------
[<img src='https://mapcomplete.org/assets/svg/statistics.svg' height='18px'>](https://taginfo.openstreetmap.org/keys/id#values) [id](https://wiki.openstreetmap.org/wiki/Key:id) | Multiple choice | 
[<img src='https://mapcomplete.org/assets/svg/statistics.svg' height='18px'>](https://taginfo.openstreetmap.org/keys/building#values) [building](https://wiki.openstreetmap.org/wiki/Key:building) | Multiple choice | [](https://wiki.openstreetmap.org/wiki/Tag:building%3D) [yes](https://wiki.openstreetmap.org/wiki/Tag:building%3Dyes) [tower](https://wiki.openstreetmap.org/wiki/Tag:building%3Dtower)
[<img src='https://mapcomplete.org/assets/svg/statistics.svg' height='18px'>](https://taginfo.openstreetmap.org/keys/wheelchair#values) [wheelchair](https://wiki.openstreetmap.org/wiki/Key:wheelchair) | Multiple choice | [designated](https://wiki.openstreetmap.org/wiki/Tag:wheelchair%3Ddesignated) [yes](https://wiki.openstreetmap.org/wiki/Tag:wheelchair%3Dyes) [limited](https://wiki.openstreetmap.org/wiki/Tag:wheelchair%3Dlimited) [no](https://wiki.openstreetmap.org/wiki/Tag:wheelchair%3Dno)
[<img src='https://mapcomplete.org/assets/svg/statistics.svg' height='18px'>](https://taginfo.openstreetmap.org/keys/operator#values) [operator](https://wiki.openstreetmap.org/wiki/Key:operator) | [string](../SpecialInputElements.md#string) | [Natuurpunt](https://wiki.openstreetmap.org/wiki/Tag:operator%3DNatuurpunt) [Agentschap Natuur en Bos](https://wiki.openstreetmap.org/wiki/Tag:operator%3DAgentschap Natuur en Bos)




### just_created 



This element shows a 'thank you' that the contributor has recently created this element

This tagrendering has no question and is thus read-only





  - *You just created this element! Thanks for sharing this info with the world and helping people worldwide.*  corresponds with  `id~.+`


This tagrendering is only visible in the popup if the following condition is met: `_backend~.+&_last_edit:passed_time<300&|_version_number=1`



### images 



This block shows the known images which are linked with the `image`-keys, but also via `mapillary` and `wikidata` and shows the button to upload new images

This tagrendering has no question and is thus read-only





### bird-hide-shelter-or-wall 



The question is  *Is this a bird blind or a bird watching shelter?*





  - *Bird blind*  corresponds with  `shelter=no`
  - *Bird hide*  corresponds with  `amenity=shelter&building=yes&shelter=yes`
  - *Bird tower hide*  corresponds with  `building=tower&bird_hide=tower`
  - *Bird hide shelter*  corresponds with  `amenity=shelter|building=yes|shelter=yes`
  - This option cannot be chosen as answer




### bird-hide-wheelchair 



The question is  *Is this bird hide accessible to wheelchair users?*





  - *There are special provisions for wheelchair users*  corresponds with  `wheelchair=designated`
  - *A wheelchair can easily use this birdhide*  corresponds with  `wheelchair=yes`
  - *This birdhide is reachable by wheelchair, but it is not easy*  corresponds with  `wheelchair=limited`
  - *Not accessible to wheelchair users*  corresponds with  `wheelchair=no`




### birdhide-operator 



The question is  *Who operates this birdhide?*

This rendering asks information about the property  [operator](https://wiki.openstreetmap.org/wiki/Key:operator) 

This is rendered with  `Operated by {operator}`





  - *Operated by Natuurpunt*  corresponds with  `operator=Natuurpunt`
  - *Operated by the Agency for Nature and Forests*  corresponds with  `operator=Agentschap Natuur en Bos`




### leftover-questions 



This tagrendering has no question and is thus read-only





### minimap 



Shows a small map with the feature. Added by default to every popup

This tagrendering has no question and is thus read-only





### move-button 



This tagrendering has no question and is thus read-only





### delete-button 



This tagrendering has no question and is thus read-only





### last_edit 



Gives some metainfo about the last edit and who did edit it - rendering only

This tagrendering has no question and is thus read-only



This tagrendering is only visible in the popup if the following condition is met: `_last_edit:contributor~.+&_last_edit:changeset~.+`



### all-tags 



This tagrendering has no question and is thus read-only





#### Filters 





id | question | osmTags
---- | ---------- | ---------
wheelchair.0 | Wheelchair accessible | wheelchair=yes\|wheelchair=designated\|wheelchair=permissive




id | question | osmTags
---- | ---------- | ---------
shelter.0 | Only covered birdhides | shelter=yes\|building~.+&covered!=no
 

This document is autogenerated from [assets/layers/birdhide/birdhide.json](https://github.com/pietervdvn/MapComplete/blob/develop/assets/layers/birdhide/birdhide.json)
