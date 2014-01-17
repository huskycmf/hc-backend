define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dijit/form/Button",
    "dojo/request",
    "dojo/on",
    "dojo-common/response/_StatusMixin",
    "dojo-common/response/_MessageMixin"
], function(declare, lang, Button,
            request, on, _StatusMixin,
            _MessageMixin) {
    return declare([ Button ], {

        disabled: true,
        target: '',
        name: 'ids',
        grid: null,

        postMixInProperties: function () {
            try {
                this.inherited(arguments);
                if (!this.grid) {
                    throw "Grid must be defined for Dgrid button";
                }
            } catch (e) {
                console.error(this.declaredClass, arguments, e);
                throw e;
            }
        },

        postCreate: function () {
            try {
                this.own(on(this.grid, 'dgrid-one-item-selected', lang.hitch(this, function (){
                    this.set('disabled', false);
                })));

                this.own(on(this.grid, 'dgrid-no-items-selected', lang.hitch(this, function (){
                    this.set('disabled', true);
                })));
                this.inherited(arguments);
            } catch (e) {
                console.error(this.declaredClass, arguments, e);
                throw e;
            }
        },

        _success: function (resp) {
            try {
                var response = new declare([_StatusMixin, _MessageMixin])(resp);

                if (response.isSuccess()) {
                    this.emit('success');
                }
            } catch (e) {
                console.error(this.declaredClass, arguments, e);
                throw e;
            }
        },

        _error: function (resp) {
            try {
                var response = new declare([_StatusMixin, _MessageMixin])(resp);
                this.emit('error');
            } catch (e) {
                console.error(this.declaredClass, arguments, e);
                throw e;
            }
        },

        onClick: function () {
            try {
                var ids = [];
                for (var id in this.grid.getSelected()) ids.push(id);
                if (!ids.length) { return; }
                var params = {data: {}, handleAs: 'json'};
                params.data[this.name+'[]'] = ids;
                request.post(this.target, params)
                       .then(lang.hitch(this, '_success'),
                             lang.hitch(this, '_error'));

                return false;
            } catch (e) {
                console.error(this.declaredClass, arguments, e);
                throw e;
            }
        }
    });
});
