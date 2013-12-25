define([
    "../../../../../../../../sugarcms/public/js/library/dojo/_base/declare",
    "../../../../../../../sugarcms/public/js/library/dojo/_base/lang",
    "dojo-common/response/_MessageMixin",
    "dojo-common/response/_StatusMixin",
    "./_PersisterMixin"
], function(declare, lang, _MessageMixin, _StatusMixin, _PersisterMixin) {

    return declare([ _PersisterMixin ], {
        //  summary:
        //      Form mixin to add possibilities to send form to the backend

        _successHandler: function (resp) {
            try {
                var _resp = new declare([_MessageMixin, _StatusMixin])(resp);
                this.onSuccess(_resp);
            } catch (e) {
                console.error(this.declaredClass, arguments, e);
                throw e;
            }
        },

        _failHandler: function (resp) {
            try {
                var _resp = new declare([_MessageMixin, _StatusMixin])(resp);
                this.onFail(_resp);
            } catch (e) {
                console.error(this.declaredClass, arguments, e);
                throw e;
            }
        },

        onFail: function () {},
        onSuccess: function () {},

        save: function () {
            try {
                var widget = this.saveWidget,
                    callMeth = function (meth){
                        return ((widget && widget[meth]) ?
                            widget[meth]() :
                            console.warn("Could not found widget to save and method "+meth));
                    };

                callMeth('makeBusy');

                var formData = this.attr('value');

                if (!formData || !this.validate()) {
                    callMeth('cancel');
                    return false;
                }

                if (this._inProgress === true) return;

                this._inProgress = true;

                var params = {};

                if (this.resourceId) {
                    params.id = this.resourceId;
                }

                this._getPersister()
                    .put(formData, params)
                    .then(lang.hitch(this, this._successHandler),
                        lang.hitch(this, this._failHandler))
                    .always(lang.hitch(this, function (){
                        callMeth('cancel');
                        this._inProgress = false;
                    }));
            } catch (e) {
                console.error(this.declaredClass, arguments, e);
                throw e;
            }
        }
    });
});
