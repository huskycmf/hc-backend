define(["dojo/_base/declare",
        "../../package",
        "dijit/form/DropDownButton",
        "./DropDownContainer"],
    function(declare, _Package, DropDownButton, DropDownContainer) {

    return declare("MyPackage", [ DropDownButton, _Package ], {
        // summary:
        //      Profile package. Will provide user abilities to configure
        //      his profile.

        iconClass: 'icon my',
        dropDown: new DropDownContainer(),

        registerModule: function (module) {
            try {
                this.inherited(arguments);
                this.dropDown.addChild(module.createInstance());
            } catch (e) {
                 console.error(this.declaredClass, arguments, e);
                 throw e;
            }
        }
    });
});
