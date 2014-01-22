define([
    "dojo/_base/declare",
    "dojo/_base/array",
    "hc-backend/layout/main/content/_ContentMixin",
    "hc-backend/layout/main/content/_RebuildContainerWidgetsMixin",
    "dijit/_TemplatedMixin",
    "dojo/text!./templates/Container.html"
], function(declare, array, _ContentMixin, _RebuildContainerWidgetsMixin,
            _TemplatedMixin, template) {

    return declare([ _ContentMixin, _RebuildContainerWidgetsMixin, _TemplatedMixin ], {
        //  summary:
        //      Add container. Contains widgets who responsible
        //      for adding pages to the system.
        templateString: template,

        langContainer: null,

        init: function () {
            try {
                if (!this._langContainerWidget) {
                    this._langContainerWidget = new this.langContainer({router: this.router});
                    this.addChild(this._langContainerWidget);
                }
            } catch (e) {
                 console.error(this.declaredClass, arguments, e);
                 throw e;
            }
        },

        selectLanguageTab: function (language) {
            this._langContainerWidget &&
            this._langContainerWidget.selectLanguageTab(language);
        },

        destroyWidgets: function () {
            try {
                this._langContainerWidget.destroyRecursive();
                this.removeChild(this._langContainerWidget);
                this._langContainerWidget = null;
            } catch (e) {
                 console.error(this.declaredClass, arguments, e);
                 throw e;
            }
        }
    });
});
