import { TagConfigJson } from "./TagConfigJson"
import { Translatable } from "./Translatable"

/**
 * A TagRenderingConfigJson is a single piece of code which converts one ore more tags into a HTML-snippet.
 * For an _editable_ tagRendering, use 'QuestionableTagRenderingConfigJson' instead, which extends this one
 */
export interface TagRenderingConfigJson {
    /**
     * question: What text should be rendered?
     *
     * This piece of text will be shown in the infobox.
     * Note that "&LBRACEkey&RBRACE"-parts are substituted by the corresponding values of the element.
     *
     * This text will be shown if:
     * - there is no mapping which matches (or there are no matches)
     * - no question, no mappings and no 'freeform' is set
     *
     * Note that this is a HTML-interpreted value, so you can add links as e.g. '&lt;a href='{website}'>{website}&lt;/a>' or include images such as `This is of type A &lt;br>&lt;img src='typeA-icon.svg' />`
     * type: rendered
     */
    render?:
        | Translatable
        | { special: Record<string, string | Record<string, string>> & { type: string } }

    /**
     *
     * question: When should this item be shown?
     *
     * Only show this tagrendering (or ask the question) if the selected object also matches the tags specified as `condition`.
     *
     * This is useful to ask a follow-up question.
     * For example, within toilets, asking _where_ the diaper changing table is is only useful _if_ there is one.
     * This can be done by adding `"condition": "changing_table=yes"`
     *
     * A full example would be:
     * ```json
     *     {
     *       "question": "Where is the changing table located?",
     *       "render": "The changing table is located at {changing_table:location}",
     *       "condition": "changing_table=yes",
     *       "freeform": {
     *         "key": "changing_table:location",
     *         "inline": true
     *       },
     *       "mappings": [
     *         {
     *           "then": "The changing table is in the toilet for women.",
     *           "if": "changing_table:location=female_toilet"
     *         },
     *         {
     *           "then": "The changing table is in the toilet for men.",
     *           "if": "changing_table:location=male_toilet"
     *         },
     *         {
     *           "if": "changing_table:location=wheelchair_toilet",
     *           "then": "The changing table is in the toilet for wheelchair users.",
     *         },
     *         {
     *           "if": "changing_table:location=dedicated_room",
     *           "then": "The changing table is in a dedicated room. ",
     *         }
     *       ],
     *       "id": "toilet-changing_table:location"
     *     },
     * ```
     * */
    condition?: TagConfigJson

    /**
     *
     * question: When should this item be shown (including special conditions)?
     *
     * If set, this tag will be evaluated agains the _usersettings/application state_ table.
     * Enable 'show debug info' in user settings to see available options.
     * Note that values with an underscore depicts _application state_ (including metainfo about the user) whereas values without an underscore depict _user settings_
     */
    metacondition?: TagConfigJson

    /**
     * question: Should a freeform text field be shown?
     * Allow freeform text input from the user
     * ifunset: Do not add a freeform text field
     */
    freeform?: {
        /**
         * What attribute should be filled out
         * If this key is present in the feature, then 'render' is used to display the value.
         * If this is undefined, the rendering is _always_ shown
         */
        key: string
    }

    /**
     * Allows fixed-tag inputs, shown either as radiobuttons or as checkboxes
     */
    mappings?: {
        /**
         * question: When should this single mapping match?
         *
         * If this condition is met, then the text under `then` will be shown.
         * If no value matches, and the user selects this mapping as an option, then these tags will be uploaded to OSM.
         *
         * For example: {'if': 'diet:vegetarion=yes', 'then':'A vegetarian option is offered here'}
         *
         * This can be an substituting-tag as well, e.g. {'if': 'addr:street:={_calculated_nearby_streetname}', 'then': '{_calculated_nearby_streetname}'}
         */
        if: TagConfigJson
        /**
         * question: What text should be shown?
         *
         * If the condition `if` is met, the text `then` will be rendered.
         * If not known yet, the user will be presented with `then` as an option
         * Type: rendered
         */
        then: Translatable
        /**
         * question: What icon should be added to this mapping?
         * An icon supporting this mapping; typically shown pretty small
         * Type: icon
         */
        icon?:
            | string
            | {
                  /**
                   * The path to the icon
                   * Type: icon
                   */
                  path: string
                  /**
                   * A hint to mapcomplete on how to render this icon within the mapping.
                   * This is translated to 'mapping-icon-<classtype>', so defining your own in combination with a custom CSS is possible (but discouraged)
                   */
                  class?: "small" | "medium" | "large" | string
              }
    }[]

    /**
     * A human-readable text explaining what this tagRendering does.
     * Mostly used for the shared tagrenderings
     */
    description?: Translatable

    /**
     * question: What css-classes should be applied to showing this attribute?
     *
     * A list of css-classes to apply to the entire tagRendering.
     * These classes are applied in 'answer'-mode, not in question mode
     * This is only for advanced users.
     *
     * Values are split on ` `  (space)
     */
    classes?: string
}
