define([
        "../../../../../../../../../../sugarcms/public/js/library/dojo/_base/declare",
        "../package",
        "dojo/i18n!./nls/Package"
], function(declare, _Package, translation) {

    return declare("ClientsPackage", [ _Package ], {
        // summary:
        //      Clients package will provide user to manage web site clients
        defaultRoute: '/clients',
        title: translation['packageTitle']
    });
});
