define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/_base/array",
    "dojo/topic",
    "dojo-common/string",
    "../hash",
    "dojo-common/router/RouterPartial"
], function(declare, lang, array, topic, string, hash, RouterPartial){

    var count = function (obj){
       var cnt = 0; for (var t in obj) cnt++; return cnt;
    };

    var RouterPartial = declare([RouterPartial], {

        assemble: function (path, params, relative) {
            // summary:
            //		Method to transforming a route path
            //      with placeholders or relative to the full and
            //      completely assembled route path.
            // example:
            //	|	router.assemble("/foo/bar/:id", {id: 123}); --- /foo/bar/123
            //  If current route path is /foo
            //  |   router.assemble("bar/:name", {name: "fedya"}, true) -- /foo/bar/fedya
            //  returns:
            //      string
            try {
                if (count(params) < 1 && !relative) {
                    return '/'+string.trim(hash(), '\/');
                }

                if (relative) {
                    path = '/'+string.trim(hash(), '\/')+'/'+string.trim(path, '\/');
                    if (count(params) < 1) {
                        return path;
                    }
                }

                var newPath = path, match;
                while((match = this.idMatch.exec(path)) !== null){
                    for (var param in params) {
                        if (param == match[1]) {
                            newPath = newPath.replace(new RegExp(match[0], 'g'), params[param]);
                        }
                    }
                }

                return newPath;
            } catch (e) {
                 console.error(this.declaredClass, arguments, e);
                 throw e;
            }
        },

        startup: function(defaultPath){
            // summary:
            //		This method must be called to activate the router. Until
            //		startup is called, no hash changes will trigger route
            //		callbacks.

            if(this._started){ return; }

            var self = this,
                startingPath = hash();

            this._started = true;
            this._hashchangeHandle = topic.subscribe("/dojo/hashchange", function(){
                self._handlePathChange.apply(self, arguments);
            });

            if(!startingPath){
                // If there is no initial starting point, push our defaultPath into our
                // history as the starting point
                this.go(defaultPath, true);
            }else{
                // Handle the starting path
                this._handlePathChange(startingPath);
            }
        },

        go: function(path){
            // summary:
            //		A simple pass-through to make changing the hash easy,
            //		without having to require dojo/hash directly. It also
            //		synchronously fires off any routes that match.
            // example:
            //	|	router.go("/foo/bar");

            var applyChange;

            if(typeof path !== "string"){return false;}

            path = string.trim(path);
            applyChange = this._handlePathChange(path);

            if(applyChange){
                hash(path);
            }

            return applyChange;
        }
    });

    return RouterPartial;
});
