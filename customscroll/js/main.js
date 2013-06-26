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


// var page, // [DOM element] The main area to be scrolled
// 	navLinks,
// 	isMobile, // [Boolean] Mobile platform? (phones, tablets)
// 	isModernWebkitMobile, // [Boolean] More specifically: is it a recent version of Webkit Mobile?
// 	modernWebkitMobile_topMargin, // [Int] In pixels, the margin-top attribute of the #main element
// 	supportPositionFixed, // [Boolean] Support fixed positioning? (all desktop platforms, Android 4.0+ and iOS 5.1+)
// 	hash_update_timer;


// 	$(function () {
// 		// Feature detection: CSS fixed positioning
// 		// Disclaimer: because some mobile browsers wrongly report support for fixed positioning, UA sniffing is the only way.
// 		if (navigator.userAgent.match(/android|iphone|ipad|ipod|windows phone|blackberry|playbook|hp-tablet/gi)) {
// 			isMobile = true; // It's a mobile platform
			
// 			var AppleWebKitVersion = parseFloat(navigator.userAgent.slice(navigator.userAgent.indexOf("AppleWebKit")+12)) || false;
// 			if (AppleWebKitVersion && AppleWebKitVersion >= 534.30) { // Recent version of webkit mobile
// 				$("html").addClass("modern-mobile");
// 				isModernWebkitMobile = true;
// 				supportPositionFixed = true;
				
// 			} else { // Not a modern-mobile, but still a mobile!
// 				$("html").addClass("mobile");
// 				isModernWebkitMobile = false;
// 				supportPositionFixed = false; // Assume that all other mobile platforms DON'T support position-fixed
// 			}

// 		} else { // Not a mobile platform
// 			isMobile = false;
// 			isModernWebkitMobile = false;
// 			supportPositionFixed = true; // Desktop browsers all support position-fixed
// 		}

// 		if (isMobile) {
// 			page = $('html,body'); // Scroll main html page
// 			scrollbinder = $(window);
// 		} else { // Desktop platforms
// 			page = $('#main-container'); // Scroll overflowed div
// 			scrollbinder = page;
// 		}

// 		modernWebkitMobile_topMargin = $('#main-container').css('margin-top');
// 		modernWebkitMobile_topMargin = modernWebkitMobile_topMargin.replace(/px/, '');

// 		navLinks = $('nav li a[href^="#"]');

// 		checkNavIntegrity(); // This checks if there aren't any broken links in the menu (you can remove this line)

// 		// Change all articles ID to avoid interference with browser's own scrollTo#hash
// 		navLinks.each(function(){
// 			var target = $(this).attr('href').replace(/#/, '');
// 				$('#'+target).attr('id', target+'_modified'); // Change ID
// 		});	
		
// 		scroll_handler();	// Set menu according to scroll position
// 		scrollbinder.bind('scroll', scroll_handler);			

// 		// Top navigation links
// 		navLinks.mousedown(function() {
// 			// Change current active link
// 			$('nav li a.selected').removeClass('selected');
// 			$(this).addClass('selected');
			
// 			// Scroll the page!
// 			var target = $(this).attr('href'),
// 				targetPosition = (isMobile) ? $(target+'_modified').offset().top : page.scrollTop() + $(target+'_modified').position().top;
// 				targetPosition = (targetPosition == 0 || (isModernWebkitMobile && targetPosition == modernWebkitMobile_topMargin)) ? targetPosition : targetPosition + 20; // Adjust top padding
// 				targetPosition = (isMobile && !isModernWebkitMobile && (targetPosition < 110)) ? 0 : targetPosition; // If old mobile and target is first section then scroll to the top to show the menu
// 				targetPosition = (isModernWebkitMobile) ? targetPosition-modernWebkitMobile_topMargin : targetPosition;

// 			clearTimeout(hash_update_timer); // Cancel any pending hash update 

