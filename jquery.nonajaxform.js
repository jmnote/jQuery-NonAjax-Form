;jQuery(function($) { $.extend({
	form: function( options ) {
		var defaults = {
			method: 'post',
			target: '_self',
			data: {},
		}
		var settings = $.extend( {}, defaults, options );

		var form = $('<form>').attr({
			method: settings.method,
			target: settings.target,
			data: settings.data,
			action: settings.action,
		}).css({
			display: 'none'
		});

		var addData = function(name, data) {
			if ($.isArray(data)) {
				for (var i = 0; i < data.length; i++) {
					addData(name + '[]', data[i]);
				}
				return;
			}
			if (typeof data === 'object') {
				for (var key in data) {
					if (data.hasOwnProperty(key)) {
						addData(name + '[' + key + ']', data[key]);
					}
				}
				return;
			}
			if (data != null) {
				form.append($('<input>').attr({
					type: 'hidden',
					name: String(name),
					value: String(data)
				}));
			}
		};

		for (var key in settings.data) {
			if (settings.data.hasOwnProperty(key)) {
				addData(key, settings.data[key]);
			}
		}

		return form.appendTo('body');
	}

}); });
