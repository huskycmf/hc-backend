define([
    "../../../../../../../../../../../../sugarcms/public/js/library/dojo/_base/declare",
    "../../../../../../../../../../../sugarcms/public/js/library/dojo/_base/lang",
    "dijit/form/Form",
    "dijit/_Widget",
    "dijit/_WidgetsInTemplateMixin",
    "dojo/text!./templates/EditForm.html",
    "dojo/i18n!../../nls/Profile",
    "dijit/form/Button"
], function(declare, lang, Form, _Widget, _WidgetsInTemplateMixin, editFormTemplate, translate) {

    return declare('PortfolioEditForm', [ Form, _WidgetsInTemplateMixin ], {

        messages: { 'name': translate['editFormName']},

        templateString: editFormTemplate,

        postCreate: function () {
            try {
                this.inherited(arguments);
                this.data && this.attr('value', this.data);
            } catch (e) {
                 console.error(this.declaredClass, arguments, e);
                 throw e;
            }
        }
    });
});
