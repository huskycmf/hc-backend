define([
    "require",
    "dojo/_base/declare",
    "dojo/Deferred",
    "dojo/DeferredList",
    "dojo/_base/lang",
    "dojo/_base/array",
    "dijit/_Widget",
    "underscore/underscore"
], function(_require, declare, Deferred, DeferredList, lang, array, _Widget, u) {
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
                    deferred.push(def);
                }, this);

                var list = new DeferredList(deferred);
                return list.then(lang.hitch(this, function (){
                    u.each(u.sortBy(this.packages, function (pack){return pack.priority;}),
                           this.registerNewPackage, this);
                }));
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
