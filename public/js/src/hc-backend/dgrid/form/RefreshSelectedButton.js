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
                        self.grid.store.evict(id);
                        self.grid.store.get(id).then(function (item){
                            self.grid.store.notify(item, id);
                        });
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
