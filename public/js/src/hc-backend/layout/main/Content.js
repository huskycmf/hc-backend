define([
    "../TabContainer",
    "dojo/_base/declare",
    "./_PackageMixin"
], function(TabContainer, declare, _PackageMixin) {

    return declare('main.Content', [ TabContainer, _PackageMixin ], {
//        style :"width: 500px; height: 200px;",
        tabPosition: "left-h",

        onFire: function (firePackage) {
            // summary:
            //      Callback method, called every time
            //      when router match at least one of
            //      the registered child
            try {
                this.selectChild(firePackage);
            } catch (e) {
                 console.error(this.declaredClass, arguments, e);
                 throw e;
            }
        }
    });
});
