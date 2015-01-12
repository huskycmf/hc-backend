define([
    "dojo/_base/declare",
    "dojo/_base/array",
    "dojo/_base/lang",
    "../_ContentMixin",
    "hc-backend/layout/main/content/_RebuildContainerWidgetsMixin",
    "hc-backend/service/ContentSaver",
    "dijit/_TemplatedMixin",
    "../_LoadableMixin",
    "dojo/Deferred"
], function(declare, array, lang, _ContentMixin, _RebuildContainerWidgetsMixin,
            ContentSaver, _TemplatedMixin, _LoadableMixin, Deferred) {

    return declare([ _ContentMixin, _RebuildContainerWidgetsMixin, _TemplatedMixin ], {
        //  summary:
        //      Add container. Contains widgets who responsible
        //      for adding pages to the system.

        templateString: '<div data-dojo-attach-point="domNode">' +
                            '<div data-dojo-attach-point="containerNode"></div>' +
                        '</div>',

        /**
         * Deferred resolves when all asynchronous data
         * for loading or creating new content in TabWidget
         * are ready. Data might be identifier or other critical options.
         **/
        initializationDeferred: null,

        /**
         * Deferred resolves when all children for current container
         * are created and not added yet.
         * And it is will called after initializationDeferred.
         */
        childrenCreatedDeferred: null,

        containedWidget: null,

        doLayout: false,

        postMixInProperties: function () {
            try {
                this.inherited(arguments);

                if (!this.store) {
                    throw "Store for Content must be defined";
                }

                this.saveService = this._createSaverService(this.store);

                this.saveService.on('created', lang.hitch(this, 'onEntryRefreshed'));
                this.saveService.on('updated', lang.hitch(this, 'onEntryRefreshed'));

                this.own(this.saveService);
            } catch (e) {
                console.error(this.declaredClass, arguments, e);
                throw e;
            }
        },

        getContainedChild: function () {
            try {
                var child = new this.containedWidget({identifier: this.identifier,
                    saveService: this.saveService,
                    router: this.router});

                if (!child.isInstanceOf(_LoadableMixin)) {
                    throw "Child must be mixed with _LoadableMixin";
                }

                return child;
            } catch (e) {
                console.error(this.declaredClass, arguments, e);
                throw e;
            }
        },

        loadExists: function (identifier) {
            try {
                this.identifier = identifier;
                this.saveService.set('identifier', identifier);

                this.childrenCreatedDeferred.then(lang.hitch(this, function (child) {
                    try {
                        child.loadData(identifier);
                    } catch (e) {
                        console.error(this.declaredClass, arguments, e);
                        throw e;
                    }
                }));

                this.initializationDeferred.isFulfilled() || this.initializationDeferred.resolve();
            } catch (e) {
                console.error(this.declaredClass, arguments, e);
                throw e;
            }
        },

        createNew: function () {
            try {
                this.initializationDeferred.isFulfilled() || this.initializationDeferred.resolve();
            } catch (e) {
                console.error(this.declaredClass, arguments, e);
                throw e;

            }
        },

        onEntryRefreshed: function (object) {
            this.initializationDeferred.then(lang.hitch(this, function () {
                try {
                    if (!object || !object.data) {
                        throw "Invalid object given for onEntryRefreshed, data properties is a must";
                    }

                    data = object.data;
                    console.log("onEntryRefreshed >>>", data);
                    array.forEach(this.getChildren(), function (child) {
                        try {
                            child.set('value', data);
                        } catch (e) {
                            console.error(this.declaredClass, arguments, e);
                            throw e;
                        }
                    });
                } catch (e) {
                    console.error(this.declaredClass, arguments, e);
                    throw e;
                }
            }));
        },

        destroyRecursive: function () {
            try {
                array.forEach(this.getChildren(), function (child){
                    child && child.destroyRecursive && child.destroyRecursive();
                }, this);

                this.inherited(arguments);
            } catch (e) {
                console.error(this.declaredClass, arguments, e);
                throw e;
            }
        },

        init: function () {
            try {
                var def = this.inherited(arguments);
                if (def === false) {
                    return false;
                }

                this.childrenCreatedDeferred = new Deferred();
                def.then(lang.hitch(this, function () {
                    try {
                        var child = this.getContainedChild();
                        this.childrenCreatedDeferred.resolve(child);
                        this.addChild(child);
                    } catch (e) {
                        console.error(this.declaredClass, arguments, e);
                        throw e;
                    }
                }));
            } catch (e) {
                console.error(this.declaredClass, arguments, e);
                throw e;
            }
        },

        _createSaverService: function (store) {
            try {
                return new ContentSaver({collectionStore: store});
            } catch (e) {
                console.error(this.declaredClass, arguments, e);
                throw e;
            }
        },

        destroyWidgets: function () {
            try {
                array.forEach(this.getChildren(), function (child){
                    this.removeChild(child);
                    child && child.destroyRecursive && child.destroyRecursive();
                }, this);
            } catch (e) {
                console.error(this.declaredClass, arguments, e);
                throw e;
            }
        },

        handle: function (router, route) {
            try {
                if (route.params.id) {
                    this.loadExists(route.params.id);
                } else {
                    this.createNew();
                }

                this.inherited(arguments);
            } catch (e) {
                console.error(this.declaredClass, arguments, e);
                throw e;
            }
        }
    });
});
