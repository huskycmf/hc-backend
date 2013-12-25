define([
    "../../../../../../../../sugarcms/public/js/library/dojo/_base/declare",
    "../../../../../../../sugarcms/public/js/library/dojo/_base/lang",
    "dojo/_base/array",
    "dojo/dom-class",
    "dojo/aspect",
    "dojo/Deferred",
    "dojo-common/response/error/Recognition",
    "dijit/form/_FormValueMixin",
    "dijit/form/_TextBoxMixin",
    "./_PersisterMixin"
], function(declare, lang, array, domClass, aspect, Deferred, ErrorRecognition,
            _FormValueMixin, _TextBoxMixin, _PersisterMixin) {

    return declare([ _PersisterMixin ], {
        //  summary:
        //      Form mixin to add possibilities to send form to the backend

        constructor: function () {
            try {
                this.watch('resourceId', lang.hitch(this, 'loadResource'));
            } catch (e) {
                 console.error(this.declaredClass, arguments, e);
                 throw e;
            }
        },

        reset: function () {
            try {
                this.loadResource('', '', this.resourceId);
            } catch (e) {
                 console.error(this.declaredClass, arguments, e);
                 throw e;
            }
        },

        loadResource: function (name, oldValue, resourceId) {
            //  summary:
            //      Method will load resource from defined resourceUrl
            try {
                if (this.domNode) {
                    domClass.add(this.domNode, 'loading');
                }

                var _self = this;

                var resp = this._getPersister().get(resourceId), promise = null;
                if (!resp.then) {
                    promise = new Deferred();
                    promise.resolve(resp);
                } else {
                    promise = resp;
                }

                promise.then(lang.hitch(this, '_handleResource'),
                             lang.hitch(this, '_handleResourceLoadFail'))
                       .always(function () {
                           if (_self.domNode) {
                              domClass.remove(_self.domNode, 'loading');
                           }
                       });
            } catch (e) {
                 console.error(this.declaredClass, arguments, e);
                 throw e;
            }
        },

        _handleResource: function (response) {
            //  summary:
            //      Method will handle response then extract resource
            //      and try to bind it to the form which has mixed this class
            //      inside.
            try {

                array.forEach(this.getChildren(), function (child) {
                    if (response[child.get('name')]) {
                        var value = response[child.get('name')];

                        if (child.isInstanceOf(_TextBoxMixin)) {
                            child.set('displayedValue', value);
                        } else if (child.isInstanceOf(_FormValueMixin)) {
                            child.set('value', value);
                        }
                    }
                });
            } catch (e) {
                 console.error(this.declaredClass, arguments, e);
                 throw e;
            }
        },

        _handleResourceLoadFail: function (error) {
            try {
                var _rec = new ErrorRecognition(error);
                alert("IS_RETIRABLE >>>" + _rec.isRetirable());
            } catch (e) {
                 console.error(this.declaredClass, arguments, e);
                 throw e;
            }
        }
    });
});