// 			scrollbinder.unbind('scroll', scroll_handler); // Turn off scroll_handler
// 			page.stop().animate({scrollTop: targetPosition}, 500, function() {
// 				clearTimeout(hash_update_timer); // Cancel any previous hash update again
// 				if (window.location.hash !== target) { // Update #hash in URL only if the new differs from the current one
// 					hash_update_timer = setTimeout(function(){location.hash = target;}, 10);
// 				}
// 				scrollbinder.bind('scroll', scroll_handler); // Turn scroll_handler back on when animate complete
// 				fix_iOSfive_bug();
// 			});
// 		}).click(function(){
// 			return false;
// 		});

// 		// Set menu and scroll position according to #hash in URL
// 		hash_handler();

// 	}); // <-- document ready

// 	$(window).hashchange(function(){
// 		// Set menu and scroll position according to #hash in URL
// 		hash_handler();
// 	})


// 	/* Functions */
// 	function checkNavIntegrity(){
// 		// Debug function that checks that all navigation links have appropriate <article> with corresponding ID.
// 		// You can remove this once you finihed working on the site.
// 		navLinks.each(function(){
// 			var linkHref = $(this).attr('href'),
// 				correspondingArticle = $(linkHref);
				
// 				if(correspondingArticle.length == 0) {
// 					var linkValue = $(this).html(),
// 						targetId = linkHref.replace(/#/, '');
// 					alert('Navigation Broken: The menu link "'+linkValue+'" points to a nonexistent ID "'+linkHref+'". \n'
// 						 +'To solve this, add the ID "'+targetId+'" to a tag, for example: <article id="'+targetId+'">');
// 				}
// 		});
// 	}

// 	function hash_handler() { // Set menu link and page position according to #hash value in URL
// 		var hash = window.location.hash;
		
// 		if(hash) {
// 			$('a[href='+hash+']').trigger('mousedown');
// 		} else {
// 			$('nav li a.selected').removeClass('selected');
// 			$('nav li a:first').addClass('selected');
			
// 			scrollbinder.unbind('scroll', scroll_handler); // Turn off scroll_handler
// 			page.stop().animate({scrollTop: 0}, 500, function() {
// 				scrollbinder.bind('scroll', scroll_handler); // Turn scroll_handler back on when animate complete
// 				fix_iOSfive_bug();
// 			});
// 		}
// 	}


// 	function scroll_handler() { // Set menu link according to scroll position
// 		navLinks.each(function(){

// 			var target = $(this).attr('href'),
// 				targetPosition = (isMobile) ? $(target+'_modified').offset().top : page.scrollTop() + $(target+'_modified').offset().top;
// 				targetPosition = (isModernWebkitMobile) ? targetPosition - modernWebkitMobile_topMargin : targetPosition;
// 				targetLimit = 320;
				
// 			if (scrollbinder.scrollTop() > (targetPosition - targetLimit)) {
// 				$('nav li a.selected').removeClass('selected');
// 				$(this).addClass('selected');
// 			}

// 			// Fix for last section on large displays and/or if height of last section is too small
// 			if ($(this).is(':last-child')) { // Last menu item?
// 				if (   (isMobile && ($(window).scrollTop() >= $(document).height() - $(window).height() - 50)) // Scrolled to the bottom?
// 					|| (!isMobile && (page.scrollTop() + page.innerHeight() >= page[0].scrollHeight - 50))) {
					
// 					$('nav li a.selected').removeClass('selected');
// 					$(this).addClass('selected');
// 				}
// 			}
// 		});
// 	}

// 	/*
// 	Causes the browser to reflow all elements on the page.
// 	Fix for the iOS5 bug where fixed positioned elements are
// 	unavailable after programmatically calling window.scrollTo()
// 	@autor david@14islands.com
// 	*/
// 	function fix_iOSfive_bug() {
// 		if (isModernWebkitMobile) { // Only for Webkit Mobile and when the header is in position:fixed;
// 			document.documentElement.style.paddingRight = '1px';
// 			setTimeout(function () {
// 				document.documentElement.style.paddingRight = '';
// 			}, 0);
// 		}
// 	}


})(jQuery);