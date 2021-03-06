(function($) {
	
	jQuery.fn._scroll = function() {	
		var $el = this,
				step = 20,
				_top = 0,
				bStarted = false,
				slider = 0,
				$gistogramma = $('.gistogramma'),
				$favorite = $('.favorite'),
				timeout = null,
				top_percentage = -26,
				max_top = ($('.slide').length-1)*-100,
				distance = 100,
				curr_top = 0,
				scrollTimeout = null;
				
				var callback = function(e) {
					console.log(1);
						if (scrollTimeout) {
						 	clearTimeout(scrollTimeout);
						 	scrollTimeout = null;
						}
						scrollTimeout = setTimeout(function(){
							$el.removeClass('_scroll'); 		
						}, 250);
						if($el.hasClass('_scroll')) {
							e.stopPropagation();
					    e.preventDefault();
					    e.cancelBubble = false;
					    return false;	
						}
						$el.addClass('_scroll');
						if (e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0) {	
							if (_top == 0) return;
							_top+= distance;
						}	
						else {
							if (_top == max_top) return;
							_top-= distance;
						}
						_animateSlide();					
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
				});
			
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