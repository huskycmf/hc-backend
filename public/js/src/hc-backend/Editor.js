define([
    "dojo/_base/declare",
    "hc-backend/config",
    "dojo-ckeditor/Editor"
],
    function(declare, config, Editor){

        return declare([ Editor ], {
            _setUploadableAttr: function (flag) {
                try {
                    if (flag === true) {
                        this.settings['filebrowserUploadUrl'] = config.get('primaryRoute')+'/images';
                    }
                } catch (e) {
                     console.error(this.declaredClass, arguments, e);
                     throw e;
                }
            }
        });
    });
