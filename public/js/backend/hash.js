
define(['history/dojo.history'], function () {
    return function (path) {
        if (!arguments.length) {
            return location.pathname;
        }
        path = path.toString && path.toString() || path;
        if (window && window.History) {
            window.History.pushState(null, null, path);
        }
    };
});
