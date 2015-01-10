define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/Deferred",
    "hc-backend/config",
    "./_SaverMixin",
    "dojo-common/response/Data",
    "dojo-common/response/Status",
    "dojo-common/response/Message"
], function(declare, lang, Deferred, config, _SaverMixin,
            _DataMixin, _StatusMixin, _MessageMixin) {
    return declare([_SaverMixin], {

            collectionStore: null,

            constructor: function (args) {
                try {
                   lang.mixin(this, args);
                } catch (e) {
                     console.error(this.declaredClass, arguments, e);
                     throw e;
                }
            },

            save: function (data) {
                try {
                    var def = new Deferred();

                    this.collectionStore.put(data).then(lang.hitch(this, function (resp){
                        var response = new declare([_DataMixin, _StatusMixin, _MessageMixin])(resp);
                        response.optional('data');
                        response.optional('message');

                        var dataResult = response.getData();
                        if (!dataResult || !dataResult.id) {
                            this.emit('updated', {'data': data});
                        } else {
                            data['id'] = dataResult.id;
                            this.emit('created', {'data': data});
                        }

                        def.resolve(resp);
                    }), function (err) {
                        def.reject(err);
                        console.error("Error in asynchronous call", err, arguments);
                    });

                    return def;
                } catch (e) {
                     console.error(this.declaredClass, arguments, e);
                     throw e;
                }
            }
    });
});
