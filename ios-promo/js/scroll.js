(function($) {
	
	jQuery.fn._scroll = function() {	
		var $el = this,
				option = {
					_width: $('body').width(), 
					_height: $('body').height(),
					slides: {from: {obj: null, num: 0, 'visible': 100}, to: {obj: null, num: 1, 'visible': 0}}, // 0 to 1
					deltaY: 0,
					arr_slides: [
						$('.slide.slide-0'),
						$('.slide.slide-1'),
						$('.slide.slide-2'),
						$('.slide.slide-3'),
						$('.slide.slide-4')																										
					],
					position: {_top: 0, toUp: false, toDown: false}
				};
	
    $el.scroll(function() {
   		if ($(this).scrollTop() > option.position._top) {
   			option.position.toDown = true;
   			option.position.toUp = !option.position.toDown;	
   		}
   		else {
   			option.position.toUp = true;
   			option.position.toDown = !option.position.toUp;	   				
   		}
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
    	option.slides.from.visible = Math.round((Math.abs(_max-(option.position._top-option._height*num)/option._height*100))*10)/1000;
    	option.slides.to.visible = 1-option.slides.from.visible;
    	option.deltaY = Math.abs(odlVisible-option.slides.to.visible);
    	
    	animateSlider();  	
    });
    
    
    function animateSlider() { 
    	//анимация текущего слайда
    	switch (option.slides.from.num) { 
    		case 0:
    			roundVisible();
    			var $slide = $('.slide.slide-2');
    			$slide.find('.iphone-content.iphone-content-0').css('opacity', option.slides.from.visible);	
    			$slide.find('.iphone-content.iphone-content-1').css('opacity', option.slides.to.visible);	    			
    		break;
    		case 1:
    			var $slide = $('.slide.slide-2');
    			$slide.find('.iphone-content.iphone-content-0').css('opacity', 0);	    			
    			$slide.find('.iphone-content.iphone-content-1').css('opacity', option.slides.from.visible);	
    			$slide.find('.iphone-content.iphone-content-2').css('opacity', option.slides.to.visible);
    			if (option.slides.to.visible >= getPoint()) {	
    				var $iphone = $slide.find('.iphone');
    				if (!$iphone.hasClass('absolute')) {
    					$iphone.css({
    						'position': 'absolute',
    						'margin-top': parseInt($iphone.css('margin-top'), 10) - option._height*option.slides.from.visible
    					});
    				}
    			}    		
    		break;
    		case 2:
    			var $slide = $('.slide.slide-2');
    			$slide.find('.iphone-content.iphone-content-0').css('opacity', 0);	    			
    			$slide.find('.iphone-content.iphone-content-1').css('opacity', 0);
    			var $iphone = $slide.find('.iphone');
    			if (!$iphone.hasClass('absolute')) {
    				$iphone.css({'position': 'absolute'});
    			}
    			$slide = $('.slide.slide-3');
    			if (option.slides.to.visible >= getPoint()) {
    				$el.scrollTop(3*option._height);
    						
    			}    			 		
    		break;
    		case 3:
    		break;   		    		    		    			
    	}
    	
    	//анимация следующего слайда
    	switch (option.slides.from.to) { 
    		case 0:
    		break;
    		case 1:
    		break;
    		case 2:
    		break;
    		case 3:
    		break;
    		case 4:
    		break;    		    		    		    			
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
			option.position._top = $(this).scrollTop();
		});
		
		function roundVisible() {
			if (option.slides.from.visible < 0.1) option.slides.from.visible = 0;
			if (option.slides.from.visible > 0.9) option.slides.from.visible = 1;			
			if (option.slides.to.visible < 0.1) option.slides.to.visible = 0;
			if (option.slides.to.visible > 0.9) option.slides.to.visible = 1;	
		}
		
		function getPoint() {
			if (option.deltaY<0.02) return 0.98;
			if (option.deltaY<0.05) return 0.96;
			if (option.deltaY<0.07) return 0.94;
			if (option.deltaY<0.09) return 0.92;
			return 0.9;									
		}
				
				/*var callback = function(e) {
					e.preventDefault();
					$slide = $('.slide').eq(slider);
						
						if (!$(e.target).hasClass('slide-'+slider) && $(e.target).parents('.slide-'+slider).length==0 || $el.hasClass('_scroll')) {
							return false;						
						}	
											
						if (e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0) {	
							if (_top == 0) return;
							_top+= distance;
						}	
						else {
							if (_top == max_top) return;
							_top-= distance;
						}
						$el.addClass('_scroll');
						_animateSlide();
						setTimeout(function(){$el.removeClass('_scroll');}, 300);				
				};
				 
				$el.on('mousewheel wheel', function(e){callback(e)});
				
			 	
				$(document).on('keyup', function(e) {
					if ($el.hasClass('_scroll')) return false;
	 				var code = (e.charCode) ? e.charCode : e.keyCode;
	 				switch(code) {
				    case 38:
				    	if (_top == 0) return;
							_top+= distance;
							$el.addClass('_scroll');
							_animateSlide();
							setTimeout(function(){$el.removeClass('_scroll');}, 300);							
				    break; 
				    case 32: case 40:
							if (_top == max_top) return false;
							_top-= distance;
							$el.addClass('_scroll');
							_animateSlide();
							setTimeout(function(){$el.removeClass('_scroll');}, 300);
				    break; 	 					
	 				}					
				});*/
			
			/*switch (slider) {
				case 0:
					distance = 100;	
				break;
				case 1:
					distance = 100;	
					step = 500*Math.abs(wheelDistance(e));
					var _width = $gistogramma.width();
					if (_width<2000) {
						distance = 0;
						if (_width+step>2000) step = 2000 - _width;
		   			$gistogramma.animate({
		   				width: _width+step
		   				}, 
		   				500, 
		   				function(){bStarted = false}
		   			);						
					}
					else {
		   			$gistogramma.animate({
		   				width: 0
		   				}, 
		   				100, 
		   				function(){
		   					bStarted = false
		   				}
		   			);						
					}  	
				break;
				case 2:
					distance = 100;
					step = 19*Math.abs(wheelDistance(e));	
					if (top_percentage<50) {
						$favorite.show();
						distance = 0;
						if (top_percentage+step > 50 ) step = 50 - top_percentage;
						top_percentage +=step;
		   			$favorite.animate({
		   				top: top_percentage+'%'
		   				}, 
		   				200, 
		   				function(){bStarted = false;}
		   			);
		   			if (top_percentage == 50) {
		   				$('.favorite-shadow').animate({
			   				opacity: 1
			   				}, 
			   				200, 
			   				function(){}
		   				);
		   			}						
					}
					else {
						top_percentage = -26;
						$favorite.hide().css('top', '-26%');
						$('.favorite-shadow').css('opacity', 0);		
					}									
				break;
				case 3:
				break;
				case 4:
				break;																
			}*/     
		//});	
		
    function _animateSlide() {
      $el.css({
      	"webkitTransform":"translate3d(0px, "+_top+"%,  0px)",
        "MozTransform":"translate3d(0px, "+_top+"%, 0px)",
        "msTransform":"translate3d(0px, "+_top+"%, 0px)",
        "-ms-transform":"translate(0px, "+_top+"%)",              
        "OTransform":"translate(0px, "+_top+"%)",
        "transform":"translate(0px, "+_top+"%)",
        "transition-timing-function": "ease",
  			"transition-duration": "0.3s"
  		});
  		
  		var next_slider = Math.abs(_top/100); 
  		animate_iphone_content(slider, next_slider);		
  		slider = Math.abs(_top/100);
  		
  		if (slider == 1 ) {
  			$('.slide-2 .content .iphone_').css('opacity', 0);
  			$('.iphone-wrapper').css('opacity', 1);
  		}
  		if (slider == 0|| slider == 2) { 
  			$('.gistogramma').animate({'opacity':0}, 200, function(){$('.gistogramma').css('width', 0)});
  		} 		
  		setTimeout(function(){
  			if (slider == 1) { 			
  				$('.gistogramma').css('opacity', 1).animate({'width': 2000}, 300, function(){});
  				$favorite.css('top', '-50%');
  				$('.favorite-shadow').css('opacity', 0);
  			}
  			if (slider == 2) {
  				$('.slide-2 .content .iphone_').css('opacity', 1); 				
  				$('.iphone-wrapper').css('opacity', 0);
  				$('.slider .slide-3 .clouds-glare').css('opacity', 1);
  				$('.background-wrapper').removeClass('slide-3');
  				$('.slider .slide-3').addClass('with-background-slide3');
		   		$favorite.animate({
		   				top: '50%'
		   			}, 
		   			400, 
		   			function(){
		   				$('.favorite-shadow').animate({
			   				opacity: 1
			   				}, 
			   				50, 
			   				function(){}
		   				);
		   			}
		   		);  				
  			}
  			if (slider == 3) {
  				$('.background-wrapper').addClass('slide-3');
  				$('.slider .slide-3').removeClass('with-background-slide3');
  				$('.slider .slide-3 .clouds-glare').css('opacity', 0);
	  			$favorite.css('top', '-50%');
	  			$('.favorite-shadow').css('opacity', 0);  				
  			}			
  		}, 300);
  		if (slider == 3) {
 				if ($('.background-wrapper .background-slide3').css('opacity')==0) {
		  		$('.background-wrapper .background-slide3').css({
		  			opacity: 1,
		    		WebkitTransition : 'opacity 0.1s ease-in-out',
		    		MozTransition    : 'opacity 0.1s ease-in-out',
		    		MsTransition     : 'opacity 0.1s ease-in-out',
		    		OTransition      : 'opacity 0.1s ease-in-out',
		    		transition       : 'opacity 0.1s ease-in-out'
					});
		  		$('.background-wrapper .background-slide4').css({
		  			opacity: 0,
		    		WebkitTransition : 'opacity 0.1s ease-in-out',
		    		MozTransition    : 'opacity 0.1s ease-in-out',
		    		MsTransition     : 'opacity 0.1s ease-in-out',
		    		OTransition      : 'opacity 0.1s ease-in-out',
		    		transition       : 'opacity 0.1s ease-in-out'
					});	  					
  			}  			
  		}
  		if (slider == 4) {
  			$('.background-wrapper .background-slide3').css({
  				opacity: 0,
    			WebkitTransition : 'opacity 0.1s ease-in-out',
    			MozTransition    : 'opacity 0.1s ease-in-out',
    			MsTransition     : 'opacity 0.1s ease-in-out',
    			OTransition      : 'opacity 0.1s ease-in-out',
    			transition       : 'opacity 0.1s ease-in-out'
				});
  			$('.background-wrapper .background-slide4').css({
  				opacity: 1,
    			WebkitTransition : 'opacity 0.1s ease-in-out',
    			MozTransition    : 'opacity 0.1s ease-in-out',
    			MsTransition     : 'opacity 0.1s ease-in-out',
    			OTransition      : 'opacity 0.1s ease-in-out',
    			transition       : 'opacity 0.1s ease-in-out'
				});					
  		}  		        	
    }
    
    function animate_iphone_content(from, to) {
    	$('.iphone-content-'+from).animate({
   			opacity: 0	
   		}, 
   		300, 
   		function(){});
    	$('.iphone-content-'+to).animate({
   			opacity: 1
   		}, 
   		300, 
   		function(){});	   		
    }
    
		$('.arrow a').on('click', function(e) {
			e.preventDefault();	
			_top= -100;	
      bStarted = true;
      _animateSlide();   					
		});	    	
	}
	
				/*var wheelDistance = function(e){
				if (!e) e = event;
				var w=e.originalEvent.wheelDelta, d=e.originalEvent.detail;
				if (d){
				  if (w) return w/d/40*d>0?1:-1; // Opera
				  else return -d/3;              // Firefox;         TODO: do not /3 for OS X
				} else return w/120;             // IE/Safari/Chrome TODO: /3 for Chrome OS X
			};*/
	
})(jQuery);