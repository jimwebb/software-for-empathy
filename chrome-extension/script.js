function nativeTreeWalker() {
    var walker = document.createTreeWalker(
        document.body, 
        NodeFilter.SHOW_TEXT, 
        null, 
        false
    );

    var node;
    var textNodes = [];

    while(node = walker.nextNode()) {
    	if (
    	    // no empty nodes
    	    node.nodeValue.trim() !== ''

    	    // nodes that are visible
    	    && (node.parentNode.offsetWidth || node.parentNode.offsetHeight || node.parentNode.getClientRects().length )

    	    // nodes that have at least four letters
    	    && (node.nodeValue.search(/\w{4,}/) !== -1 )
    	    
    	    ) {
    		textNodes.push(node.nodeValue);
    	}
    }

    return textNodes;
}


console.log(nativeTreeWalker());



function customRecursiveTreeWalker() {
    var result = [];

    (function findTextNodes(current) {
        for(var i = 0; i < current.childNodes.length; i++) {
            var child = current.childNodes[i];
            if(child.nodeType == 3) {
                result.push(child.nodeValue);
            }
            else {
                findTextNodes(child);
            }
        }
    })(document.body);

return result; 

}

(function($) {



})(jQuery);