define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/on",
    "dijit/form/_FormValueMixin",
    "dijit/_Container",
    "underscore"
], function(declare, lang, on, _FormValueMixin, _Container, u) {

    return declare([ ], {
        //  summary:
        //      Form mixin to get information about changed fields

        __changedElements: {},
        __vals: {},
        __handlers: [],
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

        _getFormValueChildrenRecursively: function () {
            try {
                var children = [];
                (function _recursive(container){
                    u.each(container.getChildren(), function (child){
                        if (child.isInstanceOf(_FormValueMixin)) {
                            children.push(child);
                        } else if (child.isInstanceOf(_Container) && child['getChildren']) {
                            return _recursive(child);
                        }
                    })
                })(this);
                console.log("Show children >>>>", children);
                return children;
            } catch (e) {
                 console.error(this.declaredClass, arguments, e);
                 throw e;
            }
        },

        startup: function () {
            try {
                u.each(this._getFormValueChildrenRecursively(), function (child) {
                    try {
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
                                console.log("Value has restored to >>",
                                        value, this.__vals[name]);

                                this.__changedElements[name] &&
                                    delete this.__changedElements[name];

                                console.log("CHANGED ELEMENTS >>>", this.__changedElements);

                                if (!u.size(this.__changedElements)) {
                                    this.set('changed', false);
                                }
                            }
                        }, child);

                        child.set('intermediateChanges', true);

                        var _handle = on.pausable(child, 'change', handler);

                        this.__handlers.push(_handle);
                        this.own(_handle);
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
                    console.log("Values will be ignored because form is changed >>",
                        this.__lastSetValues);
                }
            } catch (e) {
                 console.error(this.declaredClass, arguments, e);
                 throw e;
            }
        },

        refresh: function () {
            try {
               u.each(this.__handlers, function (handle){ handle.pause(); }, this);

                this.__changedElements = {};
                this.__vals = {};
                u.each(this.__lastSetValues, function(v,k) {
                    this.__vals[k] = v;
                }, this);

                this.set('changed', false);
                u.each(this.__handlers, function (handle){ handle.resume(); }, this);
            } catch (e) {
                 console.error(this.declaredClass, arguments, e);
                 throw e;
            }
        },

        reset: function () {
            try {
                this.inherited(arguments);

                this.refresh();

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
