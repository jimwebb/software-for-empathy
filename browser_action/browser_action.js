(function($) {
	$(document).ready(function(){


		// attach to links	
		$('a').on('click', function(e) {
			e.preventDefault(); 

			// https://developer.chrome.com/extensions/tabs
			chrome.tabs.insertCSS(null,
			    { file : '../actions/mouse-shake/css/mouse-shake.css' }
			);

			chrome.tabs.executeScript(null,
			    { file : "../actions/mouse-shake/js/mouse-shake.js" }
			);

			// close the popup
			// window.close();
		});



	});
})(jQuery);