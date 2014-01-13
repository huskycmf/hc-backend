define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/dom",
    "dojo/dom-style",
    "dojo/dom-class",
    "dojo/dom-geometry",
    "dijit/layout/TabContainer",
    "dijit/layout/TabController",
    "dijit/layout/StackController",
    "hc-backend/router",
    "hc-backend/config",
    "dojo/text!./templates/_TabButton.html"
], function(declare, lang, dom, domStyle, domClass, domGeometry, TabContainer,
            TabController, StackController,
            router, config, ButtonTemplate) {

    var TabButton = declare(StackController.StackButton, {
        // summary:
        //		A tab (the thing you click to select a pane).
        // description:
        //		Contains the title of the pane, and optionally a close-button to destroy the pane.
        //		This is an internal widget and should not be instantiated directly.
        // tags:
        //		private

        // baseClass: String
        //		The CSS class applied to the domNode.
        baseClass: "dijitTab",

        // Apply dijitTabCloseButtonHover when close button is hovered
        cssStateNodes: {
            unsavedNode: "dijitTabUnsavedButton"
        },

        templateString: ButtonTemplate,

        // Button superclass maps name to a this.valueNode, but we don't have a this.valueNode attach point
        _setNameAttr: "focusNode",

        // Override _FormWidget.scrollOnFocus.
        // Don't scroll the whole tab container into view when the button is focused.
        scrollOnFocus: false,

        buildRendering: function(){
            this.inherited(arguments);

            dom.setSelectable(this.containerNode, false);
        },

        startup: function(){
            this.inherited(arguments);
            this.set('unsaved', false);
            var n = this.domNode;

            // Required to give IE6 a kick, as it initially hides the
            // tabs until they are focused on.
            this.defer(function(){
                n.className = n.className;
            }, 1);
        },

        _setUnsavedAttr: function (unsv) {
            try {
                domClass.toggle(this.domNode, "dijitUnsaved", unsv);
                this.unsavedNode.style.display = unsv ? "" : "none";
            } catch (e) {
                 console.error(this.declaredClass, arguments, e);
                 throw e;
            }
        },

        _setLabelAttr: function(/*String*/ content){
            // summary:
            //		Hook for set('label', ...) to work.
            // description:
            //		takes an HTML string.
            //		Inherited ToggleButton implementation will Set the label (text) of the button;
            //		Need to set the alt attribute of icon on tab buttons if no label displayed
            this.inherited(arguments);
            if(!this.showLabel && !this.params.title){
                this.iconNode.alt = lang.trim(this.containerNode.innerText || this.containerNode.textContent || '');
            }
        }
    });


    return declare([ TabContainer ], {
        controllerWidget: declare([ TabController ], {
            buttonWidget: TabButton,
            onAddChild: function (page, index) {
                try {
                    this.inherited(arguments);
                } catch (e) {
                     console.error(this.declaredClass, arguments, e);
                     throw e;
                }
            }
        }),

        doLayout: false,

        getChildForLang: function (langIdentifier, langTitle) {
            try {
                throw "Method must be overridden";
                // new Form({title: langTitle || langIdentifier, lang: langIdentifier})
            } catch (e) {
                 console.error(this.declaredClass, arguments, e);
                 throw e;
            }
        },

        postCreate: function () {
            try {
                var languages = config.get('supportedLanguages');

                for (var _lang in languages) {
                    var child = this.getChildForLang(_lang, languages[_lang]);

                    if (child.then) {
                        child.then(lang.hitch(this, function (_child) {
                            try {
                                this.addChild(_child);
                            } catch (e) {
                                console.error(this.declaredClass, arguments, e);
                                throw e;
                            }
                        }))
                    } else {
                        this.addChild(child);
                    }
                }
                this.inherited(arguments);
            } catch (e) {
                 console.error(this.declaredClass, arguments, e);
                 throw e;
            }
        }
    });
});
