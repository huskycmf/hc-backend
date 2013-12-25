define([
    "../../../../../../../../../../../sugarcms/public/js/library/dojo/_base/declare",
    "../../../../../../../../../../sugarcms/public/js/library/dojo/_base/lang",
    "dojo/on",
    "dijit/_Widget",
    "dijit/form/_ButtonMixin",
    "../../_ToolbarMixin",
    "dijit/_TemplatedMixin",
    "dojo-common/dialog/DestroyableDialog",
    "./widget/EditLayout",
    "dojo/i18n!../nls/Profile",
    "dojo/text!./templates/Button.html"
], function(declare, lang, on, _Widget, _ButtonMixin, _ToolbarMixin, _TemplatedMixin,
            DestroyableDialog, EditLayout, translate, template){
    return declare([_Widget, _ButtonMixin, _ToolbarMixin, _TemplatedMixin], {
        templateString: template,

        postCreate: function () {
            try {
                this.set('label', translate['openDialogButton']);
            } catch (e) {
                 console.error(this.declaredClass, arguments, e);
                 throw e;
            }
        },

        open: function (route) {
            try {
                var dialog = new DestroyableDialog();
                var layout = new EditLayout({title: '',
                    actionUrl: "/her",
                    dialog: dialog,
                    data: {},
                    onSuccess: lang.hitch(this, function (){
                        layout.closeWhenHideTooltip();
                        this.onSuccess();
                    })});

                on(dialog, 'cancel', lang.hitch(this, 'deactivate'));

                dialog.addChild(layout);
                dialog.show();
            } catch (e) {
                 console.error(this.declaredClass, arguments, e);
                 throw e;
            }
        },

        handle: function () {
            try {
                this.inherited(arguments);
                this.open();
            } catch (e) {
                 console.error(this.declaredClass, arguments, e);
                 throw e;
            }
        },

        onSuccess: function () {},

        onClick: function () {
            try {
                this.activate();
                this.inherited(arguments);
            } catch (e) {
                 console.error(this.declaredClass, arguments, e);
                 throw e;
            }
        }
    });
});
