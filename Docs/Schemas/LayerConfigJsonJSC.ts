export default {
  "description": "Configuration for a single layer",
  "type": "object",
  "properties": {
    "id": {
      "description": "The id of this layer.\nThis should be a simple, lowercase, human readable string that is used to identify the layer.\n\ngroup: Basic\nquestion: What is the identifier of this layer?",
      "type": "string"
    },
    "name": {
      "description": "Used in the layer control panel to toggle a layer on and of.\n\nifunset: This will hide the layer in the layer control, making it not filterable and not toggleable\n\ngroup: Basic\nquestion: What is the name of this layer?",
      "anyOf": [
        {
          "$ref": "#/definitions/Record<string,string>"
        },
        {
          "type": "string"
        }
      ]
    },
    "description": {
      "description": "A description for the features shown in this layer.\nThis often resembles the introduction of the wiki.osm.org-page for this feature.\n\ngroup: Basic\nquestion: How would you describe the features that are shown on this layer?",
      "anyOf": [
        {
          "$ref": "#/definitions/Record<string,string>"
        },
        {
          "type": "string"
        }
      ]
    },
    "source": {
      "description": "Question: Where should the data be fetched from?\n\nThis determines where the data for the layer is fetched: from OSM or from an external geojson dataset.\n\nIf no 'geojson' is defined, data will be fetched from overpass and the OSM-API.\n\nEvery source _must_ define which tags _must_ be present in order to be picked up.\n\nNote: a source must always be defined. 'special' is only allowed if this is a builtin-layer\n\ntypes: Load data with specific tags from OpenStreetMap ; Load data from an external geojson source ;\ntypesdefault: 0\ngroup: Basic",
      "anyOf": [
        {
          "type": "object",
          "properties": {
            "osmTags": {
              "$ref": "#/definitions/TagConfigJson",
              "description": "question: Which tags must be present on the feature to show it in this layer?\n\n    Every source must set which tags have to be present in order to load the given layer."
            },
            "maxCacheAge": {
              "description": "question: How long (in seconds) is the data allowed to remain cached until it must be refreshed?\nThe maximum amount of seconds that a tile is allowed to linger in the cache\n\ntype: nat\ndefault: 30 days",
              "type": "number"
            }
          },
          "required": [
            "osmTags"
          ]
        },
        {
          "type": "object",
          "properties": {
            "geoJson": {
              "description": "The actual source of the data to load, if loaded via geojson.\n\n# A single geojson-file\nsource: {geoJson: \"https://my.source.net/some-geo-data.geojson\"}\n fetches a geojson from a third party source\n\n# A tiled geojson source\nsource: {geoJson: \"https://my.source.net/some-tile-geojson-{layer}-{z}-{x}-{y}.geojson\", geoJsonZoomLevel: 14}\n to use a tiled geojson source. The web server must offer multiple geojsons. {z}, {x} and {y} are substituted by the location; {layer} is substituted with the id of the loaded layer\n\nSome API's use a BBOX instead of a tile, this can be used by specifying {y_min}, {y_max}, {x_min} and {x_max}\n\nquestion: What is the URL of the geojson?\ntype: url",
              "type": "string"
            },
            "geoJsonZoomLevel": {
              "description": "To load a tiled geojson layer, set the zoomlevel of the tiles\n\nquestion: If using a tiled geojson, what is the zoomlevel of the tiles?\nifunset: This is not a tiled geojson",
              "type": "number"
            },
            "isOsmCache": {
              "description": "Indicates that the upstream geojson data is OSM-derived.\nUseful for e.g. merging or for scripts generating this cache.\nThis also indicates that making changes on this data is possible\n\nquestion: Is this geojson a cache of OpenStreetMap data?\nifunset: This is not an OpenStreetMap cache\niftrue: this is based on OpenStreetMap and can thus be edited",
              "type": "boolean"
            },
            "mercatorCrs": {
              "description": "Some API's use a mercator-projection (EPSG:900913) instead of WGS84. Set the flag `mercatorCrs: true`  in the source for this\n\nquestion: Does this geojson use  EPSG:900913 instead of WGS84 as projection?\niftrue: This geojson uses EPSG:900913 instead of WGS84\nifunset: This geojson uses WGS84 just like most geojson (default)",
              "type": "boolean"
            },
            "idKey": {
              "description": "Some API's have an id-field, but give it a different name.\nSetting this key will rename this field into 'id'\n\nifunset: An id with key `id` will be assigned automatically if no attribute `id` is set\ninline: This geojson uses <b>{value}</b> as attribute to set the id\nquestion: What is the name of the attribute containing the ID of the object?",
              "type": "string"
            }
          },
          "required": [
            "geoJson"
          ]
        },
        {
          "enum": [
            "special",
            "special:library"
          ],
          "type": "string"
        }
      ]
    },
    "calculatedTags": {
      "description": "A list of extra tags to calculate, specified as \"keyToAssignTo=javascript-expression\".\nThere are a few extra functions available. Refer to <a>Docs/CalculatedTags.md</a> for more information\nThe functions will be run in order, e.g.\n[\n \"_max_overlap_m2=Math.max(...feat.overlapsWith(\"someOtherLayer\").map(o => o.overlap))\n \"_max_overlap_ratio=Number(feat._max_overlap_m2)/feat.area\n]\n\nThe specified tags are evaluated lazily. E.g. if a calculated tag is only used in the popup (e.g. the number of nearby features),\nthe expensive calculation will only be performed then for that feature. This avoids clogging up the contributors PC when all features are loaded.\n\nIf a tag has to be evaluated strictly, use ':=' instead:\n\n[\n\"_some_key:=some_javascript_expression\"\n]\n\nSee the full documentation on [https://github.com/pietervdvn/MapComplete/blob/master/Docs/CalculatedTags.md]\n\ngroup: expert\nquestion: What extra attributes should be calculated with javascript?",
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "isShown": {
      "description": "If set, only features matching this extra tag will be shown.\nThis is useful to hide certain features from view based on a calculated tag or if the features are provided by a different layer.\n\nquestion: What other tags should features match for being shown?\ngroup: advanced\nifunset: all features which match the 'source'-specification are shown.",
      "anyOf": [
        {
          "$ref": "#/definitions/{and:TagConfigJson[];}"
        },
        {
          "$ref": "#/definitions/{or:TagConfigJson[];}"
        },
        {
          "type": "string"
        }
      ]
    },
    "minzoom": {
      "description": "The minimum needed zoomlevel required to start loading and displaying the data.\nThis can be used to only show common features (e.g. a bicycle parking) only when the map is zoomed in very much (17).\nThis prevents cluttering the map with thousands of parkings if one is looking to an entire city.\n\nDefault: 0\ngroup: Basic\ntype: nat\nquestion: At what zoom level should features of the layer be shown?\nifunset: Always load this layer, even if the entire world is in view.",
      "type": "number"
    },
    "shownByDefault": {
      "description": "Indicates if this layer is shown by default;\ncan be used to hide a layer from start, or to load the layer but only to show it when appropriate (e.g. for advanced users)\n\nquestion: Should this layer be enabled when opening the map for the first time?\niftrue: the layer is enabled when opening the map\niffalse: the layer is hidden until the contributor enables it. (If the filter-popup is disabled, this might never get enabled nor loaded)\ndefault: true\ngroup: advanced",
      "type": "boolean"
    },
    "minzoomVisible": {
      "description": "The zoom level at which point the data is hidden again\nDefault: 100 (thus: always visible\n\ngroup: expert",
      "type": "number"
    },
    "title": {
      "description": "The title shown in a popup for elements of this layer.\n\ngroup: title\nquestion: What title should be shown on the infobox?\ntypes: use a fixed translation ; Use a dynamic tagRendering ; use a fixed string for all languages\ntypesdefault: 1",
      "anyOf": [
        {
          "$ref": "#/definitions/Record<string,string>"
        },
        {
          "$ref": "#/definitions/TagRenderingConfigJson"
        },
        {
          "type": "string"
        }
      ]
    },
    "popupInFloatover": {
      "description": "Question: Should the information for this layer be shown in the sidebar or in a splash screen?\n\nIf set, open the selectedElementView in a floatOver instead of on the right.\n\niftrue: show the infobox in the splashscreen floating over the entire UI\niffalse: show the infobox in a sidebar on the right\ngroup: advanced\ndefault: sidebar",
      "type": "boolean"
    },
    "titleIcons": {
      "description": "Small icons shown next to the title.\nIf not specified, the OsmLink and wikipedia links will be used by default.\nUse an empty array to hide them.\nNote that \"defaults\" will insert all the default titleIcons (which are added automatically)\n\nType: icon[]\ngroup: infobox",
      "anyOf": [
        {
          "type": "array",
          "items": {
            "anyOf": [
              {
                "$ref": "#/definitions/TagRenderingConfigJson"
              },
              {
                "type": "string"
              }
            ]
          }
        },
        {
          "type": "array",
          "items": [
            {
              "type": "string",
              "enum": [
                "defaults"
              ]
            }
          ],
          "minItems": 1,
          "maxItems": 1
        }
      ]
    },
    "mapRendering": {
      "description": "Visualisation of the items on the map\n\ngroup: maprendering",
      "anyOf": [
        {
          "type": "array",
          "items": {
            "anyOf": [
              {
                "$ref": "#/definitions/default_4"
              },
              {
                "$ref": "#/definitions/default_5"
              },
              {
                "$ref": "#/definitions/default<default|default|default[]|default[]>"
              }
            ]
          }
        },
        {
          "type": "null"
        }
      ]
    },
    "passAllFeatures": {
      "description": "If set, this layer will pass all the features it receives onto the next layer.\nThis is ideal for decoration, e.g. directions on cameras\niftrue: Make the features from this layer also available to the other layer; might result in this object being rendered by multiple layers\niffalse: normal behaviour: don't pass features allong\nquestion: should this layer pass features to the next layers?\ngroup: expert",
      "type": "boolean"
    },
    "doNotDownload": {
      "description": "If set, this layer will not query overpass; but it'll still match the tags above which are by chance returned by other layers.\nWorks well together with 'passAllFeatures', to add decoration\nThe opposite of `forceLoad`\n\niftrue: Do not attempt to query the data for this layer from overpass/the OSM API\niffalse: download the data as usual\ngroup: expert\nquestion: Should this layer be downloaded or is the data provided by a different layer (which has 'passAllFeatures'-set)?\ndefault: false",
      "type": "boolean"
    },
    "forceLoad": {
      "description": "Advanced option - might be set by the theme compiler\n\nIf true, this data will _always_ be loaded, even if the theme is disabled by a filter or hidden.\nThe opposite of `doNotDownload`\n\nquestion: Should this layer be forcibly loaded?\nifftrue: always download this layer, even if it is disabled\niffalse: only download data for this layer when needed (default)\ndefault: false\ngroup: expert",
      "type": "boolean"
    },
    "presets": {
      "description": "Presets for this layer.\nA preset shows up when clicking the map on a without data (or when right-clicking/long-pressing);\nit will prompt the user to add a new point.\n\nThe most important aspect are the tags, which define which tags the new point will have;\nThe title is shown in the dialog, along with the first sentence of the description.\n\nUpon confirmation, the full description is shown beneath the buttons - perfect to add pictures and examples.\n\nNote: the icon of the preset is determined automatically based on the tags and the icon above. Don't worry about that!\nNB: if no presets are defined, the popup to add new points doesn't show up at all\n\ngroup: presets",
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "title": {
            "description": "The title - shown on the 'add-new'-button.\n\nThis should include the article of the noun, e.g. 'a hydrant', 'a bicycle pump'.\nThis text will be inserted into `Add {category} here`, becoming `Add a hydrant here`.\n\nDo _not_ indicate 'new': 'add a new shop here' is incorrect, as the shop might have existed forever, it could just be unmapped!\n\nquestion: What is the word to describe this object?\ninline: Add <b>{value}</b> here",
            "anyOf": [
              {
                "$ref": "#/definitions/Record<string,string>"
              },
              {
                "type": "string"
              }
            ]
          },
          "tags": {
            "description": "A single tag (encoded as <code>key=value</code>) out of all the tags to add onto the newly created point.\nNote that the icon in the UI will be chosen automatically based on the tags provided here.\n\nquestion: What tag should be added to the new object?\ntype: simple_tag",
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "description": {
            "description": "An extra explanation of what the feature is, if it is not immediately clear from the title alone.\n\nThe _first sentence_ of the description is shown on the button of the `add` menu.\nThe full description is shown in the confirmation dialog.\n\n(The first sentence is until the first '.'-character in the description)\n\nquestion: How would you describe this feature?",
            "anyOf": [
              {
                "$ref": "#/definitions/Record<string,string>"
              },
              {
                "type": "string"
              }
            ]
          },
          "exampleImages": {
            "description": "The URL of an example image which shows a real-life example of what such a feature might look like.\n\nType: image\nquestion: What is the URL of an image showing such a feature?",
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "snapToLayer": {
            "description": "question: Should the created point be snapped to a line layer?\n\nIf specified, these layers will be shown in the precise location picker  and the new point will be snapped towards it.\nFor example, this can be used to snap against `walls_and_buildings` (e.g. to attach a defibrillator, an entrance, an artwork, ... to the wall)\nor to snap an obstacle (such as a bollard) to the `cycleways_and_roads`.\n\nsuggestions: return Array.from(layers.keys()).map(key => ({if: \"value=\"+key, then: key+\" - \"+layers.get(key).description}))",
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "maxSnapDistance": {
            "description": "question: What is the maximum distance in the location-input that a point can be moved to be snapped to a way?\n\ninline: a point is snapped if the location input is at most <b>{value}m</b> away from an object\n\nIf specified, a new point will only be snapped if it is within this range.\nIf further away, it'll be placed in the center of the location input\nDistance in meter\n\nDefault: 10",
            "type": "number"
          }
        },
        "required": [
          "tags",
          "title"
        ]
      }
    },
    "tagRenderings": {
      "description": "question: Which tagRenderings should be shown in the infobox?\n\nA tag rendering is a block that either shows the known value or asks a question.\n\nRefer to the class `TagRenderingConfigJson` to see the possibilities.\n\nNote that we can also use a string here - where the string refers to a tag rendering defined in `assets/questions/questions.json`,\nwhere a few very general questions are defined e.g. website, phone number, ...\nFurthermore, _all_ the questions of another layer can be reused with `otherlayer.*`\nIf you need only a single of the tagRenderings, use `otherlayer.tagrenderingId`\nIf one or more questions have a 'group' or 'label' set, select all the entries with the corresponding group or label with `otherlayer.*group`\nRemark: if a tagRendering is 'lent' from another layer, the 'source'-tags are copied and added as condition.\nIf they are not wanted, remove them with an override\n\nA special value is 'questions', which indicates the location of the questions box. If not specified, it'll be appended to the bottom of the featureInfobox.\n\nAt last, one can define a group of renderings where parts of all strings will be replaced by multiple other strings.\nThis is mainly create questions for a 'left' and a 'right' side of the road.\nThese will be grouped and questions will be asked together\n\ngroup: tagrenderings",
      "type": "array",
      "items": {
        "anyOf": [
          {
            "$ref": "#/definitions/QuestionableTagRenderingConfigJson"
          },
          {
            "type": "object",
            "properties": {
              "id": {
                "type": "string"
              },
              "builtin": {
                "anyOf": [
                  {
                    "type": "array",
                    "items": {
                      "type": "string"
                    }
                  },
                  {
                    "type": "string"
                  }
                ]
              },
              "override": {
                "$ref": "#/definitions/Partial<QuestionableTagRenderingConfigJson>"
              }
            },
            "required": [
              "builtin",
              "override"
            ]
          },
          {
            "allOf": [
              {
                "$ref": "#/definitions/default<(string|QuestionableTagRenderingConfigJson|{builtin:string;override:Partial<QuestionableTagRenderingConfigJson>;})[]>"
              },
              {
                "type": "object",
                "properties": {
                  "id": {
                    "type": "string"
                  }
                },
                "required": [
                  "id"
                ]
              }
            ]
          },
          {
            "type": "string"
          }
        ]
      }
    },
    "filter": {
      "description": "All the extra questions for filtering.\nIf a string is given, mapComplete will search in 'filters.json' for the appropriate filter or will try to parse it as `layername.filterid` and us that one\n\ngroup: filters",
      "anyOf": [
        {
          "type": "array",
          "items": {
            "anyOf": [
              {
                "$ref": "#/definitions/default_1"
              },
              {
                "type": "string"
              }
            ]
          }
        },
        {
          "type": "object",
          "properties": {
            "sameAs": {
              "type": "string"
            }
          },
          "required": [
            "sameAs"
          ]
        }
      ]
    },
    "deletion": {
      "description": "This block defines under what circumstances the delete dialog is shown for objects of this layer.\nIf set, a dialog is shown to the user to (soft) delete the point.\nThe dialog is built to be user friendly and to prevent mistakes.\nIf deletion is not possible, the dialog will hide itself and show the reason of non-deletability instead.\n\nTo configure, the following values are possible:\n\n- false: never ever show the delete button\n- true: show the default delete button\n- undefined: use the mapcomplete default to show deletion or not. Currently, this is the same as 'false' but this will change in the future\n- or: a hash with options (see below)\n\n### The delete dialog\n\n\n\n#### Hard deletion if enough experience\n\nA feature can only be deleted from OpenStreetMap by mapcomplete if:\n\n- It is a node\n- No ways or relations use the node\n- The logged-in user has enough experience OR the user is the only one to have edited the point previously\n- The logged-in user has no unread messages (or has a ton of experience)\n- The user did not select one of the 'non-delete-options' (see below)\n\nIn all other cases, a 'soft deletion' is used.\n\n#### Soft deletion\n\nA 'soft deletion' is when the point isn't deleted fromOSM but retagged so that it'll won't how up in the mapcomplete theme anymore.\nThis makes it look like it was deleted, without doing damage. A fixme will be added to the point.\n\nNote that a soft deletion is _only_ possible if these tags are provided by the theme creator, as they'll be different for every theme\n\n##### No-delete options\n\nIn some cases, the contributor might want to delete something for the wrong reason (e.g. someone who wants to have a path removed \"because the path is on their private property\").\nHowever, the path exists in reality and should thus be on OSM - otherwise the next contributor will pass by and notice \"hey, there is a path missing here! Let me redraw it in OSM!)\n\nThe correct approach is to retag the feature in such a way that it is semantically correct *and* that it doesn't show up on the theme anymore.\nA no-delete option is offered as 'reason to delete it', but secretly retags.\n\ngroup: editing\ntypes: use an advanced delete configuration ; boolean\niftrue: Allow deletion\niffalse: Do not allow deletion",
      "anyOf": [
        {
          "$ref": "#/definitions/DeleteConfigJson"
        },
        {
          "type": "boolean"
        }
      ]
    },
    "allowMove": {
      "description": "Indicates if a point can be moved and why.\n\nA feature can be moved by MapComplete if:\n\n- It is a point\n- The point is _not_ part of a way or a a relation.\n\ntypes: use an advanced move configuration ; boolean\ngroup: editing\nquestion: Is deleting a point allowed?\niftrue: Allow contributors to move a point (for accuracy or a relocation)\niffalse: Don't allow contributors to move points\nifunset: Don't allow contributors to move points (default)",
      "anyOf": [
        {
          "$ref": "#/definitions/default_3"
        },
        {
          "type": "boolean"
        }
      ]
    },
    "allowSplit": {
      "description": "If set, a 'split this way' button is shown on objects rendered as LineStrings, e.g. highways.\n\nIf the way is part of a relation, MapComplete will attempt to update this relation as well\nquestion: Should the contributor be able to split ways using this layer?\niftrue: enable the 'split-roads'-component\niffalse: don't enable the split-roads componenet\nifunset: don't enable the split-roads component\ngroup: editing",
      "type": "boolean"
    },
    "units": {
      "type": "array",
      "items": {
        "$ref": "#/definitions/default_2"
      }
    },
    "syncSelection": {
      "description": "If set, synchronizes whether or not this layer is enabled.\n\ngroup: advanced\nquestion: Should enabling/disabling the layer be saved (locally or in the cloud)?\nsuggestions: return [{if: \"value=no\", then: \"Don't save, always revert to the default\"}, {if: \"value=local\", then: \"Save selection in local storage\"}, {if: \"value=theme-only\", then: \"Save the state in the OSM-usersettings, but apply on this theme only (default)\"}, {if: \"value=global\", then: \"Save in OSM-usersettings and toggle on _all_ themes using this layer\"}]",
      "enum": [
        "global",
        "local",
        "no",
        "theme-only"
      ],
      "type": "string"
    },
    "#": {
      "description": "Used for comments and/or to disable some checks\n\nno-question-hint-check: disables a check in MiscTagRenderingChecks which complains about 'div', 'span' or 'class=subtle'-HTML elements in the tagRendering\n\ngroup: hidden",
      "type": "string"
    },
    "fullNodeDatabase": {
      "description": "_Set automatically by MapComplete, please ignore_\n\ngroup: hidden",
      "type": "boolean"
    }
  },
  "required": [
    "id",
    "mapRendering",
    "source"
  ],
  "definitions": {
    "TagConfigJson": {
      "description": "The main representation of Tags.\nSee https://github.com/pietervdvn/MapComplete/blob/develop/Docs/Tags_format.md for more documentation\n\ntype: tag",
      "anyOf": [
        {
          "$ref": "#/definitions/{and:TagConfigJson[];}"
        },
        {
          "type": "object",
          "properties": {
            "or": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/TagConfigJson"
              }
            }
          },
          "required": [
            "or"
          ]
        },
        {
          "type": "string"
        }
      ]
    },
    "{and:TagConfigJson[];}": {
      "type": "object",
      "properties": {
        "and": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/TagConfigJson"
          }
        }
      },
      "required": [
        "and"
      ]
    },
    "{or:TagConfigJson[];}": {
      "type": "object",
      "properties": {
        "or": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/TagConfigJson"
          }
        }
      },
      "required": [
        "or"
      ]
    },
    "Record<string,string>": {
      "type": "object"
    },
    "Record<string,string|Record<string,string>>": {
      "type": "object"
    },
    "DenominationConfigJson": {
      "type": "object",
      "properties": {
        "useIfNoUnitGiven": {
          "description": "If this evaluates to true and the value to interpret has _no_ unit given, assumes that this unit is meant.\nAlternatively, a list of country codes can be given where this acts as the default interpretation\n\nE.g., a denomination using \"meter\" would probably set this flag to \"true\";\na denomination for \"mp/h\" will use the condition \"_country=gb\" to indicate that it is the default in the UK.\n\nIf none of the units indicate that they are the default, the first denomination will be used instead",
          "anyOf": [
            {
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            {
              "type": "boolean"
            }
          ]
        },
        "canonicalDenomination": {
          "description": "The canonical value for this denomination which will be added to the value in OSM.\ne.g. \"m\" for meters\nIf the user inputs '42', the canonical value will be added and it'll become '42m'.\n\nImportant: often, _no_ canonical values are expected, e.g. in the case of 'maxspeed' where 'km/h' is the default.\nIn this case, an empty string should be used",
          "type": "string"
        },
        "canonicalDenominationSingular": {
          "description": "The canonical denomination in the case that the unit is precisely '1'.\nUsed for display purposes only.\n\nE.g.: for duration of something in minutes: `2 minutes` but `1 minute`; the `minute` goes here",
          "type": "string"
        },
        "alternativeDenomination": {
          "description": "A list of alternative values which can occur in the OSM database - used for parsing.\nE.g.: while 'm' is canonical, `meter`, `mtrs`, ... can occur as well",
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "human": {
          "description": "The value for humans in the dropdown. This should not use abbreviations and should be translated, e.g.\n{\n    \"en\": \"meter\",\n    \"fr\": \"metre\"\n}",
          "anyOf": [
            {
              "$ref": "#/definitions/Record<string,string>"
            },
            {
              "type": "string"
            }
          ]
        },
        "humanSingular": {
          "description": "The value for humans in the dropdown. This should not use abbreviations and should be translated, e.g.\n{\n    \"en\": \"minute\",\n    \"nl\": \"minuut\"\n}",
          "anyOf": [
            {
              "$ref": "#/definitions/Record<string,string>"
            },
            {
              "type": "string"
            }
          ]
        },
        "prefix": {
          "description": "If set, then the canonical value will be prefixed instead, e.g. for '€'\nNote that if all values use 'prefix', the dropdown might move to before the text field",
          "type": "boolean"
        }
      },
      "required": [
        "canonicalDenomination"
      ]
    },
    "TagRenderingConfigJson": {
      "description": "A TagRenderingConfigJson is a single piece of code which converts one ore more tags into a HTML-snippet.\nFor an _editable_ tagRendering, use 'QuestionableTagRenderingConfigJson' instead, which extends this one",
      "type": "object",
      "properties": {
        "render": {
          "description": "question: What text should be rendered?\n\nThis piece of text will be shown in the infobox.\nNote that \"{key}\"-parts are substituted by the corresponding values of the element.\n\nThis text will be shown if:\n- there is no mapping which matches (or there are no matches)\n- no question, no mappings and no 'freeform' is set\n\nNote that this is a HTML-interpreted value, so you can add links as e.g. '&lt;a href='{website}'>{website}&lt;/a>' or include images such as `This is of type A &lt;br>&lt;img src='typeA-icon.svg' />`\ntype: rendered",
          "anyOf": [
            {
              "$ref": "#/definitions/Record<string,string>"
            },
            {
              "type": "object",
              "properties": {
                "special": {
                  "allOf": [
                    {
                      "$ref": "#/definitions/Record<string,string|Record<string,string>>"
                    },
                    {
                      "type": "object",
                      "properties": {
                        "type": {
                          "type": "string"
                        }
                      },
                      "required": [
                        "type"
                      ]
                    }
                  ]
                }
              },
              "required": [
                "special"
              ]
            },
            {
              "type": "string"
            }
          ]
        },
        "condition": {
          "description": "question: When should this item be shown?\n\nOnly show this tagrendering (or ask the question) if the selected object also matches the tags specified as `condition`.\n\nThis is useful to ask a follow-up question.\nFor example, within toilets, asking _where_ the diaper changing table is is only useful _if_ there is one.\nThis can be done by adding `\"condition\": \"changing_table=yes\"`\n\nA full example would be:\n```json\n    {\n      \"question\": \"Where is the changing table located?\",\n      \"render\": \"The changing table is located at {changing_table:location}\",\n      \"condition\": \"changing_table=yes\",\n      \"freeform\": {\n        \"key\": \"changing_table:location\",\n        \"inline\": true\n      },\n      \"mappings\": [\n        {\n          \"then\": \"The changing table is in the toilet for women.\",\n          \"if\": \"changing_table:location=female_toilet\"\n        },\n        {\n          \"then\": \"The changing table is in the toilet for men.\",\n          \"if\": \"changing_table:location=male_toilet\"\n        },\n        {\n          \"if\": \"changing_table:location=wheelchair_toilet\",\n          \"then\": \"The changing table is in the toilet for wheelchair users.\",\n        },\n        {\n          \"if\": \"changing_table:location=dedicated_room\",\n          \"then\": \"The changing table is in a dedicated room. \",\n        }\n      ],\n      \"id\": \"toilet-changing_table:location\"\n    },\n```",
          "anyOf": [
            {
              "$ref": "#/definitions/{and:TagConfigJson[];}"
            },
            {
              "$ref": "#/definitions/{or:TagConfigJson[];}"
            },
            {
              "type": "string"
            }
          ]
        },
        "metacondition": {
          "description": "question: When should this item be shown (including special conditions)?\n\nIf set, this tag will be evaluated agains the _usersettings/application state_ table.\nEnable 'show debug info' in user settings to see available options.\nNote that values with an underscore depicts _application state_ (including metainfo about the user) whereas values without an underscore depict _user settings_",
          "anyOf": [
            {
              "$ref": "#/definitions/{and:TagConfigJson[];}"
            },
            {
              "$ref": "#/definitions/{or:TagConfigJson[];}"
            },
            {
              "type": "string"
            }
          ]
        },
        "freeform": {
          "description": "question: Should a freeform text field be shown?\nAllow freeform text input from the user\nifunset: Do not add a freeform text field",
          "type": "object",
          "properties": {
            "key": {
              "description": "What attribute should be filled out\nIf this key is present in the feature, then 'render' is used to display the value.\nIf this is undefined, the rendering is _always_ shown",
              "type": "string"
            }
          },
          "required": [
            "key"
          ]
        },
        "mappings": {
          "description": "Allows fixed-tag inputs, shown either as radiobuttons or as checkboxes",
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "if": {
                "$ref": "#/definitions/TagConfigJson",
                "description": "question: When should this single mapping match?\n\nIf this condition is met, then the text under `then` will be shown.\nIf no value matches, and the user selects this mapping as an option, then these tags will be uploaded to OSM.\n\nFor example: {'if': 'diet:vegetarion=yes', 'then':'A vegetarian option is offered here'}\n\nThis can be an substituting-tag as well, e.g. {'if': 'addr:street:={_calculated_nearby_streetname}', 'then': '{_calculated_nearby_streetname}'}"
              },
              "then": {
                "description": "question: What text should be shown?\n\nIf the condition `if` is met, the text `then` will be rendered.\nIf not known yet, the user will be presented with `then` as an option\nType: rendered",
                "anyOf": [
                  {
                    "$ref": "#/definitions/Record<string,string>"
                  },
                  {
                    "type": "string"
                  }
                ]
              },
              "icon": {
                "description": "question: What icon should be added to this mapping?\nAn icon supporting this mapping; typically shown pretty small\nType: icon",
                "anyOf": [
                  {
                    "type": "object",
                    "properties": {
                      "path": {
                        "description": "The path to the icon\nType: icon",
                        "type": "string"
                      },
                      "class": {
                        "description": "A hint to mapcomplete on how to render this icon within the mapping.\nThis is translated to 'mapping-icon-<classtype>', so defining your own in combination with a custom CSS is possible (but discouraged)",
                        "type": "string"
                      }
                    },
                    "required": [
                      "path"
                    ]
                  },
                  {
                    "type": "string"
                  }
                ]
              }
            },
            "required": [
              "if",
              "then"
            ]
          }
        },
        "description": {
          "description": "A human-readable text explaining what this tagRendering does.\nMostly used for the shared tagrenderings",
          "anyOf": [
            {
              "$ref": "#/definitions/Record<string,string>"
            },
            {
              "type": "string"
            }
          ]
        },
        "classes": {
          "description": "question: What css-classes should be applied to showing this attribute?\n\nA list of css-classes to apply to the entire tagRendering.\nThese classes are applied in 'answer'-mode, not in question mode\nThis is only for advanced users.\n\nValues are split on ` `  (space)",
          "type": "string"
        }
      }
    },
    "Record<string,string[]>": {
      "type": "object"
    },
    "MappingConfigJson": {
      "type": "object",
      "properties": {
        "if": {
          "$ref": "#/definitions/TagConfigJson",
          "description": "quesiton: What tags should be matched to show this option?\n\nIf in 'question'-mode and the contributor selects this option, these tags will be applied to the object"
        },
        "then": {
          "description": "Shown if the 'if is fulfilled\nType: rendered",
          "anyOf": [
            {
              "$ref": "#/definitions/Record<string,string>"
            },
            {
              "type": "string"
            }
          ]
        },
        "icon": {
          "description": "An extra icon supporting the choice\nType: icon",
          "anyOf": [
            {
              "type": "object",
              "properties": {
                "path": {
                  "description": "The path to the  icon\nType: icon",
                  "type": "string"
                },
                "class": {
                  "description": "Size of the image",
                  "type": "string"
                }
              },
              "required": [
                "path"
              ]
            },
            {
              "type": "string"
            }
          ]
        },
        "hideInAnswer": {
          "description": "In some cases, multiple taggings exist (e.g. a default assumption, or a commonly mapped abbreviation and a fully written variation).\n\nIn the latter case, a correct text should be shown, but only a single, canonical tagging should be selectable by the user.\nIn this case, one of the mappings can be hiden by setting this flag.\n\nTo demonstrate an example making a default assumption:\n\nmappings: [\n {\n     if: \"access=\", -- no access tag present, we assume accessible\n     then: \"Accessible to the general public\",\n     hideInAnswer: true\n },\n {\n     if: \"access=yes\",\n     then: \"Accessible to the general public\", -- the user selected this, we add that to OSM\n },\n {\n     if: \"access=no\",\n     then: \"Not accessible to the public\"\n }\n]\n\n\nFor example, for an operator, we have `operator=Agentschap Natuur en Bos`, which is often abbreviated to `operator=ANB`.\nThen, we would add two mappings:\n{\n    if: \"operator=Agentschap Natuur en Bos\" -- the non-abbreviated version which should be uploaded\n    then: \"Maintained by Agentschap Natuur en Bos\"\n},\n{\n    if: \"operator=ANB\", -- we don't want to upload abbreviations\n    then: \"Maintained by Agentschap Natuur en Bos\"\n    hideInAnswer: true\n}\n\nHide in answer can also be a tagsfilter, e.g. to make sure an option is only shown when appropriate.\nKeep in mind that this is reverse logic: it will be hidden in the answer if the condition is true, it will thus only show in the case of a mismatch\n\ne.g., for toilets: if \"wheelchair=no\", we know there is no wheelchair dedicated room.\nFor the location of the changing table, the option \"in the wheelchair accessible toilet is weird\", so we write:\n\n{\n    \"question\": \"Where is the changing table located?\"\n    \"mappings\": [\n        {\"if\":\"changing_table:location=female\",\"then\":\"In the female restroom\"},\n       {\"if\":\"changing_table:location=male\",\"then\":\"In the male restroom\"},\n       {\"if\":\"changing_table:location=wheelchair\",\"then\":\"In the wheelchair accessible restroom\", \"hideInAnswer\": \"wheelchair=no\"},\n\n    ]\n}\n\nAlso have a look for the meta-tags\n{\n    if: \"operator=Agentschap Natuur en Bos\",\n    then: \"Maintained by Agentschap Natuur en Bos\",\n    hideInAnswer: \"_country!=be\"\n}",
          "anyOf": [
            {
              "$ref": "#/definitions/{and:TagConfigJson[];}"
            },
            {
              "$ref": "#/definitions/{or:TagConfigJson[];}"
            },
            {
              "type": [
                "string",
                "boolean"
              ]
            }
          ]
        },
        "ifnot": {
          "description": "Only applicable if 'multiAnswer' is set.\nThis is for situations such as:\n`accepts:coins=no` where one can select all the possible payment methods. However, we want to make explicit that some options _were not_ selected.\nThis can be done with `ifnot`\nNote that we can not explicitly render this negative case to the user, we cannot show `does _not_ accept coins`.\nIf this is important to your usecase, consider using multiple radiobutton-fields without `multiAnswer`",
          "anyOf": [
            {
              "$ref": "#/definitions/{and:TagConfigJson[];}"
            },
            {
              "$ref": "#/definitions/{or:TagConfigJson[];}"
            },
            {
              "type": "string"
            }
          ]
        },
        "addExtraTags": {
          "description": "If chosen as answer, these tags will be applied as well onto the object.\nNot compatible with multiAnswer.\n\nThis can be used e.g. to erase other keys which indicate the 'not' value:\n```json\n{\n    \"if\": \"crossing:marking=rainbow\",\n    \"then\": \"This is a rainbow crossing\",\n    \"addExtraTags\": [\"not:crossing:marking=\"]\n}\n```",
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "searchTerms": {
          "description": "If there are many options, the mappings-radiobuttons will be replaced by an element with a searchfunction\n\nSearchterms (per language) allow to easily find an option if there are many options",
          "$ref": "#/definitions/Record<string,string[]>"
        },
        "priorityIf": {
          "description": "If the searchable selector is picked, mappings with this item will have priority and show up even if the others are hidden\nUse this sparingly",
          "anyOf": [
            {
              "$ref": "#/definitions/{and:TagConfigJson[];}"
            },
            {
              "$ref": "#/definitions/{or:TagConfigJson[];}"
            },
            {
              "type": "string"
            }
          ]
        },
        "#": {
          "description": "Used for comments or to disable a validation\n\nignore-image-in-then: normally, a `then`-clause is not allowed to have an `img`-html-element as icons are preferred. In some cases (most notably title-icons), this is allowed",
          "type": "string"
        }
      },
      "required": [
        "if",
        "then"
      ]
    },
    "T": {
      "type": "object"
    },
    "default_4": {
      "description": "The PointRenderingConfig gives all details onto how to render a single point of a feature.\n\nThis can be used if:\n\n- The feature is a point\n- To render something at the centroid of an area, or at the start, end or projected centroid of a way",
      "type": "object",
      "properties": {
        "location": {
          "description": "All the locations that this point should be rendered at.\nPossible values are:\n- `point`: only renders points at their location\n- `centroid`: show a symbol at the centerpoint of a (multi)Linestring and (multi)polygon. Points will _not_ be rendered with this\n- `projected_centerpoint`: Only on (multi)linestrings: calculate the centerpoint and snap it to the way\n- `start` and `end`: only on linestrings: add a point to the first/last coordinate of the LineString",
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "icon": {
          "description": "The icon for an element.\nNote that this also doubles as the icon for this layer (rendered with the overpass-tags) ánd the icon in the presets.\n\nThe result of the icon is rendered as follows:\nthe resulting string is interpreted as a _list_ of items, separated by \";\". The bottommost layer is the first layer.\nAs a result, on could use a generic pin, then overlay it with a specific icon.\nTo make things even more practical, one can use all SVG's from the folder \"assets/svg\" and _substitute the color_ in it.\nE.g. to draw a red pin, use \"pin:#f00\", to have a green circle with your icon on top, use `circle:#0f0;<path to my icon.svg>`\n\nType: icon",
          "anyOf": [
            {
              "$ref": "#/definitions/TagRenderingConfigJson"
            },
            {
              "type": "string"
            }
          ]
        },
        "iconBadges": {
          "description": "A list of extra badges to show next to the icon as small badge\nThey will be added as a 25% height icon at the bottom right of the icon, with all the badges in a flex layout.\n\nNote: strings are interpreted as icons, so layering and substituting is supported. You can use `circle:white;./my_icon.svg` to add a background circle",
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "if": {
                "$ref": "#/definitions/TagConfigJson",
                "description": "The main representation of Tags.\nSee https://github.com/pietervdvn/MapComplete/blob/develop/Docs/Tags_format.md for more documentation\n\ntype: tag"
              },
              "then": {
                "description": "Badge to show\nType: icon",
                "anyOf": [
                  {
                    "$ref": "#/definitions/TagRenderingConfigJson"
                  },
                  {
                    "type": "string"
                  }
                ]
              }
            },
            "required": [
              "if",
              "then"
            ]
          }
        },
        "iconSize": {
          "description": "A string containing \"width,height\" or \"width,height,anchorpoint\" where anchorpoint is any of 'center', 'top', 'bottom', 'left', 'right', 'bottomleft','topright', ...\nDefault is '40,40,center'",
          "anyOf": [
            {
              "$ref": "#/definitions/TagRenderingConfigJson"
            },
            {
              "type": "string"
            }
          ]
        },
        "anchor": {
          "description": "question: What is the anchorpoint of the icon?\n\nThis matches the geographical point with a location on the icon.\nFor example, a feature attached to the ground can use 'bottom' as zooming in will give the appearance of being anchored to a fixed location.",
          "anyOf": [
            {
              "$ref": "#/definitions/TagRenderingConfigJson"
            },
            {
              "type": "string"
            }
          ]
        },
        "rotation": {
          "description": "The rotation of an icon, useful for e.g. directions.\nUsage: as if it were a css property for 'rotate', thus has to end with 'deg', e.g. `90deg`, `{direction}deg`, `calc(90deg - {camera:direction}deg)``",
          "anyOf": [
            {
              "$ref": "#/definitions/TagRenderingConfigJson"
            },
            {
              "type": "string"
            }
          ]
        },
        "label": {
          "description": "A HTML-fragment that is shown below the icon, for example:\n<div style=\"background: white\">{name}</div>\n\nIf the icon is undefined, then the label is shown in the center of the feature.\nNote that, if the wayhandling hides the icon then no label is shown as well.",
          "anyOf": [
            {
              "$ref": "#/definitions/TagRenderingConfigJson"
            },
            {
              "type": "string"
            }
          ]
        },
        "css": {
          "description": "A snippet of css code which is applied onto the container of the entire marker",
          "anyOf": [
            {
              "$ref": "#/definitions/TagRenderingConfigJson"
            },
            {
              "type": "string"
            }
          ]
        },
        "cssClasses": {
          "description": "A snippet of css-classes which are applied onto the container of the entire marker. They can be space-separated",
          "anyOf": [
            {
              "$ref": "#/definitions/TagRenderingConfigJson"
            },
            {
              "type": "string"
            }
          ]
        },
        "labelCss": {
          "description": "Css that is applied onto the label",
          "anyOf": [
            {
              "$ref": "#/definitions/TagRenderingConfigJson"
            },
            {
              "type": "string"
            }
          ]
        },
        "labelCssClasses": {
          "description": "Css classes that are applied onto the label; can be space-separated",
          "anyOf": [
            {
              "$ref": "#/definitions/TagRenderingConfigJson"
            },
            {
              "type": "string"
            }
          ]
        },
        "pitchAlignment": {
          "description": "If the map is pitched, the marker will stay parallel to the screen.\nSet to 'map' if you want to put it flattened on the map",
          "anyOf": [
            {
              "$ref": "#/definitions/TagRenderingConfigJson"
            },
            {
              "enum": [
                "canvas",
                "map"
              ],
              "type": "string"
            }
          ]
        },
        "rotationAlignment": {
          "description": "If the map is rotated, the icon will still point to the north if no rotation was applied",
          "anyOf": [
            {
              "$ref": "#/definitions/TagRenderingConfigJson"
            },
            {
              "enum": [
                "canvas",
                "map"
              ],
              "type": "string"
            }
          ]
        }
      },
      "required": [
        "location"
      ]
    },
    "default_5": {
      "description": "The LineRenderingConfig gives all details onto how to render a single line of a feature.\n\nThis can be used if:\n\n- The feature is a line\n- The feature is an area",
      "type": "object",
      "properties": {
        "color": {
          "description": "The color for way-elements and SVG-elements.\nIf the value starts with \"--\", the style of the body element will be queried for the corresponding variable instead",
          "anyOf": [
            {
              "$ref": "#/definitions/TagRenderingConfigJson"
            },
            {
              "type": "string"
            }
          ]
        },
        "width": {
          "description": "The stroke-width for way-elements",
          "anyOf": [
            {
              "$ref": "#/definitions/TagRenderingConfigJson"
            },
            {
              "type": [
                "string",
                "number"
              ]
            }
          ]
        },
        "dashArray": {
          "description": "A dasharray, e.g. \"5 6\"\nThe dasharray defines 'pixels of line, pixels of gap, pixels of line, pixels of gap',\nDefault value: \"\" (empty string == full line)",
          "anyOf": [
            {
              "$ref": "#/definitions/TagRenderingConfigJson"
            },
            {
              "type": "string"
            }
          ]
        },
        "lineCap": {
          "description": "The form at the end of a line",
          "anyOf": [
            {
              "$ref": "#/definitions/TagRenderingConfigJson"
            },
            {
              "type": "string"
            }
          ]
        },
        "fillColor": {
          "description": "The color to fill a polygon with.\nIf undefined, this will be slightly more opaque version of the stroke line.\nUse '#00000000' to make the fill invisible",
          "anyOf": [
            {
              "$ref": "#/definitions/TagRenderingConfigJson"
            },
            {
              "type": "string"
            }
          ]
        },
        "offset": {
          "description": "The number of pixels this line should be moved.\nUse a positive numbe to move to the right, a negative to move to the left (left/right as defined by the drawing direction of the line).\n\nIMPORTANT: MapComplete will already normalize 'key:both:property' and 'key:both' into the corresponding 'key:left' and 'key:right' tagging (same for 'sidewalk=left/right/both' which is rewritten to 'sidewalk:left' and 'sidewalk:right')\nThis simplifies programming. Refer to the CalculatedTags.md-documentation for more details",
          "anyOf": [
            {
              "$ref": "#/definitions/TagRenderingConfigJson"
            },
            {
              "type": "number"
            }
          ]
        }
      }
    },
    "default<default|default|default[]|default[]>": {
      "description": "Rewrites and multiplies the given renderings of type T.\n\nThis can be used for introducing many similar questions automatically,\nwhich also makes translations easier.\n\n(Note that the key does _not_ need to be wrapped in {}.\nHowever, we recommend to use them if the key is used in a translation, as missing keys will be picked up and warned for by the translation scripts)\n\nFor example:\n\n```\n{\n    rewrite: {\n        sourceString: [\"key\", \"a|b|c\"],\n        into: [\n            [\"X\", 0]\n            [\"Y\", 1],\n            [\"Z\", 2]\n        ],\n        renderings: [{\n            \"key\":\"a|b|c\"\n        }]\n    }\n}\n```\nwill result in _three_ copies (as the values to rewrite into have three values, namely:\n\n[\n  {\n  # The first pair: key --> X, a|b|c --> 0\n      \"X\": 0\n  },\n  {\n      \"Y\": 1\n  },\n  {\n      \"Z\": 2\n  }\n\n]",
      "type": "object",
      "properties": {
        "rewrite": {
          "type": "object",
          "properties": {
            "sourceString": {
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "into": {
              "type": "array",
              "items": {
                "type": "array",
                "items": {}
              }
            }
          },
          "required": [
            "into",
            "sourceString"
          ]
        },
        "renderings": {
          "anyOf": [
            {
              "$ref": "#/definitions/default_4"
            },
            {
              "$ref": "#/definitions/default_5"
            },
            {
              "type": "array",
              "items": {
                "$ref": "#/definitions/default_5"
              }
            },
            {
              "type": "array",
              "items": {
                "$ref": "#/definitions/default_4"
              }
            }
          ]
        }
      },
      "required": [
        "renderings",
        "rewrite"
      ]
    },
    "QuestionableTagRenderingConfigJson": {
      "description": "A QuestionableTagRenderingConfigJson is a single piece of code which converts one ore more tags into a HTML-snippet.\nIf the desired tags are missing and a question is defined, a question will be shown instead.",
      "type": "object",
      "properties": {
        "id": {
          "description": "The id of the tagrendering, should be an unique string.\nUsed to keep the translations in sync. Only used in the tagRenderings-array of a layerConfig, not requered otherwise.\n\nquestion: What is the id of this tagRendering?",
          "type": "string"
        },
        "mappings": {
          "description": "Allows fixed-tag inputs, shown either as radiobuttons or as checkboxes\n\nquestion: What are common options?",
          "type": "array",
          "items": {
            "$ref": "#/definitions/MappingConfigJson"
          }
        },
        "multiAnswer": {
          "description": "If true, use checkboxes instead of radio buttons when asking the question\n\nquestion: Should a contributor be allowed to select multiple mappings?\n\niftrue: allow to select multiple mappigns\niffalse: only allow to select a single mapping\nifunset: only allow to select a single mapping",
          "type": "boolean"
        },
        "freeform": {
          "description": "Allow freeform text input from the user",
          "type": "object",
          "properties": {
            "key": {
              "type": "string"
            },
            "type": {
              "description": "question: What is the input type?\nThe type of the text-field, e.g. 'string', 'nat', 'float', 'date',...\nSee Docs/SpecialInputElements.md and UI/Input/ValidatedTextField.ts for supported values",
              "type": "string"
            },
            "placeholder": {
              "description": "A (translated) text that is shown (as gray text) within the textfield"
            },
            "helperArgs": {
              "description": "Extra parameters to initialize the input helper arguments.\nFor semantics, see the 'SpecialInputElements.md'",
              "type": "array",
              "items": {}
            },
            "addExtraTags": {
              "description": "If a value is added with the textfield, these extra tag is addded.\nUseful to add a 'fixme=freeform textfield used - to be checked'",
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "inline": {
              "description": "When set, influences the way a question is asked.\nInstead of showing a full-width text field, the text field will be shown within the rendering of the question.\n\nThis combines badly with special input elements, as it'll distort the layout.\nNote that this will be set automatically if no special elements are present.",
              "type": "boolean"
            },
            "default": {
              "description": "default value to enter if no previous tagging is present.\nNormally undefined (aka do not enter anything)",
              "type": "string"
            }
          },
          "required": [
            "key"
          ]
        },
        "question": {
          "description": "If it turns out that this tagRendering doesn't match _any_ value, then we show this question.\nIf undefined, the question is never asked and this tagrendering is read-only",
          "anyOf": [
            {
              "$ref": "#/definitions/Record<string,string>"
            },
            {
              "type": "string"
            }
          ]
        },
        "questionHint": {
          "description": "A hint which is shown in subtle text under the question.\nThis can give some extra information on what the answer should ook like",
          "anyOf": [
            {
              "$ref": "#/definitions/Record<string,string>"
            },
            {
              "type": "string"
            }
          ]
        },
        "labels": {
          "description": "A list of labels. These are strings that are used for various purposes, e.g. to filter them away",
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "render": {
          "description": "question: What text should be rendered?\n\nThis piece of text will be shown in the infobox.\nNote that \"{key}\"-parts are substituted by the corresponding values of the element.\n\nThis text will be shown if:\n- there is no mapping which matches (or there are no matches)\n- no question, no mappings and no 'freeform' is set\n\nNote that this is a HTML-interpreted value, so you can add links as e.g. '&lt;a href='{website}'>{website}&lt;/a>' or include images such as `This is of type A &lt;br>&lt;img src='typeA-icon.svg' />`\ntype: rendered",
          "anyOf": [
            {
              "$ref": "#/definitions/Record<string,string>"
            },
            {
              "type": "object",
              "properties": {
                "special": {
                  "allOf": [
                    {
                      "$ref": "#/definitions/Record<string,string|Record<string,string>>"
                    },
                    {
                      "type": "object",
                      "properties": {
                        "type": {
                          "type": "string"
                        }
                      },
                      "required": [
                        "type"
                      ]
                    }
                  ]
                }
              },
              "required": [
                "special"
              ]
            },
            {
              "type": "string"
            }
          ]
        },
        "condition": {
          "description": "question: When should this item be shown?\n\nOnly show this tagrendering (or ask the question) if the selected object also matches the tags specified as `condition`.\n\nThis is useful to ask a follow-up question.\nFor example, within toilets, asking _where_ the diaper changing table is is only useful _if_ there is one.\nThis can be done by adding `\"condition\": \"changing_table=yes\"`\n\nA full example would be:\n```json\n    {\n      \"question\": \"Where is the changing table located?\",\n      \"render\": \"The changing table is located at {changing_table:location}\",\n      \"condition\": \"changing_table=yes\",\n      \"freeform\": {\n        \"key\": \"changing_table:location\",\n        \"inline\": true\n      },\n      \"mappings\": [\n        {\n          \"then\": \"The changing table is in the toilet for women.\",\n          \"if\": \"changing_table:location=female_toilet\"\n        },\n        {\n          \"then\": \"The changing table is in the toilet for men.\",\n          \"if\": \"changing_table:location=male_toilet\"\n        },\n        {\n          \"if\": \"changing_table:location=wheelchair_toilet\",\n          \"then\": \"The changing table is in the toilet for wheelchair users.\",\n        },\n        {\n          \"if\": \"changing_table:location=dedicated_room\",\n          \"then\": \"The changing table is in a dedicated room. \",\n        }\n      ],\n      \"id\": \"toilet-changing_table:location\"\n    },\n```",
          "anyOf": [
            {
              "$ref": "#/definitions/{and:TagConfigJson[];}"
            },
            {
              "$ref": "#/definitions/{or:TagConfigJson[];}"
            },
            {
              "type": "string"
            }
          ]
        },
        "metacondition": {
          "description": "question: When should this item be shown (including special conditions)?\n\nIf set, this tag will be evaluated agains the _usersettings/application state_ table.\nEnable 'show debug info' in user settings to see available options.\nNote that values with an underscore depicts _application state_ (including metainfo about the user) whereas values without an underscore depict _user settings_",
          "anyOf": [
            {
              "$ref": "#/definitions/{and:TagConfigJson[];}"
            },
            {
              "$ref": "#/definitions/{or:TagConfigJson[];}"
            },
            {
              "type": "string"
            }
          ]
        },
        "description": {
          "description": "A human-readable text explaining what this tagRendering does.\nMostly used for the shared tagrenderings",
          "anyOf": [
            {
              "$ref": "#/definitions/Record<string,string>"
            },
            {
              "type": "string"
            }
          ]
        },
        "classes": {
          "description": "question: What css-classes should be applied to showing this attribute?\n\nA list of css-classes to apply to the entire tagRendering.\nThese classes are applied in 'answer'-mode, not in question mode\nThis is only for advanced users.\n\nValues are split on ` `  (space)",
          "type": "string"
        }
      },
      "required": [
        "id"
      ]
    },
    "Partial<QuestionableTagRenderingConfigJson>": {
      "type": "object",
      "properties": {
        "id": {
          "description": "The id of the tagrendering, should be an unique string.\nUsed to keep the translations in sync. Only used in the tagRenderings-array of a layerConfig, not requered otherwise.\n\nquestion: What is the id of this tagRendering?",
          "type": "string"
        },
        "mappings": {
          "description": "Allows fixed-tag inputs, shown either as radiobuttons or as checkboxes\n\nquestion: What are common options?",
          "type": "array",
          "items": {
            "$ref": "#/definitions/MappingConfigJson"
          }
        },
        "multiAnswer": {
          "description": "If true, use checkboxes instead of radio buttons when asking the question\n\nquestion: Should a contributor be allowed to select multiple mappings?\n\niftrue: allow to select multiple mappigns\niffalse: only allow to select a single mapping\nifunset: only allow to select a single mapping",
          "type": "boolean"
        },
        "freeform": {
          "description": "Allow freeform text input from the user",
          "type": "object",
          "properties": {
            "key": {
              "type": "string"
            },
            "type": {
              "description": "question: What is the input type?\nThe type of the text-field, e.g. 'string', 'nat', 'float', 'date',...\nSee Docs/SpecialInputElements.md and UI/Input/ValidatedTextField.ts for supported values",
              "type": "string"
            },
            "placeholder": {
              "description": "A (translated) text that is shown (as gray text) within the textfield"
            },
            "helperArgs": {
              "description": "Extra parameters to initialize the input helper arguments.\nFor semantics, see the 'SpecialInputElements.md'",
              "type": "array",
              "items": {}
            },
            "addExtraTags": {
              "description": "If a value is added with the textfield, these extra tag is addded.\nUseful to add a 'fixme=freeform textfield used - to be checked'",
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "inline": {
              "description": "When set, influences the way a question is asked.\nInstead of showing a full-width text field, the text field will be shown within the rendering of the question.\n\nThis combines badly with special input elements, as it'll distort the layout.\nNote that this will be set automatically if no special elements are present.",
              "type": "boolean"
            },
            "default": {
              "description": "default value to enter if no previous tagging is present.\nNormally undefined (aka do not enter anything)",
              "type": "string"
            }
          },
          "required": [
            "key"
          ]
        },
        "question": {
          "description": "If it turns out that this tagRendering doesn't match _any_ value, then we show this question.\nIf undefined, the question is never asked and this tagrendering is read-only",
          "anyOf": [
            {
              "$ref": "#/definitions/Record<string,string>"
            },
            {
              "type": "string"
            }
          ]
        },
        "questionHint": {
          "description": "A hint which is shown in subtle text under the question.\nThis can give some extra information on what the answer should ook like",
          "anyOf": [
            {
              "$ref": "#/definitions/Record<string,string>"
            },
            {
              "type": "string"
            }
          ]
        },
        "labels": {
          "description": "A list of labels. These are strings that are used for various purposes, e.g. to filter them away",
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "render": {
          "description": "question: What text should be rendered?\n\nThis piece of text will be shown in the infobox.\nNote that \"{key}\"-parts are substituted by the corresponding values of the element.\n\nThis text will be shown if:\n- there is no mapping which matches (or there are no matches)\n- no question, no mappings and no 'freeform' is set\n\nNote that this is a HTML-interpreted value, so you can add links as e.g. '&lt;a href='{website}'>{website}&lt;/a>' or include images such as `This is of type A &lt;br>&lt;img src='typeA-icon.svg' />`\ntype: rendered",
          "anyOf": [
            {
              "$ref": "#/definitions/Record<string,string>"
            },
            {
              "type": "object",
              "properties": {
                "special": {
                  "allOf": [
                    {
                      "$ref": "#/definitions/Record<string,string|Record<string,string>>"
                    },
                    {
                      "type": "object",
                      "properties": {
                        "type": {
                          "type": "string"
                        }
                      },
                      "required": [
                        "type"
                      ]
                    }
                  ]
                }
              },
              "required": [
                "special"
              ]
            },
            {
              "type": "string"
            }
          ]
        },
        "condition": {
          "description": "question: When should this item be shown?\n\nOnly show this tagrendering (or ask the question) if the selected object also matches the tags specified as `condition`.\n\nThis is useful to ask a follow-up question.\nFor example, within toilets, asking _where_ the diaper changing table is is only useful _if_ there is one.\nThis can be done by adding `\"condition\": \"changing_table=yes\"`\n\nA full example would be:\n```json\n    {\n      \"question\": \"Where is the changing table located?\",\n      \"render\": \"The changing table is located at {changing_table:location}\",\n      \"condition\": \"changing_table=yes\",\n      \"freeform\": {\n        \"key\": \"changing_table:location\",\n        \"inline\": true\n      },\n      \"mappings\": [\n        {\n          \"then\": \"The changing table is in the toilet for women.\",\n          \"if\": \"changing_table:location=female_toilet\"\n        },\n        {\n          \"then\": \"The changing table is in the toilet for men.\",\n          \"if\": \"changing_table:location=male_toilet\"\n        },\n        {\n          \"if\": \"changing_table:location=wheelchair_toilet\",\n          \"then\": \"The changing table is in the toilet for wheelchair users.\",\n        },\n        {\n          \"if\": \"changing_table:location=dedicated_room\",\n          \"then\": \"The changing table is in a dedicated room. \",\n        }\n      ],\n      \"id\": \"toilet-changing_table:location\"\n    },\n```",
          "anyOf": [
            {
              "$ref": "#/definitions/{and:TagConfigJson[];}"
            },
            {
              "$ref": "#/definitions/{or:TagConfigJson[];}"
            },
            {
              "type": "string"
            }
          ]
        },
        "metacondition": {
          "description": "question: When should this item be shown (including special conditions)?\n\nIf set, this tag will be evaluated agains the _usersettings/application state_ table.\nEnable 'show debug info' in user settings to see available options.\nNote that values with an underscore depicts _application state_ (including metainfo about the user) whereas values without an underscore depict _user settings_",
          "anyOf": [
            {
              "$ref": "#/definitions/{and:TagConfigJson[];}"
            },
            {
              "$ref": "#/definitions/{or:TagConfigJson[];}"
            },
            {
              "type": "string"
            }
          ]
        },
        "description": {
          "description": "A human-readable text explaining what this tagRendering does.\nMostly used for the shared tagrenderings",
          "anyOf": [
            {
              "$ref": "#/definitions/Record<string,string>"
            },
            {
              "type": "string"
            }
          ]
        },
        "classes": {
          "description": "question: What css-classes should be applied to showing this attribute?\n\nA list of css-classes to apply to the entire tagRendering.\nThese classes are applied in 'answer'-mode, not in question mode\nThis is only for advanced users.\n\nValues are split on ` `  (space)",
          "type": "string"
        }
      }
    },
    "default<(string|QuestionableTagRenderingConfigJson|{builtin:string;override:Partial<QuestionableTagRenderingConfigJson>;})[]>": {
      "description": "Rewrites and multiplies the given renderings of type T.\n\nThis can be used for introducing many similar questions automatically,\nwhich also makes translations easier.\n\n(Note that the key does _not_ need to be wrapped in {}.\nHowever, we recommend to use them if the key is used in a translation, as missing keys will be picked up and warned for by the translation scripts)\n\nFor example:\n\n```\n{\n    rewrite: {\n        sourceString: [\"key\", \"a|b|c\"],\n        into: [\n            [\"X\", 0]\n            [\"Y\", 1],\n            [\"Z\", 2]\n        ],\n        renderings: [{\n            \"key\":\"a|b|c\"\n        }]\n    }\n}\n```\nwill result in _three_ copies (as the values to rewrite into have three values, namely:\n\n[\n  {\n  # The first pair: key --> X, a|b|c --> 0\n      \"X\": 0\n  },\n  {\n      \"Y\": 1\n  },\n  {\n      \"Z\": 2\n  }\n\n]",
      "type": "object",
      "properties": {
        "rewrite": {
          "type": "object",
          "properties": {
            "sourceString": {
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "into": {
              "type": "array",
              "items": {
                "type": "array",
                "items": {}
              }
            }
          },
          "required": [
            "into",
            "sourceString"
          ]
        },
        "renderings": {
          "type": "array",
          "items": {
            "anyOf": [
              {
                "$ref": "#/definitions/QuestionableTagRenderingConfigJson"
              },
              {
                "type": "object",
                "properties": {
                  "builtin": {
                    "type": "string"
                  },
                  "override": {
                    "$ref": "#/definitions/Partial<QuestionableTagRenderingConfigJson>"
                  }
                },
                "required": [
                  "builtin",
                  "override"
                ]
              },
              {
                "type": "string"
              }
            ]
          }
        }
      },
      "required": [
        "renderings",
        "rewrite"
      ]
    },
    "default_1": {
      "type": "object",
      "properties": {
        "id": {
          "description": "An id/name for this filter, used to set the URL parameters",
          "type": "string"
        },
        "options": {
          "description": "The options for a filter\nIf there are multiple options these will be a list of radio buttons\nIf there is only one option this will be a checkbox\nFiltering is done based on the given osmTags that are compared to the objects in that layer.\n\nAn example which searches by name:\n\n```\n{\n      \"id\": \"shop-name\",\n      \"options\": [\n        {\n          \"fields\": [\n            {\n              \"name\": \"search\",\n              \"type\": \"string\"\n            }\n          ],\n          \"osmTags\": \"name~i~.*{search}.*\",\n          \"question\": {\n            \"en\": \"Only show shops with name {search}\",\n          }\n        }\n      ]\n    }\n    ```",
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "question": {},
              "osmTags": {
                "description": "The main representation of Tags.\nSee https://github.com/pietervdvn/MapComplete/blob/develop/Docs/Tags_format.md for more documentation\n\ntype: tag",
                "anyOf": [
                  {
                    "$ref": "#/definitions/{and:TagConfigJson[];}"
                  },
                  {
                    "$ref": "#/definitions/{or:TagConfigJson[];}"
                  },
                  {
                    "type": "string"
                  }
                ]
              },
              "default": {
                "type": "boolean"
              },
              "fields": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "name": {
                      "description": "If name is `search`, use  \"_first_comment~.*{search}.*\" as osmTags",
                      "type": "string"
                    },
                    "type": {
                      "type": "string"
                    }
                  },
                  "required": [
                    "name"
                  ]
                }
              }
            },
            "required": [
              "question"
            ]
          }
        },
        "#": {
          "description": "Used for comments or to disable a check\n\n\"ignore-possible-duplicate\": disables a check in `DetectDuplicateFilters` which complains that a filter can be replaced by a filter from the `filters`-library-layer",
          "type": "string"
        }
      },
      "required": [
        "id",
        "options"
      ]
    },
    "DeleteConfigJson": {
      "type": "object",
      "properties": {
        "neededChangesets": {
          "description": "*\nBy default, the contributor needs 20 previous changesets to delete points edited by others.\nFor some small features (e.g. bicycle racks) this is too much and this requirement can be lowered or dropped, which can be done here.\n\ntype: nat\nquestion: How many changesets must a contributor have before being allowed to delete a point?",
          "type": "number"
        },
        "extraDeleteReasons": {
          "description": "*\nBy default, three reasons to delete a point are shown:\n\n- The point does not exist anymore\n- The point was a testing point\n- THe point could not be found\n\nHowever, for some layers, there might be different or more specific reasons for deletion which can be user friendly to set, e.g.:\n\n- the shop has closed\n- the climbing route has been closed of for nature conservation reasons\n- ...\n\nThese reasons can be stated here and will be shown in the list of options the user can choose from",
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "explanation": {
                "description": "The text that will be shown to the user as option for why this point does not exist anymore.\nNote that the most common reasons (test point, does not exist anymore, cannot be found) are already offered by default\n\nquestion: For what extra reason might this feature be removed in real-life?"
              },
              "changesetMessage": {
                "description": "The text that will be uploaded into the changeset or will be used in the fixme in case of a soft deletion\nShould be a few words, in english\n\nquestion: What should be added to the changeset as delete reason?",
                "type": "string"
              }
            },
            "required": [
              "changesetMessage",
              "explanation"
            ]
          }
        },
        "nonDeleteMappings": {
          "description": "In some cases, a (starting) contributor might wish to delete a feature even though deletion is not appropriate.\n(The most relevant case are small paths running over private property. These should be marked as 'private' instead of deleted, as the community might trace the path again from aerial imagery, gettting us back to the original situation).\n\nBy adding a 'nonDeleteMapping', an option can be added into the list which will retag the feature.\nIt is important that the feature will be retagged in such a way that it won't be picked up by the layer anymore!",
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "if": {
                "$ref": "#/definitions/TagConfigJson",
                "description": "The tags that will be given to the object.\nThis must remove tags so that the 'source/osmTags' won't match anymore\n\nquestion: What tags should be applied to the object?"
              },
              "then": {
                "description": "The human explanation for the options\n\nquestion: What text should be shown to the contributor for this reason?"
              }
            },
            "required": [
              "if",
              "then"
            ]
          }
        },
        "softDeletionTags": {
          "description": "In some cases, the contributor is not allowed to delete the current feature (e.g. because it isn't a point, the point is referenced by a relation or the user isn't experienced enough).\nTo still offer the user a 'delete'-option, the feature is retagged with these tags. This is a soft deletion, as the point isn't actually removed from OSM but rather marked as 'disused'\nIt is important that the feature will be retagged in such a way that it won't be picked up by the layer anymore!\n\nExample (note that \"amenity=\" erases the 'amenity'-key alltogether):\n\n```\n{\n    \"and\": [\"disussed:amenity=public_bookcase\", \"amenity=\"]\n}\n```\n\nor (notice the use of the ':='-tag to copy the old value of 'shop=*' into 'disused:shop='):\n\n```\n{\n    \"and\": [\"disused:shop:={shop}\", \"shop=\"]\n}\n```\n\nquestion: If a hard delete is not possible, what tags should be applied to mark this feature as deleted?\ntype: tag",
          "anyOf": [
            {
              "$ref": "#/definitions/{and:TagConfigJson[];}"
            },
            {
              "$ref": "#/definitions/{or:TagConfigJson[];}"
            },
            {
              "type": "string"
            }
          ]
        },
        "omitDefaultDeleteReasons": {
          "description": "Set this flag if the default delete reasons should be omitted from the dialog.\nThis requires at least one extraDeleteReason or nonDeleteMapping\n\nquestion: Should the default delete reasons be hidden?\niftrue: Hide the default delete reasons\niffalse: Show the default delete reasons\nifunset: Show the default delete reasons (default behaviour)",
          "type": "boolean"
        }
      }
    },
    "default_3": {
      "type": "object",
      "properties": {
        "enableImproveAccuracy": {
          "description": "question: Should moving this type of point to improve the accuracy be allowed?\niftrue: This point can be moved to improve the accuracy\nifunset: (default) This point can be moved to improve the accuracy\niffalse: This point cannot be moved to improve the accuracy",
          "type": "boolean"
        },
        "enableRelocation": {
          "description": "question: Should moving this type of point due to a relocation be allowed?\n\nThis will erase the attributes `addr:street`, `addr:housenumber`, `addr:city` and `addr:postcode`\n\niftrue: This type of point can be moved due to a relocation (and will remove address information when this is done)\nifunset: (default) This type of point can be moved due to a relocation (and will remove address information when this is done)\niffalse: This type of point cannot be moved due to a relocation",
          "type": "boolean"
        }
      }
    },
    "default_2": {
      "description": "In some cases, a value is represented in a certain unit (such as meters for heigt/distance/..., km/h for speed, ...)\n\nSometimes, multiple denominations are possible (e.g. km/h vs mile/h; megawatt vs kilowatt vs gigawatt for power generators, ...)\n\nThis brings in some troubles, as there are multiple ways to write it (no denomitation, 'm' vs 'meter' 'metre', ...)\n\nNot only do we want to write consistent data to OSM, we also want to present this consistently to the user.\nThis is handled by defining units.\n\n# Rendering\n\nTo render a value with long (human) denomination, use {canonical(key)}\n\n# Usage\n\nFirst of all, you define which keys have units applied, for example:\n\n```\nunits: [\n appliesTo: [\"maxspeed\", \"maxspeed:hgv\", \"maxspeed:bus\"]\n applicableUnits: [\n     ...\n ]\n]\n```\n\nApplicableUnits defines which is the canonical extension, how it is presented to the user, ...:\n\n```\napplicableUnits: [\n{\n    canonicalDenomination: \"km/h\",\n    alternativeDenomination: [\"km/u\", \"kmh\", \"kph\"]\n    default: true,\n    human: {\n        en: \"kilometer/hour\",\n        nl: \"kilometer/uur\"\n    },\n    humanShort: {\n        en: \"km/h\",\n        nl: \"km/u\"\n    }\n},\n{\n    canoncialDenomination: \"mph\",\n    ... similar for miles an hour ...\n}\n]\n```\n\n\nIf this is defined, then every key which the denominations apply to (`maxspeed`, `maxspeed:hgv` and `maxspeed:bus`) will be rewritten at the metatagging stage:\nevery value will be parsed and the canonical extension will be added add presented to the other parts of the code.\n\nAlso, if a freeform text field is used, an extra dropdown with applicable denominations will be given",
      "type": "object",
      "properties": {
        "appliesToKey": {
          "description": "Every key from this list will be normalized.\n\nTo render the value properly (with a human readable denomination), use `{canonical(<key>)}`",
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "eraseInvalidValues": {
          "description": "If set, invalid values will be erased in the MC application (but not in OSM of course!)\nBe careful with setting this",
          "type": "boolean"
        },
        "applicableUnits": {
          "description": "The possible denominations for this unit.\nFor length, denominations could be \"meter\", \"kilometer\", \"miles\", \"foot\"",
          "type": "array",
          "items": {
            "$ref": "#/definitions/DenominationConfigJson"
          }
        },
        "defaultInput": {
          "description": "In some cases, the default denomination is not the most user friendly to input.\nE.g., when measuring kerb heights, it is illogical to ask contributors to input an amount in meters.\n\nWhen a default input method should be used, this can be specified by setting the canonical denomination here, e.g.\n`defaultInput: \"cm\"`. This must be a denomination which appears in the applicableUnits",
          "type": "string"
        }
      },
      "required": [
        "applicableUnits",
        "appliesToKey"
      ]
    }
  },
  "$schema": "http://json-schema.org/draft-07/schema#"
}