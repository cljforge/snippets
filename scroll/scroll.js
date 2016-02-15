var wheelAngle = 0,
backOffset = 50,
columnOffset = 0,
currentAnchor,
inAction = false,
screens = 
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
},
{
	anchor: "forth",
	content: "<u>forth</u>"
}];

function scrollToAnchor(el){

	//TODO calculate diff in indecies to fix background offset top

	if(!inAction){
		inAction = true;

		currentAnchor = el;
		var time = 0.3,
		caretOffset = $('.anchor-'+el).position().top - sBlockHeight/2 + $('[class*=anchor-]').outerHeight()/2,
		delta = $('.scroll-caret').position().top - caretOffset;

		$('.container').animate({
			scrollTop: $('#'+el).position().top
		}, time*1000);

		if(delta < -1 || delta > 1){
			delta > 0? backOffset +=4:backOffset -=4;
		}

	//Landscape
	$('body').css({
		'transition' : 'background-position ' + time + 's linear',
		'background-position' : '0px ' + backOffset + "%"
	})


	// Columns 
	columnOffset += delta;
	$('.container').css({
		'transition' : 'background-position ' + time + 's linear',
		'background-position' : 'left '+ columnOffset +', right '+ columnOffset +', left '+ columnOffset +', right '+ columnOffset
	})

	//ScrollBar
	$('.scroll-caret').css({
		'transition' : 'top ' + time + 's linear',
		'top' : caretOffset
	});
	$('.scroll-bar').css({
		'transition' : 'background-position ' + time + 's linear',
		'background-position': '0px ' + caretOffset + "px"
	});

	//Wheels
	wheelAngle = wheelAngle + delta/2;
	$('.rope-part').css({
		'transition' : 'background-position ' + time + 's linear',
		'background-position': '0px ' + (caretOffset+6) + "px"
	});

	$('.wheel-spinner').css({
		'transition' : 'transform ' + time + "s linear",
		'transform' : 'rotate(' + wheelAngle +  'deg)'
	})

	setTimeout(function(){
		inAction = false;
	}, time*1000);
}
}

function wheelerScroll(direction){
	console.log(currentAnchor);
	var destination = direction + screens.findIndex(function(el){
		return el.anchor == currentAnchor;
	});

	if(destination != -1 && destination != screens.length){
		scrollToAnchor(screens[destination].anchor);
	}
}

function scale (){
	$('.scroll-bar').css('height', $('.wrapper')[0].clientHeight - $('.wheel').first().outerHeight()*2);

	var $C = $('.container'),
	$sB = $('.scroll-bar'),
	carH = $('.scroll-caret')[0].clientHeight,
	bH = $('.scroll-bar')[0].clientHeight;

	for (var i = 0; i < screens.length; i++) {
		$C.append('<div id="'+ screens[i].anchor +'" class="screen">' + screens[i].content + "</div>");
		$sB.append('<div class="anchor-'+ screens[i].anchor +'" onclick="scrollToAnchor(\''+ screens[i].anchor +'\')">' + screens[i].anchor + "</div>")
	};

	sBlockHeight = (bH / screens.length);

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

$(document).ready(function(){
	$(window).on('resize', _.debounce(scale,200))
	scale();

	var $body = $('body');
	$body.on('click', '#wheel-top', function(){wheelerScroll(-1)})
	$body.on('click', '#wheel-bot', function(){wheelerScroll(1)})
})