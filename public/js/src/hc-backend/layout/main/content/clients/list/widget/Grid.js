define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo-common/store/JsonRest",
    "dojo/store/Observable", 
    "dojo/store/Cache",
    "dojo/store/Memory",
    "dgrid/OnDemandGrid",
    "dojo/dom-style",
    "dgrid/extensions/ColumnHider",
    "dgrid/extensions/ColumnResizer",
    "dgrid/extensions/DijitRegistry",
    "../../../../../../dgrid/_Selection",
    "dgrid/Keyboard",
    "dgrid/selector",
    "dojo/i18n!../../nls/List"
], function(declare, lang, JsonRest, Observable, Cache, Memory,
            OnDemandGrid, domStyle, ColumnHider, ColumnResizer, DijitRegistry,
            _Selection, Keyboard, selector, translation) {

    var _store = Observable(Cache(JsonRest({
        target: "/superman/clients",
        idProperty: "id"
    }), Memory()));
    
    return declare([ OnDemandGrid, ColumnHider, ColumnResizer,
                     Keyboard, _Selection, DijitRegistry ], {
        //  summary:
        //      Grid widget for displaying all available clients
        //      as list
        store: _store,

        columns: [
            selector({ label: "", width: 40, selectorType: "checkbox" }),
            {label: translation['labelId'], field: 'id', hidden: true,
             sortable: true, resizable: false},
            {label: translation['labelUsername'], field: 'username', hidden: true,
             resizable: true},
            {label: translation['labelState'], field: 'state', resizable: true},
            {label: translation['labelFullName'], field: 'fullname',
             route: 'edit/:id',
             resizable: true}
        ],

        loadingMessage: translation['loadingMessage'],
        noDataMessage: translation['noDataMessage'],

        showHeader: true,
        allowTextSelection: true
    });
});
