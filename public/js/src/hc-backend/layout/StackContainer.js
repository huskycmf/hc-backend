define([
    "dijit/layout/StackContainer",
    "dojo/_base/array"
], function(StackContainer, array) {
    // summary:
    //      Base StackContainer with doLayout = false by default
    //      we do not need to StackContainer to doLayouts

    return require('dojo/_base/declare')([ StackContainer ], {
            doLayout: false,

            onHide: function () {
                try {
                    array.map(this.getChildren(), function (child) {
                        child.onHide && child.onHide();
                    });
                } catch (e) {
                    console.error(this.declaredClass, arguments, e);
                    throw e;
                }
            }
    });
});
