define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/_base/array",
    "./Form",
    "dojo/Deferred",
    "hc-backend/layout/ContentPaneHash",
    "../service/Saver",
    "dojo/dom-class",
    "underscore",
    "dojo-ckeditor/Editor"
], function(declare, lang, array, Form, Deferred,
            ContentPaneHash, Saver, domClass, underscore,
            Editor) {

    return declare([ ContentPaneHash ], {

        saveService: null,
        lang: '',
        loadingDeferred: null,
        identifier: null,

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

        postCreate: function () {
            try {
                domClass.add(this.domNode, 'dijitHidden');

                this.inherited(arguments);
            } catch (e) {
                 console.error(this.declaredClass, arguments, e);
                 throw e;
            }
        },

        loadData: function (identifier) {
            try {
                this.loadingDeferred = new Deferred();
                this.set('identifier', identifier);

                this.saveService
                    .get('polyglotStoreDeferred')
                    .then(lang.hitch(this, function (store){
                        var _res = store.query({lang: this.lang});

                        _res.then(lang.hitch(this, function (res){
                            if (res.length < 1 ) {
                                this.loadingDeferred.resolve();
                                return this.set('value', []);
                            }

                            array.forEach(underscore.values(res), function (item) {
                                console.log("Found form for language >>", this.lang, item);
                                this.set('value', item);
                            }, this);

                            this.loadingDeferred.resolve();
                        }));
                }));
            } catch (e) {
                 console.error(this.declaredClass, arguments, e);
                 throw e;
            }
        },

        onShow: function () {
            try {
                if (this.loadingDeferred) {
                    this.loadingDeferred.then(lang.hitch(this, '_init'));
                } else {
                    this._init();
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
                this._init();
                this.form.set('value', value);
            } catch (e) {
                console.error(this.declaredClass, arguments, e);
                throw e;
            }
        },

        _init: function () {
            try {
                if (this.form) {
                    return;
                }

                var form = new this.formWidget({saveService: this.saveService,
                                                identifier: this.identifier,
                                                lang: this.lang});

                if (!form.isInstanceOf(Form)) {
                    throw "Form must have valid type";
                }

                this.form = form;

                this.own(form);

                if (array.some(form.getChildren(), function (child) {
                    return child.isInstanceOf(Editor);
                }, this)) {
                    form.on('dojo-ckeditor-ready', lang.hitch(this, function (){
                        domClass.remove(form.domNode, 'dijitHidden');
                        domClass.remove(this.domNode, 'dijitHidden');
                    }));
                } else {
                    domClass.remove(form.domNode, 'dijitHidden');
                    domClass.remove(this.domNode, 'dijitHidden');
                }
                this.addChild(form);
            } catch (e) {
                 console.error(this.declaredClass, arguments, e);
                 throw e;
            }
        }
    });
});
