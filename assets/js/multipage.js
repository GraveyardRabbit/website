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
			e.preventDefault();
			
			var form = $(this);
			var name = $('#name').val().trim();
			var email = $('#email').val().trim();
			var message = $('#message').val().trim();
			var isValid = true;
			
			// Clear previous error states
			form.find('.field').removeClass('error');
			form.find('.error-message').remove();
			
			// Validate required fields
			if (!name) {
				$('#name').closest('.field').addClass('error');
				$('#name').after('<span class="error-message">Name is required</span>');
				isValid = false;
			}
			
			if (!email) {
				$('#email').closest('.field').addClass('error');
				$('#email').after('<span class="error-message">Email is required</span>');
				isValid = false;
			} else if (!isValidEmail(email)) {
				$('#email').closest('.field').addClass('error');
				$('#email').after('<span class="error-message">Please enter a valid email</span>');
				isValid = false;
			}
			
			if (!message) {
				$('#message').closest('.field').addClass('error');
				$('#message').after('<span class="error-message">Message is required</span>');
				isValid = false;
			}
			
			if (isValid) {
				// Show success message (since we can't actually send email without backend)
				var successMsg = $('<div class="success-message">Thank you for your message! I\'ll get back to you soon.</div>');
				form.prepend(successMsg);
				
				// Reset form after delay
				setTimeout(function() {
					form[0].reset();
					successMsg.fadeOut(function() {
						$(this).remove();
					});
				}, 3000);
			}
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