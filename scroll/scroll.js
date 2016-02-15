var wheelAngle = 0;
var backOffset = 0;
var currentAnchor;

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

function scrollToAnchor(el){
	currentAnchor = el;
	var time = 0.3;

	var caretOffset = $('.anchor-'+el).position().top - sBlockHeight/2 + $('[class*=anchor-]').outerHeight()/2;

	$('.container').animate({
		scrollTop: $('#'+el).position().top
	}, time*1000);
	
	var delta = $('.scroll-caret').position().top - caretOffset;
	if(delta < -1 || delta > 1){
		if(delta > 0){
			backOffset +=10;
		} else {
			backOffset -=10;
		}
	}

	$('body').css({
		'transition' : 'background-position ' + time + 's linear',
		'background-position' : '0px ' + backOffset + "%"
	})

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

	wheelAngle = wheelAngle + delta;

	$('.wheel-spinner').css({
		'transition' : 'transform ' + time + "s linear",
		'transform' : 'rotate(' + wheelAngle +  'deg)'
	})
}

function wheelerScroll(direction){
	var destination = direction + screens.findIndex(function(el){
		return el.anchor == currentAnchor;
	});

	if(destination != -1 && destination != screens.length){
		scrollToAnchor(screens[destination].anchor);
	}
}

$(document).ready(function(){

	$(window).on('resize',scale)

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
			$sB.append('<div class="anchor-'+ screens[i].anchor +'" onclick="scrollToAnchor(\''+ screens[i].anchor +'\')">' + screens[i].anchor + "</div>")
		};

		sBlockHeight = ($sB[0].clientHeight / screens.length);

		$('.scroll-caret').css('height', sBlockHeight); 
		$('.arrow').css('top' , $('.scroll-caret').outerHeight()/2 - $('.arrow').outerHeight()/2);
		$('[class*=anchor-]').each(function(index, el){
			$(el).css({
				"top": (sBlockHeight * (index+1) - (sBlockHeight/2)) - $('[class*=anchor-]').outerHeight()/2,
				"left": $sB.outerWidth() + 15
			})
		})

		wheelerScroll(0);
	}

	currentAnchor = screens[0].anchor;
	scale();

	$body.on('click', '#wheel-top', function(){
		wheelerScroll(-1)
	})

	$body.on('click', '#wheel-bot', function(){
		wheelerScroll(1)
	})
})