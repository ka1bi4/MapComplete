[//]: # (WARNING: this file is automatically generated. Please find the sources at the bottom and edit those sources)

 note 
======



<img src='https://mapcomplete.org/note' height="100px"> 

This layer shows notes on OpenStreetMap. Having this layer in your theme will trigger the 'add new note' functionality in the 'addNewPoint'-popup (or if your theme has no presets, it'll enable adding notes)






  - This layer is shown at zoomlevel **10** and higher
  - <img src='../warning.svg' height='1rem'/> This layer is loaded from an external source, namely  `https://api.openstreetmap.org/api/0.6/notes.json?limit=10000&closed=7&bbox={x_min},{y_min},{x_max},{y_max}`




#### Themes using this layer 





  - [notes](https://mapcomplete.org/notes)
  - [personal](https://mapcomplete.org/personal)


This is a special layer - data is not sourced from OpenStreetMap



 Supported attributes 
----------------------



Warning: 

this quick overview is incomplete



attribute | type | values which are supported by this layer
----------- | ------ | ------------------------------------------
[<img src='https://mapcomplete.org/assets/svg/statistics.svg' height='18px'>](https://taginfo.openstreetmap.org/keys/id#values) [id](https://wiki.openstreetmap.org/wiki/Key:id) | Multiple choice | 




### just_created 



This element shows a 'thank you' that the contributor has recently created this element

This tagrendering has no question and is thus read-only





  - *You just created this element! Thanks for sharing this info with the world and helping people worldwide.*  corresponds with  `id~.+`


This tagrendering is only visible in the popup if the following condition is met: `_backend~.+&_last_edit:passed_time<300&|_version_number=1`



### conversation 



This tagrendering has no question and is thus read-only





### add_image 



This tagrendering has no question and is thus read-only





### comment 



This tagrendering has no question and is thus read-only





### nearby-images 



This tagrendering has no question and is thus read-only





### report-contributor 



This tagrendering has no question and is thus read-only



This tagrendering is only visible in the popup if the following condition is met: `_opened_by_anonymous_user=false`



### report-note 



This tagrendering has no question and is thus read-only





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





#### Filters 





id | question | osmTags | fields
---- | ---------- | --------- | --------
search.0 | Should mention {search} in the first comment |  | search (string)




id | question | osmTags | fields
---- | ---------- | --------- | --------
not.0 | Should <b>not</b> mention {search} in the first comment |  | search (string)




id | question | osmTags | fields
---- | ---------- | --------- | --------
opened_by.0 | Opened by contributor {search} |  | search (string)




id | question | osmTags | fields
---- | ---------- | --------- | --------
not_opened_by.0 | <b>Not</b> opened by contributor {search} |  | search (string)




id | question | osmTags | fields
---- | ---------- | --------- | --------
edited_by.0 | Last edited by contributor {search} |  | search (string)




id | question | osmTags | fields
---- | ---------- | --------- | --------
not_edited_by.0 | Opened after {search} |  | search (string)




id | question | osmTags | fields
---- | ---------- | --------- | --------
opened_before.0 | Created before {search} |  | search (date)




id | question | osmTags | fields
---- | ---------- | --------- | --------
opened_after.0 | Created after {search} |  | search (date)




id | question | osmTags
---- | ---------- | ---------
anonymous.0 | Only show notes opened by an anonymous contributor | _opened_by_anonymous_user=true




id | question | osmTags
---- | ---------- | ---------
is_open.0 | Only show open notes | 




id | question | osmTags
---- | ---------- | ---------
no_imports.0 | All Notes (default) | 
no_imports.1 | Hide import notes | 
no_imports.2 | Show only import Notes | _is_import_note~.+
 

This document is autogenerated from [assets/layers/note/note.json](https://github.com/pietervdvn/MapComplete/blob/develop/assets/layers/note/note.json)
