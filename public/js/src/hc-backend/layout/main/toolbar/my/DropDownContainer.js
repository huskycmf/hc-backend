define([
    "dojo/_base/declare",
    "dijit/TooltipDialog",
    "dojo/text!./templates/DropDownContainer.html"
], function(declare, TooltipDialog, template){
    return declare([TooltipDialog], {
        templateString: template
    });
});
