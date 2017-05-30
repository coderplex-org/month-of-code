/*
	Directive by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function ($) {

	skel.breakpoints({
		wide: '(max-width: 1680px)',
		normal: '(max-width: 1280px)',
		narrow: '(max-width: 980px)',
		narrower: '(max-width: 840px)',
		mobile: '(max-width: 736px)',
		mobilep: '(max-width: 480px)'
	});

	$(function () {

		var $window = $(window),
			$body = $('body');

		// Disable animations/transitions until the page has loaded.
		$body.addClass('is-loading');

		$window.on('load', function () {
			$body.removeClass('is-loading');
		});

		// Fix: Placeholder polyfill.
		$('form').placeholder();

		// Prioritize "important" elements on narrower.
		skel.on('+narrower -narrower', function () {
			$.prioritize(
				'.important\\28 narrower\\29',
				skel.breakpoint('narrower').active
			);
		});

		// Submit Form
		$('form').on('submit', function (e) {
			e.preventDefault()
			var name = $("[name='name']").val()
			var email = $("[name='email']").val()
			var projects = $("[name='projects']").val()
			var domain = $("[name='domains']").val()
			var message = $("[name='message']").val()
			swal("Oops...", "We have closed off submissions for Month of Code.!", "info");
		})

		// smooth Scrolling
		$('a[href*="#"]')
			// Remove links that don't actually link to anything
			.not('[href="#"]')
			.not('[href="#0"]')
			.click(function (event) {
				// On-page links
				if (
					location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
					location.hostname == this.hostname
				) {
					// Figure out element to scroll to
					var target = $(this.hash);
					target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
					// Does a scroll target exist?
					if (target.length) {
						// Only prevent default if animation is actually gonna happen
						event.preventDefault();
						$('html, body').animate({
							scrollTop: target.offset().top
						}, 1000, function () {
							// Callback after animation
							// Must change focus!
							var $target = $(target);
							if(event.target.hash === '#form') {
								$('#form [name="name"]').focus()
								return false;
							}
							$target.focus();
							if ($target.is(":focus")) { // Checking if the target was focused
								return false;
							} else {
								$target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
								$target.focus(); // Set focus again
							};
						});
					}
				}
			});
	});

})(jQuery);