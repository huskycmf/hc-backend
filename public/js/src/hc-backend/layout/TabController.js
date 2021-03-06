define([
    "require",
	"dojo/_base/declare",
    "../hash",
    "./ContentPaneHash",
	"dijit/layout/TabController",
    "dojo/text!./templates/TabButton.html"
], function(_require, declare, hash, ContentPaneHash, TabController, template){

	return declare("backend.layout.TabController", TabController, {
		// summary:
		//		Overridden dijit.layout.TabController, for adding functionality
        //      to set hash in the browser when user click on one of tab.
		// description:
		//		Lets the user to change a hash by clicking on one of tabs

        buttonWidget: declare([TabController.TabButton], {templateString: template}),

        onButtonClick: function (/*dijit._WigetBase*/ page) {
            try {
                if (!page.isInstanceOf(ContentPaneHash)) {
                    return this.inherited(arguments);
                }

                this.inherited(arguments);
                console.debug("Hash will be switched to >>", page.getHash());

                hash(page.getHash());
            } catch (e) {
                 console.error(this.declaredClass, arguments, e);
                 throw e;
            }
        }
	});
});
