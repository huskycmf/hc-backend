define([
    "dojo/_base/declare",
    "./_ContentMixin"
], function(declare, _ContentMixin) {
    return declare([ _ContentMixin ], {
        // summary:
        //      This is base class for widgets who will containes widgets
        //      inside itself but whant to rebuild all widgets every time
        //      when it is hide or show.

        postCreate: function () {
            try {
                this.init();
                this.inherited(arguments);
            } catch (e) {
                console.error(this.declaredClass, arguments, e);
                throw e;
            }
        },

        init: function () {
            try {
                throw "Abstract method must be overwritten";
            } catch (e) {
                console.error(this.declaredClass, arguments, e);
                throw e;
            }
        },

        destroyWidgets: function () {
            try {
                throw "Abstract method must be overwritten";
            } catch (e) {
                 console.error(this.declaredClass, arguments, e);
                 throw e;
            }
        },

        onHide: function () {
            try {
                this.destroyWidgets();
                this.inherited(arguments);
            } catch (e) {
                console.error(this.declaredClass, arguments, e);
                throw e;
            }
        },

        handle: function (router, route) {
            try {
                this.init();
                this.inherited(arguments);
            } catch (e) {
                console.error(this.declaredClass, arguments, e);
                throw e;
            }
        }
    });
});
