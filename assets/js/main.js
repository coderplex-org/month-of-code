/*
	Directive by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	skel.breakpoints({
		wide: '(max-width: 1680px)',
		normal: '(max-width: 1280px)',
		narrow: '(max-width: 980px)',
		narrower: '(max-width: 840px)',
		mobile: '(max-width: 736px)',
		mobilep: '(max-width: 480px)'
	});

	$(function() {

		var	$window = $(window),
			$body = $('body');

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load', function() {
				$body.removeClass('is-loading');
			});

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Prioritize "important" elements on narrower.
			skel.on('+narrower -narrower', function() {
				$.prioritize(
					'.important\\28 narrower\\29',
					skel.breakpoint('narrower').active
				);
			});
		
		// Submit Form
		$('form').on('submit', function(e) {
			e.preventDefault()
			var name = $("[name='name']").val()
			var email = $("[name='email']").val()
			var projects = $("[name='projects']").val()
			var domain = $("[name='domains']").val()
			var message = $("[name='message']").val()
			if(!name || !email) {
				// error
				swal("Oops...", "Fill All Fields!", "error");
				return
			}
			if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
				//error
				swal("Oops...", "Enter valid Email!", "error");
				return
			}
			if(domain === 'none') {
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
				}).done(function(res){
				console.log(res)
				swal("Sweet!", "Successfully Submitted!", "success")
				$('form')[0].reset()
				$('.js-submit-btn').val('Submit')
			}).fail(function(e) {
				console.log(e)
				$('.js-submit-btn').val('Submit')
				swal("Oops...", "Something went wrong!", "error");
			})
		})

	});

})(jQuery);