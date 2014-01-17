define([
    "dojo/_base/declare",
    "./ContentPane"
], function(declare, ContentPane) {
    return declare([ ContentPane ], {
            getHash: function () {
                try {
                    throw "Abstract method must be overwritten in children";
                } catch (e) {
                     console.error(this.declaredClass, arguments, e);
                     throw e;
                }
            }
    });
});
