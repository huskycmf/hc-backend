define([
    "../../../../../../../sugarcms/public/js/library/dojo/_base/declare",
    "../../../../../../sugarcms/public/js/library/dijit/registry",
    "dojo/_base/array"
], function(declare, registry, array) {
    // module:
    //     backend/grid/_ListCutomRowsWidget
    return declare([ ], {
        //  summary:
        //      Grid widget mixin. Will provide ability to
        //      clear memory from widgets created by custom row formatter.
        //      This widget should be mixed in only if you have own created
        //      widgets inside body of row.
        removeRow: function (node) {
            try {
                this.inherited(arguments);

                array.forEach(registry.findWidgets(node),function (widget){
                    if (widget.destroyRecursive) {
                        widget.destroyRecursive();
                    }
                });
            } catch (e) {
                console.error(this.declaredClass, arguments, e);
                throw e;
            }
        }
    });
});
