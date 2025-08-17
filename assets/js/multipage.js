/*
	Dimension by HTML5 UP - Modified for Multi-page Navigation
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$wrapper = $('#wrapper'),
		$header = $('#header'),
		$footer = $('#footer'),
		$main = $('#main'),
		$main_articles = $main.children('article');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ '361px',   '480px'  ],
			xxsmall:  [ null,      '360px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Fix: Flexbox min-height bug on IE.
		if (browser.name == 'ie') {

			var flexboxFixTimeoutId;

			$window.on('resize.flexbox-fix', function() {

				clearTimeout(flexboxFixTimeoutId);

				flexboxFixTimeoutId = setTimeout(function() {

					if ($wrapper.prop('scrollHeight') > $window.height())
						$wrapper.css('height', 'auto');
					else
						$wrapper.css('height', '100vh');

				}, 250);

			}).triggerHandler('resize.flexbox-fix');

		}

	// Nav.
		var $nav = $header.children('nav'),
			$nav_li = $nav.find('li');

		// Add "middle" alignment classes if we're dealing with an even number of items.
			if ($nav_li.length % 2 == 0) {

				$nav.addClass('use-middle');
				$nav_li.eq( ($nav_li.length / 2) ).addClass('is-middle');

			}

	// Contact form validation and handling.
		$('#contact-form').on('submit', function(e) {
			var form = $(this);
			var name = $('#name').val().trim();
			var email = $('#email').val().trim();
			var message = $('#message').val().trim();
			var isValid = true;
			
			// Clear previous error states
			form.find('.field-error').removeClass('field-error');
			form.find('.error-message').remove();
			
			// Validate required fields
			if (!name) {
				$('#name').parent().addClass('field-error');
				$('#name').after('<span class="error-message">Name is required</span>');
				isValid = false;
			}
			
			if (!email) {
				$('#email').parent().addClass('field-error');
				$('#email').after('<span class="error-message">Email is required</span>');
				isValid = false;
			} else if (!isValidEmail(email)) {
				$('#email').parent().addClass('field-error');
				$('#email').after('<span class="error-message">Please enter a valid email</span>');
				isValid = false;
			}
			
			if (!message) {
				$('#message').parent().addClass('field-error');
				$('#message').after('<span class="error-message">Message is required</span>');
				isValid = false;
			}
			
			if (!isValid) {
				e.preventDefault();
				return false;
			}
			
			// If validation passes, form will submit normally to Formspree
			// Show loading state
			var submitBtn = form.find('button[type="submit"]');
			submitBtn.text('Sending...').prop('disabled', true);
		});
		
		// Email validation helper
		function isValidEmail(email) {
			var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			return emailRegex.test(email);
		}

	// Mobile menu toggle
	window.toggleMobileMenu = function() {
		const mobileMenu = document.getElementById('mobile-menu');
		if (mobileMenu) {
			mobileMenu.classList.toggle('hidden');
		}
	}

	// Initialize for multi-page setup.
		// Show main and articles immediately (no hash-based hiding)
		if ($main.length) {
			$main.show();
			$main_articles.show();
			
			// Mark body as having visible article
			$body.addClass('is-article-visible');
		}

})(jQuery);