define([
    "dojo/_base/declare",
    "dijit/form/Form",
    "../service/Saver",
    "hc-backend/component/form/_FormChangeableMixin"
], function(declare, Form, Saver, _FormChangeableMixin) {

    return declare([ Form, _FormChangeableMixin ], {
        //  summary:
        //      Form widget for adding page to the CMS database

        doLayout: false,

        isLayoutContainer: false,

        rawValues: [],

        postMixInProperties: function () {
            try {
                this.inherited(arguments);

                if (!this.saveService || !this.saveService.isInstanceOf(Saver)){
                    throw "Save service must be defined and must have valid type";
                }
            } catch (e) {
                 console.error(this.declaredClass, arguments, e);
                 throw e;
            }
        },

        postCreate: function () {
            try {
                // Check is defined in template saveButtonWidget and resetButtonWidget,
                // if they defined, they will enabled/disabled according on form state
                if (this.saveButtonWidget && this.resetButtonWidget) {
                    this.watch('changed', function (name, oldValue, changed){
                        if (changed) {
                            console.log("ACTIVATE BUTTONS");
                            this.saveButtonWidget.set('disabled', false);
                            this.resetButtonWidget.set('disabled', false);
                        } else {
                            console.log("DISABLE BUTTONS");
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

                this.rawValues = values;

                if (values['id'] && values['id'] >= 1) {
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

        onSave: function (data) {
            try {
                var self = this,
                    disableBusyButton = function () {
                        self.saveButtonWidget &&
                            self.saveButtonWidget.isBusy &&
                                self.saveButtonWidget.cancel &&
                                    self.saveButtonWidget.cancel();
                    };

                this.saveService.save(data)
                    .then(function () {
                        try {
                            // TODO:
                            //  Do something after create initiated.
                            disableBusyButton();
                            self.refresh();
                        } catch (e) {
                            console.error("Asynchronous call exception", arguments, e);
                            throw e;
                        }
                    }, function (err) {
                        console.error("Error in asynchronous call", err, arguments);
                    }).always(function (){
                        disableBusyButton();
                    });
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
