define([
    "dojo/_base/declare",
    "./SelectedActionButton"
], function(declare, SelectedActionButton) {
    return declare([ SelectedActionButton ], {

        postCreate: function () {
            try {
                var self = this;
                this.on('success', function (){
                    for (var id in self.grid.getSelected()) {
                        self.grid.store.notify(null, id);
                    }
                });
                this.inherited(arguments);
            } catch (e) {
                console.error(this.declaredClass, arguments, e);
                throw e;
            }
        }
    });
});
