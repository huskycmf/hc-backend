define([
    "../../../../../../../../../sugarcms/public/js/library/dojo/_base/declare",
    "../../ContentPane"
], function(declare, ContentPane) {
    return declare([ ContentPane ], {
        // summary:
        //      This is base class for widgets who will be preparing as Content widgets.

        // router: [public] Router handler
        //      Containes handler returned while route was registered
        router: null,

        postMixInProperties: function () {
            // summary:
            //      To controll mixin properties
            try {
                this.inherited(arguments);

                if (!this.router) {
                    throw "Router must be defined";
                }
            } catch (e) {
                 console.error(this.declaredClass, arguments, e);
                 throw e;
            }
        },

        onShow: function () {
            //  summary:
            //      This method will be called every time when current container
            //      will be appearing in main container as current
        },
        
        onHide: function () {
            // summary:
            //      This method will be called every time when current container
            //      will be disappearing in main container as current
        },

        refresh: function () {
            // summary:
            //      This method will be called every time when some parent
            //      element wants to reload container.
        }
    });
});
