// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function (json) {
  var jText = json;

  var findEndArray = function (text, startIndex, endIndex) {
  	if (!endIndex) {
  		endIndex = startIndex;
  	}
  	var endArr = text.indexOf(']', endIndex);
  	var nestedArr = text.slice(0, endArr).indexOf('[', startIndex);
  	if (nestedArr === -1) {
  		return endArr;
  	} else {
  		return findEndArray(text, nestedArr + 1, endArr + 1);
  	}
  }

  var findEndObj = function (text, startIndex, endIndex) {
  	if (!endIndex) {
  		endIndex = startIndex;
  	}
  	var endObj = text.indexOf('}', endIndex);
  	var nestedObj = text.slice(0, endArr).indexOf('{', startIndex);
  	if (nestedObj === -1) {
  		return endObj;
  	} else {
  		return findEndObj(text, nestedObj + 1, endObj + 1);
  	}
  }

  var makeObj = function (text) {
  	var obj = {};
  	for (var j = 0; j < text.length; j++) {
  		var beginProp = j;
  		var endProp = text.indexOf(':', j);
  		var endPropVal = text.indexOf(',', endProp);
  		if (endProp === -1) {
  			return obj;
  		}
  		if (endPropVal === -1) {
  			j = text.length;
  			obj[parseJSON(text.slice(beginProp, endProp))] = parseJSON(text.slice(endProp + 1));
  		} else {
  			j = endPropVal;
  			obj[parseJSON(text.slice(beginProp, endProp))] = parseJSON(text.slice(endProp + 1, endPropVal));
  		}
  	}

  	return obj;
  }

  var makeArray = function (text) {
  	var arr = [];

  	for (var j = 0; j < text.length; j++) {
  		var endElement = text.indexOf(',', j);
  		var beginElement = j;
  		var nestedArr = text.indexOf('[', j);
  		
  		// Either:
  		//	1. Comma comes next before a possible new nested Array
  		//  2. new nested array comes first
  		//		a. At end of array, there is another element following
  		// 		b. At end of array, all other nested arrays end, no elements follow.
  		//  3. there is no next comma/nested array

  		// 1:
  		if (endElement !== -1 && (endElement < nestedArr || nestedArr === -1)) {
  			j = endElement;
  			arr.push(parseJSON(text.slice(beginElement, endElement)));
  		} 
  		// 2:
  		else if (nestedArr !== -1 && (nestedArr < endElement || endElement === -1)) {
  			var endNestedArr = findEndArray(text, nestedArr + 1);
  			var nextElement = text.indexOf(',',endNestedArr);
  			// 2a:
  			if (nextElement !== -1){
  				j = nextElement;	
  			}
  			// 2b:
  			else {
  				j = text.length;
  			}
  			arr.push(makeArray(text.slice(beginElement + 1, endNestedArr)));
  		}
  		// 3:
  		else {
  			j = text.length;
  			arr.push(parseJSON(text.slice(beginElement)));
  		}
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
  	
  	// if Array:
  	if (json[i] === '[') {
  		var endArr = findEndArray(json, i + 1);
  		var beginArr = i + 1;
  		i = endArr;
  		return makeArray(json.slice(beginArr, endArr));
  	}

  	// if Object:
  	if (json[i] === '{') {
  		var endObj = findEndObj(json, i + 1);
  		var beginObj = i + 1;
  		i = endObj;
  		return makeObj(json.slice(beginObj, endObj));
  	}

  	// if Number:
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

  	// if null:
  	if (json.slice(i, i+4) === 'null') {
  		i += 3;
  		return null;
  	}

  }

  

};
