define([
    "dojo/_base/declare",
    "./ContentPane"
], function(declare, ContentPane) {
    // summary:
    //      ContentPaneHash is the expansion for BaseContentPane,
    //      it is comes for store hash in the public hash attribute,
    //      inside this module. This attribute might be used by
    //      TabContainer or StackContainer.
    return declare([ ContentPane ], {
        // hash: [public] String
        //      Contains hash which would be represent
        //      path which can be used for rich this ContentPane
        hash: '',

        postMixInProperties: function () {
            try {
                this.inherited(arguments);

                if (!this.hash) {
                    throw "Hash for this type of ContentPane is mandatory";
                }
            } catch (e) {
                 console.error(this.declaredClass, arguments, e);
                 throw e;
            }
        }
    });
});
