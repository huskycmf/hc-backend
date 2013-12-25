define([
    "../../../../../../../../../../../sugarcms/public/js/library/dojo/_base/declare",
    "../../../../../../../../../../sugarcms/public/js/library/dojo/_base/lang",
    "dojo/_base/array",
    "../../../../../_HasState",
    "../../_ContentMixin",
    "dojox/layout/GridContainer",
    "../../../../TabContainer",
    "../../_ExpandedMixin",
    "./widget/TabPane",
    "dojo/store/JsonRest",
    "dijit/_TemplatedMixin",
    "dojo/text!./templates/Container.html"
], function(declare, lang, array, _HasState, _ContentMixin,
            GridContainer, TabContainer, _ExpandedMixin,
            TabPane, JsonRest,
            _TemplatedMixin, template) {
    return declare("MenuManageContainer",
                   [ _HasState, _ExpandedMixin, _ContentMixin, _TemplatedMixin ], {
        //  summary:
        //      Menu manage container. Will load the widgets who will be responsible
        //      for displaying specific menu tree.
        templateString: template,
        
        baseClass: 'menu backend',
        
        // _menuStore: [private] dojo/data/ItemFileWriteStore
        //      Write store who contains all available menus and items
        _menuStore: null,

        // _listStore: [private] dojo/store/JsonRest
        //      Json Rest store contains all available menus
        //      from backend
        _listStore: null,
        
        // menuId: Integer
        //      Identifier of the menu to display
        menuId: 0,

        postCreate: function () {
            try {
                this.loading();
                this._listStore = new JsonRest({target: "/backend/menu"});
                this._tabContainer = new TabContainer({},
                                                      this.tabContainerWidget);
                this._container = new GridContainer({nbZones: 1,
                                                     hasResizableColumns: false,
                                                     doLayout: false,
                                                     acceptTypes: ['ContentPane']},
                                                    this.gridContainerWidget);

                // Register a child who will be opened by default
                // when this container will show up
                this.router.addCallback(lang.hitch(this, function (){
                    this._tabContainer.selectChild(this._tabContainer.getChildren()[0]);
                }));

                this._listStore.query().forEach(lang.hitch(this, function (menu){
                    var _contentPane = new TabPane({title: menu.label,
                                                    menuId: menu.id,
                                                    hash: this.router.getFullRoute('/'+menu.id)});

                    var _routerMenuHandler = lang.hitch(this._tabContainer,
                                                        'selectChild',
                                                        _contentPane);

                    this.own(this.router.register('/'+menu.id, _routerMenuHandler));

                    this._tabContainer.addChild(_contentPane);
                })).then(lang.hitch(this, 'loaded'));

                this.inherited(arguments);
            } catch (e) {
                 console.error(this.declaredClass, arguments, e);
                 throw e;
            }
        },

        attachExpansion: function (expansion) {
            // see: _ExpandedMixin::attachExpansion
            try {
                console.debug("Attaching expansion to menu backend >>>", expansion);
                if (!expansion.isInstanceOf(require('dijit/layout/ContentPane'))) {
                    throw new TypeError('Expansion must be an instance of ContentPane');
                }
                this._container.addChild(expansion);
            } catch (e) {
                 console.error(this.declaredClass, arguments, e);
                 throw e;
            }
        }
    });
});
