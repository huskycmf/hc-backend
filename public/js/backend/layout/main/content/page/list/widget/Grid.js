define([
    "../../../../../../../../../../../../sugarcms/public/js/library/dojo/_base/declare",
    "../../../../../../../../../../../sugarcms/public/js/library/dojo/_base/lang",
    "dijit/registry",
    "dojo/store/JsonRest",
    "dojo/store/Observable", 
    "dojo/store/Cache",
    "dojo/store/Memory",
    "put-selector/put",
    "dgrid/OnDemandList",
    "dgrid/Keyboard",
    "backend/dgrid/_Selection",
    "dijit/form/Button",
    "dojo/i18n!../../nls/List"
], function(declare, lang, registry, JsonRest, Observable, Cache, Memory,
            put, OnDemandList,
            Keyboard, _Selection, Button,
            translation) {

    var _store = Observable(Cache(JsonRest({
        target: "/backend/page/",
        idProperty: "id"
    }), Memory()));
    
    var _List = declare([ OnDemandList, Keyboard, _Selection ], {
        //  summary:
        //      Grid widget for displaying all available pages
        //      as list
        store: _store,
        
        columns: [
            {label: 'Id',          field: 'id'},
            {label: 'Title',       field: 'title'},
            {label: 'Description', field: 'descr'}
        ],
        
        showHeader: false,
        
        renderRow: function (obj, options) {
            // summary: 
            //      Returning HTML for rendering each row
            try {
                var mainDiv = put('div');
                var divWithTemplate  = put('div');
                put(divWithTemplate, "div[class='title']", obj.title);
                put(divWithTemplate, "div[class='descr']", obj.descr);
                put(mainDiv, divWithTemplate);
                (new Button({'label': translation["removeButton"]})).placeAt(mainDiv);
                return mainDiv;
            } catch (e) {
                console.error(this.declaredClass, arguments, e);
                throw e;
            }
        }
    });

    return declare([ ListAdapter ], {
        postMixInProperties: function () {
            try {
                 this._list = new _List();
            } catch (e) {
                 console.error(this.declaredClass, arguments, e);
                 throw e;
            }
        }
    });
});
