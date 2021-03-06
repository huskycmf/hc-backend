define([
    "require",
    "dijit/_Widget",
    "dijit/_Contained",
    "dijit/_Container",
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/_base/array",
    "../../router",
    "../../config",
    "dijit/_TemplatedMixin",
    "dojo/json",
    "dojo/Deferred",
    "dojo/DeferredList",
    "./Content",
    "./Rounded",
    "./Toolbar",
    "dojo/text!./templates/Container.html"
], function (_require, _Widget, _Contained, _Container, declare, lang, array, router, config,
    _TemplatedMixin, JSON, Deferred, DeferredList, ContentContainer,
    RoundedContainer, ToolbarContainer, template) {
    return declare([_Widget, _Contained, _Container, _TemplatedMixin], {
        templateString: template,
        deferredList: null,

        postCreate: function () {
            // summary:
            //      Parse JSON files with predefined package configurations.
            //      Collecting routes from package files.
            try {
                var deferred = [];

                /*packages = this._getPackages(JSON.parse(roundedPackagesJSONString)),
                container = new RoundedContainer({packages: packages});

                this.addChild(container);
                console.debug("Loaded RoundedContainer with packages", packages);*/

                var packageExtractor = function (resp) {
                    var packages = [];
                    array.forEach(resp, function (respItem) {
                        packages.push(respItem[1]);
                    });
                    return packages;
                };

                var toolbarDef = new Deferred();
                deferred.push(toolbarDef);

                if (config.get('toolbarPackages').length) {
                    this._getPackages(config.get('toolbarPackages')).then(
                        lang.hitch(this, function (resp) {
                            var packages = packageExtractor(resp),
                                container = new ToolbarContainer({
                                    packages: packages
                                });
                            container.init().then(lang.hitch(this, function () {
                                this.addChild(container);
                                toolbarDef.resolve();
                            }), function (e) {
                                console.error("Could not initialize ToolbarContainer with packages >>",
                                    packages, e);
                            });
                            console.debug("Loaded ToolbarContainer with packages", packages);
                        })
                    );
                }

                var packageDef = new Deferred();
                deferred.push(packageDef);
                this._getPackages(config.get('contentPackages')).then(
                    lang.hitch(this, function (resp) {
                        var packages = packageExtractor(resp),
                            container = new ContentContainer({
                                packages: packages
                            });

                        container.init().then(lang.hitch(this, function () {
                            this.addChild(container);
                            packageDef.resolve();
                        }), function (e) {
                            console.error("Could not initialize ContentContainer with packages >>",
                                packages, e);
                        });
                        console.debug("Loaded ContentContainer with packages", packages);
                    })
                );

                (new DeferredList(deferred)).then(function () {
                    router.startup();
                });

                this.inherited(arguments);
            } catch (e) {
                console.error(this.declaredClass, arguments, e);
                throw e;
            }
        },

        _getPackages: function (loadedPackages) {
            // summary:
            //      Walking thru packages array and
            //      extracting routes from every package.
            //      Collect them and return.
            // returns:
            //      Array of collected routes
            try {
                var deferredList = [];
                array.forEach(loadedPackages, lang.hitch(this, function (packageRequire) {
                    try {
                        console.debug("Prepare to processing package >>>", packageRequire);
                        var deferred = new Deferred();
                        deferredList.push(deferred);

                        require([packageRequire + "/hcb.config"],
                            lang.hitch(this, function (pack) {

                                if (!array.every(['route', 'modules'], function (key) {
                                    return typeof pack[key] !== 'undefined';
                                })) {
                                    throw "Widget key has not found";
                                }

                                pack['package'] = (packageRequire + '/' + (pack['main'] || 'hcb'));

                                console.debug("Require package ", pack['package']);

                                require([pack['package']], lang.hitch(this, function (Package) {
                                    try {
                                        var params = {
                                            configsOfModules: pack['modules'],
                                            packageName: packageRequire,
                                            route: pack['route'],
                                            priority: pack['prio']
                                        };

                                        var packageObject = new Package(params);

                                        if (!packageObject.isInstanceOf(_require('./package'))) {
                                            throw "Loaded package does not " +
                                                "compatible with type ./package";
                                        }

                                        deferred.resolve(packageObject);
                                        console.log("Package loaded successfully");
                                    } catch (e) {
                                        console.error(this.declaredClass, arguments, e);
                                        throw e;
                                    }
                                }));
                            }));

                    } catch (e) {
                        console.error(this.declaredClass, arguments, e);
                        throw e;
                    }
                }));

                return new DeferredList(deferredList);
            } catch (e) {
                console.error(this.declaredClass, arguments, e);
                throw e;
            }
        }
    });
});
