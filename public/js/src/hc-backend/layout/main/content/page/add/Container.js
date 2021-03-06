define([
    "dojo/_base/declare",
    "../../_ContentMixin",
    "dojo-common/store/JsonRest",
    "dijit/_TemplatedMixin",
    "./widget/Form",
    "dojo/text!./templates/Container.html"
], function(declare, _ContentMixin,
            JsonStore, _TemplatedMixin,
            Form, template) {

    return declare([ _ContentMixin, _TemplatedMixin ], {
        //  summary:
        //      Add container. Contains widgets who responsible
        //      for adding pages to the system.
        templateString: template,
        
        baseClass: 'pageAdd',
        
        postCreate: function() {
            // summary:
            //      Creating store with data from back-end and initialize Menu widget
            //      with requested data.
            try {
                this.addChild(new Form());
            } catch (e) {
                console.error(this.declaredClass, arguments, e);
                throw e;
            }
        }
    });
});
