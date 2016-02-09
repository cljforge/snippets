var wheelAngle = 0;

function scrollTo(el){
	var time = 0.3;

	var caretOffset = $('.anchor-'+el).position().top - sBlockHeight/2 + $('.anchor').outerHeight()/2

	$('.container').animate({
		scrollTop: $('#'+el).position().top
	}, time*1000);

	$('.scroll-caret').css({
		'transition' : 'top ' + time + 's linear',
		'top' : caretOffset
	});
	$('.scroll-bar').css({
		'transition' : 'background-position ' + time + 's linear',
		'background-position': '0px ' + caretOffset + "px"
	});

	$('.rope-part').css({
		'transition' : 'background-position ' + time + 's linear',
		'background-position': '0px ' + caretOffset + "px"
	});

	wheelAngle = wheelAngle + caretOffset*1000;

	$('.wheel-spinner').css({
		'transition' : 'transform ' + time + "s linear",
		'transform' : 'rotate(' + wheelAngle +  'deg)'
	})
}

$(document).ready(function(){

	var $body = $('body'),
	$sC = $('.scroll-caret'),
	$sB = $('.scroll-bar'),
	$C = $('.container'),
	$wT = $('#wheel-top'),
	$wB = $('#wheel-bottom'),
	carH = $sC[0].clientHeight,
	bH = $sB[0].clientHeight;

	function scale (){
		$('.scroll-bar').css('height', $('.wrapper')[0].clientHeight - $('.wheel').first().outerHeight()*2);

		for (var i = 0; i < screens.length; i++) {
			$C.append('<div id="'+ screens[i].anchor +'" class="screen">' + screens[i].content + "</div>");
			$sB.append('<div class="anchor anchor-'+ screens[i].anchor +'" onclick="scrollTo(\''+ screens[i].anchor +'\')">' + screens[i].anchor + "</div>")
		};

		sBlockHeight = ($sB[0].clientHeight / screens.length);

		$('.scroll-caret').css('height', sBlockHeight); 
		$('.arrow').css('top' , $('.scroll-caret').outerHeight()/2 - $('.arrow').outerHeight()/2);
		$('.anchor').each(function(index, el){
			$(el).css({
				"top": (sBlockHeight * (index+1) - (sBlockHeight/2)) - $('.anchor').outerHeight()/2,
				"left": $sB.outerWidth() + 15
			})
		})	
	}

	var screens = 
	[{
		anchor: "first",
		content: "<b>first</b>"
	},
	{
		anchor: "second",
		content: "<strike>second</strike>"
	},
	{
		anchor: "third",
		content: "<u>third</u>"
	}];

	scale();

	$body.on('click', '#wheel-top .wheel-button', function(){
		Scroll($sC.offset().top - $sC.parent().offset().top - 30)
	})

	$body.on('click', '#wheel-bot .wheel-button', function(){
		Scroll($sC.offset().top - $sC.parent().offset().top + 30)
	})
})