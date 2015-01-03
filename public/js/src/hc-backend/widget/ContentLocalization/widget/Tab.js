define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "./Form",
    "hc-backend/layout/ContentPaneHash",
    "../service/Saver",
    "dojo/dom-class",
    "underscore"
], function(declare, lang, Form, ContentPaneHash, Saver, domClass, underscore) {

    return declare([ ContentPaneHash ], {

        saveService: null,
        lang: '',

        postMixInProperties: function () {
            try {
                if (!this.formWidget) {
                    throw "Form must be defined";
                }

                if (!this.saveService || !this.saveService.isInstanceOf(Saver)){
                    throw "Save service must be defined and must have valid type";
                }

                this.inherited(arguments);
            } catch (e) {
                 console.error(this.declaredClass, arguments, e);
                 throw e;
            }
        },

        load: function () {
            try {
                this.saveService
                    .get('polyglotStoreDeferred')
                    .then(lang.hitch(this, function (store){
                        var _res = store.query({lang: this.lang});

                        _res.then(lang.hitch(this, function (res){
                            if (res.length < 1 ) {
                                return this.set('value', []);
                            }
                            underscore.each(underscore.values(res), function (item){
                                console.log("Found form for language >>", this.lang, item);
                                this.set('value', item);
                            }, this);
                        }), function (err) {
                            console.error("Error in asynchronous call", err, arguments);
                        });
                }));
            } catch (e) {
                 console.error(this.declaredClass, arguments, e);
                 throw e;
            }
        },

        onShow: function () {
            try {
                if (!this.form) {
                    this._init();
                }
                this.load();
            } catch (e) {
                 console.error(this.declaredClass, arguments, e);
                 throw e;
            }
        },

        getHash: function () {
            try {
                if (this.identifier) {
                    return this.router.assemble({id: this.identifier, lang: this.lang}, '/:lang');
                } else {
                    return this.router.assemble({lang: this.lang}, '/:lang');
                }
            } catch (e) {
                console.error(this.declaredClass, arguments, e);
                throw e;
            }
        },

        _setValueAttr: function (value) {
            try {
                this.form.set('value', value);
            } catch (e) {
                console.error(this.declaredClass, arguments, e);
                throw e;
            }
        },

        _setFormAttr: function (form) {
            try {
                this.form = form;
                this.own(this.form);
            } catch (e) {
                 console.error(this.declaredClass, arguments, e);
                 throw e;
            }
        },

        _init: function () {
            try {
                var form = new this.formWidget({saveService: this.saveService});

                if (!form.isInstanceOf(Form)) {
                    throw "Form must have valid type";
                }

                this.set('form', form);

                var domNode = form.domNode;

                form.set('lang', this.lang);
                form.on('ready', function (){
                    domClass.remove(domNode, 'dijitHidden');
                });

                this.addChild(form);
            } catch (e) {
                 console.error(this.declaredClass, arguments, e);
                 throw e;
            }
        }
    });
});
