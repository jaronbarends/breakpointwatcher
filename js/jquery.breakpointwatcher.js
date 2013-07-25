/*
 * breakpointwatcher plugin
 *
 * adds empty divs with class breakpointwatcher to body;
 * on resize checks the visibility state of these divs
 * if a change in visibility occurs, a change.breakpointwatcher event is triggered on the document
 * other javascript code can listen for this event
 *
 * @requires jQuery 1.7 or up
*/
;'use strict';
(function($) {

	var resizeHandlerTimer,
		$indicatorElms,
		currView,
		pluginname = 'breakpointwatcher',
		defaults = {
			views: ['small', 'large']
		},
		config;

	/**
	* 
	* @param {string} varname Description
	* @returns {void}
	*/
	var getView = function() {
		return currView
	};


	/**
	* 
	* @param {string} eventName The name of the event to trigger
	* @param {object} data Event data
	* @returns {void}
	*/
	var triggerBreakpointEvent = function(eventName, data) {
		eventName = eventName+'.'+pluginname;
		$(document).trigger(eventName, data);
	};
	


	/**
	* check if a breakpoint has been crossed
	* @param {event} e The event (resize, orientationchange) that triggered resizeHandler
	* @returns {void}
	*/
	var checkBreakpoints = function(e) {
		$indicatorElms.each(function() {
			var $this = $(this);
			if ($this.is(':visible')) {
				var view = $this.attr('data-view');
				if (currView !== view) {
					//we've got a breakpoint change
					var prevView = currView;
					currView = view;
					var data = {
						view: view,
						prevView: prevView,
						originalEvent: e
					}
					triggerBreakpointEvent('change', data);
				}
			}
		});
	};
	

	/**
	* call checkBreakpoints when no resize has happened te last 100 msecs
	* @param {string} varname Description
	* @returns {void}
	*/
	var resizeHandler = function(e) {
		clearTimeout(resizeHandlerTimer);
		resizeHandlerTimer = setTimeout(function() {checkBreakpoints(e);}, 100);
	};


	/**
	* define methods that will be available on the $.breakpointWatcher object
	* @returns {void}
	*/
	var definePublicMethods = function() {
		$.breakpointwatcher.getView = getView;
	};


	/**
	* 
	* @param {string} varname Description
	* @returns {void}
	*/
	var addInicatorElms = function() {
		var vws = config.views,
			h = '';
		if (vws && vws.length) {
			for (var i=0, len=vws.length; i<len; i++) {
				h += '<div class="breakpointwatcher" data-view="'+vws[i]+'"></div>';
			}
			$indicatorElms = $(h).appendTo($('body'));
		}
	};
	


	//add function to jQuery namespace to attach methods to
	//and initialize
	$.breakpointwatcher = function(options) {
		config = $.extend(defaults, options);
		addInicatorElms();
		definePublicMethods();
		$(window).on('resize', resizeHandler);

		checkBreakpoints();//do first check now; don't use resizeHandler here, because that will only call checkBreakpoints after 100 msec
	};

})(jQuery);