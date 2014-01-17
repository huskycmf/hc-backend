define([
    "dojo/_base/declare",
    "dojo/_base/lang"
], function(declare, lang) {
    // module:
    //     hc-backend/dgrid/_Refresher

    return declare(null, {
        //  summary:
        //      Mixin to implement safe refresh method for the grid
        refresh: function () {
            try {
                if (this.__lock) {
                    console.log("REFRESH CAUGHT BY LOCK");
                    return;
                }
                this.__lock = true;
                var def = this.inherited(arguments);

                if (def.then) {
                    def.then(lang.hitch(this, function (){this.__lock = false;}));
                } else {
                    this.__lock = false;
                }

                console.log("REFRESHED");
            } catch (e) {
                console.error(this.declaredClass, arguments, e);
                throw e;
            }
        }
    });
});
