define([
    "../../../../../../../lab-maintainer/public/js/lib/dijit/layout/TabContainer",
    "./TabController"
], function(TabContainer, TabController) {
    // summary:
    //      Base TabContainer with options
    //      suitable for backend module

    return require('dojo/_base/declare')([ TabContainer ], {
            doLayout: false,
            controllerWidget: TabController
    });
});
