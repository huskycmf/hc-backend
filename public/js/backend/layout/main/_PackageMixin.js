define([
    "require",
    "../../../../../../../../sugarcms/public/js/library/dojo/_base/declare",
    "../../../../../../../sugarcms/public/js/library/dojo/Deferred",
    "dojo/DeferredList",
    "dojo/_base/lang",
    "dojo/_base/array",
    "dijit/_Widget"
], function(_require, declare, Deferred, DeferredList, lang, array, _Widget) {
    return declare([ _Widget ], {
        // packages: Array
        //      Array of packages ready to be registered
        //      with current container.
        init: function () {
            try {
                console.debug("All packages in package MIXIN >>>", this.packages);
                var deferred = [];

                array.forEach(this.packages, function (newPackage){
                    if (!newPackage.isInstanceOf(_require('./package'))) {
                        throw "Invalid _Package type in _PackageMixin";
                    }

                    newPackage.on('fire', lang.hitch(this, 'onFire', newPackage));
                    var def = newPackage.init();

                    def.then(lang.hitch(this, 'registerNewPackage', newPackage),
                             function (e){
                                console.error("Could not prepare package >>>", newPackage, e);
                             }
                    );

                    deferred.push(def);
                }, this);

                return new DeferredList(deferred);
            } catch (e) {
                 console.error(this.declaredClass, arguments, e);
                 throw e;
            }
        },


        postCreate: function () {
            // summary:
            //      Processing given array of packages types
            try {

                if (!lang.isArray(this.packages)) {
                    throw "Packages must be defined for container";
                }
                this.inherited(arguments);
            } catch (e) {
                console.error(this.declaredClass, arguments, e);
                throw e;
            }
        },

        registerNewPackage: function (/*package*/ newPackage) {
            // summary:
            //      Register new package
            // tags:
            //      protected
            try {
                console.debug("Package stand to register >>> ", newPackage);

                newPackage.register();

                if (!this.isInstanceOf || !this.isInstanceOf(_require('dijit/_Container'))) {
                    throw "Container must be declared and it is must be an instance of" +
                        " dijit/Container";
                }

                this.addChild(newPackage);
            } catch (e) {
                console.error(this.declaredClass, arguments, e);
                throw e;
            }
        }
    });
});
