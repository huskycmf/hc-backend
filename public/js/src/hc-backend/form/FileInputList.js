define([
    "dojo/_base/declare",
    "dojo-common/form/FileInputList",
    "hc-backend/config"
], 
function(declare, FileInputList, config){

    return declare([ FileInputList ], {
        uploadInputName: 'upload',

        postMixInProperties: function () {
            try {
                this.deleteUrl = config.get('primaryRoute')+"/images";
                this.uploadingUrl = config.get('primaryRoute')+"/images";

                this.inherited(arguments);
            } catch (e) {
                 console.error(this.declaredClass, arguments, e);
                 throw e;
            }
        }
    });
});
