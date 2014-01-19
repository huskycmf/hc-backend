define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/aspect",
    "dijit/form/_FormValueMixin",
    "dojo-underscore/underscore"
], function(declare, lang, aspect, _FormValueMixin, u) {

    return declare([ ], {
        //  summary:
        //      Form mixin to get information about changed fields

        __changedElements: {},
        __vals: {},
        changed: false,

        constructor: function () {
            try {
                this.__changedElements = {};
                this.__vals = {};
                this.changed = false;
            } catch (e) {
                 console.error(this.declaredClass, arguments, e);
                 throw e;
            }
        },

        startup: function () {
            try {
                u.each(this.getChildren(), function (child) {
                    try {
                        if (child.isInstanceOf(_FormValueMixin)) {
                            var handler = lang.hitch(this, function (element, value) {
                                var name = element.get('name');

                                if (typeof(this.__vals[name]) == 'undefined') {
                                    console.log("Set new value >>", value);
                                    this.__vals[name] = value;
                                    return;
                                }

                                if (this.__vals[name] != value) {
                                    console.log("Value is really changed ",
                                                "initial >>",
                                                this.__vals[name],
                                                this.__vals[name] && this.__vals[name].length,
                                                "changed >>", value,
                                                value && value.length);

                                    this.__changedElements[name] = element;
                                    this.set('changed', true);
                                } else {
                                    console.log("Value has restored to >>", value, this.__vals[name]);
                                    this.__changedElements[name] && delete this.__changedElements[name];
                                    if (!u.size(this.__changedElements)) {
                                        this.set('changed', false);
                                    }
                                }
                            }, child);

                            child.set('intermediateChanges', true);
                            this.own(child.on('change', handler));
                        }
                    } catch (e) {
                        console.error(this.declaredClass, arguments, e);
                        throw e;
                    }
                }, this);
                this.inherited(arguments);
            } catch (e) {
                console.error(this.declaredClass, arguments, e);
                throw e;
            }
        },

        _setValueAttr: function (values) {
            try {
                this.__lastSetValues = values;

                if (!this.isChanged()) {
                    console.log("Values will be set in form");
                    this.inherited(arguments);
                } else {
                    console.log("Values will be ignored because form is changed");
                }
            } catch (e) {
                 console.error(this.declaredClass, arguments, e);
                 throw e;
            }
        },

        reset: function () {
            try {
                this.inherited(arguments);
                this.__changedElements = [];
                this.set('value', this.__lastSetValues);
            } catch (e) {
                 console.error(this.declaredClass, arguments, e);
                 throw e;
            }
        },

        isChanged: function () {
            try {
                return u.size(this.__changedElements);
            } catch (e) {
                console.error(this.declaredClass, arguments, e);
                throw e;
            }
        }
    });
});
