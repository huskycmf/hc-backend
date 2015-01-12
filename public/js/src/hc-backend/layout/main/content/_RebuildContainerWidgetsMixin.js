define([
    "dojo/_base/declare",
    "dojo/Deferred",
    "./_ContentMixin"
], function(declare, Deferred, _ContentMixin) {
    return declare([ _ContentMixin ], {
        // summary:
        //      This is base class for widgets who will containes widgets
        //      inside itself but whant to rebuild all widgets every time
        //      when it is hide or show.

        /**
         * Deferred resolves when all asynchronous data
         * for loading or creating new content in TabWidget
         * are ready. Data might be identifier or other critical options.
         **/
        initializationDeferred: null,

        /**
         * Current route with params
         */
        route: null,

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
                if (this.getChildren().length > 0 ||
                    (this.initializationDeferred && !this.initializationDeferred.isFulfilled())) {
                    return false;
                }

                this.initializationDeferred = new Deferred();
                return this.initializationDeferred;
            } catch (e) {
                console.error(this.declaredClass, arguments, e);
                throw e;
            }
        },

        destroyWidgets: function () {
            try {
                throw "Abstract method destroyWidgets must be overwritten";
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

                this.route = route;

                if (this.initializationDeferred) {
                    this.initializationDeferred.isFulfilled() ||
                    this.initializationDeferred.resolve();
                }

                this.inherited(arguments);
            } catch (e) {
                console.error(this.declaredClass, arguments, e);
                throw e;
            }
        }
    });
});
