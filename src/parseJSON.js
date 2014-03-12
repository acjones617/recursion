// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function (json) {
  var jText = json;
  var jProd;

  var makeArray = function (text, finalProd) {
  	// split elements by comma
  	var arr = [];

  	for (var j = 0; j < text.length; j++) {
  		var endElement = text.indexOf(',', j);
  		var beginElement = j;
  		if (endElement !== -1) {
  			j = endElement;
  			arr.push(parseJSON(text.slice(beginElement, endElement)));
  		} else {
  			j = text.length;
  			arr.push(parseJSON(text.slice(beginElement)));
  		}
  	}

  	return arr;
  }

  var makeString = function (text, finalProd) {
  	return text;
  }

  for (var i = 0; i < json.length; i++) {
  	
  	// if Array:
  	if (json[i] === '[') {
  		var endArr = json.indexOf(']', i);
  		var beginArr = i + 1;
  		i = endArr;
  		return makeArray(json.slice(beginArr, endArr));
  	}

  	// if Object:


  	// if encounters a comma in an array/object:
  	if (json[i] === ',') {

  	}

  	// if String:
  	if (json[i] === '"') {
  		var endStr = json.indexOf('"', i+1);
  		var beginStr = i+1;
  		i = endStr+1;
  		return makeString(json.slice(beginStr, endStr), jProd);
  	}

  	// if Boolean:
  	if (json.slice(i, i+4) === 'true') {
  		i += 4;
  		return true;
  	}

  	if (json.slice(i, i+5) === 'false') {
  		i += 5;
  		return false;
  	}

  }

  return jProd;

};
