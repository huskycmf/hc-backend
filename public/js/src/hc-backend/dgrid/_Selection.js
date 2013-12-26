define([
    "dojo/_base/declare",
    "dgrid/_StoreMixin",
    "dgrid/Selection"
], function(declare, _StoreMixin, Selection) {
    // module:
    //     backend/dgrid/_SelectionWithRemoveFromStore

    return declare([ _StoreMixin, Selection ], {
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
