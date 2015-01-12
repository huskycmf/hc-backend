define([
    "dojo/_base/declare",
    "dojo/Stateful",
    "dojo/Evented"
], function(declare, Stateful, Evented) {
    return declare([Stateful, Evented], {

            save: function (data) {
                throw "Method saver must be overridden";
            }
    });
});
