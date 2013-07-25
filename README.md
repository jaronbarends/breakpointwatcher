#Breakpoint watcher jQuery plugin

Sends events when breakpoint changes occur, and gives information about the current view.

Requires jQuery 1.7 or higher.

Adds empty divs with class breakpointwatcher to body; on resize checks the visibility state of these divs if a change in visibility occurs, a change.pointwatcher event is triggered on the document. Other javascript code can listen for this event.

##Initialisation

	$(document).ready(function() {
		$.breakpointwatcher();
	}

##Configuration options
###views
By default, the plugins checks for two views, named *small* and *large*. You can change this as you wish:

	$(document).ready(function() {
		var options = {
			views: ['small', 'medium', 'someOtherSize', 'large']
		};
		$.breakpointwatcher(options);
	}

for every string in the `views` array, a div will be inserted with an attribute data-view which holds that string, e.g.

  `<div data-view="someOtherSize" class="breakpointwatcher"></div>`


##Events

###change.breakpointwatcher
Is triggered by `document` when a breakpoint has been crossed

A data object is sent along with the event:

	{    
    	view: view,/* the new view */
    	prevView: prevView,/* the previous view */
    	originalEvent: e/* the original resize event which caused the breakpoint change */
    }

##Public methods
Public methods can be called like this: `var view = $.breakpointwatcher.getView();`

###getView();
returns the name of the current view; returned names correspond with the names in the options object's views array.

##Listening for breakpoint changes
You can have your code listen for breakpoint changes by adding an event listener:

	$(document).on('change.breakpointwatcher', function(e, data) {
		console.log('new view:'+data.view);
	});

##CSS
Add `jquery.breakpointwatcher.css` to your site; this takes care of hiding the inserted divs

For every view you want to define, you have to create a media query to determine when it should be shown and hidden. From a maintenance point of view, this will best be done were you define the rest of your website's media queries.

Example:

	.breakpointwatcher[data-view="large"] {
		display: block;
	}
	.breakpointwatcher[data-view="small"] {
		display: none;
	}

 	@media screen and (max-width: 39.9999em) {
		.breakpointwatcher[data-view="large"] {
			display: none;
		}
		.breakpointwatcher[data-view="small"] {
			display: block;
		}
	}