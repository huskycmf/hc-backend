define([
    "dojo/_base/declare",
    "../../ContentPaneHash",
    "dojo/_base/lang",
    "dojo/aspect",
    "dojo/on",
    "dojo/_base/array",
    "../../StackContainer",
    "./Module",
    "../package"
], function(declare, ContentPaneHash, lang, aspect, on, array, StackContainer, Module, _Package) {
    return declare("ContentPackage", [ ContentPaneHash,  _Package ], {

        // _moduleInstances: [private] Array
        //      Container for created instances,
        //      made for persist instances which owned
        //      by route

        // _container: [private] dijit.layout.StackContainer
        _container: null,

        route: '',

        doLayout: false,

        postCreate: function () {
            try {
                this._container = new StackContainer();
                this.addChild(this._container);
                this.inherited(arguments);
            } catch (e) {
                 console.error(this.declaredClass, arguments, e);
                 throw e;
            }
        },

        getHash: function () {
            try {
                return this.router.assemble();
            } catch (e) {
                 console.error(this.declaredClass, arguments, e);
                 throw e;
            }
        },

        createModule: function (/*Object*/ config) {
            // summary:
            //      Abstract method, created
            //      for provide abilities to overload
            //      in children.
            // returns:
            //      Module object
            // tags:
            //      protected
            try {
                var def = this.inherited(arguments);
                var _self = this;

                def.then(function (moduleObject){
                    moduleObject.on('instanceCreated', function (instance){
                        console.debug("Route handled: New instance created >>>", instance);

                        _self._container.addChild(instance);

                        aspect.after(_self, 'onShow', lang.hitch(instance, 'refresh'));
                    });

                    moduleObject.on('handle', function (evt) {
                        var _inst = moduleObject.getInstance();

                        console.debug("Route handled: Cached instance will be used >>>", _inst);
                        _inst.attr('routeEvent', evt);

                        _self._container.selectChild(_inst);
                        on.once(_inst, 'show', lang.hitch(_inst, 'refresh'));
                    });
                });

                return def;
            } catch (e) {
                console.error(this.declaredClass, arguments, e);
                throw e;
            }
        }
    });
});
