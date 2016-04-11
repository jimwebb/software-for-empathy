

// This might have already been loaded; if so, refresh the page
if (document.body.classList.contains('gendered')) {
	window.location.reload();
}


// Thanks to http://www.donaldjdrumpf.com/ for humor and code

(function() {

document.body.classList.toggle('gendered');

// http://stackoverflow.com/questions/149055/how-can-i-format-numbers-as-money-in-javascript 
Number.prototype.formatMoney = function(c, d, t){
var n = this, 
    c = isNaN(c = Math.abs(c)) ? 2 : c, 
    d = d == undefined ? "." : d, 
    t = t == undefined ? "," : t, 
    s = n < 0 ? "-" : "", 
    i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", 
    j = (j = i.length) > 3 ? j % 3 : 0;
   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
 };

var found = false; 

walk(document.body);

if (!found) {
	alert("No dollar amounts found on this page, so we can't simulate the gender pay gap.");
}

function walk(node)
{
	// Source: http://is.gd/mwZp7E

	var child, next;

	switch ( node.nodeType )
	{
		case 1:  // Element
		case 9:  // Document
		case 11: // Document fragment
			
			child = node.firstChild;
			while ( child )
			{
				next = child.nextSibling;
				walk(child);
				child = next;
			}
			break;

		case 3: // Text node
			handleText(node);
			break;
	}
}

function handleText(textNode) {
	var v = textNode.data;

	// if there's already a strikethrough, don't do anything.
	if (textNode.parentElement.style.textDecoration == 'line-through') { return; }

	// Look for prices. US currency only, for now. Sorry.
	// \$?(([1-9][0-9]{0,2}(,[0-9]{3})*)|[0-9]+)?(\.[0-9]{1,2})?

	if (!(/\$(([1-9][0-9]{0,2}(,[0-9]{3})*)|[0-9]+)?(\.[0-9]{1,2})+/gi.test(v))) { return; } 

	var result = document.createElement('div');

	result.innerHTML = v.replace(/\$(([1-9][0-9]{0,2}(,[0-9]{3})*)|[0-9]+)?(\.[0-9]{1,2})+/gi, function(match, p1) { 

		// parse the main number into a float

		var price = parseFloat(p1);
		price = price * 1.298;
		price = price.formatMoney(2);

		return "<strike class='pay-gap'>" + match + "</strike>" + "$" + price;

	});


	// http://james.padolsey.com/javascript/replacing-text-in-the-dom-its-not-that-simple/
	
	if (result.firstChild) {
		console.log(v, textNode, textNode.parentNode, result);
		textNode.parentNode.insertBefore(result, textNode);
		found = true;
	}

	textNode.parentNode.removeChild(textNode);

	// textNode.nodeValue = v;
}


})();


