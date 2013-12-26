define(["dojo/aspect",
        "dojo/_base/array",
        "dojo/on",
        "put-selector/put",
        "../../router"],
function(aspect, array, on, put, router){
    /*=====
     var column = {
         //  summary:
         //      Identifier, which should pass
         //      as route parameter. This identifier
         //      should present in the row[] object
         id: 'id',

         //  summary:
         //      Route where should user be redirected
         //      by clicking on this element. Route might
         //      be relative or absolute, if route is absolute
         //      then routeRelative must be false
         route: '',

         // summary:
         //     Class name for the dom element who will contains
         //     column value, and will handle onclick
         className: '',

         // summary:
         //     Indicate should this.route be resolved as relative route
         //     or as absolute.
         routeRelative: true

         ...all other parameters are default as defined in dgrid documentation
     };
     =====*/
	return function(column){
		// summary:
        //      This cool column plugin, provide possibilities
        //      to go by route to the destination point, and prevent
        //      selecting row, if selection is enabled.
		var listeners = [], grid, span;
		
		if(!column){ column = {}; }

		aspect.after(column, "init", function(){
			grid = column.grid;
            // Store previous selection mode state
            var selectionMode = grid.selectionMode;
            aspect.around(grid, '_'+selectionMode+'SelectionHandler', function (original){
                return function (event, target) {
                    if (event.toElement == span) {
                        return false;
                    }
                    return original(event, target);
                }
            });
		});
		
		aspect.after(column, "destroy", function(){
            array.forEach(listeners, function(l){ l.remove(); });
		});

        var id = column['id'] || 'id';
        var className = column['className'] || 'edit-link';
        var routeRelative = typeof(column['routeRelative']) == 'undefined' && true || column['routeRelative'];
		
		column.renderCell = function(object, value, cell){
            var row = object && grid.row(object);
            if (!row || !row[id]) return value;

            span = put('span.'+className, value);
            put(cell, span);

            on.once(span, 'click', function () {
                router.go(router.assemble(column.route, {'id': row[id]}, routeRelative));
            });
		};
		
		return column;
	};
});
