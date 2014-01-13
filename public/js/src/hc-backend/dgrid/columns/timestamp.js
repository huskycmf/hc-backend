define(["put-selector/put"],
function(put){
	return function(column){
		// summary:
        //      This cool column plugin, provide standard
        //      view for timestamp values.
		
		column.renderCell = function(object, value, cell) {

            span = put('span.timestamp');
            if (value === null) {
                put(span, '.empty');
                put(span, '', '-');
            } else {
                put(span, '', value);
            }

            put(cell, span);
		};
		
		return column;
	};
});
