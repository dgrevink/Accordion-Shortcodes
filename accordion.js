(function($) {
	'use strict';

	var allTitles    = $('.accordion-title'),
		allPanels    = $('.accordion-content').hide(),
		firstPanel   = $('.accordion-content:first-of-type'),
		closeButtons = $('.accordion-content .close a'),
		duration     = 250,
		settings     = {
			// Set defaults
			autoClose: true,
			openFirst: false,
			openAll: false,
			clickToClose: false,
			scroll: false,
			closeButtons: false
		};

	// Check for accordion settings variable passed from WordPress
	if (typeof accordionSettings !== 'undefined') {
		settings = accordionSettings;
	}

	// Check if there is a hash
	if (!window.location.hash) {
		// if no hash, open the first or all accordion items
		if (settings.openAll) {
			allPanels.show();
			allTitles.addClass('open');
		}
		else if (settings.openFirst) {
			firstPanel.prev().addClass('open');
			firstPanel.slideDown(duration);
		}
	}
	else {
		// hash is defined, open it if possible
		hash = window.location.hash;
		title = $(hash);
		panel = title.next();
		title.addClass('open');
		panel.slideDown(duration);
	}


	// Hash change event listener
	function locationHashChanged() {
		$('.accordion-content').hide();
		$('.accordion-title').removeClass('open');
		hash = window.location.hash;
		title = $(hash);
		panel = title.next();
		title.addClass('open');
		panel.slideDown(duration);
	}
	window.onhashchange = locationHashChanged;


	// Add event listener
	allTitles.click(function() {

		// Only open the item if item isn't already open
		if (!$(this).hasClass('open')) {

			// Close all accordion items
			if (settings.autoClose) {
				allPanels.slideUp(duration);
				allTitles.removeClass('open');
			}

			// Open clicked item
			$(this).next().slideDown(duration, function() {
				// Scroll page to the title
				if (settings.scroll) {
					$('html, body').animate({
						scrollTop: $(this).prev().offset().top
					}, duration);
				}
			});
			$(this).addClass('open');

		}
		// If item is open, and click to close is set, close it
		else if (settings.clickToClose) {

			$(this).next().slideUp(duration);
			$(this).removeClass('open');

		}
		return false;

	});

	// Close button event listener
	if (settings.closeButtons) {

		closeButtons.click(function() {

			$(this).parent().parent().slideUp(duration);
			$(this).parent().parent().prev().removeClass('open');

			return false;

		});
	}

}(jQuery));