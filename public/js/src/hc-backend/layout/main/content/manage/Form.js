define([
    "dojo/_base/declare",
    "./_FormMixin",
    "dojo/_base/array",
    "dojo/dom-class",
    "hc-backend/service/_SaverMixin",
    "hc-backend/component/form/_FormChangeableMixin",
    "dojo-ckeditor/Editor"
], function(declare, _FormMixin, array, domClass, _SaverMixin, _FormChangeableMixin, Editor) {

    return declare([ _FormMixin, _FormChangeableMixin ], {
        //  summary:
        //      Form widget for adding page to the CMS database

        postCreate: function () {
            try {
                if (array.some(this.getChildren(), function (child) {
                        return child.isInstanceOf(Editor);
                    }, this)) {
                    this.on('dojo-ckeditor-ready', function (){
                        domClass.remove(this.domNode, 'dijitHidden');
                    });
                } else {
                    domClass.remove(this.domNode, 'dijitHidden');
                }

                this.inherited(arguments);
            } catch (e) {
                 console.error(this.declaredClass, arguments, e);
                 throw e;
            }
        }
    });
});
