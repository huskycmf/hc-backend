define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/_base/array",
    "dijit/_Widget",
    "dijit/_WidgetsInTemplateMixin",
    "dijit/_TemplatedMixin",
    "dijit/layout/ContentPane",
    "./EditForm",
    "dojo/i18n!../../nls/Profile"
], function(declare, lang, array,
            _Widget, _WidgetsInTemplateMixin, _TemplatedMixin,
            ContentPane, EditForm, translate) {

    return declare('PortfolioEditLayout', [ ContentPane ], {
          messages: { 'title': translate['editDialogTitle'],
                      'save': translate['editDialogSave'] },

        postCreate: function () {
            try {
                this.formWidget = new EditForm({data: this.data});
                this.addChild(this.formWidget);

                this.inherited(arguments);
            } catch (e) {
                 console.error(this.declaredClass, arguments, e);
                 throw e;
            }
        },

        grabData: function () {
            try {
                return this.formWidget.attr('value');
            } catch (e) {
                 console.error(this.declaredClass, arguments, e);
                 throw e;
            }
        }
    });
});
