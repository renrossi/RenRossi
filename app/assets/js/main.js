$(document).ready(function() {
	
	loadStart();
});

function loadStart()
{
	$('#singularity').on('click', function() {
		$('.container-fluid, #singularity').addClass('bang')
		.promise().done(function() {
			$('#start-msg').fadeOut(700);
			setTimeout(function() {
				window.location.href = "http://localhost:31337/RenRossi/app/pages/home.html";
				
			}, 1500);
		});
	});
}
