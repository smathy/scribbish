/** $Id: site.js 275 2007-01-11 21:06:20Z garrett $ **/

/**
 * simplelog site functions
 * hides appropriate divs on launch, shows divs, etc, etc
 * search box functionality as well
 */
 
window.onload = function()
{
	init(); // see below, this is to get around global vars not being ready
	add_quotes();
}

function init() {
	body_container      = $('wrapper');
	search_field        = $('q');
	search_div          = $('search');
	results_wrapper_div = $('search_results');
	loading_msg_span    = $('loading');
	results_span        = $('results');
	tag_block           = $('tags');
	author_block        = $('authors');

	default_field_value = 'Hit ENTER to submit';
	message_when_searching = 'Searching...';
	message_when_done = '';
	results_when_searching = '';

	passive_search_text_color = '#777';
	active_search_text_color = '#000';

	searchInit(search_field); // capture key events
	clearSearch(); // set everything right with search field / areas
}

function showResults(bool) {
	results_wrapper_div.show();
	if (!bool)
	{
		loading_msg_span.innerHTML = message_when_searching;
		results_span.innerHTML = results_when_searching;
		results_span.show();
	}
	else
	{
		loading_msg_span.innerHTML = message_when_done;
		results_span.show();
	}
}

function searchInit() {
	search_field.observe( 'keyup',searchKeyPress);
}

function searchKeyPress(event)
{
	if (event.keyCode == Event.KEY_ESC) {
	// escape key pressed
		clearSearch();
	}
}

function clearSearch() {
// clears the search field, sets its default color and value, hides appropriate areas
	search_div.hide();
	setTimeout( function() {
		search_field.style.color = passive_search_text_color;
		search_field.value = default_field_value;
	}, 100);
	results_wrapper_div.hide();
}

function searchFocus() {
	search_field.style.color = active_search_text_color;
	if (search_field.value == default_field_value) {
		search_field.value = '';
	}
}

function showSearch() {
	if (search_div.visible() ) {
		clearSearch();
	}
	else {
		search_div.show();
	}
}

function showTags() {
	tag_block.toggle();
}

function showAuthors() {
	author_block.toggle();
}

function add_quotes() {
	$$('blockquote').each(function(e){
		e.insert( { before: '<div class="quotes lquo">&ldquo;</div>' } );
		e.insert( { after: '<div class="quotes rquo">&rdquo;</div>' } );
	});
}
