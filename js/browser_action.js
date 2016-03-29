(function($) {
	$(document).ready(function(){

		// --------- Shaky Mouse ----------
		$('a#mouse').on('click', function(e) {
			e.preventDefault(); 

			// https://developer.chrome.com/extensions/tabs
			chrome.tabs.insertCSS(null,
			    { file : 'actions/mouse-shake/css/mouse-shake.css' }
			);
			chrome.tabs.executeScript(null,
			    { file : 'actions/mouse-shake/js/mouse-shake.js' }
			);

			// close the popup
			window.close();
		});


		// --------- ESL ----------
		$('a#esl').on('click', function(e) {
			e.preventDefault(); 

			// https://developer.chrome.com/extensions/tabs
			chrome.tabs.query( { currentWindow: true, active: true, lastFocusedWindow: true }, function (tab) {

				var current_tab = tab[0];

				var url = current_tab.url;

				var translation = 'https://translate.google.com/translate?sl=ja&tl=en&js=y&prev=_t&hl=en&ie=UTF-8&u=http%3A%2F%2Fwww.online-translator.com%2FsiteTranslation%2Fautolink%2F%3Fdirection%3Dej%26template%3DGeneral%26sourceURL%3D' + encodeURI(url) + '&edit-text=';

				chrome.tabs.update( current_tab.id, { url : translation });
				
				// close the popup
				window.close();
			});

		});
		


	// --------- Dyslexia ----------
		$('a#dyslexia').on('click', function(e) {
			e.preventDefault(); 

			chrome.tabs.executeScript(null,
			    { file : 'actions/dyslexia/js/dyslexia.js' }
			);
				
			// close the popup
			window.close();

		});





	});
})(jQuery);