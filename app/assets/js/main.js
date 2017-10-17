$(document).ready(function() {
	$('#singularity').on('click', function() {
		$('.container-fluid, #singularity').addClass('bang')
		.promise().done(function() {
			setTimeout(function() {
				window.location.href = "http://localhost:31337/RenRossi/app/pages/home.html";
			}, 1500);
		});
	});
	
	$('#sun-core').on('click', function() {		
		$('#sun-shine, #sun-rays, #sun-core, #sun-rays img, #sun-core img').addClass('open')
		.promise().done(function() {
//			setTimeout(function() {
//				$('#sun-shine, #sun-rays, #sun-core, #sun-rays img, #sun-core img').fadeOut(700)
//				.promise().done(function() {
//					window.location.href = "http://localhost:31337/RenRossi/app/pages/about.html";
//				});	
//			}, 500);
		});
	});
});