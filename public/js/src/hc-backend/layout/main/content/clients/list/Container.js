define([
    "dojo/_base/declare",
    "dojo/_base/array",
    "dojo/_base/lang",
    "dojo/on",
    "../../_ContentMixin",
    "dijit/_TemplatedMixin",
    "dojo/text!./templates/Container.html",
    "dojo/i18n!../nls/List",
    "dojo/request",
    "../../../../../router",
    "./widget/Grid",
    "dijit/form/Button",
    "dojo-common/response/_StatusMixin",
    "dojo-common/response/_MessageMixin"
], function(declare, array, lang, on, _ContentMixin, _TemplatedMixin,
            template, translation, request, router, Grid, Button,
            _StatusMixin, _MessageMixin) {
    return declare([ _ContentMixin, _TemplatedMixin ], {
        //  summary:
        //      List container. Contains widgets who responsible for
        //      displaying list of clients.
        templateString: template,

        baseClass: 'clientsList',
        
        postCreate: function () {
            try {
                this._gridWidget = new Grid({'class': this.baseClass+'Grid'});

                var _enableBlockWidget = lang.hitch(this, function (){
                    this._blockWidget.set('disabled', false);
                });

                this.own(on.once(this._gridWidget, 'dgrid-select', _enableBlockWidget));
                this.own(on(this._gridWidget, 'dgrid-deselect', lang.hitch(this, function (evt){
                    for (var id in evt.grid.selection) return;
                    this._blockWidget.set('disabled', true);
                    this.own(on.once(this._gridWidget, 'dgrid-select', _enableBlockWidget));
                })));

                this._blockWidget = new Button({label: translation['blockSelectedButton'],
                                                'class': this.baseClass+'BlockClient',
                                                disabled: true,
                                                'onClick': lang.hitch(this, '_onBlockClient')});

                this.addChild(this._blockWidget);
                this.addChild(this._gridWidget);
            } catch (e) {
                 console.error(this.declaredClass, arguments, e);
                 throw e;
            }
        },

        refresh: function () {
            try {
                this._gridWidget.refresh({keepScrollPosition: true});
            } catch (e) {
                 console.error(this.declaredClass, arguments, e);
                 throw e;
            }
        },

        _blockedSuccessHandler: function (resp) {
            try {
                var response = new declare([_StatusMixin, _MessageMixin])(resp);

                if (response.isSuccess()) {
                    this.refresh();
                }
            } catch (e) {
                 console.error(this.declaredClass, arguments, e);
                 throw e;
            }
        },

        _blockedErrorHandler: function (resp) {
            try {
                var response = new declare([_StatusMixin, _MessageMixin])(resp);
            } catch (e) {
                 console.error(this.declaredClass, arguments, e);
                 throw e;
            }
        },
        
        _onBlockClient: function () {
            try {
                var ids = [];
                for (var id in this._gridWidget.getSelected()) ids.push(id);
                if (!ids.length) { return; }
                request.post(router.assemble('/block', {}, true), {
                            data: { 'clients[]': ids },
                            handleAs: 'json'
                }).then(lang.hitch(this, '_blockedSuccessHandler'),
                        lang.hitch(this, '_blockedErrorHandler'));
            } catch (e) {
                console.error(this.declaredClass, arguments, e);
                throw e;
            }
        }
    });
});
