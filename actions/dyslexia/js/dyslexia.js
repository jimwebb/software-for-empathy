// The international dyslexia association says some of the most common symptoms of dyslexia can include:
// Letter reversals: d for b
// Word reversals: tip for pit
// Inversions: m for w, u for n
// Transpositions: felt for left
// Confusing small words: at for to, said for and, does for goes
// Spelling difficulty: different spellings on the same page


// http://dyslexia.learninginfo.org/symptoms.htm 


// Thanks to http://www.donaldjdrumpf.com/ for humor and code
(function() {


walk(document.body);

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
	var v = textNode.nodeValue;





	// Word reversals: tip for pit
	// three letter words with vowels in the middle

	v = v.replace(/\b(\w)([aeiou])(\w)\b/gi, function(match, p1, p2, p3) { 
		if (random(60)) {
			return matchCase(p3 + p2 + p1, match) ; // flip the letters
		} else {
			return match;
		}
	});

	// two letter words

	v = v.replace(/\b(\w)(\w)\b/gi, function(match, p1, p2) { 
		if (random(40)) {
			return p2 + p1; // flip the letters
		} else {
			return match;
		}
	});


	// omit or duplicate articles
	v = v.replace(/\b(the)\b|\b(and)\b|\b(but)\b|\b(in)\b/gi, function(match) { 
		if (random(40)) {
			return ''; // omit 
		} else if (random(40)) {
			return match + " " + match; // duplicate 
 		} else {
			return match;
		}
	});

	// duplicate articles

	// Transpositions: felt for left

	v = v.replace(/\bleft\b/g, function(match) { 
		if (random(50)) {
			return 'felt';
		} else {
			return match;
		}
	});

	// Transpositions: soiled for solid

	v = v.replace(/\bsolid\b/g, function(match) { 
		if (random(70)) {
			return 'soiled';
		} else {
			return match;
		}
	});

	// Transpositions: cat for act

	v = v.replace(/\bact\b/g, function(match) { 
		if (random(50)) {
			return 'cat';
		} else {
			return match;
		}
	});


	// Transpositions: reverse for reserve

	v = v.replace(/\breserve\b/g, function(match) { 
		if (random(50)) {
			return 'reverse';
		} else {
			return match;
		}
	});


	// Transpositions: except for expect

	v = v.replace(/\bexpect\b/g, function(match) { 
		if (random(50)) {
			return 'except';
		} else {
			return match;
		}
	});

	// Omitting letters: cat for cart

	v = v.replace(/\bcart\b/g, function(match) { 
		if (random(50)) {
			return 'cat';
		} else {
			return match;
		}
	});

	// Omitting letters: wet for went

	v = v.replace(/\bwent\b/g, function(match) { 
		if (random(50)) {
			return 'wet';
		} else {
			return match;
		}
	});


	// Omitting letters: sing for string

	v = v.replace(/\bstring\b/g, function(match) { 
		if (random(50)) {
			return 'sing';
		} else {
			return match;
		}
	});



	// Confusing small words: at for to, said for and, does for goes

	v = v.replace(/\bto\b/g, function(match) { 
		if (random(50)) {
			return "at";
		} else {
			return match;
		}
	});

	v = v.replace(/\band\b/g, function(match) { 
		if (random(50)) {
			return "said";
		} else {
			return match;
		}
	});

	v = v.replace(/\bgoes\b/g, function(match) { 
		if (random(50)) {
			return "does";
		} else {
			return match;
		}
	});

	v = v.replace(/\bdoes\b/g, function(match) { 
		if (random(50)) {
			return "goes";
		} else {
			return match;
		}
	});


	// Substitutions: "house" for "home"

	v = v.replace(/\bhouse\b/g, function(match) { 
		if (random(70)) {
			return "home";
		} else {
			return match;
		}
	});


	// Letter reversals: d for b

	v = v.replace(/\bb/g, function(match, p1) { 
		if (random(40)) {
			return 'd';
		} else {
			return match;
		}
	});


	// Letter reversals: p for q

	v = v.replace(/p/g, function(match, p1) { 
		if (random(30)) {
			return 'q';
		} else {
			return match;
		}
	});
	
	// Inversions: m for w, u for n

	v = v.replace(/m/gi, function(match) { 
		if (random(30)) {
			if (match == "m") return 'w';
			if (match == "M") return 'W';
		} else {
			return match;
		}
	});

	v = v.replace(/(n)\B/g, function(match, p1) { 
		if (random(30)) {
			return 'u';
		} else {
			return p1;
		}
	});


	v = v.replace(/(p)\B/g, function(match, p1) { 
		if (random(30)) {
			return 'b';
		} else {
			return p1;
		}
	});


	v = v.replace(/(f)\B/g, function(match, p1) { 
		if (random(30)) {
			return 't';
		} else {
			return p1;
		}
	});



	textNode.nodeValue = v;
}


function random(percent) {
	var random = Math.random() * 100;
	if (percent >= random) {
		return true;
	} else {
		return false;
	}

}

function matchCase(modified, original) {
	if (modified.length !== original.length) { return modified; }

	var original_array = original.split('');
	var modified_array = modified.split('');

	for (var i=0; i < original.length; i++) {
		if (original_array[i].toLowerCase() == original_array[i]) {
			modified_array[i] = modified_array[i].toLowerCase(); 
		} else {
			modified_array[i] = modified_array[i].toUpperCase(); 
		}
	}

	return modified_array.join('');

}


})();


