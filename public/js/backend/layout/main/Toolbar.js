define([
    "../../../../../../../../lab-maintainer/public/js/lib/dijit/Toolbar",
    "../../../../../../../sugarcms/public/js/library/dojo/on",
    "dojo/_base/declare",
    "./_PackageMixin",
    "../../hash",
    "dijit/_TemplatedMixin",
    "dojo/text!./templates/Toolbar.html"
], function(Toolbar, on, declare, _PackageMixin, hash, _TemplatedMixin, template) {

    return declare("main.Toolbar", [ Toolbar, _PackageMixin, _TemplatedMixin ], {
        templateString:  template,

        onFire: function (firePackage) {
            // summary:
            //      Callback method, called every time
            //      when router match at least one of
            //      the registered child
            try {
                console.debug("TOOLBAR FIRE >> ", firePackage);
            } catch (e) {
                console.error(this.declaredClass, arguments, e);
                throw e;
            }
        }
    });
});
