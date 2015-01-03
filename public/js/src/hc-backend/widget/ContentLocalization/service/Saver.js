define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/Deferred",
    "hc-backend/router",
    "hc-backend/config",
    "dojo/request",
    "dojo-common/store/JsonRest",
    "dojo/store/Cache",
    "dojo/store/Memory",
    "dojo/json",
    "dojo/Stateful",
    "dojo/Evented",
    "dojo-common/response/Data",
    "dojo-common/response/Status",
    "dojo-common/response/Message"
], function(declare, lang, Deferred,
            router, config, request, JsonRest, Cache, Memory,
            JSON, Stateful, Evented,
            _DataMixin, _StatusMixin, _MessageMixin) {
    return declare([Stateful, Evented], {

            polyglotCollectionPath: '/locale',
            polyglotCollectionId: 'id',

            polyglotCollectionStore: null,
            polyglotStore: null,
            polyglotStoreDeferred: null,

            constructor: function (args) {
                try {
                   lang.mixin(this, args);
                   this.polyglotStoreDeferred = new Deferred();

                } catch (e) {
                     console.error(this.declaredClass, arguments, e);
                     throw e;
                }
            },

            _identifierSetter: function (identifier) {
                try {
                    if (identifier == this.identifier) {
                        return;
                    }

                    var target = this.polyglotCollectionStore
                                     .getTarget(identifier)+this.polyglotCollectionPath;

                    this.polyglotStore = Cache(
                                            JsonRest({target: target,
                                                    idProperty: this.polyglotCollectionId}),
                                            Memory({idProperty: this.polyglotCollectionId}));

                    if (this.polyglotStoreDeferred !== null &&
                        !this.polyglotStoreDeferred.isResolved()) {
                        this.polyglotStoreDeferred.resolve(this.polyglotStore);
                    }

                    this.identifier = identifier;
                } catch (e) {
                     console.error(this.declaredClass, arguments, e);
                     throw e;
                }
            },

            _initPolyglotStore: function () {
                try {
                    var def = new Deferred();
                    var _self = this;
                    this.polyglotCollectionStore.put({}).then(function (resp) {
                        try {
                            var response = new declare([_DataMixin, _StatusMixin, _MessageMixin])(resp);
                            response.optional('message');

                            if (response.isError()) {
                                return def.reject(response.getMessage());
                            }

                            var dataResult = response.getData();
                            if (!dataResult || !dataResult.id) {
                                return def.reject("Server does not return identifier of created entry");
                            }

                            _self.set('identifier', dataResult.id);
                            def.resolve();
                        } catch (e) {
                            console.error(_self.declaredClass, arguments, e);
                            throw e;
                        }
                    }, function (err) {
                        def.reject(err);
                        console.error("Error in asynchronous call", err, arguments);
                    });

                    return def;
                } catch (e) {
                     console.error(this.declaredClass, arguments, e);
                     throw e;
                }
            },

            save: function (data) {
                try {
                    var def = new Deferred();
                    var _self = this;

                    var storeData = function (data) {
                        _self._storeData(data).then(function (resp){
                            var response = new declare([_DataMixin])(resp);
                            response.optional('data');

                            var dataResult = response.getData();
                            if (!dataResult || !dataResult.id) {
                                _self.emit('updated', {'data': data});
                            } else {
                                data['id'] = dataResult.id;
                                _self.emit('created', {'data': data});
                            }

                            def.resolve(resp);
                        }, function (err) {
                            def.reject(err);
                            console.error("Error in asynchronous call", err, arguments);
                        });
                        return def;
                    };

                    if (_self.polyglotStore === null) {
                        _self._initPolyglotStore().then(function () {
                            try {
                                storeData(data);
                            } catch (e) {
                                 console.error(_self.declaredClass, arguments, e);
                                 throw e;
                            }
                        }, function (err) {
                            def.reject(err);
                            console.error("Error in asynchronous call", err, arguments);
                        })
                    } else {
                        console.log("!!!PolyglotStore already defined!!!");
                        storeData(data);
                    }

                    return def;
                } catch (e) {
                     console.error(this.declaredClass, arguments, e);
                     throw e;
                }
            },

            _storeData: function (data) {
                try {
                     /**
                      * Store data to the server, it is will be stored with PUT method
                      * always, till we have polyglotIdentifier inside data
                      **/
                      console.log("Data is >>>", data, "Store >>", this.polyglotStore);
                      return this.polyglotStore.put(data);
                } catch (e) {
                     console.error(this.declaredClass, arguments, e);
                     throw e;
                }
            }
    });
});
