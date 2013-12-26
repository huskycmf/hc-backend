define([
    "dojo/Deferred",
    "dojo/_base/declare",
    "dojo/aspect",
    "dojo/_base/lang",
    "dojo/Stateful",
    "dojo/Evented"
], function (Deferred, declare, aspect, lang, Stateful, Evented) {

    return declare("PackageModule", [Stateful, Evented], {
        // summary:
        //      This is a base class for all Routes contained
        //      inside package.

        // route: [public] Package base route
        //      Route which module will use to handle user navigation.
        route: '',

        // router: [public] Package router handle
        //      Parent entry in router module. Given for chaining routes.
        router: null,

        // routerHandle: [public] Package router handle
        //      Handler will contains registered router entry
        routerHandle: null,

        // instanceClass: [private] Class of the module
        //      Will be instantiated when route will match.
        __instanceClass: null,

        // loaded: [private] Attribute indicate is module ready to use
        //      Will indicate is module loaded or not
        __loaded: false,

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
                var def = new Deferred();
                def.then(lang.hitch(this, function () {
                    this.__loaded = true;
                }));

                require([this.packageName + '/' + this.module],
                    lang.hitch(this, function (_module) {
                        try {
                            this.__instanceClass = _module;
                            def.resolve(this);
                        } catch (e) {
                            console.error(this.declaredClass, arguments, e);
                            throw e;
                        }
                    }));

                return def;
            } catch (e) {
                console.error(this.declaredClass, arguments, e);
                throw e;
            }
        },

        handle: function ( /*Object?*/ evt) {
            // summary:
            //      Every module must have handler, for calling
            //      when route match.
            // returns:
            //      It is returns nothing (void)
            try {
                var _inst = this.getInstance(true);
                if (_inst.handle) {
                    _inst.handle(this, evt);
                }
                this.emit('handle', evt);
            } catch (e) {
                console.error(this.declaredClass, arguments, e);
                throw e;
            }
        },

        onInstanceCreated: function ( /*Module instance*/ ) {},

        createInstance: function () {
            // summary:
            //      Create module instance which will
            //      be displayed for route
            try {
                if (!this.__instanceClass) {
                    throw "Instance class is undefined";
                }

                this.__instance = new this.__instanceClass({
                    router: this.routerHandle
                });
                this.emit('instanceCreated', this.__instance);
                return this.__instance;
            } catch (e) {
                console.error(this.declaredClass, arguments, e);
                throw e;
            }
        },

        getInstance: function ( /*Boolean*/ orCreate) {
            // summary:
            //      Get module instance which will
            //      be displayed for route
            try {
                if (this.__instance) {
                    return this.__instance;
                } else {
                    if (orCreate) {
                        return this.createInstance();
                    }
                    return null;
                }
            } catch (e) {
                console.error(this.declaredClass, arguments, e);
                throw e;
            }
        },

        register: function () {
            // summary:
            //      Method for register route handler,
            //      it is will be called every time when
            //      route will be match.
            try {
                var _self = this,
                    routePath = this.route;
                if (!this.router) {
                    throw "Router undefined";
                }

                this.routerHandle = this.router.register(routePath, function (evt) {
                    try {
                        console.debug("Loading route >>> ", evt.newPath, evt);
                        _self.handle(evt);
                        console.debug("Route >>>> ", evt.newPath, ' loaded');
                    } catch (e) {
                        console.error(this.declaredClass, arguments, e);
                        throw e;
                    }
                });

                console.debug("Added route to the router ", routePath,
                    " and obj is  ", this);


            } catch (e) {
                console.error(this.declaredClass, arguments, e);
                throw e;
            }
        }
    });
});
