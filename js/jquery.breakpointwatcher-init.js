/*
 * breakpointwatcher-init
 *
 * can be adjusted on project basis
 * initialize the breakpointwatcher plugin for a project
*/
;'use strict';
(function($) {

	$(document).ready(function() {
		//by default, two states are distinguished, named 'small' and 'large'.
		//if those fit you needs, just call $.breakpointwatcher();
		$.breakpointwatcher();

		//if you want to change them, pass the views-array in an options object
		/*
		var options = {
			views: ['small', 'large']
		};
		$.breakpointwatcher(options);
		*/
	});

})(jQuery);