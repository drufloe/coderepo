
/* ---------------------------------------------------------------------- */
/*	ISOTOPE Portfolio
/* ---------------------------------------------------------------------- */

$.Isotope.prototype._getCenteredMasonryColumns = function() {
this.width = this.element.width();

var parentWidth = this.element.parent().width();

              // i.e. options.masonry && options.masonry.columnWidth
var colW = this.options.masonry && this.options.masonry.columnWidth ||
              // or use the size of the first item
              this.$filteredAtoms.outerWidth(true) ||
              // if there's no items, use size of container
              parentWidth;

var cols = Math.floor( parentWidth / colW );
cols = Math.max( cols, 1 );

// i.e. this.masonry.cols = ....
this.masonry.cols = cols;
// i.e. this.masonry.columnWidth = ...
this.masonry.columnWidth = colW;
};

$.Isotope.prototype._masonryReset = function() {
// layout-specific props
this.masonry = {};
// FIXME shouldn't have to call this again
this._getCenteredMasonryColumns();
var i = this.masonry.cols;
this.masonry.colYs = [];
while (i--) {
  this.masonry.colYs.push( 0 );
}
};

$.Isotope.prototype._masonryResizeChanged = function() {
var prevColCount = this.masonry.cols;
// get updated colCount
this._getCenteredMasonryColumns();
return ( this.masonry.cols !== prevColCount );
};

$.Isotope.prototype._masonryGetContainerSize = function() {
var unusedCols = 0,
    i = this.masonry.cols;
// count unused columns
while ( --i ) {
  if ( this.masonry.colYs[i] !== 0 ) {
    break;
  }
  unusedCols++;
}

return {
      height : Math.max.apply( Math, this.masonry.colYs ),
      // fit container to columns that have been used;
      width : (this.masonry.cols - unusedCols) * this.masonry.columnWidth
    };
};

$(function(){

	var $container = $('#portfolio-items');

	if( $container.length ) {

		var $itemsFilter = $('#portfolio-filters');

		// Copy categories to item classes
 		$('.item', $container).each(function(i) {
			var $this = $(this);
			var $thumbAnchor = $this.find('.thumb-image a');
			$this.addClass( $this.attr('data-categories') );
			
			if($thumbAnchor.hasClass('video')){
				$thumbAnchor.append('<div class="thumb-image-hover"><img class="play-video" src="img/empty.gif" /></div>');
				
			} else {
				$thumbAnchor.append('<div class="thumb-image-hover"><img class="zoom-image" src="img/empty.gif" /></div>');
			}
		});


		// Run Isotope when all images are fully loaded
		$(window).on('load', function() {
			$container.isotope({
				itemSelector : '.item'
			});
		});

		// Filter projects
		$itemsFilter.on('click', 'a', function(e) {
			var $this         = $(this),
				currentOption = $this.attr('data-categories');

			$itemsFilter.find('a').removeClass('active');
			$this.addClass('active');

			if( currentOption ) {
				if( currentOption !== '*' ) currentOption = currentOption.replace(currentOption, '.' + currentOption)
				$container.isotope({ filter : currentOption });
			}

			e.preventDefault();
		});

		$itemsFilter.find('a').first().addClass('active');
	}

}); 

/* ---------------------------------------------------------------------- */
/*	FANCY BOX
/* ---------------------------------------------------------------------- */
(function(){
			var $fancyboxItems = $('.single-image, .image-gallery, .iframe');

 			// Images
 			$('.single-image, .image-gallery').fancybox({
 				type        : 'image',
 				openEffect  : 'fade',
 				closeEffect	: 'fade',
 				nextEffect  : 'fade',
 				prevEffect  : 'fade',
 				helpers     : {
 					title   : {
 						type : 'inside'
 					},
 					buttons  : {},
 					media    : {},
 					overlay : { locked : false }
 				},
 				afterLoad   : function() {
 					this.title = this.group.length > 1 ? 'Image ' + ( this.index + 1 ) + ' of ' + this.group.length + ( this.title ? ' - ' + this.title : '' ) : this.title;
 				}
 			});

 			// Iframe
 			$('.iframe').fancybox({
 				type        : 'iframe',
 				openEffect  : 'fade',
 				closeEffect	: 'fade',
 				nextEffect  : 'fade',
 				prevEffect  : 'fade',
 				helpers     : {
 					title   : {
 						type : 'inside'
 					},
 					buttons  : {},
 					media    : {},
 					overlay : { locked : false }
 				},
 				width       : '70%',
				height      : '70%',
				maxWidth    : 800,
				maxHeight   : 600,
				fitToView   : false,
				autoSize    : false,
				closeClick  : false
			});		
})();
/* end Fancy Box */


