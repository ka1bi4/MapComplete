[//]: # (WARNING: this file is automatically generated. Please find the sources at the bottom and edit those sources)

 parcel_lockers 
================



<img src='https://mapcomplete.org/square:white;./assets/layers/parcel_lockers/parcel_lockers.svg' height="100px"> 

Layer showing parcel lockers for collecting and sending parcels.






  - This layer is shown at zoomlevel **12** and higher




#### Themes using this layer 





  - [personal](https://mapcomplete.org/personal)
  - [postboxes](https://mapcomplete.org/postboxes)


This is a special layer - data is not sourced from OpenStreetMap



 Supported attributes 
----------------------



Warning: 

this quick overview is incomplete



attribute | type | values which are supported by this layer
----------- | ------ | ------------------------------------------
[<img src='https://mapcomplete.org/assets/svg/statistics.svg' height='18px'>](https://taginfo.openstreetmap.org/keys/id#values) [id](https://wiki.openstreetmap.org/wiki/Key:id) | Multiple choice | 
[<img src='https://mapcomplete.org/assets/svg/statistics.svg' height='18px'>](https://taginfo.openstreetmap.org/keys/brand#values) [brand](https://wiki.openstreetmap.org/wiki/Key:brand) | [string](../SpecialInputElements.md#string) | [Amazon Locker](https://wiki.openstreetmap.org/wiki/Tag:brand%3DAmazon Locker) [DHL Packstation](https://wiki.openstreetmap.org/wiki/Tag:brand%3DDHL Packstation) [Pickup Station](https://wiki.openstreetmap.org/wiki/Tag:brand%3DPickup Station) [PostNL](https://wiki.openstreetmap.org/wiki/Tag:brand%3DPostNL)
[<img src='https://mapcomplete.org/assets/svg/statistics.svg' height='18px'>](https://taginfo.openstreetmap.org/keys/operator#values) [operator](https://wiki.openstreetmap.org/wiki/Key:operator) | [string](../SpecialInputElements.md#string) | 
[<img src='https://mapcomplete.org/assets/svg/statistics.svg' height='18px'>](https://taginfo.openstreetmap.org/keys/opening_hours#values) [opening_hours](https://wiki.openstreetmap.org/wiki/Key:opening_hours) | [opening_hours](../SpecialInputElements.md#opening_hours) | [24/7](https://wiki.openstreetmap.org/wiki/Tag:opening_hours%3D24/7)
[<img src='https://mapcomplete.org/assets/svg/statistics.svg' height='18px'>](https://taginfo.openstreetmap.org/keys/ref#values) [ref](https://wiki.openstreetmap.org/wiki/Key:ref) | [string](../SpecialInputElements.md#string) | 
[<img src='https://mapcomplete.org/assets/svg/statistics.svg' height='18px'>](https://taginfo.openstreetmap.org/keys/parcel_mail_in#values) [parcel_mail_in](https://wiki.openstreetmap.org/wiki/Key:parcel_mail_in) | Multiple choice | [yes](https://wiki.openstreetmap.org/wiki/Tag:parcel_mail_in%3Dyes) [no](https://wiki.openstreetmap.org/wiki/Tag:parcel_mail_in%3Dno)
[<img src='https://mapcomplete.org/assets/svg/statistics.svg' height='18px'>](https://taginfo.openstreetmap.org/keys/parcel_pickup#values) [parcel_pickup](https://wiki.openstreetmap.org/wiki/Key:parcel_pickup) | Multiple choice | [yes](https://wiki.openstreetmap.org/wiki/Tag:parcel_pickup%3Dyes) [no](https://wiki.openstreetmap.org/wiki/Tag:parcel_pickup%3Dno)




### just_created 



This element shows a 'thank you' that the contributor has recently created this element

This tagrendering has no question and is thus read-only





  - *You just created this element! Thanks for sharing this info with the world and helping people worldwide.*  corresponds with  `id~.+`


This tagrendering is only visible in the popup if the following condition is met: `_backend~.+&_last_edit:passed_time<300&|_version_number=1`



### images 



This block shows the known images which are linked with the `image`-keys, but also via `mapillary` and `wikidata` and shows the button to upload new images

This tagrendering has no question and is thus read-only





### brand 



The question is  *What is the brand of the parcel locker?*

This rendering asks information about the property  [brand](https://wiki.openstreetmap.org/wiki/Key:brand) 

This is rendered with  `This is a {brand} parcel locker`





  - *This is an Amazon Locker*  corresponds with  `brand=Amazon Locker`
  - *This is a DHL Packstation*  corresponds with  `brand=DHL Packstation`
  - *This is a DPD Pickup Station*  corresponds with  `brand=Pickup Station`
  - *This is a PostNL Parcel Locker*  corresponds with  `brand=PostNL`




### operator 



The question is  *What is the operator of the parcel locker?*

This rendering asks information about the property  [operator](https://wiki.openstreetmap.org/wiki/Key:operator) 

This is rendered with  `This parcel locker is operated by {operator}`





### opening_hours_24_7 



The question is  *What are the opening hours of {title()}?*

This rendering asks information about the property  [opening_hours](https://wiki.openstreetmap.org/wiki/Key:opening_hours) 

This is rendered with  `<h3>Opening hours</h3>{opening_hours_table(opening_hours)}`





  - *24/7 opened (including holidays)*  corresponds with  `opening_hours=24/7`




### ref 



The question is  *What is the reference number/identifier of this parcel locker?*

This rendering asks information about the property  [ref](https://wiki.openstreetmap.org/wiki/Key:ref) 

This is rendered with  `This parcel locker has the reference {ref}`





### mail-in 



The question is  *Can you send packages from this parcel locker?*





  - *You can send packages from this parcel locker*  corresponds with  `parcel_mail_in=yes`
  - *You <b>can't</b> send packages from this parcel locker*  corresponds with  `parcel_mail_in=no`


This tagrendering is only visible in the popup if the following condition is met: `amenity=parcel_locker`



### pickup 



The question is  *Can you pick up packages from this parcel locker?*





  - *You can pick up packages from this parcel locker*  corresponds with  `parcel_pickup=yes`
  - *You <b>can't</b> pick up packages from this parcel locker*  corresponds with  `parcel_pickup=no`


This tagrendering is only visible in the popup if the following condition is met: `amenity=parcel_locker`



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
open_now.0 | Open now | _isOpen=yes
 

This document is autogenerated from [assets/layers/parcel_lockers/parcel_lockers.json](https://github.com/pietervdvn/MapComplete/blob/develop/assets/layers/parcel_lockers/parcel_lockers.json)
