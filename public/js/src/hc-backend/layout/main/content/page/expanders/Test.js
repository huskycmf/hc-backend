define([
    "dojo/_base/declare",
    "../../../../ContentPane",
    "../../_ExpansionMixin"
], function(declare, ContentPane, _ExpansionMixin) {
    return declare("PageExpanderTest", [ ContentPane, _ExpansionMixin ], {

        title: 'Page Expander Test',
        content: 'Page expander CONTTTENENENENENENTT',

        postCreate: function () {
            try {
                console.debug("Instance in expander is >>>", this.get('targetInstance'));
                this.inherited(arguments);
            } catch (e) {
                 console.error(this.declaredClass, arguments, e);
                 throw e;
            }
        }
    });
});
