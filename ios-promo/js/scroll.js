(function($) {
	
	jQuery.fn._scroll = function() {	
		var $el = this,
				option = {
					_width: $('body').width(), 
					_height: $('body').height(),
					slides: {from: {num: 0, 'visible': 100}, to: {num: 1, 'visible': 0}}, // 0 to 1
					deltaY: 0,
					position: {_top: 0, toUp: false, toDown: false},
					arc: {sAngle: 0, centerX: 0, centerY: 0, radius: 0}
				},
				arcDrawProc = null; 
				
		initArcDrawProc();						
					
    $($el).scroll(function() {
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
    	animateSlider();  	
    });
    
    
    function animateSlider() { 
    	if (option.position.toDown) {
	    	switch (option.slides.from.num) { 
	    		case 0:
	    			var $slide = $('.slide.slide-2');
	    			$slide.find('.iphone-content.iphone-content-0').css('opacity', option.slides.from.visible);	
	    			$slide.find('.iphone-content.iphone-content-1').css('opacity', option.slides.to.visible);
	    			/*if (option.slides.to.visible>=0.5) {
	    				var w = 2000*((0.5-(1-option.slides.to.visible))/0.5);
	    				$('.gistogramma').width(w);    				
	    			}*/    			
	    		break;
	    		case 1:
	    			var $slide = $('.slide.slide-2');
	    			$slide.find('.iphone-content.iphone-content-0').css('opacity', 0);	    			
	    			$slide.find('.iphone-content.iphone-content-1').css('opacity', option.slides.from.visible);
	    			$slide.find('.iphone-content.iphone-content-2').css('opacity', option.slides.to.visible);
	    			$slide.find('.map').css('opacity', option.slides.to.visible);		    			
	    			if (option.slides.to.visible >= 0.4) {
	    				var _top = 50*(0.6-(1-option.slides.to.visible))/0.6;
	    				if (_top>50) _top = 50;
	    				$('.favorite').css('top', _top+'%');
	    				if (option.slides.to.visible >= 0.5) {
	    					var _opacity = 1*(0.5-(1-option.slides.to.visible))/0.5;
	    					$('.favorite-shadow').css('opacity', _opacity);	
	    				}		
	    			}
	    			//$('.gistogramma').width(2000);    			    			    		
	    		break;
	    		case 2:
	    			var $slide = $('.slide.slide-2');
	    			$slide.find('.iphone-content.iphone-content-0').css('opacity', 0);	    			
	    			$slide.find('.iphone-content.iphone-content-1').css('opacity', 0);
	    			var $iphone = $slide.find('.iphone');
	    			if ($iphone.css('position') == 'fixed') {
	    				$iphone.css({'position': 'absolute'});
	    				$slide.find('.iphone-content.iphone-content-2').css('opacity', 1);    				
	    			}
	    			
	    			$slide.find('.map').css({'position': 'absolute', 'opacity': 1});
	    			$slide.find('.favorite').css({'position': 'absolute', 'top': '50%'});
	    			$slide.find('.favorite-shadow').css({'position': 'absolute', 'opacity': 1});
	    			
	    			if (option.slides.to.visible >= 0.2) {
	    				var angle = (180-(option.arc.sAngle)*2)/2;
	    				var newangle = option.arc.sAngle + angle*((0.8-(1-option.slides.to.visible))/0.8);
	    				var cX = option.arc.centerX - Math.cos(degToRad(newangle)) * option.arc.radius;
	    				var cY = option.arc.centerY - Math.sin(degToRad(newangle)) * option.arc.radius;
	    				arcDraw(newangle);
	    				sunDraw(cX, cY); 
	    			}
	    			
	    			//$('.gistogramma').hide();    			 		
	    		break;
	    		case 3:
				 		if ($('.background-wrapper .background-slide3').css('opacity') == 0) {
							$('.background-wrapper .background-slide3').css('opacity', 1);						
							if (option.slides.from.visible>0.7) {
								$('.background-wrapper').css({
									'height': 100+(100-100*option.slides.from.visible)+'%',
									'top' : -option._height*(1-option.slides.from.visible)
								});	
							}						
						}
		  			$('.background-wrapper').addClass('slide-3');
		  			$('.slider .slide-3').removeClass('with-background-slide3');
		  			$('.slider .slide-3 .clouds-glare').css('opacity', 0);
		  			    					   							    		
	    			var $slide = $('.slide.slide-2');
	    			var $iphone = $slide.find('.iphone');
	    			if ($iphone.css('position') == 'fixed') {
	    				$iphone.css({'position': 'absolute'});
	    				$slide.find('.iphone-content.iphone-content-0').css('opacity', 0);	    			
	    				$slide.find('.iphone-content.iphone-content-1').css('opacity', 0);	    				
	    				$slide.find('.iphone-content.iphone-content-2').css('opacity', 1);
	    				$('.favorite').css({'top': '50%', 'opacity': 1});
	    				$('.favorite-shadow').css('opacity', 1);
	    			}	    		
	    			if (!$('.background-wrapper').hasClass('slide-3')) {
				 			if ($('.background-wrapper .background-slide3').css('opacity') == 0)
								$('.background-wrapper .background-slide3').css('opacity', 1);
		  				$('.background-wrapper').addClass('slide-3');
		  				$('.slider .slide-3').removeClass('with-background-slide3');
		  				$('.slider .slide-3 .clouds-glare').css('opacity', 0);
	    			}
	    			
	    			var maxangle = 180-option.arc.sAngle-1,
	    				angle = 0;
	    			
	    			if (option.slides.to.visible>0 && option.slides.to.visible <= 0.4 && angle <= maxangle) {
	    				var angle = (180-(option.arc.sAngle)*2);
	    				angle = angle/2+option.arc.sAngle + angle*((0.8-(0.8-option.slides.to.visible))/0.8);
	    				if (angle>=maxangle) angle = maxangle;
	    				var cX = option.arc.centerX - Math.cos(degToRad(angle)) * option.arc.radius;
	    				var cY = option.arc.centerY - Math.sin(degToRad(angle)) * option.arc.radius+$('.sun').height()*option.slides.to.visible; // $('.sun').height()*option.slides.to.visible  тупая подгонка
	    				arcDraw(angle);
	    				sunDraw(cX, cY);
	    			}
	    			
	  				$('.background-wrapper .background-slide3').css('opacity', option.slides.from.visible);
	  				$('.background-wrapper .background-slide4').css('opacity', option.slides.to.visible);
	  				
	  				
	    			$slide.find('.map').css({'position': 'absolute', 'opacity': 1});
	    			$slide.find('.favorite').css({'position': 'absolute', 'top': '50%'});
	    			$slide.find('.favorite-shadow').css({'position': 'absolute', 'opacity': 1});	  				
	    		break;
	    	}
    	}
    	else {
	    	switch (option.slides.from.num) {
	    		case 1:
	    			var $slide = $('.slide.slide-2');
	    			$slide.find('.iphone-content.iphone-content-1').css('opacity', option.slides.from.visible);	
	    			$slide.find('.iphone-content.iphone-content-0').css('opacity', option.slides.to.visible);
	    			/*if (option.slides.to.visible >= 0 && option.slides.to.visible <= 0.5) {
	    				var w = 2000 - 2000*((0.5-(0.5-option.slides.to.visible))/0.5);
	    				$('.gistogramma').width(w);    				
	    			}	
	    			else
	    				$('.gistogramma').width(0);	
	    			*/
	    			
	    			$slide.find('.favorite').css({'top': '-50%'});
	    			$slide.find('.favorite-shadow').css({'opacity': 0});	
	    				    			    		
	    		break;
	    		case 2:
	    			var $slide = $('.slide.slide-2');
	    			$slide.find('.iphone-content.iphone-content-2').css('opacity', option.slides.from.visible);	
	    			$slide.find('.iphone-content.iphone-content-1').css('opacity', option.slides.to.visible);
	    			var $iphone = $slide.find('.iphone');
	    			if ($iphone.css('position') == 'absolute') {
	    				$iphone.css({
	    					'position': 'fixed',
	    				});
	    			}
	    			$slide.find('.map').css({'position': 'fixed', 'opacity':  option.slides.from.visible});
	    			$slide.find('.favorite').css({'position': 'fixed'});
	    			$slide.find('.favorite-shadow').css({'position': 'fixed'});
	    			
	    			if (option.slides.from.visible >= 0.4 && option.slides.from.visible <= 1) {
	    				var _top = 50-100*((1-option.slides.from.visible)/0.6);
	    				if (_top < -50) _top = -50;
	    				$('.favorite').css('top', _top+'%');
	    				if (option.slides.from.visible >= 0.5 && option.slides.from.visible <= 1) {
	    					var _opacity = 1-(1-option.slides.from.visible)/0.3;
	    					if (_opacity < 0) _opacity = 0;
	    					$('.favorite-shadow').css('opacity', _opacity);	
	    				}		
	    			}	    				
	    			//$('.gistogramma').show();
	    		break;
	    		case 3:
				 		if ($('.background-wrapper .background-slide3').css('opacity') == 1)
								$('.background-wrapper .background-slide3').css('opacity', 0);
		  			$('.background-wrapper').removeClass('slide-3');
		  			$('.slider .slide-3').addClass('with-background-slide3');
		  			$('.slider .slide-3 .clouds-glare').css('opacity', 1);
		  			
	    			var $slide = $('.slide.slide-2');
	    			$slide.find('.map').css({'position': 'absolute', 'opacity': 1});
	    			$slide.find('.favorite').css({'position': 'absolute', 'top': '50%'});
	    			$slide.find('.favorite-shadow').css({'position': 'absolute', 'opacity': 1});
	    					  			
	    			if (option.slides.from.visible >= 0) {
	    				var angle = (180-(option.arc.sAngle)*2)/2;
	    				var newangle = option.arc.sAngle + angle*((0.8-(1-option.slides.from.visible))/0.8);
	    				var cX = option.arc.centerX - Math.cos(degToRad(newangle)) * option.arc.radius;
	    				var cY = option.arc.centerY - Math.sin(degToRad(newangle)) * option.arc.radius;
							arcDraw(newangle);	    				
	    				sunDraw(cX, cY);	    					    				
	    			}
	    		break;
	    		case 4:
	    			if (!$('.background-wrapper').hasClass('slide-3')) {
				 			if ($('.background-wrapper .background-slide3').css('opacity') == 0)
								$('.background-wrapper .background-slide3').css('opacity', 1);
		  				$('.background-wrapper').addClass('slide-3');
		  				$('.slider .slide-3').removeClass('with-background-slide3');
		  				$('.slider .slide-3 .clouds-glare').css('opacity', 0);
	    			}	    		
	  				$('.background-wrapper .background-slide4').css('opacity', option.slides.from.visible);
	  				$('.background-wrapper .background-slide3').css('opacity', option.slides.to.visible);
	  				
	    			var $slide = $('.slide.slide-2');
	    			$slide.find('.map').css({'position': 'absolute', 'opacity': 1});
	    			$slide.find('.favorite').css({'position': 'absolute', 'top': '50%'});
	    			$slide.find('.favorite-shadow').css({'position': 'absolute', 'opacity': 1});
	    				  				
	    			if (option.slides.from.visible>=0 && option.slides.from.visible <= 0.4) {
	    				var angle = (180-(option.arc.sAngle)*2);
	    				var newangle = angle/2+option.arc.sAngle + angle*((0.8-(0.8-option.slides.from.visible))/0.8);
	    				if (newangle > 180-(option.arc.sAngle)-1) newangle = 180-(option.arc.sAngle)-1;
	    				var cX = option.arc.centerX - Math.cos(degToRad(newangle)) * option.arc.radius;
	    				var cY = option.arc.centerY - Math.sin(degToRad(newangle)) * option.arc.radius+$('.sun').height()*option.slides.from.visible;  //тупая подгонка
							arcDraw(newangle);
	    				sunDraw(cX, cY);
	    			}		    			
	    		break;    		    		    		    			
	    	}
	    }    	   		
    }
    
		$(window).resize(function() {
	    //clearTimeout($.data(this, 'resizeTimer'));
	    //$.data(this, 'resizeTimer', setTimeout(function() {
	 		$(window).trigger('resizeEnd');
	    //}, 100));    
		});
	
		$(window).bind('resizeEnd', function() {
			option._width = $('body').width();
			option._height = $('body').height();
			option.position._top = 0;
			initArcDrawProc();
			$(window).trigger('scroll');
		});    
    
    function arcDraw(angle) {
			var sAngle = degToRad(180 + option.arc.sAngle);	    				
	    var eAngle = degToRad(180 + angle+0.2);
	    if (!arcDrawProc) initArcDrawProc();	    
	    arcDrawProc.clearRect();
	    arcDrawProc.arc(option.arc.centerX, option.arc.centerY, option.arc.radius, sAngle, eAngle-Math.PI/180, false, 2, '#fff');
	    arcDrawProc.darc(option.arc.centerX, option.arc.centerY, option.arc.radius, eAngle+2*Math.PI/180, degToRad(360-option.arc.sAngle), true, Math.PI/180/2, 2, '#fff');	     		
    }
		
		function initArcDrawProc() {
			var maxW = 2000;
			var minW = 1024;
			var w = (option._width>maxW?maxW:option._width);
			w = (w<minW?minW:w);
			var h = option._height;
			
			var a = w;
			option.arc.radius = Math.sqrt(Math.pow(a, 2)+Math.pow(a/2, 2));
			option.arc.centerY = option.arc.radius+10;
			option.arc.centerX = w/2;
			$('.arc').width(w);
			$('.arc').height(h);
			$('.arc').css({
				'margin-top': option._height*-0.3,
				'margin-left': w*-0.5
			});	
		
			var tangA = a/(w/2);
			var sAngle = Math.atan(tangA); //начальный угол в радианах
			option.arc.sAngle = radToDeg(sAngle);// начальный угод в градусах
			var eAngle = degToRad(360-radToDeg(sAngle)); //конечный угол в радианах
			sAngle = degToRad(180 + radToDeg(sAngle));//начальный угол в радианах
			
			arcDrawProc = new _arcDraw({
				id: 'arc',
				_width: w,
				_height: h				
			});
		}
		
		function sunDraw(cX, cY) {
			$('.sun').css({'left': cX, 'top': cY}).show();
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
			$(window).scrollTop(option._height);				
		});	    	
	}
})(jQuery);

