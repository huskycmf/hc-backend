define([
    "dojo/_base/declare",
    "dijit/form/Form",
    "hc-backend/component/form/_FormChangeableMixin"
], function(declare, Form, _FormChangeableMixin) {

    return declare([ Form, _FormChangeableMixin ], {
        //  summary:
        //      Form widget for adding page to the CMS database

        doLayout: false,

        isLayoutContainer: false,

        postCreate: function () {
            try {
                // Check is defined in template saveButtonWidget and resetButtonWidget,
                // if they defined, they will enabled/disabled according on form state
                if (this.saveButtonWidget && this.resetButtonWidget) {
                    this.watch('changed', function (name, oldValue, changed){
                        if (changed) {
                            this.saveButtonWidget.set('disabled', false);
                            this.resetButtonWidget.set('disabled', false);
                        } else {
                            this.saveButtonWidget.set('disabled', true);
                            this.resetButtonWidget.set('disabled', true);
                        }
                    })
                }

                this.inherited(arguments);
            } catch (e) {
                 console.error(this.declaredClass, arguments, e);
                 throw e;
            }
        },

        _setValueAttr: function (values) {
            try {
                this.inherited(arguments);

                console.log("Values set in form >>>", values);
                if (values['id']) {
                    this.__id = values['id'];
                }

                if (values['lang'] && values['lang'].length) {
                    this.set('lang', values['lang']);
                }
            } catch (e) {
                 console.error(this.declaredClass, arguments, e);
                 throw e;
            }
        },

        _getValueAttr: function () {
            try {
                var values = this.inherited(arguments);

                if (this.__id) {
                    values['id'] = this.__id;
                }

                if (!this.lang) {
                    throw "Lang must be defined for the form";
                }

                values['lang'] = this.get('lang');

                return values;
            } catch (e) {
                 console.error(this.declaredClass, arguments, e);
                 throw e;
            }
        },

        onSave: function () {
            try {
                 alert("On save");
            } catch (e) {
                 console.error(this.declaredClass, arguments, e);
                 throw e;
            }
        },

        cancel: function () {
            try {
                this.saveButtonWidget &&
                    this.saveButtonWidget.cancel &&
                        this.saveButtonWidget.cancel();
            } catch (e) {
                 console.error(this.declaredClass, arguments, e);
                 throw e;
            }
        },

        save: function () {
            try {
                console.log("Save data >>", this.get('value'));
                this.onSave(this.get('value'));
            } catch (e) {
                 console.error(this.declaredClass, arguments, e);
                 throw e;
            }
        }
    });
});
