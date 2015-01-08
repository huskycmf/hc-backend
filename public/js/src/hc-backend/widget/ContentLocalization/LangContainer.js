define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/_base/array",
    "./service/Saver",
    "hc-backend/layout/main/content/_LangContainerMixin",
    "./widget/Tab"
], function(declare, lang, array, SaverService, _LangContainerMixin, Tab) {

    return declare([ _LangContainerMixin ], {

        tabWidget: Tab,
        formWidget: null,
        saveService: null,
        identifier: null,
        store: null,

        postMixInProperties: function () {
            try {
                if (!this.store) {
                    throw "Store for Content must be defined";
                }

                this.saveService = this._createSaverService(this.store);
                this.saveService.on('created', lang.hitch(this, 'onEntryRefreshed'));
                this.saveService.on('updated', lang.hitch(this, 'onEntryRefreshed'));

                this.own(this.saveService);

                this.inherited(arguments);
            } catch (e) {
                 console.error(this.declaredClass, arguments, e);
                 throw e;
            }
        },

        loadExists: function (identifier) {
            try {
                this.identifier = identifier;
                this.saveService.set('identifier', identifier);

                this.inherited(arguments);
            } catch (e) {
                console.error(this.declaredClass, arguments, e);
                throw e;
            }
        },

        createNew: function () {
            try {
                this.inherited(arguments);
            } catch (e) {
                 console.error(this.declaredClass, arguments, e);
                 throw e;

            }
        },

        _createSaverService: function (store) {
            try {
                return new SaverService({polyglotCollectionStore: store});
            } catch (e) {
                console.error(this.declaredClass, arguments, e);
                throw e;
            }
        },

        getChildForLang: function (langIdentifier, langTitle) {
            try {
                return new this.tabWidget({title: langTitle || langIdentifier,
                                           lang: langIdentifier,
                                           identifier: this.identifier,
                                           formWidget: this.formWidget,
                                           saveService: this.saveService,
                                           router: this.router});
            } catch (e) {
                console.error(this.declaredClass, arguments, e);
                throw e;
            }
        }
    });
});
