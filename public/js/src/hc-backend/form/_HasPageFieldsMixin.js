define([
    "dojo/_base/declare"
], function(declare) {

    return declare(null, {

        _setValueAttr: function (values) {
            try {
                for (var key in values.page) {
                    if (values.page.hasOwnProperty(key)) {
                        values[key] = values.page[key];
                    }
                }

                delete values.page;

                this.inherited(arguments);
            } catch (e) {
                console.error(this.declaredClass, arguments, e);
                throw e;
            }
        },

        _getValueAttr: function () {
            try {
                var values = this.inherited(arguments), key;

                for (key in values) {
                    if (values.hasOwnProperty(key) && key.indexOf('page') === 0) {
                        if (values.page === undefined) {
                            values.page = {};
                        }

                        values.page[key] = values[key];
                        delete values[key];
                    }
                }

                return values;
            } catch (e) {
                console.error(this.declaredClass, arguments, e);
                throw e;
            }
        }
    });
});
