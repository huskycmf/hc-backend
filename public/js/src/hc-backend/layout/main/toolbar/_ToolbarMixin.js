define([
    "dojo/_base/declare",
    "dijit/_Widget",
    "../../../hash"
], function(declare, _Widget, hash) {
    return declare([ _Widget ], {
        // summary:
        //      This is base class for widgets who will be preparing as toolbar widgets.

        // router: [public] Router handler
        //      Contains handler returned while route was registered
        router: null,

        postMixInProperties: function () {
            // summary:
            //      To control mixin properties
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

        activate: function () {
            try {
                hash(this.router.getFullRoute());
            } catch (e) {
                 console.error(this.declaredClass, arguments, e);
                 throw e;
            }
        },

        handle: function (routeModule, routeEvent) {
            try {
                if (routeEvent && routeEvent.oldPath) {
                    this.__oldRoutePath = routeEvent.oldPath;
                }
            } catch (e) {
                 console.error(this.declaredClass, arguments, e);
                 throw e;
            }
        },

        deactivate: function () {
            try {
                if (this.__oldRoutePath) {
                    hash(this.__oldRoutePath);
                } else {
                    console.warn("Old Route path does not set");
                }
            } catch (e) {
                 console.error(this.declaredClass, arguments, e);
                 throw e;
            }
        }
    });
});
