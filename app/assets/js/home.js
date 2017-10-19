$(document).ready(function() {
	
	loadStart();
	
	loadCategory($('#sun-core, .category-label'));
	
	unloadCategory($('#sun-core'));
});

function loadStart()
{	
	setTimeout(function() {
		$('.visible-delay').fadeIn();
	}, 1500);
}

function loadCategory(elements) 
{
	var planet = elements.closest('.planet');
	
	elements.on('click', function() {
		$('.visible-delay').fadeOut()
		.promise().done(function() {
			if (planet.hasClass('not-exploring'))
			{
				planet.removeClass('not-exploring');
			}
			
			planet.addClass('explore');
			
			setTimeout(function() {
				$('.category-content').load("http://localhost:31337/RenRossi/app/pages/about.html")
				.promise().done(function() {
					$(this).fadeIn(700);
				});
			}, 1000);
		});
	});
}

function unloadCategory(element) 
{
	var planet = element.closest('.planet');
	
	element.on('click', function() {
		if (planet.hasClass('explore'))
		{
			planet.removeClass('explore');
			planet.addClass('not-exploring');
			
			setTimeout(function() {
				$('.dynamic').fadeIn();
			}, 700);
		}
	});
}
