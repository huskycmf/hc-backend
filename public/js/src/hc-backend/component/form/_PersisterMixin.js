define([
    "dojo/_base/declare"
], function(declare) {

    return declare([ ], {
        //  summary:
        //      Form mixin to add possibilities to persist form

        _getPersister: function () {
            //  summary:
            //      This method must return persister
            //      which belongs to overloading widget.
            try {
                throw "Must be overloaded";
            } catch (e) {
                 console.error(this.declaredClass, arguments, e);
                 throw e;
            }
        }
    });
});
