(function() {
    

    // if a fake cursor already exists, exit
    if (document.getElementById('fake-cursor')) return;

    if (navigator.appVersion.indexOf("Mac") != -1) {
      var platform = "mac";
    } else {
      var platform = "win";
      // sorry linux
    }

    // inject mouse into page
    document.body.insertAdjacentHTML( 'afterbegin', '<div id="fake-cursor" class="cursor-shake cursor-' + platform + '"></div>' );

    // set initial mouse tracking values
    var mousePos = {
        timer: 0,
        x: 0,
        y: 0,
        platform: platform
    };
   

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

        mousePos.timer = 0; // reset the clock
        mousePos.x = event.pageX;
        mousePos.y = event.pageY;
    }


    function handleMouseAnimation() {

      // New CSS version -- let's just track the cursor
      // let the CSS handle the shake

      var cursor = document.getElementById('fake-cursor');

      if (mousePos.timer == 0 ) {
        // the cursor moved since our last check
        
        if (cursor.className == '') {
          cursor.className = 'cursor-shake cursor-' + cursor.platform;
        }
        
        if (cursor.style.display !== 'inline-block') {
          cursor.style.display = 'inline-block';
        }

        cursor.style.left = ( mousePos.x ) + 'px';
        cursor.style.top = ( mousePos.y ) + 'px';
      }

      mousePos.timer++;

      if (mousePos.timer > 100) {
        // the cursor hasn't moved in a while
        cursor.className = '';
      }

      // keep going!
      // not incredibly performant but this is a quick-and-dirty
      window.requestAnimationFrame(handleMouseAnimation);

      return; 

    }


    // Can we detect when the mouse leaves the browser window?
    // http://stackoverflow.com/questions/923299/how-can-i-detect-when-the-mouse-leaves-the-window

    document.onmouseout = handleMouseOut;
    function handleMouseOut (e) {
        e = e ? e : window.event;
        var from = e.relatedTarget || e.toElement;
        if (!from || from.nodeName == "HTML") {
            document.getElementById('fake-cursor').style.display = 'none';
        }
    }

    document.body.onmouseleave = function (e) {
      document.getElementById('fake-cursor').style.display = 'none';
    }


    // go!

    document.onmousemove = trackMouseMove;
    window.requestAnimationFrame(handleMouseAnimation);

})();