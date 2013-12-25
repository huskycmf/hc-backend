define([
    '../../../../../../sugarcms/public/js/library/dojo/_base/declare',
    '../../../../../sugarcms/public/js/library/dojo/on',
    'dojo/Evented'
], function (declare, on, Evented) {
    return declare('_HasState', [Evented], {
        _isReady: false,
        isReady: function () {
            // summary:
            //       Is module ready to use or not
            try {
                return this._isReady;
            } catch (e) {
                console.error(this.declaredClass, arguments, e);
                throw e;
            }
        },
        loading: function () {
            // summary:
            //       Setter for the state loading
            try {
                this._isReady = false;
                on.emit(this, 'loading');
            } catch (e) {
                console.error(this.declaredClass, arguments, e);
                throw e;
            }
        },
        loaded: function () {
            // summary:
            //       Setter for the state already loaded
            try {
                this._isReady = true;
                on.emit(this, 'loaded');
            } catch (e) {
                console.error(this.declaredClass, arguments, e);
                throw e;
            }
        }
    });
});
