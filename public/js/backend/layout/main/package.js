define([
    "require",
    "../../../../../../../../sugarcms/public/js/library/dojo/Deferred",
    "../../../../../../../sugarcms/public/js/library/dojo/DeferredList",
    "dojo/_base/declare",
    "dojo/_base/array",
    "dojo/_base/lang",
    "dijit/_Widget",
    "./Module",
    "../../router"
], function (_require, Deferred, DeferredList, declare, array, lang, _Widget, Module, router) {
    return declare("BasePackage", [_Widget], {
        // summary:
        //      This is a base class for all Packages in backend
        //      area.

        // target: [readonly] String
        route: '',

        // _modules: [private] Array
        _modules: [],

        // configsOfModules: [protected] Array
        configsOfModules: [],

        // router: [protected] Object
        //      Handler of registered route for package.
        //      It is will provide abilities to register
        //      other nested routes inside this package
        router: null,

        constructor: function () {
            try {
                this.route = '';
                this._modules = this.configsOfModules = [];
            } catch (e) {
                console.error(this.declaredClass, arguments, e);
                throw e;
            }
        },

        postMixInProperties: function () {
            try {
                if (typeof this.configsOfModules === 'undefined') {
                    throw "configsOfModules option is not defined";
                }

                if (typeof this.route === 'undefined') {
                    throw "router option is not defined";
                }

                if (typeof this.packageName === 'undefined') {
                    throw "name  option is not defined, name is required for every loaded package";
                }
            } catch (e) {
                console.error(this.declaredClass, arguments, e);
                throw e;
            }
        },

        init: function () {
            // summary:
            //      Initialization method, should be called
            //      to start creating module instances from
            //      loading package.
            // returns:
            //      DeferredList
            // tags:
            //      public
            try {
                var deferred = [];

                this.router = router.registerPartial('/superman',
                    this.route,
                    lang.hitch(this, 'onFire'));

                array.forEach(this.configsOfModules, function (moduleConfig) {
                    var def = new Deferred();
                    this.createModule(moduleConfig)
                        .then(lang.hitch(this, function (module) {
                            this.addModule(module);
                            def.resolve();
                        }));
                    deferred.push(def);
                }, this);

                return new DeferredList(deferred);
            } catch (e) {
                console.error(this.declaredClass, arguments, e);
                throw e;
            }
        },

        onFire: function () {
            // summary:
            //      Virtual method will be called
            //      every time when route in package
            //      matched by router with hash in URL.
        },

        createModule: function ( /*Object*/ config) {
            // summary:
            //      Abstract method, created
            //      for provide abilities to overload
            //      in children.
            // returns:
            //      Module object
            // tags:
            //      protected
            try {
                var module = new Module(lang.mixin(config, {
                    router: this.router,
                    packageName: this.packageName
                }));
                return module.init();
            } catch (e) {
                console.error(this.declaredClass, arguments, e);
                throw e;
            }
        },

        register: function () {
            try {
                console.debug("All available modules in package >>>> ", this._modules);
                array.forEach(this._modules, lang.hitch(this, 'registerModule'));
            } catch (e) {
                console.error(this.declaredClass, arguments, e);
                throw e;
            }
        },

        addModule: function ( /*Module*/ newModule) {
            try {
                if (!newModule.isInstanceOf(Module)) {
                    throw new TypeError("newModule has undefined or incompatible type");
                }

                this._modules.push(newModule);
            } catch (e) {
                console.error(this.declaredClass, arguments, e);
                throw e;
            }
        },

        registerModule: function ( /*Module*/ newModule) {
            // summary:
            //      Method for registering
            //      newModule in the router and register handler
            //      for route match.
            // tags:
            //      protected

            // route: [Module] Object
            try {
                console.log("REgistered module >>>", newModule);
                newModule.register();
            } catch (e) {
                console.error(this.declaredClass, arguments, e);
                throw e;
            }
        }
    });
});
