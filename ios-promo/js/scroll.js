(function($) {
	
	jQuery.fn._scroll = function() {	
		var $el = this,
				option = {
					_width: $('body').width(), 
					_height: $('body').height(),
					slides: {from: {num: 0, 'visible': 100}, to: {num: 1, 'visible': 0}}, // 0 to 1
					deltaY: 0,
					position: {_top: 0, toUp: false, toDown: false},
					arc: {angle: 0, len: 0, centerX: 0, centerY: 0, radius: 0}
				};			
	
		arcDraw();
	
    $el.scroll(function() {
   		if ($(this).scrollTop() > option.position._top) {
   			option.position.toDown = true;
   			option.position.toUp = !option.position.toDown;	
   		}
   		else {
   			option.position.toUp = true;
   			option.position.toDown = !option.position.toUp;	   				
   		}
   		//Рассчёт шага скролла в процентах
   		
    	option.position._top = $(this).scrollTop();
    	
    	//Рассчёт текущего и следующего номера слайда
    	option.slides.to.num = (option.position.toDown == true)?Math.ceil(option.position._top/option._height):Math.floor(option.position._top/option._height);
    	option.slides.from.num = (option.position.toDown == true)?option.slides.to.num-1:option.slides.to.num+1;
    	
    	//Рассчёт процента видимости слайдов
    	var num = option.slides.from.num,
    			_max = 100;
    	
    	if (option.position.toUp)  { 
    		num = option.slides.to.num;  
    		_max=0;
    	}
    	
    	var odlVisible = option.slides.to.visible;
    	
    	//Рассчёт процентов видимости текущего и следующего слайда
    	option.slides.from.visible = Math.round((Math.abs(_max-(option.position._top-option._height*num)/option._height*100))*10)/1000;
    	option.slides.to.visible = 1-option.slides.from.visible;
    	
    	option.deltaY = Math.abs(odlVisible-option.slides.to.visible);
    	//console.log(option.deltaY);
    	animateSlider();  	
    });
    
    
    function animateSlider() { 
    	if (option.position.toDown) {
	    	switch (option.slides.from.num) { 
	    		case 0:
	    			//roundVisible();
	    			var $slide = $('.slide.slide-2');
	    			$slide.find('.iphone-content.iphone-content-0').css('opacity', option.slides.from.visible);	
	    			$slide.find('.iphone-content.iphone-content-1').css('opacity', option.slides.to.visible);
	    			if (option.slides.to.visible>=0.5) {
	    				var w = 1950*((0.5-(1-option.slides.to.visible))/0.5);
	    				$('.gistogramma').width(w);    				
	    			}	    			
	    		break;
	    		case 1:
	    			var $slide = $('.slide.slide-2');
	    			$slide.find('.iphone-content.iphone-content-0').css('opacity', 0);	    			
	    			$slide.find('.iphone-content.iphone-content-1').css('opacity', option.slides.from.visible);	
	    			$slide.find('.iphone-content.iphone-content-2').css('opacity', option.slides.to.visible);
	    			if (option.slides.to.visible >= getPoint()) {	
	    				var $iphone = $slide.find('.iphone');
	    				if ($iphone.css('position') == 'fixed') {
	    					$iphone.css({
	    						'position': 'absolute',
	    						'margin-top': parseInt($iphone.css('margin-top'), 10) - option._height*option.slides.from.visible
	    					});
	    				}
	    			}    			
	    			if (option.slides.to.visible >= 0.2) {
	    				var _top = 50*(0.8-(1-option.slides.to.visible))/0.8;
	    				$('.favorite').css('top', _top+'%');
	    				if (_top > 47) {
	    					$('.favorite-shadow').css('opacity', 1);
	    				}		
	    			}
	    			$('.gistogramma').width(1950);	    			    			    		
	    		break;
	    		case 2:
	    			var $slide = $('.slide.slide-2');
	    			$slide.find('.iphone-content.iphone-content-0').css('opacity', 0);	    			
	    			$slide.find('.iphone-content.iphone-content-1').css('opacity', 0);
	    			var $iphone = $slide.find('.iphone');
	    			if ($iphone.css('position') == 'fixed') {
	    				$iphone.css({'position': 'absolute'});
	    			}
	    			$slide = $('.slide.slide-3');
	    			if (option.slides.to.visible >= getPoint()) {
	    				$el.scrollTop(3*option._height);
				 			if ($('.background-wrapper .background-slide3').css('opacity') == 0)
								$('.background-wrapper .background-slide3').css('opacity', 1);
		  				$('.background-wrapper').addClass('slide-3');
		  				$('.slider .slide-3').removeClass('with-background-slide3');
		  				$('.slider .slide-3 .clouds-glare').css('opacity', 0);    					   							
	    			}
	    			$('.gistogramma').hide();
	    			if (option.slides.to.visible >= 0.2) {
	    				var angle = (180-(option.arc.angle)*2)/2;
	    				var newangle = option.arc.angle + angle*((0.8-(1-option.slides.to.visible))/0.8);
	    				var cX = option.arc.centerX - Math.cos(degToRad(newangle)) * option.arc.radius;
	    				var cY = option.arc.centerY - Math.sin(degToRad(newangle)) * option.arc.radius-10;
	    				sunDraw(cX, cY);
	    			}    			 		
	    		break;
	    		case 3:
	    			if (option.slides.to.visible <= 0.5) {
	    				var angle = (180-(option.arc.angle)*2);
	    				var newangle = angle/2+option.arc.angle + angle*((0.5-(0.5-option.slides.to.visible))/0.5);
	    				var cX = option.arc.centerX - Math.cos(degToRad(newangle)) * option.arc.radius;
	    				var cY = option.arc.centerY - Math.sin(degToRad(newangle)) * option.arc.radius+$('.sun').height()*option.slides.to.visible;
	    				sunDraw(cX, cY);
	    			}
	    			else {
	    				var cX = option.arc.centerX - Math.cos(degToRad(angle)) * option.arc.radius;
	    				var cY = option.arc.centerY - Math.sin(degToRad(angle)) * option.arc.radius+$('.sun').height()*option.slides.to.visible;
	    				sunDraw(cX, cY);	    					
	    			}
	  				$('.background-wrapper .background-slide3').css('opacity', option.slides.from.visible);
	  				$('.background-wrapper .background-slide4').css('opacity', option.slides.to.visible);	    							   		
	    		break;
	    	}
    	}
    	else { 
    		//console.log([option.slides.from.num, option.slides.from.visible, option.slides.to.num, option.slides.to.visible]);  		
	    	switch (option.slides.from.num) {
	    		case 1:
	    			var $slide = $('.slide.slide-2');
	    			$slide.find('.iphone-content.iphone-content-1').css('opacity', option.slides.from.visible);	
	    			$slide.find('.iphone-content.iphone-content-0').css('opacity', option.slides.to.visible);
	    			if (option.slides.to.visible >= 0 && option.slides.to.visible <= 0.5) {
	    				var w = 1950*((0.5-(0.5-option.slides.to.visible))/0.5);
	    				w = 1950 - w;
	    				$('.gistogramma').width(w);    				
	    			}	
	    			else
	    				$('.gistogramma').width(0);		    			    		
	    		break;
	    		case 2:
	    			var $slide = $('.slide.slide-2');
	    			$slide.find('.iphone-content.iphone-content-2').css('opacity', option.slides.from.visible);	
	    			$slide.find('.iphone-content.iphone-content-1').css('opacity', option.slides.to.visible);
	    			if (option.slides.from.visible <= getPoint()) {	
	    				var $iphone = $slide.find('.iphone');
	    				if ($iphone.css('position') == 'absolute') {
	    					$iphone.css({
	    						'position': 'fixed',
	    						'margin-top': '-372px'
	    					});
	    				}    				
	    			}
		    		if (option.slides.to.visible >= 0 && option.slides.to.visible <= 0.8) {
		    			$('.favorite-shadow').css('opacity', 0);
		    			var _top = 50*(0.8-(0.8-option.slides.to.visible))/0.8;
		    			console.log(_top);
		    			_top = 50 - _top;
		    			$('.favorite').css('top', _top+'%');	
		    		}
		    			
		    		if (parseInt($('.favorite').css('top'),10) < -50) $('.favorite').css('top', '-50%');		    				
	    			$('.gistogramma').show();
	    		break;
	    		case 3:
				 		if ($('.background-wrapper .background-slide3').css('opacity') == 1)
								$('.background-wrapper .background-slide3').css('opacity', 0);
		  			$('.background-wrapper').removeClass('slide-3');
		  			$('.slider .slide-3').addClass('with-background-slide3');
		  			$('.slider .slide-3 .clouds-glare').css('opacity', 1);    					   								    		
	    		break;
	    		case 4:
	  				$('.background-wrapper .background-slide4').css('opacity', option.slides.from.visible);
	  				$('.background-wrapper .background-slide3').css('opacity', option.slides.to.visible);			    			
	    		break;    		    		    		    			
	    	}
	    }    	   		
    }
    
		
		$(window).resize(function() {
	    clearTimeout($.data(this, 'resizeTimer'));
	    $.data(this, 'resizeTimer', setTimeout(function() {
	 				$(window).trigger('resizeEnd');
	    }, 200));    
		});
	
		$(window).bind('resizeEnd', function() {
			option._width = $('body').width();
			option._height = $('body').height();
			arcDraw();			
			option.position._top = $(this).scrollTop();
		});
		
		function roundVisible() {
			if (option.slides.from.visible < 0.1) option.slides.from.visible = 0;
			if (option.slides.from.visible > 0.9) option.slides.from.visible = 1;			
			if (option.slides.to.visible < 0.1) option.slides.to.visible = 0;
			if (option.slides.to.visible > 0.9) option.slides.to.visible = 1;	
		}
		
		function getPoint() {
			if (option.deltaY<0.01) return 0.99;			
			if (option.deltaY<0.02) return 0.96;
			if (option.deltaY<0.05) return 0.94;
			if (option.deltaY<0.07) return 0.92;
			return 0.9;									
		}
		
		function arcDraw () {
			var w = 1800;
			var h = option._height*0.3;
			
			var a = w;
			option.arc.radius = Math.sqrt(Math.pow(a, 2)+Math.pow(a/2, 2));
			option.arc.centerY = option.arc.radius+10;
			option.arc.centerX = w/2;
			$('.arc').width(w);
			$('.arc').height(h);
			$('.arc').css({
				'margin-top': option._height*-0.26,
				'margin-left': w*-0.5
			});	
		
			var tangA = a/(w/2);
			var sAngle = Math.atan(tangA);
			option.arc.angle = sAngle/ Math.PI * 180;
			option.arc.len = option.arc.radius*(180-(sAngle/ Math.PI * 180)*2)*Math.PI/180; //длина дуги
			var eAngle = degToRad(180-(sAngle/ Math.PI * 180));
			
			var web_canvas = document.getElementById('arc');
			var web_context = web_canvas.getContext("2d");
			web_canvas.width = w;
			web_canvas.height = h;
			web_context.arc(option.arc.centerX, option.arc.centerY, option.arc.radius, sAngle*Math.PI, eAngle*Math.PI, false);
   		web_context.lineWidth = 2;
    	web_context.strokeStyle = "#fff"; 
    	web_context.stroke();			
		}	
		
		function sunDraw(cX, cY) {
			if ( cX > 1771 ) return;
			$('.sun').css({'left': cX, 'top': cY - parseInt($('.sun').height(), 10)/2}).show();
		}
		
		function degToRad (deg) { 
			return deg / 180 * Math.PI; 
		}

		function radToDeg (rad) { 
			return rad / Math.PI * 180; 
		}
		
    
		$('.arrow a').on('click', function(e) {
			e.preventDefault();	
			_top= -100;	
      bStarted = true;
			$el.animate({scrollTop: option._height}, 500);				
		});	    	
	}
})(jQuery);