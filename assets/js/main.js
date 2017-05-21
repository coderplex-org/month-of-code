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
			if (!name || !email) {
				// error
				swal("Oops...", "Fill All Fields!", "error");
				return
			}
			if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(email)) {
				//error
				swal("Oops...", "Enter valid Email!", "error");
				return
			}
			if (!/^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(projects)) {
				//error
				swal("Oops...", "Enter valid URL with http:// or https://", "error");
				return
			}
			if (domain === 'none') {
				//error
				swal("Oops...", "Please select a domain!", "error");
				return
			}
			$('.js-submit-btn').val('Submitting...')
			$.post('https://api.airtable.com/v0/appJNcTf7acL8gsRD/QueryForm?api_key=key5doU0Y1PzvtKxI', {
				fields: {
					email: email,
					name: name,
					projects: projects,
					domain: domain,
					message: message,
					timestamp: new Date().toISOString()
				}
			}).done(function (res) {
				console.log(res)
				swal("Sweet!", "Successfully Submitted!", "success")
				$('form')[0].reset()
				$('.js-submit-btn').val('Submit')
			}).fail(function (e) {
				console.log(e)
				$('.js-submit-btn').val('Submit')
				swal("Oops...", "Something went wrong!", "error");
			})
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