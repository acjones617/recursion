// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function (json) {
  var jText = json;
  var jProd;

  var makeArray = function (text, finalProd) {
  	return [parseJSON(text)];
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

  	// if String:
  	if (json[i] === '"') {
  		var endArr = json.indexOf('"', i + 1);
  		return makeString(json.slice(i + 1, endArr), jProd);
  	}

  	// if Boolean:
  	if (json.slice(i,i+4) === 'true') {
  		return true;
  	}

  	if (json.slice(i,i+5) === 'false') {
  		return false;
  	}

  }

  return jProd;

};
