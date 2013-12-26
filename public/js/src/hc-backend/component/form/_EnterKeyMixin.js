define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/aspect",
    "dojo/keys",
    "dojo/on",
    "./_PersisterMixin"
], function(declare, lang, aspect, keys, on, _PersisterMixin) {

    return declare([ _PersisterMixin ], {
        //  summary:
        //      Form mixin to add possibilities to send form by pressing
        //      enter in last form field
        constructor: function () {
            try {
                 if (this.postCreate) {
                     aspect.after(this, 'postCreate', lang.hitch(this, '__registerEnterToSubmit'));
                 }
            } catch (e) {
                 console.error(this.declaredClass, arguments, e);
                 throw e;
            }
        },

        __registerEnterToSubmit: function () {
            try {
                if (this.enterNode) {
                    on(this.enterNode, "keypress", lang.hitch(this, function(evt){
                        var charOrCode = evt.charCode || evt.keyCode;

                        if (charOrCode == keys.ENTER) {
                            this.save();
                        }
                    }));
                }
            } catch (e) {
                console.error(this.declaredClass, arguments, e);
                throw e;
            }
        }
    });
});
