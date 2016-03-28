(function() {
    

    // inject mouse into page
    document.body.insertAdjacentHTML( 'afterbegin', '<div id="fake-cursor" class="cursor-shake"></div>' );


    // set initial mouse tracking values
    window.mousePos = {
        delta: 0,
        x: 0,
        y: 0
    };
   
    // limit frame rate

    // var fps = 15;
    // var now;
    // var then = Date.now();
    // var interval = 1000/fps;
    // var time_delta;


    // track the mouse movement and store the result.
    // this is a separate function because mouse movement can only be captured on the mousemove event.
    // Thanks to http://stackoverflow.com/questions/7790725/javascript-track-mouse-position

    function trackMouseMove(event) {
        var dot, eventDoc, doc, body, pageX, pageY;

        event = event || window.event; // IE-ism

        // If pageX/Y aren't available and clientX/Y are,
        // calculate pageX/Y - logic taken from jQuery.
        // (This is to support old IE)

        if (event.pageX == null && event.clientX != null) {
            eventDoc = (event.target && event.target.ownerDocument) || document;
            doc = eventDoc.documentElement;
            body = eventDoc.body;

            event.pageX = event.clientX +
              (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
              (doc && doc.clientLeft || body && body.clientLeft || 0);
            event.pageY = event.clientY +
              (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
              (doc && doc.clientTop  || body && body.clientTop  || 0 );
        }

        // set global variable we'll use

        window.mousePos.delta = Math.abs( mousePos.x - event.pageX ) + Math.abs ( mousePos.y - event.pageY );
        window.mousePos.x = event.pageX;
        window.mousePos.y = event.pageY;
        

    }


    function handleMouseAnimation() {

      // New CSS version -- let's just track the cursor
      // let the CSS handle the shake

      var cursor = document.getElementById('fake-cursor');

      // cursor.style.display = 'block';
      cursor.style.left = ( window.mousePos.x ) + 'px';
      cursor.style.top = ( window.mousePos.y ) + 'px';

      // keep going!
      window.requestAnimationFrame(handleMouseAnimation);

      return; 

      // Old javascript-based wiggle


  		now = Date.now();
  		time_delta = now - then;

  		if (time_delta < interval) {
        // hang tight, we're not ready to update the wiggle yet.
  			window.requestAnimationFrame(handleMouseAnimation);
  		  return;
  		}

  		then = now - (time_delta % interval);

    	// add some random wiggle!

    	var delta = window.mousePos.delta || 1; 
    	var wiggle_max = 80; // what's the maximum wiggle?
    	var wiggle_delta = 3; 

    	// multiply by the delta of the last mouse move
    	if (Math.abs(window.mousePos.delta) > 0) {
    		wiggle_delta = wiggle_delta * ( Math.abs(window.mousePos.delta) * 0.7) ;
    	}
    	
    	if (wiggle_delta > wiggle_max) wiggle_delta = wiggle_max;

    	// return Math.floor(Math.random() * (max - min + 1)) + min;
    	var wiggle_x = Math.floor(Math.random() * ( wiggle_delta + wiggle_delta + 1 ) - wiggle_delta);
    	var wiggle_y = Math.floor(Math.random() * ( wiggle_delta + wiggle_delta + 1 ) - wiggle_delta);

    	// we can only wiggle so much; make sure the movement is still within our bounds
    	// console.log(wiggle_x, wiggle_y);

    	if ( Math.abs( wiggle_x + window.mousePos.wiggle_x ) >= (wiggle_max / 2) ) {
    		window.mousePos.wiggle_x = wiggle_max / 2; 
    		wiggle_x = -wiggle_max / 2;
    	}

    	if ( Math.abs( wiggle_y + window.mousePos.wiggle_y ) >= (wiggle_max / 2)) {
    		window.mousePos.wiggle_y = wiggle_max / 2; 
    		wiggle_y = -wiggle_max / 2;
    	}
    	
    	window.mousePos.wiggle_x = window.mousePos.wiggle_x + wiggle_x;
    	window.mousePos.wiggle_y = window.mousePos.wiggle_y + wiggle_y;

    	var cursor = document.getElementById('fake-cursor');

    	cursor.style.display = 'block';
      cursor.style.left = ( window.mousePos.x + window.mousePos.wiggle_x ) + 'px';
      cursor.style.top = ( window.mousePos.y + window.mousePos.wiggle_y ) + 'px';

      // keep going!
      window.requestAnimationFrame(handleMouseAnimation);

    }


    

    // Can we detect when the mouse leaves the browser window?

    // http://stackoverflow.com/questions/923299/how-can-i-detect-when-the-mouse-leaves-the-window

    document.onmouseout = handleMouseOut;

    function handleMouseOut (e) {
        e = e ? e : window.event;
        var from = e.relatedTarget || e.toElement;
        if (!from || from.nodeName == "HTML") {
            // stop your drag event here
            document.getElementById('fake-cursor').style.display = 'block';
        }
    }


    // go!

    document.onmousemove = trackMouseMove;
    window.requestAnimationFrame(handleMouseAnimation);

})();