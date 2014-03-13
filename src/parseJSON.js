// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function (json) {
  var jText = json;

	var nestedArrays = function (text, beginSearch) {
 		var newArrNest = text.indexOf('[', beginSearch);
 		if (newArrNest === -1) {
 			return false;
 		}
  	return newArrNest;
 	}

 	var pullFullArray = function (text) {
 		var endArr = text.indexOf(']');
  	var beginArr = 1
  	var beginNestSearch = 1;
  	var arrayContent = text.slice(beginArr, endArr);
  	while (nestedArrays(arrayContent, beginNestSearch)) {
  		beginNestSearch = nestedArrays(arrayContent, beginNestSearch) + 1;
  		endArr = text.indexOf(']', endArr + 1);
  	}
  	return endArr;
 	}

  var makeArray = function (text) {
  	// split elements by comma
  	var arr = [];

  	for (var j = 0; j < text.length; j++) {
  		var endElement = text.indexOf(',', j);
  		var newArr = text.slice(j, endElement).indexOf('[');
  		var beginElement = j;
  		
// 4 combos - yes or no new array, yes or no another element at end
// if yes new array, AND yes another element, push new array, place j at start of next element
// if yew new array, AND no another element, push new array, place j at end of text
// if no new array, AND yes another element, push parseJSON text before next element, place j at start of next element
// if no new array, AND no other element, push parseJSON text, place j at end of text.

  		if (newArr === -1) {
  			if (endElement === -1) {
  				j = text.length;
  				arr.push(parseJSON(text.slice(beginElement)));
  			} else {
  				j = endElement;
  				arr.push(parseJSON(text.slice(beginElement, endElement)));
  			}
  		}
  		else {
  			var endArr = pullFullArray(text.slice(beginElement + newArr)) + beginElement + newArr;
  			arr.push(makeArray(text.slice(beginElement + newArr + 1, endArr)));
 				if (endElement === -1) {
  				j = text.length;  			
 				} else {
 					j = endElement;
 				}
  		}
  		
/*
  		if (newArr !== -1) {

  			arr.push(makeArray())
  		}
  		if (endElement !== -1) {
  				j = endElement;
  				arr.push(parseJSON(text.slice(beginElement, endElement)));
  			}
  			
  		} else {
  			j = text.length;
  			arr.push(parseJSON(text.slice(beginElement)));
  		}
*/
  	}

  	return arr;
  }

  var makeString = function (text) {
  	return text;
  }

  var makeNum = function (text, numType) {
  	if (numType) {
  		return parseFloat(text);
  	}
  	return parseInt(text);
  }

  for (var i = 0; i < json.length; i++) {
  	
  	// if Array: //	
  	if (json[i] === '[') {
  		var beginArr = i + 1;
  		i = pullFullArray(json.slice(i)) + i;
  		return makeArray(json.slice(beginArr, i));
  	}
  		
/*
  		var endArr = json.indexOf(']', i);
  		var beginArr = i + 1;
  		var beginNestSearch = i + 1;
  		var arrayContent = json.slice(beginArr, endArr);
  		while (nestedArrays(arrayContent, beginNestSearch)) {
  			beginNestSearch = nestedArrays(arrayContent, beginNestSearch) + 1;
  			endArr = json.indexOf(']', endArr + 1);
  		}
  		arrayContent = json.slice(beginArr, endArr);
  		i = endArr;
  		return makeArray(arrayContent);
  	}
*/
// [2, [, 3, [4] ] ];

  	// if Object: //

  	// if Number: //
  	var numChars = ['0','1','2','3','4','5','6','7','8','9','-','.']
  	var isFloat = function (str, alreadyFloat) {
  		if (str === '.' || alreadyFloat) {
  			return true;
  		}
  		return false;
  	}

  	if (_.contains(numChars, json[i])) {
  		var floatType = isFloat(json[i], false);
  		var endNum = i + 1;
  		var beginNum = i;
  		while (_.contains(numChars, json[endNum])) {
   			floatType = isFloat(json[endNum], floatType);
  			endNum++;
  		}
  	 	i = endNum - 1;
  	 	return makeNum(json.slice(beginNum, endNum), floatType);
  	}

  	// if String:
  	if (json[i] === '"') {
  		var endStr = json.indexOf('"', i+1);
  		var beginStr = i + 1;
  		i = endStr;
  		return makeString(json.slice(beginStr, endStr));
  	}

  	// if Boolean:
  	if (json.slice(i, i+4) === 'true') {
  		i += 3;
  		return true;
  	}

  	if (json.slice(i, i+5) === 'false') {
  		i += 4;
  		return false;
  	}

  }

  

};
