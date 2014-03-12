define([
    "./router",
    "./config",
    "dojo/ready",
    "dojo/topic",
    "history/dojo.history",
    'xstyle/css!./themes/hc-backend/hc-backend.css'
], function(router, config, ready) {
    ready(function(){
        if (window.History) {
            window.History.Adapter.bind(window, 'statechange', function() {
                router.go(window.History.getState().hash);
            });
        }
    });
});
