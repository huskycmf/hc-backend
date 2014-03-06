define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "./Form",
    "hc-backend/layout/ContentPaneHash",
    "../service/Saver",
    "dojo/dom-class",
    "underscore"
], function(declare, lang, Form, ContentPane, Saver, domClass, u) {

    return declare([ ContentPane ], {

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
                var _store = this.saveService.get('polyglotStore');
                var _res = _store.query({lang: this.lang});

                _res.then(lang.hitch(this, function (res){
                    u.each(u.values(res), function (item){
                        console.log("Found form for language >>", this.lang, item);
                        this.set('value', item);
                    }, this);
                }), function (err) {
                  console.error("Error in asynchronous call", err, arguments);
                })
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

                if (!this.identifier) {
                    var watch = this.watch('identifier', function (){
                        watch.unwatch();
                        this.load();
                    })
                } else {
                    this.load();
                }
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
                if (!this.form) {
                    // Wait until form will be set, to transfer values
                    var _watcher = this.watch('form', function (){
                        _watcher.unwatch();
                        this.form.set('value', value);
                    });
                } else {
                    this.form.set('value', value);
                }
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
