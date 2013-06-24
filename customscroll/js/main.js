/* ---------------------------------------------------------------------- */
/*	CUSTOM SCROLL BAR
/* ---------------------------------------------------------------------- */
	(function($){

		var $container = $('#main-container');

		$("#main-container").mCustomScrollbar({
			set_width:false, /*optional element width: boolean, pixels, percentage*/
			set_height:"100%", /*optional element height: boolean, pixels, percentage*/
			horizontalScroll:false, /*scroll horizontally: boolean*/
			scrollInertia:1000, /*scrolling inertia: integer (milliseconds)*/
			scrollEasing:"easeOutCirc", /*scrolling easing: string*/
			mouseWheel:20, /*mousewheel support and velocity: boolean, "auto", integer*/
			mouseWheelPixels: 350,
			autoDraggerLength:true, /*auto-adjust scrollbar dragger length: boolean*/
			theme: "dark",
			scrollButtons:{ /*scroll buttons*/
				enable:true, /*scroll buttons support: boolean*/
				scrollType:"continuous", /*scroll buttons scrolling type: "continuous", "pixels"*/
				scrollSpeed:20, /*scroll buttons continuous scrolling speed: integer*/
				scrollAmount:40 /*scroll buttons pixels scroll amount: integer (pixels)*/
			},
			advanced:{
				updateOnBrowserResize:true, /*update scrollbars on browser resize (for layouts based on percentages): boolean*/
				updateOnContentResize:true, /*auto-update scrollbars on content resize (for dynamic content): boolean*/
				autoExpandHorizontalScroll:false /*auto expand width for horizontal scrolling: boolean*/
			},
			callbacks:{
				onScroll:function(){}, /*user custom callback function on scroll event*/
				onTotalScroll:function(){}, /*user custom callback function on bottom reached event*/
				onTotalScrollOffset:0 /*bottom reached offset: integer (pixels)*/
			}
		});

		getContainerHeight ();

		var waitForFinalEvent = (function () {
		  var timers = {};
		  return function (callback, ms, uniqueId) {
		    if (!uniqueId) {
		      uniqueId = "Don't call this twice without a uniqueId";
		    }
		    if (timers[uniqueId]) {
		      clearTimeout (timers[uniqueId]);
		    }
		    timers[uniqueId] = setTimeout(callback, ms);
		  };
		})();

		$(window).resize(function () {
		    waitForFinalEvent(function(){
		    	getContainerHeight();	
		    }, 500, "resize-event-1");
		});			

		function getContainerHeight () {
				//update container height on resize
		      	$winHeight = $(window).height();
		      	$position = $container.position();
		      	$container.css('height', $winHeight-$position.top-10);	
		      	$container.mCustomScrollbar('update');
		}

	})(jQuery);

/* ---------------------------------------------------------------------- */
/*	SCROLL NAVIGATION (requires mCustomScrollBar plugin)
/* ---------------------------------------------------------------------- */
(function($){
	
	var smoothScroll = {

		container: $('#main-container'),
		navLinks: $('nav li a'),

		init: function() {			
			this.hash_handler();
			this.navLinks.on('click', this.scroll_handler);	
		},

		scroll_handler: function () {
			var sC = smoothScroll,			
				target = $(this).attr('href'); //clicked anchor hash

			sC.container.mCustomScrollbar("scrollTo",target);
			sC.removeAddSelected(target);			
		},

		hash_handler: function () {
			var sC = smoothScroll,				
				hash = window.location.hash;

			if(hash) {
				sC.container.mCustomScrollbar("scrollTo",hash);
				sC.removeAddSelected(hash);
			} else {
				sC.removeAddSelected();
			}

		},

		removeAddSelected: function (target){
			var sC = smoothScroll,
				navLinks = sC.navLinks;

			navLinks.removeClass('selected');	

			if(target) {
				$('a[href='+target+']').addClass('selected');
			} else {
				navLinks.first().addClass('selected');
			}
		}

	}

	smoothScroll.init();


})(jQuery);