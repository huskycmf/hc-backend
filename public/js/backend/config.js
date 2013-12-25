define(['../../../../../../sugarcms/public/js/library/dojo/_base/declare', '../../../../../sugarcms/public/js/library/dojo/Stateful', 'dojo/_base/lang'], function (declare, Stateful, lang) {

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
        }
    });

    return new Config(window['huskyConfig']);
});