var _arcDraw = function(opt) {
	this.opt = (typeof opt != 'undefined'?opt:{id: '0', _width: 0, _height: 0});
	this.canvas = null;
	this.sAngle = null;	
	this.eAngle = null;
	this.setCanvas = function() {
		this.canvas = document.getElementById(this.opt.id);	
		if (!this.canvas) {
			console.log('html object '+ this.opt.id+ ' is undefined');
			return;
		}
		this.canvas.context = this.canvas.getContext("2d");
		this.canvas.width = this.opt._width;
		this.canvas.height = this.opt._height;		
	}

	this.clearRect = function() {
		this.canvas.context.clearRect(0, 0, this.opt._width, this.opt._height);
	}
	
	this.beginPath = function(){
		this.canvas.context.beginPath();
	}
	
	this.closePath = function(){
		this.canvas.context.closePath();		
	}
	
	this.darc = function(cX, cY, radius, sAngle, eAngle, counterclockwise, step, lineWidth, strokeStyle) {
		while(sAngle < eAngle && counterclockwise == false) {
			eA = sAngle+step;
			this.beginPath();
			this.arc(cX, cY, radius, sAngle, eA, counterclockwise, lineWidth, strokeStyle);
			this.stroke();
			this.closePath();
			sAngle = eA + step;						
		}
		while(eAngle > sAngle && counterclockwise == true) {
			eA = eAngle-step;
			this.beginPath();
			this.arc(cX, cY, radius, eAngle, eA, counterclockwise, lineWidth, strokeStyle);
			this.stroke();
			this.closePath();
			eAngle = eA - step;						
		}
	}

	this.arc = function(cX, cY, radius, sAngle, eAngle, counterclockwise, lineWidth, strokeStyle) {
		if (!this.canvas.context) {
			console.log('html canvas context is undefined');
			return;
		} 
		this.beginPath();
		this.canvas.context.arc(cX, cY, radius, sAngle, eAngle, counterclockwise);	
		this.canvas.context.lineWidth = lineWidth;
    this.canvas.context.strokeStyle = strokeStyle;
    this.stroke();
    this.closePath();
	}	
	
	this.stroke  = function() {
		 this.canvas.context.stroke();
	}
	
	this.setCanvas();
}