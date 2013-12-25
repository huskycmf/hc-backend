define([
    "../../../../../../../sugarcms/public/js/library/dojo/_base/declare",
    "../../../../../../sugarcms/public/js/library/dojo/_base/lang",
    "dojo/_base/array",
    "../hash",
    "dojo-common/router/RouterPartial"
], function(declare, lang, array, hash, RouterPartial){
    // Our actual class-like object
    var trim;

    var regexTrim = trim = function(str, chr){
        return str.replace(new RegExp('^'+chr || '\s'+'+|'+chr || '\s'+'+$', 'g'), '')
    };

    var count = function (obj){
       var cnt = 0; for (var t in obj) cnt++; return cnt;
    };

    if(String.prototype.trim){
        trim = function(str, chr){
            if (chr) {
                return regexTrim(str, chr);
            }
            return str.trim();
        };
    }else{
        trim = regexTrim;
    }

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
                if(typeof path !== "string"){
                    throw "Invalid path param";
                } else if (count(params) < 1 && !relative) {
                    return path;
                }

                if (relative) {
                    path = '/'+trim(hash(), '\/')+'/'+trim(path, '\/');
                    if (count(params) < 1) {
                        return path;
                    }
                }

                while((match = this.idMatch.exec(path)) !== null){
                    for (var param in params) {
                        if (param == match[1]) {
                            path = path.replace(new RegExp(match[0], 'g'), params[param]);
                        }
                    }
                }

                return path;
            } catch (e) {
                 console.error(this.declaredClass, arguments, e);
                 throw e;
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

            path = trim(path);
            applyChange = this._handlePathChange(path);

            if(applyChange){
                hash(path);
            }

            return applyChange;
        }
    });

    return RouterPartial;
});
