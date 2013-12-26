define([
    "./router",
    "./config",
    "dojo/ready",
    "dojo/topic",
    "history/dojo.history"
], function(router, config, ready, topic) {
    ready(function(){
        if (window.History) {
            window.History.Adapter.bind(window, 'statechange', function() {
                router.go(window.History.getState().hash);
            });
            topic.publish("/dojo/hashchange", [window.History.getState().hash]);
        }
    });
});
