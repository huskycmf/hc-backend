define([
    "dojo/_base/declare",
    "hc-backend/layout/main/content/manage/_FormMixin",
    "../service/Saver",
    "hc-backend/component/form/_FormChangeableMixin"
], function(declare, _FormMixin, Saver, _FormChangeableMixin) {

    return declare([ _FormMixin, _FormChangeableMixin ], {

        _setValueAttr: function (values) {
            try {
                this.inherited(arguments);

                if (values['lang'] && values['lang'].length) {
                    this.set('lang', values['lang']);
                }
            } catch (e) {
                 console.error(this.declaredClass, arguments, e);
                 throw e;
            }
        },

        _getValueAttr: function () {
            try {
                var values = this.inherited(arguments);

                values['lang'] = this.get('lang');

                return values;
            } catch (e) {
                 console.error(this.declaredClass, arguments, e);
                 throw e;
            }
        }
    });
});
