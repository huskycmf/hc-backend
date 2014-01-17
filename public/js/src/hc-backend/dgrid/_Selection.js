define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dgrid/_StoreMixin",
    "dijit/Destroyable",
    "dojo/on",
    "dgrid/Selection"
], function(declare, lang, _StoreMixin, Destroyable, on, Selection) {
    // module:
    //     backend/dgrid/_SelectionWithRemoveFromStore

    return declare([ _StoreMixin, Selection, Destroyable ], {
        //  summary:
        //      Expanded selection for removeSelected rows from store
        removeSelected: function () {
            // summary:
            //      Remove all selected rows in the list from store
            try {
                for (var id in this.selection) {
                    if (this.selection[id] === true &&
                        this.store && this.store.remove) {
                        this.store.remove(id);
                    }
                }
            } catch (e) {
                console.error(this.declaredClass, arguments, e);
                throw e;
            }
        },

        postCreate: function () {
            try {
                this.inherited(arguments);

                var _func = lang.hitch(this, function (){
                    on.emit(this.domNode, 'dgrid-one-item-selected',{bubbles: true,
                                                                     cancelable: false,
                                                                     grid: this});
                });
                this.own(on.once(this, 'dgrid-select', _func));

                this.own(on(this, 'dgrid-deselect', lang.hitch(this, function (evt){
                    for (var id in evt.grid.selection) return;
                    on.emit(this.domNode,
                            'dgrid-no-items-selected',
                            {bubbles: true,
                             cancelable: false,
                             grid: this});
                    this.own(on.once(this, 'dgrid-select', _func));
                })));
            } catch (e) {
                 console.error(this.declaredClass, arguments, e);
                 throw e;
            }
        },

        getSelectedCount: function () {
            // summary:
            //      Return selected count
            try {
                var iter = 0;
                for (var id in this.selection) {
                    iter++;
                }
                return iter;
            } catch (e) {
                 console.error(this.declaredClass, arguments, e);
                 throw e;
            }
        },

        getSelected: function () {
            // summary:
            //      Return all selected rows
            try {
                return this.selection;
            } catch (e) {
                 console.error(this.declaredClass, arguments, e);
                 throw e;
            }
        }
    });
});
