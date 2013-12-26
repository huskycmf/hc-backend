define([
    "require",
	"dojo/_base/declare",
    "../hash",
	"dijit/layout/TabController"
], function(_require, declare, hash, TabController){

	return declare("backend.layout.TabController", TabController, {
		// summary:
		//		Overridden dijit.layout.TabController, for adding functionality
        //      to set hash in the browser when user click on one of tab.
		// description:
		//		Lets the user to change a hash by clicking on one of tabs

        onButtonClick: function (/*dijit._WigetBase*/ page) {
            try {
                if (!page.isInstanceOf(_require('./ContentPaneHash'))) {
                    return this.inherited(arguments);
                }

                this.inherited(arguments);
                if (page.router && page.router.getFullRoute()) {
                    console.debug("Hash will be switched to >>", page.router.getFullRoute());
                    hash(page.router.getFullRoute());
                }
            } catch (e) {
                 console.error(this.declaredClass, arguments, e);
                 throw e;
            }
        }
	});
});
