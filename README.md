#Breakpoint watcher jQuery plugin

Sends events when breakpoint changes occur, and gives information about the current view.

Requires jQuery 1.7 or higher.

##How it works
The Breakpoint watcher plugin adds empty divs with class breakpointwatcher to body. Then it checks on resize wether the visibility state of these divs has changed. If a change in visibility occurs, a change.breakpointwatcher event is triggered on the document. Other javascript code can listen for this event, en respond as they wish. This uncouples the detection of breakpoint changes from the actions to be taken upon it.

#Getting started


##Javascript

Add _jquery.breakpointwatcher.js_ to your page - best practice is to do this at the end of the body, and make sure it is inserted after jquery.


##Initialisation
Somewhere after inserting your plugin, insert the code. In it simplest form, the plugin will check for two views, named _small_ and _large_. The code for this simples variant is this:

	$(document).ready(function() {
		$.breakpointwatcher();
	}

###Checking for more views, or views with other names
If you want to check for more than 2 views, or if you want to give them different names, you can change this by passing an options object during the initialisation. This options object contains only one property: an array named _views_, containing the names of the views you want to check for.

	$(document).ready(function() {
		var options = {
			views: ['small', 'medium', 'someOtherSize', 'large']
		};
		$.breakpointwatcher(options);
	}

for every string in the `views` array, a div will be inserted with an attribute data-view which holds that string, e.g.

`<div data-view="small" class="breakpointwatcher"></div>`

or

`<div data-view="someOtherSize" class="breakpointwatcher"></div>`

##CSS
Add `jquery.breakpointwatcher.css` to your site; this takes care of hiding the inserted divs

For every view you want define, you have to create a media query to determine when it should be shown and hidden. From a maintenance point of view, this will best be done were you define the rest of your website's media queries.

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

##Javascript events

When a breakpoint has been crossed, the event `change.breakpointwatcher` is triggered by the `document`.

A data object is sent along with the event:

	{    
    	view: view,/* name of the new view */
    	prevView: prevView,/* name of the previous view */
    	originalEvent: e/* the original resize event which caused the breakpoint change */
    }

###Listening for breakpoint changes
You can have your code listen for breakpoint changes by adding an event listener:

	$(document).on('change.breakpointwatcher', function(e, data) {
		console.log('new view:'+data.view);
	});

##Public methods
Public methods can be called like this: `var view = $.breakpointwatcher.getView();`

###getView();
returns the name of the current view; returned names correspond with the names in the options object's views array.



