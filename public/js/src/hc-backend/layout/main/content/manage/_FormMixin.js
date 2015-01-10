define([
    "dojo/_base/declare",
    "dijit/form/Form",
    "dojo/_base/array",
    "dojo/dom-class",
    "hc-backend/service/_SaverMixin",
    "hc-backend/component/form/_FormChangeableMixin",
    "dojo-ckeditor/Editor"
], function(declare, Form, array, domClass, _SaverMixin, _FormChangeableMixin, Editor) {

    return declare([ Form, _FormChangeableMixin ], {
        //  summary:
        //      Form widget for adding page to the CMS database

        doLayout: false,

        isLayoutContainer: false,

        saveService: null,

        rawValues: [],

        postMixInProperties: function () {
            try {
                this.inherited(arguments);

                if (!this.saveService || !this.saveService.isInstanceOf(_SaverMixin)){
                    throw "Save service must be defined and must have valid type";
                }
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
