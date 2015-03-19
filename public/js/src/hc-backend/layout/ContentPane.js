define([
    "dijit/layout/ContentPane",
    "dojo/_base/array"
], function(ContentPane, array) {
    // summary:
    //      Base ContentPane with doLayout = false by default
    //      we do not need to ContentPane to doLayouts

    return require('dojo/_base/declare')([ ContentPane ], {
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
