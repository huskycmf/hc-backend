define(['dojo/_base/declare', 'dojo/Stateful', 'dojo/_base/lang'], function (declare, Stateful, lang) {

    var Config = declare([Stateful], {

        baseRoute: '',
        packages: [],

        constructor: function (args) {
            try {
                if (typeof(args) !== "undefined") {
                    lang.mixin(this, args);
                }
            } catch (e) {
                 console.error(this.declaredClass, arguments, e);
                 throw e;
            }
        },

        _primaryRouteGetter: function () {
            try {
                if (!this.primaryRoute) {
                    return '/superman';
                }
                return this.primaryRoute;
            } catch (e) {
                 console.error(this.declaredClass, arguments, e);
                 throw e;
            }
        },

        _supportedLanguagesGetter: function () {
            try {
                if (!this.languages) {
                    throw "At least one languages must be defined in hc-backend/config.js";
                }

                return this.languages;
            } catch (e) {
                 console.error(this.declaredClass, arguments, e);
                 throw e;
            }
        },

        _contentPackagesGetter: function () {
            try {
                if (!this.packages || !this.packages['content']) {
                    return [];
                }
                return this.packages['content'];
            } catch (e) {
                 console.error(this.declaredClass, arguments, e);
                 throw e;
            }
        },

        _toolbarPackagesGetter: function () {
            try {
                if (!this.packages || !this.packages['toolbar']) {
                    return [];
                }
                return this.packages['toolbar'];
            } catch (e) {
                 console.error(this.declaredClass, arguments, e);
                 throw e;
            }
        }
    });

    return new Config(window['huskyConfig']);
});
