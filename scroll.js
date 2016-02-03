$(document).ready(function(){
	var $body = $('body'),
	 	$sC = $('.scroll-caret'),
	 	$sB = $('.scroll-bar');

	$sB.on('click', function (event){
		if(event.target === this){
			var offsetTop;

			var cH = $sC.outerHeight(),
				bH = $sB.outerHeight(),
				bOT = $sB.position().top;

			if(event.offsetY - cH/2 < bOT){
				offsetTop = 0;
			} else if(event.offsetY + cH > bOT + bH) {
				offsetTop = bH - cH;
			} else {
				offsetTop = (event.offsetY) - cH/2;
			}

			var delta = $sC.offset().top - event.offsetY,
				time = Math.abs(delta/100 * 0.4);

			$sC.offset({'top': offsetTop});

			$sC.css({
				'transition' : 'top ' + time + 's linear',
				'top' : offsetTop
			});
			$sB.css({
				'transition' : 'background-position ' + time + 's linear',
				'background-position': '0px ' + (event.offsetY) + "px"
			});

// 			scrolling = setInterval(function(){
//   $('code').scrollTop($('code').scrollTop() - 10)
// },25)

// setTimeout(function(){
// window.clearInterval(scrolling)
// },1000)

		}
	});

	$('.container').text('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ac tamen, ne cui loco non videatur esse responsum, pauca etiam nunc dicam ad reliquam orationem tuam. Quod non faceret, si in voluptate summum bonum poneret. Intellegi quidem, ut propter aliam quampiam rem, verbi gratia propter voluptatem, nos amemus; Tum ego: Non mehercule, inquam, soleo temere contra Stoicos, non quo illis admodum assentiar, sed pudore impedior; Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ac tamen, ne cui loco non videatur esse responsum, pauca etiam nunc dicam ad reliquam orationem tuam. Quod non faceret, si in voluptate summum bonum poneret. Intellegi quidem, ut propter aliam quampiam rem, verbi gratia propter voluptatem, nos amemus; Tum ego: Non mehercule, inquam, soleo temere contra Stoicos, non quo illis admodum assentiar, sed pudore impedior; Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ac tamen, ne cui loco non videatur esse responsum, pauca etiam nunc dicam ad reliquam orationem tuam. Quod non faceret, si in voluptate summum bonum poneret. Intellegi quidem, ut propter aliam quampiam rem, verbi gratia propter voluptatem, nos amemus; Tum ego: Non mehercule, inquam, soleo temere contra Stoicos, non quo illis admodum assentiar, sed pudore impedior; Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ac tamen, ne cui loco non videatur esse responsum, pauca etiam nunc dicam ad reliquam orationem tuam. Quod non faceret, si in voluptate summum bonum poneret. Intellegi quidem, ut propter aliam quampiam rem, verbi gratia propter voluptatem, nos amemus; Tum ego: Non mehercule, inquam, soleo temere contra Stoicos, non quo illis admodum assentiar, sed pudore impedior; Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ac tamen, ne cui loco non videatur esse responsum, pauca etiam nunc dicam ad reliquam orationem tuam. Quod non faceret, si in voluptate summum bonum poneret. Intellegi quidem, ut propter aliam quampiam rem, verbi gratia propter voluptatem, nos amemus; Tum ego: Non mehercule, inquam, soleo temere contra Stoicos, non quo illis admodum assentiar, sed pudore impedior; Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ac tamen, ne cui loco non videatur esse responsum, pauca etiam nunc dicam ad reliquam orationem tuam. Quod non faceret, si in voluptate summum bonum poneret. Intellegi quidem, ut propter aliam quampiam rem, verbi gratia propter voluptatem, nos amemus; Tum ego: Non mehercule, inquam, soleo temere contra Stoicos, non quo illis admodum assentiar, sed pudore impedior; Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ac tamen, ne cui loco non videatur esse responsum, pauca etiam nunc dicam ad reliquam orationem tuam. Quod non faceret, si in voluptate summum bonum poneret. Intellegi quidem, ut propter aliam quampiam rem, verbi gratia propter voluptatem, nos amemus; Tum ego: Non mehercule, inquam, soleo temere contra Stoicos, non quo illis admodum assentiar, sed pudore impedior; Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ac tamen, ne cui loco non videatur esse responsum, pauca etiam nunc dicam ad reliquam orationem tuam. Quod non faceret, si in voluptate summum bonum poneret. Intellegi quidem, ut propter aliam quampiam rem, verbi gratia propter voluptatem, nos amemus; Tum ego: Non mehercule, inquam, soleo temere contra Stoicos, non quo illis admodum assentiar, sed pudore impedior; Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ac tamen, ne cui loco non videatur esse responsum, pauca etiam nunc dicam ad reliquam orationem tuam. Quod non faceret, si in voluptate summum bonum poneret. Intellegi quidem, ut propter aliam quampiam rem, verbi gratia propter voluptatem, nos amemus; Tum ego: Non mehercule, inquam, soleo temere contra Stoicos, non quo illis admodum assentiar, sed pudore impedior; Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ac tamen, ne cui loco non videatur esse responsum, pauca etiam nunc dicam ad reliquam orationem tuam. Quod non faceret, si in voluptate summum bonum poneret. Intellegi quidem, ut propter aliam quampiam rem, verbi gratia propter voluptatem, nos amemus; Tum ego: Non mehercule, inquam, soleo temere contra Stoicos, non quo illis admodum assentiar, sed pudore impedior;')


})