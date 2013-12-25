define([
    "../../../../../../../../../../sugarcms/public/js/library/dojo/_base/declare",
    "../../../../../../../../../sugarcms/public/js/library/dijit/TooltipDialog",
    "dojo/text!./templates/DropDownContainer.html"
], function(declare, TooltipDialog, template){
    return declare([TooltipDialog], {
        templateString: template
    });
});
