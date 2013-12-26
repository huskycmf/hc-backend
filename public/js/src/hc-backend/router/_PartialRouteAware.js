define([
    "dojo/_base/declare"
], function(declare) {
    return declare('backend.router._PartialRouteAware', [], {
        constructor: function (args) {
            try {
                if (!args || !args.partial || !args.partial['register']) {
                    throw "Partial module must be defined, and must contains [register] method";
                }
                this._partial = args.partial;
            } catch (e) {
                console.error(this.declaredClass, arguments, e);
                throw e;
            }
        },

        _getPartial: function () {
            try {
                return this._partial;
            } catch (e) {
                 console.error(this.declaredClass, arguments, e);
                 throw e;
            }
        }
    });
});
